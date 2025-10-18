import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import AuctionQuickViewModal from './index';

// Mock the mock data function
vi.mock('../../mocks/_mockData', () => ({
  getMockVehicleById: vi.fn()
}));

import { getMockVehicleById } from '../../mocks/_mockData';

describe('AuctionQuickViewModal', () => {
  const mockVehicle = {
    id: 1,
    title: '2020 Honda Civic',
    year: 2020,
    location: 'Los Angeles, CA',
    price: 12500,
    timeLeft: '2h 15m',
    activeBidders: 23,
    images: ['/cars/1.jpg', '/cars/2.jpg', '/cars/3.jpg'],
    details: {
      engine: 'N/A',
      transmission: 'N/A',
      mileage: '45,000 miles',
      condition: 'Good'
    }
  };

  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    vehicleId: 1
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <AuctionQuickViewModal {...props} />
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal when open is true', () => {
    getMockVehicleById.mockReturnValue(mockVehicle);
    renderComponent();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays loading spinner during data fetch', async () => {
    // Mock a delayed response
    getMockVehicleById.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(mockVehicle), 100);
    }));

    renderComponent();

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // Spin component
  });

  it('displays error alert when fetch fails', async () => {
    getMockVehicleById.mockRejectedValue(new Error('Vehicle not found'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  it('renders vehicle title and details after successful data fetch', async () => {
    getMockVehicleById.mockReturnValue(mockVehicle);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('2020 Honda Civic')).toBeInTheDocument();
      expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
    });
  });

  it('does not render content when modal is closed', () => {
    renderComponent({ ...defaultProps, open: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when modal is cancelled', async () => {
    getMockVehicleById.mockReturnValue(mockVehicle);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const cancelButton = screen.getByLabelText('Close');
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
