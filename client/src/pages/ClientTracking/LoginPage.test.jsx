import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

// Mock the CMS utils
const mockValidateVIN = vi.fn();
vi.mock('../../utils/cmsUtils', () => ({
  validateVIN: mockValidateVIN
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock Ant Design message
const mockMessage = {
  error: vi.fn(),
  success: vi.fn()
};
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: mockMessage
  };
});

describe('LoginPage', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockValidateVIN.mockClear();
    mockMessage.error.mockClear();
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the login form with correct title and input', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByText('Track Your Vehicle')).toBeInTheDocument();
    expect(screen.getByLabelText('Vehicle Identification Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Vin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Track' })).toBeInTheDocument();
  });

  it('validates VIN format and shows error for invalid VIN', async () => {
    const user = userEvent.setup();
    mockValidateVIN.mockReturnValue(false);

    renderWithRouter(<LoginPage />);

    const input = screen.getByPlaceholderText('Enter Vin');
    const submitButton = screen.getByRole('button', { name: 'Track' });

    await user.type(input, 'INVALIDVIN');
    await user.click(submitButton);

    expect(mockValidateVIN).toHaveBeenCalledWith('INVALIDVIN');
    expect(mockMessage.error).toHaveBeenCalledWith('Invalid Vin Format');
  });

  it('navigates to status page for valid VIN', async () => {
    const user = userEvent.setup();
    mockValidateVIN.mockReturnValue(true);

    renderWithRouter(<LoginPage />);

    const input = screen.getByPlaceholderText('Enter Vin');
    const submitButton = screen.getByRole('button', { name: 'Track' });

    await user.type(input, '1FTFW1ET4DFC12345');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/track/1FTFW1ET4DFC12345');
    });
  });

  it('handles form submission via enter key', async () => {
    const user = userEvent.setup();
    mockValidateVIN.mockReturnValue(true);

    renderWithRouter(<LoginPage />);

    const input = screen.getByPlaceholderText('Enter Vin');

    await user.type(input, '1FTFW1ET4DFC12345');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/track/1FTFW1ET4DFC12345');
    });
  });

  it('shows validation error for empty VIN', async () => {
    const user = userEvent.setup();

    renderWithRouter(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: 'Track' });
    await user.click(submitButton);

    expect(screen.getByText('Vin Is Required')).toBeInTheDocument();
  });

  it('shows validation error for VIN with wrong length', async () => {
    const user = userEvent.setup();

    renderWithRouter(<LoginPage />);

    const input = screen.getByPlaceholderText('Enter Vin');
    const submitButton = screen.getByRole('button', { name: 'Track' });

    await user.type(input, 'SHORTVIN');
    await user.click(submitButton);

    expect(screen.getByText('Vin Must Be 17 Characters')).toBeInTheDocument();
  });

  it('shows error message when VIN lookup fails', async () => {
    const user = userEvent.setup();
    mockValidateVIN.mockReturnValue(true);

    // Mock the setTimeout to throw an error
    const originalSetTimeout = globalThis.setTimeout;
    globalThis.setTimeout = vi.fn((callback) => {
      callback();
      throw new Error('Network error');
    });

    renderWithRouter(<LoginPage />);

    const input = screen.getByPlaceholderText('Enter Vin');
    const submitButton = screen.getByRole('button', { name: 'Track' });

    await user.type(input, '1FTFW1ET4DFC12345');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMessage.error).toHaveBeenCalledWith('Vin Lookup Failed');
    });

    globalThis.setTimeout = originalSetTimeout;
  });

  it('centers the card on the screen', () => {
    renderWithRouter(<LoginPage />);

    const container = screen.getByText('Track Your Vehicle').closest('div');
    expect(container).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
  });

  it('applies correct styling to the card', () => {
    renderWithRouter(<LoginPage />);

    const card = screen.getByText('Track Your Vehicle').closest('.ant-card');
    expect(card).toHaveStyle({
      width: '100%',
      maxWidth: '400px'
    });
  });

  it('autofocuses the input field', () => {
    renderWithRouter(<LoginPage />);

    const input = screen.getByPlaceholderText('Enter Vin');
    expect(input).toHaveFocus();
  });
});
