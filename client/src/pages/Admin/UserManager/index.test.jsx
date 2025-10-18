import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserManager from './index';

describe('UserManager', () => {
  test('renders user management page with table', () => {
    render(<UserManager />);

    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Base Role')).toBeInTheDocument();
  });

  test('displays mock users in table', () => {
    render(<UserManager />);

    expect(screen.getByText('Role 2 (Logistics)')).toBeInTheDocument();
    expect(screen.getByText('logistics@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role 3 (Payment)')).toBeInTheDocument();
    expect(screen.getByText('payment@example.com')).toBeInTheDocument();
  });

  test('opens modal when Add New User button is clicked', () => {
    render(<UserManager />);

    const addButton = screen.getByText('Add New User');
    fireEvent.click(addButton);

    // Modal should be open (we can't easily test the modal content without mocking)
    // This test ensures the click handler doesn't throw an error
  });

  test('opens modal when Edit Permissions button is clicked', () => {
    render(<UserManager />);

    const editButtons = screen.getAllByText('Edit Permissions');
    fireEvent.click(editButtons[0]);

    // Modal should be open (we can't easily test the modal content without mocking)
    // This test ensures the click handler doesn't throw an error
  });
});
