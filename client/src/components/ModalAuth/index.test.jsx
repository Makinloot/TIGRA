import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalAuth from './index';

// Mock the i18n translation function
vi.mock('../../i18n', () => ({
  t: (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}));

// Mock Ant Design icons
vi.mock('@ant-design/icons', () => ({
  LoginOutlined: () => <span data-testid="login-icon">LoginIcon</span>,
  UserAddOutlined: () => <span data-testid="user-add-icon">UserAddIcon</span>,
  GoogleOutlined: () => <span data-testid="google-icon">GoogleIcon</span>,
  FacebookOutlined: () => <span data-testid="facebook-icon">FacebookIcon</span>
}));

const mockProps = {
  visible: true,
  onClose: vi.fn(),
  onLogin: vi.fn(),
  onRegister: vi.fn(),
  onSocialAuth: vi.fn(),
  loading: false,
  error: null
};

describe('ModalAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login tab by default', () => {
    render(<ModalAuth {...mockProps} />);

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('switches to register tab when clicked', () => {
    render(<ModalAuth {...mockProps} />);

    const registerTab = screen.getByText('Create Account');
    fireEvent.click(registerTab);

    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Create password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat password')).toBeInTheDocument();
  });

  it('calls onClose when modal is closed', () => {
    render(<ModalAuth {...mockProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('validates required fields in login form', async () => {
    render(<ModalAuth {...mockProps} />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Please select your account type')).toBeInTheDocument();
    });
  });

  it('validates email format in login form', async () => {
    const user = userEvent.setup();
    render(<ModalAuth {...mockProps} />);

    const emailInput = screen.getByPlaceholderText('you@example.com');
    await user.type(emailInput, 'invalid-email');

    const passwordInput = screen.getByPlaceholderText('••••••••');
    await user.type(passwordInput, 'password123');

    const userRadio = screen.getByLabelText('User');
    await user.click(userRadio);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('validates password requirements in register form', async () => {
    const user = userEvent.setup();
    render(<ModalAuth {...mockProps} />);

    // Switch to register tab
    const registerTab = screen.getByText('Create Account');
    fireEvent.click(registerTab);

    const fullNameInput = screen.getByPlaceholderText('John Doe');
    await user.type(fullNameInput, 'John Doe');

    const emailInput = screen.getByPlaceholderText('you@example.com');
    await user.type(emailInput, 'john@example.com');

    const passwordInput = screen.getByPlaceholderText('Create password');
    await user.type(passwordInput, 'weak');

    const userRadio = screen.getAllByLabelText('User — buying & bidding access')[0];
    await user.click(userRadio);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('validates password confirmation match', async () => {
    const user = userEvent.setup();
    render(<ModalAuth {...mockProps} />);

    // Switch to register tab
    const registerTab = screen.getByText('Create Account');
    fireEvent.click(registerTab);

    const fullNameInput = screen.getByPlaceholderText('John Doe');
    await user.type(fullNameInput, 'John Doe');

    const emailInput = screen.getByPlaceholderText('you@example.com');
    await user.type(emailInput, 'john@example.com');

    const passwordInput = screen.getByPlaceholderText('Create password');
    await user.type(passwordInput, 'Password123');

    const confirmPasswordInput = screen.getByPlaceholderText('Repeat password');
    await user.type(confirmPasswordInput, 'DifferentPassword123');

    const userRadio = screen.getAllByLabelText('User — buying & bidding access')[0];
    await user.click(userRadio);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('calls onLogin with correct data when login form is submitted', async () => {
    const user = userEvent.setup();
    render(<ModalAuth {...mockProps} />);

    const emailInput = screen.getByPlaceholderText('you@example.com');
    await user.type(emailInput, 'john@example.com');

    const passwordInput = screen.getByPlaceholderText('••••••••');
    await user.type(passwordInput, 'Password123');

    const userRadio = screen.getByLabelText('User');
    await user.click(userRadio);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProps.onLogin).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'Password123',
        role: 'user'
      });
    });
  });

  it('calls onRegister with correct data when register form is submitted', async () => {
    const user = userEvent.setup();
    render(<ModalAuth {...mockProps} />);

    // Switch to register tab
    const registerTab = screen.getByText('Create Account');
    fireEvent.click(registerTab);

    const fullNameInput = screen.getByPlaceholderText('John Doe');
    await user.type(fullNameInput, 'Jane Smith');

    const emailInput = screen.getByPlaceholderText('you@example.com');
    await user.type(emailInput, 'jane@example.com');

    const passwordInput = screen.getByPlaceholderText('Create password');
    await user.type(passwordInput, 'Password123');

    const confirmPasswordInput = screen.getByPlaceholderText('Repeat password');
    await user.type(confirmPasswordInput, 'Password123');

    const dealerRadio = screen.getAllByLabelText('Dealer — can list and sell vehicles')[0];
    await user.click(dealerRadio);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProps.onRegister).toHaveBeenCalledWith({
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'Password123',
        confirm_password: 'Password123',
        role: 'dealer'
      });
    });
  });

  it('calls onSocialAuth when social buttons are clicked', () => {
    render(<ModalAuth {...mockProps} />);

    const googleButton = screen.getByRole('button', { name: /google/i });
    fireEvent.click(googleButton);

    expect(mockProps.onSocialAuth).toHaveBeenCalledWith('google');

    const facebookButton = screen.getByRole('button', { name: /facebook/i });
    fireEvent.click(facebookButton);

    expect(mockProps.onSocialAuth).toHaveBeenCalledWith('facebook');
  });

  it('displays loading state when loading prop is true', () => {
    render(<ModalAuth {...mockProps} loading={true} />);

    expect(screen.getByText('Authenticating...')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Invalid credentials';
    render(<ModalAuth {...mockProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders with responsive width for different screen sizes', () => {
    render(<ModalAuth {...mockProps} />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveStyle({
      width: expect.any(String) // Responsive width is set via width prop
    });
  });
});
