import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DispatchDashboard from './index';

/* global jest, describe, test, expect, beforeEach */

// Mock dependencies
jest.mock('../../mocks/_mockData', () => ({
  mockDispatchVehicles: [
    {
      id: '1', vin: 'VIN123456789ABCD', auction: 'Copart', pickupDate: '2025-10-20', deliveryDate: '2025-10-25',
      comment: 'Scratches on bumper', warehouse: 'Poti, GE', driverNumber: '555-1234', toTo: 'PA -> GA', price: 450,
      isAppointmentR1: true, isAppointmentR2: false, isPaid: false,
      paymentStatus: 'pending', timeAdded: '2025-10-17T10:00:00Z', photoStatus: 'missing',
      vehicleInfo: { make: 'Toyota', model: 'Camry', year: '2022' },
      dispatchStatus: 'new'
    },
    {
      id: '2', vin: 'VIN987654321ZYXW', auction: 'IAAI', pickupDate: '2025-10-18', deliveryDate: '2025-10-22',
      comment: '', warehouse: 'Tbilisi, GE', driverNumber: '555-5678', toTo: 'NJ -> GA', price: 500,
      isAppointmentR1: true, isAppointmentR2: true, isPaid: false,
      paymentStatus: 'overdue', timeAdded: '2025-10-15T09:00:00Z', photoStatus: 'complete',
      vehicleInfo: { make: 'Honda', model: 'Accord', year: '2021' },
      dispatchStatus: 'overdue'
    },
    {
      id: '3', vin: 'VINABC123DEF456G', auction: 'Manheim', pickupDate: '2025-10-19', deliveryDate: '2025-10-24',
      comment: 'Clean', warehouse: 'Batumi, GE', driverNumber: '555-9012', toTo: 'FL -> GA', price: 550,
      isAppointmentR1: true, isAppointmentR2: true, isPaid: true,
      paymentStatus: 'paid', timeAdded: '2025-10-14T11:00:00Z', photoStatus: 'complete',
      vehicleInfo: { make: 'Ford', model: 'F-150', year: '2023' },
      dispatchStatus: 'paid'
    }
  ]
}));

describe('DispatchDashboard', () => {
  // TODO-FX: Connect to i18n library.
  const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  beforeEach(() => {
    // Mock for Ant Design components
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('should render the filter components', async () => {
    render(<DispatchDashboard />);

    // Check for fast filters (Spec §4)
    expect(await screen.findByPlaceholderText(t('search_by_vin_driver_etc'))).toBeInTheDocument();
    expect(await screen.findByPlaceholderText(t('filter_by_status'))).toBeInTheDocument();
  });

  test('should render the table with data', async () => {
    render(<DispatchDashboard />);

    // Check for table content (Spec §1)
    expect(await screen.findByText('VIN123456789ABCD')).toBeInTheDocument();
    expect(await screen.findByText('2022 Toyota Camry')).toBeInTheDocument();
    expect(await screen.findByText('Poti, GE')).toBeInTheDocument();
    expect(await screen.findByText('555-1234')).toBeInTheDocument();
    expect(await screen.findByText('$450')).toBeInTheDocument();
  });

  test('should handle loading state', async () => {
    render(<DispatchDashboard />);

    // Should show loading spinner initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('should handle search filtering', async () => {
    render(<DispatchDashboard />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    });

    // Search for specific VIN
    const searchInput = screen.getByPlaceholderText(t('search_by_vin_driver_etc'));
    await userEvent.type(searchInput, 'VIN123456789ABCD');

    // Should still show the matching record
    expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();

    // Search for non-existent VIN
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'NONEXISTENT');

    // Should show empty state
    expect(await screen.findByText(t('no_dispatches_found'))).toBeInTheDocument();
  });

  test('should handle status filtering', async () => {
    render(<DispatchDashboard />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    });

    // Filter by 'new' status (should show only the first record)
    const statusSelect = screen.getByPlaceholderText(t('filter_by_status'));
    await userEvent.click(statusSelect);
    await userEvent.click(screen.getByText(t('new')));

    // Should show only new dispatches
    expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    expect(screen.queryByText('VIN987654321ZYXW')).not.toBeInTheDocument();
  });

  test('should handle empty state', async () => {
    // Mock empty data
    jest.doMock('../../mocks/_mockData', () => ({
      mockDispatchVehicles: []
    }));

    render(<DispatchDashboard />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Should show empty state
    expect(screen.getByText(t('no_dispatches_found'))).toBeInTheDocument();
  });

  test('should handle clear filters', async () => {
    render(<DispatchDashboard />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    });

    // Apply search filter
    const searchInput = screen.getByPlaceholderText(t('search_by_vin_driver_etc'));
    await userEvent.type(searchInput, 'VIN123456789ABCD');

    // Clear filters
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    // Should show all records again
    expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    expect(screen.getByText('VIN987654321ZYXW')).toBeInTheDocument();
  });

  test('should display payment status with correct styling', async () => {
    render(<DispatchDashboard />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    });

    // Check for payment status tags
    expect(screen.getByText(t('pending'))).toBeInTheDocument();
    expect(screen.getByText(t('overdue'))).toBeInTheDocument();
    expect(screen.getByText(t('paid'))).toBeInTheDocument();
  });

  test('should display appointment indicators', async () => {
    render(<DispatchDashboard />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('VIN123456789ABCD')).toBeInTheDocument();
    });

    // Check for appointment indicators
    expect(screen.getAllByText('R1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('R2').length).toBeGreaterThan(0);
  });
});
