import React from 'react';
import { render, screen } from '@testing-library/react';
import AclManager from './index';

describe('AclManager', () => {
  const defaultProps = {
    isDark: false,
    onThemeToggle: jest.fn(),
  };

  test('renders ACL management title', () => {
    render(<AclManager {...defaultProps} />);
    expect(screen.getByText('Acl Management')).toBeInTheDocument();
  });

  test('renders placeholder content', () => {
    render(<AclManager {...defaultProps} />);
    expect(screen.getByText('Manage Field Level Permissions And Access Control')).toBeInTheDocument();
    expect(screen.getByText('Acl Management Interface Will Be Implemented Here')).toBeInTheDocument();
  });

  test('renders with dark theme styling', () => {
    render(<AclManager {...defaultProps} isDark={true} />);
    // Component renders without error with dark theme
    expect(screen.getByText('Acl Management')).toBeInTheDocument();
  });
});
