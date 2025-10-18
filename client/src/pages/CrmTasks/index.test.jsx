import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CrmTasks from './index';

// Mock the mock data
jest.mock('../../mocks/_mockData', () => ({
  mockTasks: [
    {
      id: '1',
      title: 'Test Task',
      status: 'pending',
      assignedTo: 'role_2',
      relatedVin: 'VIN123456789012345',
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

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CrmTasks', () => {
  it('renders loading state initially', () => {
    renderWithRouter(<CrmTasks />);
    expect(screen.getByText('Loading Tasks')).toBeInTheDocument();
  });

  it('renders tasks table after loading', async () => {
    renderWithRouter(<CrmTasks />);

    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    expect(screen.getByText('My Tasks')).toBeInTheDocument();
    expect(screen.getByText('Logistics/Shipping Coordinator')).toBeInTheDocument();
  });

  it('renders VIN as link', async () => {
    renderWithRouter(<CrmTasks />);

    await waitFor(() => {
      const vinLink = screen.getByText('VIN123456789012345');
      expect(vinLink.closest('a')).toHaveAttribute('href', '/crm/dispatch?vin=VIN123456789012345');
    });
  });

  it('renders status tags correctly', async () => {
    renderWithRouter(<CrmTasks />);

    await waitFor(() => {
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  it('handles empty state', async () => {
    // Mock empty tasks
    jest.mock('../../mocks/_mockData', () => ({
      mockTasks: [],
      SYSTEM_ROLES: []
    }), { virtual: true });

    renderWithRouter(<CrmTasks />);

    await waitFor(() => {
      expect(screen.getByText('No Tasks Found')).toBeInTheDocument();
    });
  });
});
