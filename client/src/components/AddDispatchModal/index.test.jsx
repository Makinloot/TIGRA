import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddDispatchModal from './index';

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

describe('AddDispatchModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when open is true', () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Add New Dispatch')).toBeInTheDocument();
    expect(screen.getByText('Core Info')).toBeInTheDocument();
    expect(screen.getByText('Logistics Details')).toBeInTheDocument();
    expect(screen.getByText('Financials')).toBeInTheDocument();
  });

  test('does not render modal when open is false', () => {
    render(
      <AddDispatchModal
        open={false}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.queryByText('Add New Dispatch')).not.toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('navigates through steps correctly', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Start on step 1 (Core Info)
    expect(screen.getByText('VIN')).toBeInTheDocument();
    expect(screen.getByText('Auction')).toBeInTheDocument();

    // Next button should be disabled initially
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();

    // Fill required fields for step 1
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    // Wait for validation and check next button is enabled
    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });

    // Click next to go to step 2
    fireEvent.click(nextButton);

    // Check step 2 content
    expect(screen.getByText('Pickup Date')).toBeInTheDocument();
    expect(screen.getByText('Delivery Date')).toBeInTheDocument();

    // Previous button should now be visible
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeInTheDocument();

    // Next button should be disabled again
    expect(nextButton).toBeDisabled();
  });

  test('submit button is disabled until all steps are complete', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Navigate to final step
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Fill step 1
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    // Simulate date picker selection (this is simplified)
    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Check submit button is disabled on step 3
    const submitButton = screen.getByRole('button', { name: /create dispatch/i });
    expect(submitButton).toBeDisabled();

    // Fill step 3
    const priceInput = screen.getByLabelText('Price');
    const paymentStatusSelect = screen.getByLabelText('Payment Status');

    fireEvent.change(priceInput, { target: { value: 1500 } });
    fireEvent.change(paymentStatusSelect, { target: { value: false } });

    // Submit button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('calls onSuccess and onClose on successful form submission', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Fill all required fields quickly
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    // Navigate to step 2
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next/i });
      if (!nextButton.disabled) {
        fireEvent.click(nextButton);
      }
    });

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    // Navigate to step 3
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next/i });
      if (!nextButton.disabled) {
        fireEvent.click(nextButton);
      }
    });

    // Fill step 3
    const priceInput = screen.getByLabelText('Price');
    const paymentStatusSelect = screen.getByLabelText('Payment Status');

    fireEvent.change(priceInput, { target: { value: 1500 } });
    fireEvent.change(paymentStatusSelect, { target: { value: false } });

    // Submit form
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /create dispatch/i });
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

  test('renders storage fee field in financials step', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Navigate to step 3 (Financials)
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Fill step 1
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Check that storage fee field is rendered in step 3
    expect(screen.getByLabelText('Storage Fee')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Storage Fee')).toBeInTheDocument();
  });

  test('includes creationDate in submission payload', async () => {
    // Mock console.log to capture the submission data
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Fill all required fields quickly
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    // Navigate to step 2
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next/i });
      if (!nextButton.disabled) {
        fireEvent.click(nextButton);
      }
    });

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    // Navigate to step 3
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next/i });
      if (!nextButton.disabled) {
        fireEvent.click(nextButton);
      }
    });

    // Fill step 3
    const priceInput = screen.getByLabelText('Price');
    const paymentStatusSelect = screen.getByLabelText('Payment Status');

    fireEvent.change(priceInput, { target: { value: 1500 } });
    fireEvent.change(paymentStatusSelect, { target: { value: false } });

    // Submit form
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /create dispatch/i });
      if (!submitButton.disabled) {
        fireEvent.click(submitButton);
      }
    });

    // Check that creationDate was included in the logged data
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Submitting dispatch:',
        expect.objectContaining({
          vin: '1HGCM82633A123456',
          auction: 'copart',
          warehouse: 'poti',
          creationDate: expect.any(String)
        })
      );
    });

    // Verify creationDate is a valid ISO string
    const loggedCall = consoleSpy.mock.calls.find(call =>
      call[0] === 'Submitting dispatch:'
    );
    expect(loggedCall[1].creationDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

    consoleSpy.mockRestore();
  });

  test('form validation fails when comment is empty', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Navigate to final step with all fields filled except comment
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Fill step 1
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 3 but leave comment empty
    const priceInput = screen.getByLabelText('Price');
    const paymentStatusSelect = screen.getByLabelText('Payment Status');
    const storageFeeInput = screen.getByLabelText('Storage Fee');

    fireEvent.change(priceInput, { target: { value: 1500 } });
    fireEvent.change(paymentStatusSelect, { target: { value: false } });
    fireEvent.change(storageFeeInput, { target: { value: 100 } });

    // Submit button should still be disabled because comment is required
    const submitButton = screen.getByRole('button', { name: /create dispatch/i });
    expect(submitButton).toBeDisabled();
  });

  test('form validation fails when storage fee is empty', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Navigate to final step with all fields filled except storage fee
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Fill step 1
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 3 but leave storage fee empty
    const priceInput = screen.getByLabelText('Price');
    const paymentStatusSelect = screen.getByLabelText('Payment Status');
    const commentInput = screen.getByLabelText('Comment');

    fireEvent.change(priceInput, { target: { value: 1500 } });
    fireEvent.change(paymentStatusSelect, { target: { value: false } });
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    // Submit button should still be disabled because storage fee is required
    const submitButton = screen.getByRole('button', { name: /create dispatch/i });
    expect(submitButton).toBeDisabled();
  });

  test('form validation succeeds when both comment and storage fee are provided', async () => {
    render(
      <AddDispatchModal
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Navigate to final step with all fields filled including comment and storage fee
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Fill step 1
    const vinInput = screen.getByLabelText('VIN');
    const auctionSelect = screen.getByLabelText('Auction');
    const warehouseSelect = screen.getByLabelText('Warehouse');

    fireEvent.change(vinInput, { target: { value: '1HGCM82633A123456' } });
    fireEvent.change(auctionSelect, { target: { value: 'copart' } });
    fireEvent.change(warehouseSelect, { target: { value: 'poti' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 2
    const pickupDate = screen.getByLabelText('Pickup Date');
    const deliveryDate = screen.getByLabelText('Delivery Date');
    const driverNumber = screen.getByLabelText('Driver Number');
    const route = screen.getByLabelText('Route');

    fireEvent.change(pickupDate, { target: { value: '2025-10-20' } });
    fireEvent.change(deliveryDate, { target: { value: '2025-10-25' } });
    fireEvent.change(driverNumber, { target: { value: 'DRV001' } });
    fireEvent.change(route, { target: { value: 'From A to B' } });

    await waitFor(() => expect(nextButton).not.toBeDisabled());
    fireEvent.click(nextButton);

    // Fill step 3 including both comment and storage fee
    const priceInput = screen.getByLabelText('Price');
    const paymentStatusSelect = screen.getByLabelText('Payment Status');
    const storageFeeInput = screen.getByLabelText('Storage Fee');
    const commentInput = screen.getByLabelText('Comment');

    fireEvent.change(priceInput, { target: { value: 1500 } });
    fireEvent.change(paymentStatusSelect, { target: { value: false } });
    fireEvent.change(storageFeeInput, { target: { value: 100 } });
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    // Submit button should now be enabled
    const submitButton = screen.getByRole('button', { name: /create dispatch/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
