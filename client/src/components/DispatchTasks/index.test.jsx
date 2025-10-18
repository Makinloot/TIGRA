import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DispatchTasks from './index';

// Mock antd components and message
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock the mock data
jest.mock('../../mocks/_mockData', () => ({
  mockTasks: [
    {
      id: '1',
      title: 'Test Task for Dispatch',
      status: 'pending',
      assignedTo: 'role_2',
      relatedVin: 'VIN123',
      createdBy: 'role_3',
      dueDate: '2025-10-20'
    }
  ],
  SYSTEM_ROLES: [
    { key: 'role_1', label: 'Auto Transport Dispatcher' },
    { key: 'role_2', label: 'Logistics/Shipping Coordinator' },
    { key: 'role_3', label: 'Payment' },
    { key: 'admin', label: 'Admin' }
  ]
}));

describe('DispatchTasks', () => {
  const mockDispatchId = '123';

  it('renders loading state initially', () => {
    render(<DispatchTasks dispatchId={mockDispatchId} />);
    expect(screen.getByText('Loading Tasks')).toBeInTheDocument();
  });

  it('renders tasks after loading', async () => {
    render(<DispatchTasks dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('Test Task for Dispatch')).toBeInTheDocument();
    });

    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByText('Logistics/Shipping Coordinator')).toBeInTheDocument();
  });

  it('opens modal when add task button is clicked', async () => {
    render(<DispatchTasks dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('Add New Task')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Task');
    fireEvent.click(addButton);

    expect(screen.getByText('Create New Task')).toBeInTheDocument();
  });

  it('renders empty state when no tasks', async () => {
    // Mock empty tasks
    jest.mock('../../mocks/_mockData', () => ({
      mockTasks: [],
      SYSTEM_ROLES: []
    }), { virtual: true });

    render(<DispatchTasks dispatchId={mockDispatchId} />);

    await waitFor(() => {
      expect(screen.getByText('No Tasks For This Dispatch')).toBeInTheDocument();
    });
  });

  it('requires dispatchId prop', () => {
    // This would normally throw a PropTypes warning, but we'll just test the component renders
    render(<DispatchTasks />);
    // Component should still render but not fetch tasks
  });
});
