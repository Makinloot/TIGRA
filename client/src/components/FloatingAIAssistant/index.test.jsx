import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FloatingAIAssistant from './index';

// Mock the AIAssistantPanel component
jest.mock('../AIAssistantPanel', () => {
  return function MockAIAssistantPanel({ open, onClose, isMobile }) {
    return open ? (
      <div data-testid="ai-assistant-panel" data-mobile={isMobile}>
        <button onClick={onClose} data-testid="close-panel">
          Close
        </button>
      </div>
    ) : null;
  };
});

// Mock antd's useBreakpoint hook
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Grid: {
    useBreakpoint: jest.fn()
  }
}));

const mockUseBreakpoint = require('antd').Grid.useBreakpoint;

describe('FloatingAIAssistant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders nothing initially (delayed appearance)', () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    // Button should not be visible immediately
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders floating button after delay', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('opens AI assistant panel when button is clicked', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('ai-assistant-panel')).toBeInTheDocument();
    });
  });

  it('closes AI assistant panel when close button is clicked', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    // Open panel
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('ai-assistant-panel')).toBeInTheDocument();
    });

    // Close panel
    const closeButton = screen.getByTestId('close-panel');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('ai-assistant-panel')).not.toBeInTheDocument();
    });
  });

  it('applies correct size for desktop (64px)', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ width: '64px', height: '64px' });
    });
  });

  it('applies correct size for mobile (56px)', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: true, sm: false });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ width: '56px', height: '56px' });
    });
  });

  it('passes mobile prop to AIAssistantPanel', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: true, sm: false });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const panel = screen.getByTestId('ai-assistant-panel');
      expect(panel).toHaveAttribute('data-mobile', 'true');
    });
  });

  it('has correct z-index to appear above sticky bar', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ zIndex: '1050' });
    });
  });

  it('has correct positioning (bottom-left)', async () => {
    mockUseBreakpoint.mockReturnValue({ xs: false, sm: true });
    render(<FloatingAIAssistant />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        position: 'fixed',
        bottom: '28px',
        left: '28px'
      });
    });
  });
});
