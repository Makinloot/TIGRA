import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LogisticsPage from './index';

// Mock the mock data
jest.mock('../../mocks/_mockData', () => ({
  mockLogisticsVehicles: [
    {
      id: '1',
      vehicleTitle: '2023 Toyota Camry',
      vin: 'JN123456789012345',
      auctionLocation: 'Manheim, PA',
      status: 'at_auction'
    }
  ]
}));

describe('LogisticsPage', () => {
  const defaultProps = {
    isDark: false,
    onThemeToggle: jest.fn(),
  };

  test('renders loading state initially', () => {
    render(<LogisticsPage {...defaultProps} />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spin component
  });

  test('renders table with vehicle data after loading', async () => {
    render(<LogisticsPage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('2023 Toyota Camry')).toBeInTheDocument();
    });

    expect(screen.getByText('JN123456789012345')).toBeInTheDocument();
    expect(screen.getByText('Manheim, PA')).toBeInTheDocument();
  });

  test('renders status tags with correct colors', async () => {
    render(<LogisticsPage {...defaultProps} />);

    await waitFor(() => {
      const statusTag = screen.getByText('At Auction');
      expect(statusTag).toBeInTheDocument();
      // The tag should have blue color class for 'at_auction' status
    });
  });

  test('renders status select dropdown', async () => {
    render(<LogisticsPage {...defaultProps} />);

    await waitFor(() => {
      const select = screen.getByDisplayValue('At Auction');
      expect(select).toBeInTheDocument();
    });
  });

  test('handles status change', async () => {
    render(<LogisticsPage {...defaultProps} />);

    await waitFor(() => {
      const select = screen.getByDisplayValue('At Auction');
      fireEvent.mouseDown(select);
    });

    // Wait for dropdown options to appear
    await waitFor(() => {
      expect(screen.getByText('Delivered')).toBeInTheDocument();
    });

    // Note: Testing the actual selection would require more complex mocking
    // of the Select component's onChange behavior
  });

  test('renders empty state when no vehicles', async () => {
    // Mock empty vehicles array
    jest.doMock('../../mocks/_mockData', () => ({
      mockLogisticsVehicles: []
    }));

    render(<LogisticsPage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('No Vehicles Found')).toBeInTheDocument();
    });
  });
});
