import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuditLogDrawer from './index';

describe('AuditLogDrawer', () => {
  const defaultProps = {
    dispatchId: 'dispatch-123',
    open: true,
    onClose: jest.fn(),
  };

  test('renders drawer with dispatch ID in title', () => {
    render(<AuditLogDrawer {...defaultProps} />);
    expect(screen.getByText('Audit Log - dispatch-123')).toBeInTheDocument();
  });

  test('renders empty state', () => {
    render(<AuditLogDrawer {...defaultProps} />);
    expect(screen.getByText('Audit Log Drawer Not Implemented')).toBeInTheDocument();
  });

  test('calls onClose when drawer is closed', () => {
    render(<AuditLogDrawer {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
