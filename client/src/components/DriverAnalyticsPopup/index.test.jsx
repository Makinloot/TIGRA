import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DriverAnalyticsPopup from './index';

describe('DriverAnalyticsPopup', () => {
  const defaultProps = {
    driverNumber: 'DRV-001',
    open: true,
    onClose: jest.fn(),
  };

  test('renders modal with driver number in title', () => {
    render(<DriverAnalyticsPopup {...defaultProps} />);
    expect(screen.getByText('Driver Analytics - DRV-001')).toBeInTheDocument();
  });

  test('renders empty state', () => {
    render(<DriverAnalyticsPopup {...defaultProps} />);
    expect(screen.getByText('Driver Analytics Popup Not Implemented')).toBeInTheDocument();
  });

  test('calls onClose when modal is cancelled', () => {
    render(<DriverAnalyticsPopup {...defaultProps} />);
    const cancelButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
