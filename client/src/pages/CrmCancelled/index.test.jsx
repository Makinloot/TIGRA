import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CrmCancelled from './index';

/* global jest, describe, it, expect, beforeEach */

// Mock the AuditLogDrawer component
jest.mock('../../components/AuditLogDrawer', () => {
  return function MockAuditLogDrawer({ open, onClose }) {
    return open ? (
      <div data-testid="audit-log-drawer">
        <button onClick={onClose}>Close Audit Log</button>
      </div>
    ) : null;
  };
});

// Mock the mock data
jest.mock('../../mocks/_mockData', () => ({
  mockCancelledDispatches: [
    {
      id: 'cancelled-1',
      vin: '1FAHP2F8XJG123456',
      auction: 'Copart',
      vehicleInfo: { year: 2018, make: 'Ford', model: 'Focus' },
      pickupDate: '2025-10-05',
      deliveryDate: '2025-10-05',
      warehouse: 'Chicago, IL',
      driverNumber: 'DRV009',
      route: 'Chicago to Milwaukee',
      price: 5500,
      paymentStatus: 'cancelled',
      isPaid: false,
      photoStatus: 'pending',
      timeAdded: '2025-10-05T10:00:00Z',
      comment: 'Dispatch cancelled due to buyer withdrawal',
      isAppointmentR1: false,
      isAppointmentR2: false,
      dispatchStatus: 'cancelled',
      cancellationReason: 'Buyer withdrew from purchase'
    }
  ]
}));

describe('CrmCancelled', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cancelled page title', () => {
    render(<CrmCancelled />);
    expect(screen.getByText('Cancelled List')).toBeInTheDocument();
  });

  it('displays loading spinner initially', () => {
    render(<CrmCancelled />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // Spin component
  });

  it('loads and displays cancelled dispatches', async () => {
    render(<CrmCancelled />);

    await waitFor(() => {
      expect(screen.getByText('1FAHP2F8XJG123456')).toBeInTheDocument();
      expect(screen.getByText('Copart')).toBeInTheDocument();
      expect(screen.getByText('2018 Ford')).toBeInTheDocument();
    });
  });

  it('displays cancelled status tag', async () => {
    render(<CrmCancelled />);

    await waitFor(() => {
      expect(screen.getByText('Cancelled')).toBeInTheDocument();
    });
  });

  it('renders cancellation reason column', async () => {
    render(<CrmCancelled />);

    await waitFor(() => {
      expect(screen.getByText('Cancellation Reason')).toBeInTheDocument();
      expect(screen.getByText('Buyer withdrew from purchase')).toBeInTheDocument();
    });
  });

  it('renders table columns correctly', async () => {
    render(<CrmCancelled />);

    await waitFor(() => {
      expect(screen.getByText('Vin')).toBeInTheDocument();
      expect(screen.getByText('Auction')).toBeInTheDocument();
      expect(screen.getByText('Vehicle Info')).toBeInTheDocument();
      expect(screen.getByText('Pickup Date')).toBeInTheDocument();
      expect(screen.getByText('Delivery Date')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Driver')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('Payment Status')).toBeInTheDocument();
      expect(screen.getByText('Cancellation Reason')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });

  it('opens audit log drawer when audit log button is clicked', async () => {
    render(<CrmCancelled />);

    await waitFor(() => {
      expect(screen.getByText('Audit Log')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Audit Log'));

    expect(screen.getByTestId('audit-log-drawer')).toBeInTheDocument();
  });

  it('closes audit log drawer when close button is clicked', async () => {
    render(<CrmCancelled />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Audit Log'));
    });

    expect(screen.getByTestId('audit-log-drawer')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Audit Log'));

    expect(screen.queryByTestId('audit-log-drawer')).not.toBeInTheDocument();
  });

  it('displays empty state when no dispatches are available', async () => {
    // Mock empty data
    jest.doMock('../../mocks/_mockData', () => ({
      mockCancelledDispatches: []
    }));

    render(<CrmCancelled />);

    await waitFor(() => {
      expect(screen.getByText('No Cancelled Dispatches Found')).toBeInTheDocument();
    });
  });
});
