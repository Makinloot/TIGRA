import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from 'antd';
import EditUserPermissionsModal from './index';

describe('EditUserPermissionsModal', () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    userId: null,
  };

  test('renders create mode modal when userId is null', () => {
    render(<EditUserPermissionsModal {...mockProps} />);

    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Base Role')).toBeInTheDocument();
    expect(screen.getByText('Custom Functions')).toBeInTheDocument();
  });

  test('renders edit mode modal when userId is provided', () => {
    render(<EditUserPermissionsModal {...mockProps} userId="u1" />);

    expect(screen.getByText('Edit User Permissions')).toBeInTheDocument();
    expect(screen.queryByText('Password')).not.toBeInTheDocument();
  });

  test('shows base role selector with placeholder', () => {
    render(<EditUserPermissionsModal {...mockProps} />);

    const select = screen.getByText('Select A Base Role');
    expect(select).toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(<EditUserPermissionsModal {...mockProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test('validates required fields on save', async () => {
    render(<EditUserPermissionsModal {...mockProps} />);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  test('transfer component renders available and assigned functions', () => {
    render(<EditUserPermissionsModal {...mockProps} />);

    expect(screen.getByText('Available Functions')).toBeInTheDocument();
    expect(screen.getByText('Assigned Functions')).toBeInTheDocument();
  });
});
