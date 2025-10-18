import React from 'react';
import { render, screen } from '@testing-library/react';
import DispatchComments from './index';

describe('DispatchComments', () => {
  const defaultProps = {
    dispatchId: 'dispatch-123',
    comments: [],
    onCommentAdd: jest.fn(),
  };

  test('renders component with title', () => {
    render(<DispatchComments {...defaultProps} />);
    expect(screen.getByText('Dispatch Comments')).toBeInTheDocument();
  });

  test('renders empty state', () => {
    render(<DispatchComments {...defaultProps} />);
    expect(screen.getByText('Comments System Not Implemented')).toBeInTheDocument();
  });
});
