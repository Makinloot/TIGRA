import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ECheckPaymentModal from './index';

// Mock react-to-print
jest.mock('react-to-print', () => ({
  __esModule: true,
  default: ({ children, trigger }) => trigger()
}));

const mockProps = {
  open: true,
  onClose: jest.fn(),
  dispatchId: 'DISP001',
  amount: 2500,
  dispatchDetails: {
    id: 'DISP001',
    vin: '1HGCM82633A123456',
    price: 2500,
    vehicleInfo: {
      make: 'Honda',
      model: 'Accord',
      year: 2020
    },
    pickupDate: '2025-01-15',
    warehouse: 'Miami, FL'
  }
};

describe('ECheckPaymentModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with payment amount and form', () => {
    render(<ECheckPaymentModal {...mockProps} />);

    expect(screen.getByText('Submit Echeck Payment')).toBeInTheDocument();
    expect(screen.getByText('Payment Amount')).toBeInTheDocument();
    expect(screen.getByText('$2,500')).toBeInTheDocument();
    expect(screen.getByLabelText('Bank Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Routing Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Account Number')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ECheckPaymentModal {...mockProps} />);

    const submitButton = screen.getByRole('button', { name: 'Submit Payment' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please Enter Bank Name')).toBeInTheDocument();
      expect(screen.getByText('Please Enter Routing Number')).toBeInTheDocument();
      expect(screen.getByText('Please Enter Account Number')).toBeInTheDocument();
    });
  });

  it('validates routing number format', async () => {
    render(<ECheckPaymentModal {...mockProps} />);

    const routingInput = screen.getByLabelText('Routing Number');
    fireEvent.change(routingInput, { target: { value: '123' } });

    const submitButton = screen.getByRole('button', { name: 'Submit Payment' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Routing Number Must Be 9 Digits')).toBeInTheDocument();
    });
  });

  it('submits payment successfully', async () => {
    render(<ECheckPaymentModal {...mockProps} />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Bank Name'), { target: { value: 'Test Bank' } });
    fireEvent.change(screen.getByLabelText('Routing Number'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText('Account Number'), { target: { value: '987654321' } });

    const submitButton = screen.getByRole('button', { name: 'Submit Payment' });
    fireEvent.click(submitButton);

    // Check loading state
    expect(screen.getByText('Submitting Payment')).toBeInTheDocument();

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText('Payment Submitted')).toBeInTheDocument();
      expect(screen.getByText('Your Echeck Payment For Dispatch DISP001 Has Been Submitted And Is Being Processed')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows download invoice button after successful payment', async () => {
    render(<ECheckPaymentModal {...mockProps} />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Bank Name'), { target: { value: 'Test Bank' } });
    fireEvent.change(screen.getByLabelText('Routing Number'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText('Account Number'), { target: { value: '987654321' } });

    const submitButton = screen.getByRole('button', { name: 'Submit Payment' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Download Invoice Pdf' })).toBeInTheDocument();
    });
  });

  it('closes modal when cancel button is clicked', () => {
    render(<ECheckPaymentModal {...mockProps} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when open is false', () => {
    render(<ECheckPaymentModal {...mockProps} open={false} />);

    expect(screen.queryByText('Submit Echeck Payment')).not.toBeInTheDocument();
  });

  it('resets form when modal is reopened after successful submission', async () => {
    const { rerender } = render(<ECheckPaymentModal {...mockProps} />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Bank Name'), { target: { value: 'Test Bank' } });
    fireEvent.change(screen.getByLabelText('Routing Number'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText('Account Number'), { target: { value: '987654321' } });

    const submitButton = screen.getByRole('button', { name: 'Submit Payment' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Payment Submitted')).toBeInTheDocument();
    });

    // Reopen modal
    rerender(<ECheckPaymentModal {...mockProps} open={false} />);
    rerender(<ECheckPaymentModal {...mockProps} open={true} />);

    // Form should be reset
    expect(screen.getByLabelText('Bank Name')).toHaveValue('');
    expect(screen.getByLabelText('Routing Number')).toHaveValue('');
    expect(screen.getByLabelText('Account Number')).toHaveValue('');
  });
});
