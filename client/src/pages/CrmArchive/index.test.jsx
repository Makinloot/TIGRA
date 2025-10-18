import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CrmArchive from './index';

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
  mockArchivedDispatches: [
    {
      id: 'archived-1',
      vin: '2HGFC2F59KH123456',
      auction: 'Copart',
      vehicleInfo: { year: 2019, make: 'Honda', model: 'Civic' },
      pickupDate: '2025-09-15',
      deliveryDate: '2025-09-16',
      warehouse: 'Miami, FL',
      driverNumber: 'DRV006',
      route: 'Miami to Orlando',
      price: 7800,
      paymentStatus: 'paid',
      isPaid: true,
      photoStatus: 'complete',
      timeAdded: '2025-09-15T10:00:00Z',
      comment: 'Completed dispatch, payment received',
      isAppointmentR1: false,
      isAppointmentR2: false,
      dispatchStatus: 'completed'
    }
  ]
}));

describe('CrmArchive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the archive page title', () => {
    render(<CrmArchive />);
    expect(screen.getByText('Archive Paid')).toBeInTheDocument();
  });

  it('displays loading spinner initially', () => {
    render(<CrmArchive />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // Spin component
  });

  it('loads and displays archived dispatches', async () => {
    render(<CrmArchive />);

    await waitFor(() => {
      expect(screen.getByText('2HGFC2F59KH123456')).toBeInTheDocument();
      expect(screen.getByText('Copart')).toBeInTheDocument();
      expect(screen.getByText('2019 Honda')).toBeInTheDocument();
    });
  });

  it('displays paid status tag', async () => {
    render(<CrmArchive />);

    await waitFor(() => {
      expect(screen.getByText('Paid')).toBeInTheDocument();
    });
  });

  it('renders table columns correctly', async () => {
    render(<CrmArchive />);

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
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });

  it('opens audit log drawer when audit log button is clicked', async () => {
    render(<CrmArchive />);

    await waitFor(() => {
      expect(screen.getByText('Audit Log')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Audit Log'));

    expect(screen.getByTestId('audit-log-drawer')).toBeInTheDocument();
  });

  it('closes audit log drawer when close button is clicked', async () => {
    render(<CrmArchive />);

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
      mockArchivedDispatches: []
    }));

    render(<CrmArchive />);

    await waitFor(() => {
      expect(screen.getByText('No Archived Dispatches Found')).toBeInTheDocument();
    });
  });
});
