import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CrmStatisticsPage from './index';

/* global jest, describe, test, expect, beforeEach */

// Mock the mock data
jest.mock('../../mocks/_mockData', () => ({
  mockCrmStats: {
    dispatchesToday: 47,
    dispatchesWeekly: 312,
    dispatchesMonthly: 1289,
    revenueToday: 23450,
    pendingPaymentTotal: 145230,
    avgDeliveryTimeDays: 4.2,
    activeDrivers: 89,
    vehiclesInTransit: 156,
    onTimeDeliveryRate: 94.7,
    customerSatisfactionScore: 4.6,
    avgRevenuePerDispatch: 498,
    collectedThisMonth: 587670,
    overduePayments: 45600,
    performanceMetrics: {
      dispatchSuccessRate: 97.3,
      driverUtilizationRate: 87.4,
      customerRetentionRate: 92.1,
      profitMargin: 23.4
    }
  }
}));

describe('CrmStatisticsPage', () => {
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

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('should show loading state initially', () => {
    render(<CrmStatisticsPage />);

    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should render statistics after loading completes', async () => {
    render(<CrmStatisticsPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Check for all statistic titles
    expect(screen.getByText(t('dispatches_today'))).toBeInTheDocument();
    expect(screen.getByText(t('active_drivers'))).toBeInTheDocument();
    expect(screen.getByText(t('revenue_today'))).toBeInTheDocument();
    expect(screen.getByText(t('vehicles_in_transit'))).toBeInTheDocument();

    // Check for statistic values
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('89')).toBeInTheDocument();
    expect(screen.getByText('$23,450')).toBeInTheDocument();
    expect(screen.getByText('156')).toBeInTheDocument();
  });

  test('should render dispatch volume chart', async () => {
    render(<CrmStatisticsPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Check for chart section
    expect(screen.getByText(t('dispatch_volume_over_time'))).toBeInTheDocument();

    // Verify chart data is rendered (check for a specific month from the data)
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  test('should render KPI cards in responsive grid layout', async () => {
    render(<CrmStatisticsPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Should have 15 KPI cards (4 rows of 4 + 1 row of 3)
    const cards = screen.getAllByRole('img', { hidden: true }); // Ant Design cards have hidden images
    expect(cards.length).toBe(15);
  });

  test('should handle API error gracefully', async () => {
    // Mock fetch to throw error
    const originalFetch = window.fetch;
    window.fetch = jest.fn(() => Promise.reject(new Error('API Error')));

    render(<CrmStatisticsPage />);

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText(t('error'))).toBeInTheDocument();
    });

    expect(screen.getByText(t('error_loading_statistics'))).toBeInTheDocument();

    // Cleanup
    window.fetch = originalFetch;
  });

  test('should display statistics with correct formatting', async () => {
    render(<CrmStatisticsPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Check for currency formatting
    expect(screen.getByText('$23,450')).toBeInTheDocument();
    expect(screen.getByText('$145,230')).toBeInTheDocument();

    // Check for percentage formatting
    expect(screen.getByText('94.7%')).toBeInTheDocument();
    expect(screen.getByText('4.6/5')).toBeInTheDocument();

    // Check for regular numbers
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('89')).toBeInTheDocument();
  });

  test('should use proper i18n keys for all user-visible text', async () => {
    render(<CrmStatisticsPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Verify that all expected i18n keys are used
    // These should be present in the rendered output through the t() function
    const expectedKeys = [
      'dispatches_today',
      'active_drivers',
      'revenue_today',
      'vehicles_in_transit',
      'avg_delivery_time_days',
      'on_time_delivery_rate',
      'customer_satisfaction_score',
      'avg_revenue_per_dispatch',
      'pending_payment_total',
      'collected_this_month',
      'overdue_payments',
      'dispatch_success_rate',
      'driver_utilization_rate',
      'customer_retention_rate',
      'profit_margin',
      'dispatch_volume_over_time',
      'dispatches',
      'revenue'
    ];

    expectedKeys.forEach(key => {
      expect(screen.getByText(t(key))).toBeInTheDocument();
    });
  });
});
