import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CancelDispatchModal from './index';

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

describe('CancelDispatchModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when open is true', () => {
    render(
      <CancelDispatchModal
        open={true}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Cancel Dispatch')).toBeInTheDocument();
    expect(screen.getByText('Cancellation Reason')).toBeInTheDocument();
    expect(screen.getByText('Cancellation Comment')).toBeInTheDocument();
  });

  test('does not render modal when open is false', () => {
    render(
      <CancelDispatchModal
        open={false}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.queryByText('Cancel Dispatch')).not.toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <CancelDispatchModal
        open={true}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('submit button is disabled until form is valid', async () => {
    render(
      <CancelDispatchModal
        open={true}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    const submitButton = screen.getByRole('button', { name: /confirm cancellation/i });
    expect(submitButton).toBeDisabled();

    // Fill required fields
    const reasonSelect = screen.getByLabelText('Cancellation Reason');
    const commentTextarea = screen.getByLabelText('Cancellation Comment');

    fireEvent.change(reasonSelect, { target: { value: 'weather_delay' } });
    fireEvent.change(commentTextarea, { target: { value: 'This is a test comment that is long enough to meet the minimum requirement.' } });

    // Submit button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('calls onSuccess and onClose on successful form submission', async () => {
    render(
      <CancelDispatchModal
        open={true}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    // Fill required fields
    const reasonSelect = screen.getByLabelText('Cancellation Reason');
    const commentTextarea = screen.getByLabelText('Cancellation Comment');

    fireEvent.change(reasonSelect, { target: { value: 'weather_delay' } });
    fireEvent.change(commentTextarea, { target: { value: 'This is a test comment that is long enough to meet the minimum requirement.' } });

    // Submit form
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /confirm cancellation/i });
      if (!submitButton.disabled) {
        fireEvent.click(submitButton);
      }
    });

    // Check that success and close callbacks are called
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  test('validates minimum comment length', async () => {
    render(
      <CancelDispatchModal
        open={true}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    const reasonSelect = screen.getByLabelText('Cancellation Reason');
    const commentTextarea = screen.getByLabelText('Cancellation Comment');
    const submitButton = screen.getByRole('button', { name: /confirm cancellation/i });

    // Fill reason but provide short comment
    fireEvent.change(reasonSelect, { target: { value: 'weather_delay' } });
    fireEvent.change(commentTextarea, { target: { value: 'Short' } });

    // Submit button should still be disabled due to validation
    expect(submitButton).toBeDisabled();
  });

  test('shows character count for comment field', () => {
    render(
      <CancelDispatchModal
        open={true}
        onClose={mockOnClose}
        dispatchId="dispatch-123"
        onSuccess={mockOnSuccess}
      />
    );

    const commentTextarea = screen.getByLabelText('Cancellation Comment');
    expect(commentTextarea).toHaveAttribute('maxlength', '500');
  });
});
