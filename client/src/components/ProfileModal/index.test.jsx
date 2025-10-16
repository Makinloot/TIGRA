import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfileModal from './index';
import { mockUserProfile } from '../../mocks/_mockData';

// Mock Ant Design Modal
vi.mock('antd', () => ({
  Modal: ({ children, open, onCancel, ...props }) => open ? (
    <div data-testid="profile-modal" className="profile-modal" {...props}>
      <button onClick={onCancel} data-testid="modal-close">Close</button>
      {children}
    </div>
  ) : null,
  Avatar: ({ children, ...props }) => <div data-testid="avatar" {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props} data-testid={`button-${children || 'default'}`}>
      {children}
    </button>
  ),
  Menu: ({ children, ...props }) => <div data-testid="menu" {...props}>{children}</div>,
  Segmented: ({ children, ...props }) => <div data-testid="segmented" {...props}>{children}</div>,
  Space: ({ children, ...props }) => <div data-testid="space" {...props}>{children}</div>,
  Divider: ({ ...props }) => <div data-testid="divider" {...props} />
}));

// Mock @ant-design/icons
vi.mock('@ant-design/icons', () => ({
  GavelOutlined: () => <span data-testid="gavel-icon">GavelOutlined</span>,
  EyeOutlined: () => <span data-testid="eye-icon">EyeOutlined</span>,
  TrophyOutlined: () => <span data-testid="trophy-icon">TrophyOutlined</span>,
  ToolOutlined: () => <span data-testid="tool-icon">ToolOutlined</span>,
  CalculatorOutlined: () => <span data-testid="calculator-icon">CalculatorOutlined</span>,
  SettingOutlined: () => <span data-testid="setting-icon">SettingOutlined</span>,
  CreditCardOutlined: () => <span data-testid="credit-card-icon">CreditCardOutlined</span>,
  BellOutlined: () => <span data-testid="bell-icon">BellOutlined</span>,
  LogoutOutlined: () => <span data-testid="logout-icon">LogoutOutlined</span>,
  UserOutlined: () => <span data-testid="user-icon">UserOutlined</span>,
  ShopOutlined: () => <span data-testid="shop-icon">ShopOutlined</span>
}));

// Mock i18n
vi.mock('../../i18n', () => ({
  t: (key) => key
}));

describe('ProfileModal', () => {
  const mockProps = {
    visible: true,
    onClose: vi.fn(),
    onMenuItemClick: vi.fn(),
    onRoleSwitch: vi.fn(),
    onLogout: vi.fn(),
    loading: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when visible is true', () => {
    render(<ProfileModal {...mockProps} />);
    expect(screen.getByTestId('profile-modal')).toBeInTheDocument();
  });

  it('does not render when visible is false', () => {
    render(<ProfileModal {...mockProps} visible={false} />);
    expect(screen.queryByTestId('profile-modal')).not.toBeInTheDocument();
  });

  it('displays user avatar and name from mock data', () => {
    render(<ProfileModal {...mockProps} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByText(mockUserProfile.name)).toBeInTheDocument();
  });

  it('displays welcome message', () => {
    render(<ProfileModal {...mockProps} />);
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('displays segmented control for role switching', () => {
    render(<ProfileModal {...mockProps} />);
    expect(screen.getByTestId('segmented')).toBeInTheDocument();
  });

  it('displays menu component', () => {
    render(<ProfileModal {...mockProps} />);
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('calls onClose when modal close button is clicked', () => {
    render(<ProfileModal {...mockProps} />);
    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders Close button in footer', () => {
    render(<ProfileModal {...mockProps} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('handles missing optional props gracefully', () => {
    const minimalProps = {
      visible: true,
      onClose: vi.fn()
    };
    expect(() => render(<ProfileModal {...minimalProps} />)).not.toThrow();
  });

  it('applies correct CSS classes for modal', () => {
    render(<ProfileModal {...mockProps} />);
    const modal = screen.getByTestId('profile-modal');
    expect(modal).toHaveClass('profile-modal');
  });
});
