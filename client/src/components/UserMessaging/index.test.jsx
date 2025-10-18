import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMessaging from './index';

describe('UserMessaging', () => {
  const defaultProps = {
    vin: 'VIN12345678901234',
    messages: [],
    onMessageSend: jest.fn(),
  };

  test('renders component with VIN in title', () => {
    render(<UserMessaging {...defaultProps} />);
    expect(screen.getByText('Messaging For VIN12345678901234')).toBeInTheDocument();
  });

  test('renders empty state', () => {
    render(<UserMessaging {...defaultProps} />);
    expect(screen.getByText('Messaging System Not Implemented')).toBeInTheDocument();
  });
});
