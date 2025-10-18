import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { message } from 'antd';
import DispatchExpenses from './index';

/* global jest, describe, it, expect, beforeEach, global, require */

// Mock the _mockData module
jest.mock('../../mocks/_mockData', () => ({
  getMockExpenses: jest.fn()
}));

// Mock antd message
jest.mock('antd', () => {
  const originalModule = jest.requireActual('antd');
  return {
    ...originalModule,
    message: {
      success: jest.fn(),
      error: jest.fn()
    }
  };
});

const mockGetMockExpenses = require('../../mocks/_mockData').getMockExpenses;

describe('DispatchExpenses', () => {
  const mockDispatchId = 'test-dispatch-1';
  const mockExpenses = [
    {
      id: '1',
      type: 'storage',
      description: 'Warehouse storage fee',
      amount: 150.00,
      date: '2025-10-15'
    },
    {
      id: '2',
      type: 'fedex',
      description: 'Shipping charges',
      amount: 75.50,
      date: '2025-10-16'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockGetMockExpenses.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    expect(screen.getByText('Loading Expenses')).toBeInTheDocument();
  });

  it('should render error state when fetch fails', async () => {
    mockGetMockExpenses.mockRejectedValue(new Error('Network error'));

    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('Error Loading Expenses')).toBeInTheDocument();
    });
  });

  it('should render empty state when no expenses exist', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });
  });

  it('should render expenses table with data', async () => {
    mockGetMockExpenses.mockResolvedValue(mockExpenses);

    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('Warehouse storage fee')).toBeInTheDocument();
      expect(screen.getByText('Shipping charges')).toBeInTheDocument();
      expect(screen.getByText('$150.00')).toBeInTheDocument();
      expect(screen.getByText('$75.50')).toBeInTheDocument();
      expect(screen.getByText('Total Expenses: $225.50')).toBeInTheDocument();
    });
  });

  it('should open add expense modal when button is clicked', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add expense/i });
    fireEvent.click(addButton);

    expect(screen.getByText('Add Expense')).toBeInTheDocument();
  });

  it('should add new expense successfully', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });

    // Open modal
    const addButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(addButton);

    // Fill form
    const typeSelect = screen.getByLabelText('Expense Type');
    await user.click(typeSelect);
    await user.click(screen.getByText('Storage'));

    const descriptionInput = screen.getByLabelText('Description');
    await user.type(descriptionInput, 'New storage fee');

    const amountInput = screen.getByLabelText('Amount');
    await user.type(amountInput, '200.50');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith('Expense Added Successfully');
      expect(screen.queryByText('Add Expense')).not.toBeInTheDocument();
    });
  });

  it('should show validation errors for required fields', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });

    // Open modal
    const addButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(addButton);

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please select expense type')).toBeInTheDocument();
      expect(screen.getByText('Please enter description')).toBeInTheDocument();
      expect(screen.getByText('Please enter amount')).toBeInTheDocument();
    });
  });

  it('should delete expense successfully', async () => {
    mockGetMockExpenses.mockResolvedValue(mockExpenses);

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('Warehouse storage fee')).toBeInTheDocument();
    });

    // Click delete button
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    await user.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith('Expense Deleted Successfully');
      expect(screen.queryByText('Warehouse storage fee')).not.toBeInTheDocument();
    });
  });

  it('should cancel modal and reset form', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });

    // Open modal
    const addButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(addButton);

    // Fill some data
    const descriptionInput = screen.getByLabelText('Description');
    await user.type(descriptionInput, 'Test expense');

    // Cancel modal
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    // Re-open modal to check form is reset
    await user.click(addButton);
    expect(descriptionInput.value).toBe('');
  });

  it('should handle API errors during add operation', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    // Mock the add expense API to fail
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    );

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });

    // Open modal and fill form
    const addButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(addButton);

    const typeSelect = screen.getByLabelText('Expense Type');
    await user.click(typeSelect);
    await user.click(screen.getByText('Storage'));

    const descriptionInput = screen.getByLabelText('Description');
    await user.type(descriptionInput, 'Error test expense');

    const amountInput = screen.getByLabelText('Amount');
    await user.type(amountInput, '100');

    const submitButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Failed To Add Expense');
    });

    global.fetch.mockRestore();
  });

  it('should handle API errors during delete operation', async () => {
    mockGetMockExpenses.mockResolvedValue(mockExpenses);

    // Mock the delete expense API to fail
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    );

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('Warehouse storage fee')).toBeInTheDocument();
    });

    // Click delete button
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    await user.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Failed To Delete Expense');
    });

    global.fetch.mockRestore();
  });

  it('should validate amount as positive number', async () => {
    mockGetMockExpenses.mockResolvedValue([]);

    const user = userEvent.setup();
    render(<DispatchExpenses dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Expenses Found')).toBeInTheDocument();
    });

    // Open modal
    const addButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(addButton);

    // Fill form with negative amount
    const typeSelect = screen.getByLabelText('Expense Type');
    await user.click(typeSelect);
    await user.click(screen.getByText('Storage'));

    const descriptionInput = screen.getByLabelText('Description');
    await user.type(descriptionInput, 'Negative amount test');

    const amountInput = screen.getByLabelText('Amount');
    await user.type(amountInput, '-50');

    const submitButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Amount must be positive')).toBeInTheDocument();
    });
  });

  it('should require dispatchId prop', () => {
    // Suppress console error for prop validation
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<DispatchExpenses />);
    }).toThrow();

    consoleSpy.mockRestore();
  });
});
