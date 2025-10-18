import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CrmModulePickerModal from './index';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CrmModulePickerModal', () => {
  const renderWithRouter = (props) => {
    return render(
      <BrowserRouter>
        <CrmModulePickerModal {...props} />
      </BrowserRouter>
    );
  };

  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when open', () => {
    renderWithRouter(defaultProps);
    expect(screen.getByText('Select Crm Module')).toBeInTheDocument();
  });

  test('does not render modal when closed', () => {
    renderWithRouter({ ...defaultProps, open: false });
    expect(screen.queryByText('Select Crm Module')).not.toBeInTheDocument();
  });

  test('renders Sales button as disabled', () => {
    renderWithRouter(defaultProps);
    const salesButton = screen.getByText('Sales Module - Coming Soon');
    expect(salesButton).toBeDisabled();
  });

  test('renders Logistics button as enabled', () => {
    renderWithRouter(defaultProps);
    const logisticsButton = screen.getByText('Logistics Module');
    expect(logisticsButton).toBeEnabled();
  });

  test('navigates to /crm/logistics and closes modal when Logistics is clicked', () => {
    renderWithRouter(defaultProps);
    const logisticsButton = screen.getByText('Logistics Module');

    fireEvent.click(logisticsButton);

    expect(mockNavigate).toHaveBeenCalledWith('/crm/logistics');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('calls onClose when modal is cancelled', () => {
    renderWithRouter(defaultProps);
    const cancelButton = screen.getByRole('button', { name: /close/i });

    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
