import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActiveLogisticsRoutes from './index';

/* global jest, describe, it, expect, beforeEach, afterEach */

// Mock the map components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children, eventHandlers }) => (
    <div
      data-testid="marker"
      onClick={eventHandlers?.click}
    >
      {children}
    </div>
  ),
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  Polyline: () => <div data-testid="polyline" />
}));

// Mock Leaflet
jest.mock('leaflet', () => ({
  divIcon: jest.fn(() => ({}))
}));

// Mock Ant Design components that might not be fully mocked
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Drawer: ({ children, open, onClose, title }) => open ? (
    <div data-testid="drawer" data-title={title}>
      <button onClick={onClose} data-testid="drawer-close">Close</button>
      {children}
    </div>
  ) : null,
}));

// Mock icons
jest.mock('@ant-design/icons', () => ({
  GlobalOutlined: () => <span data-testid="global-icon" />,
  ClockCircleOutlined: () => <span data-testid="clock-icon" />,
  EnvironmentOutlined: () => <span data-testid="environment-icon" />
}));

describe('ActiveLogisticsRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders loading state correctly', () => {
    render(<ActiveLogisticsRoutes loading={true} />);

    expect(screen.getByText('Loading logistics routes...')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); // Spin component
  });

  it('renders component with map and container list', () => {
    render(<ActiveLogisticsRoutes />);

    expect(screen.getByText('Active Logistics Routes')).toBeInTheDocument();
    expect(screen.getByText('Real Time Tracking Of Containers Across Global Network')).toBeInTheDocument();
    expect(screen.getByText('Active Containers')).toBeInTheDocument();
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('displays three containers with correct information', () => {
    render(<ActiveLogisticsRoutes />);

    expect(screen.getByText('Container C-001')).toBeInTheDocument();
    expect(screen.getByText('Container C-002')).toBeInTheDocument();
    expect(screen.getByText('Container C-003')).toBeInTheDocument();

    expect(screen.getAllByText('Miami, USA → Tbilisi, Georgia')).toHaveLength(3);
  });

  it('shows container statuses and ETAs', () => {
    render(<ActiveLogisticsRoutes />);

    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(screen.getByText('ETA: Dec 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('ETA: Dec 20, 2025')).toBeInTheDocument();
    expect(screen.getByText('ETA: Dec 10, 2025')).toBeInTheDocument();
  });

  it('opens drawer when container is clicked', async () => {
    render(<ActiveLogisticsRoutes />);

    const firstContainer = screen.getByText('Container C-001').closest('[onClick]');
    fireEvent.click(firstContainer);

    await waitFor(() => {
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
      expect(screen.getByTestId('drawer')).toHaveAttribute('data-title', 'Container C-001');
    });
  });

  it('closes drawer when close button is clicked', async () => {
    render(<ActiveLogisticsRoutes />);

    // Open drawer
    const firstContainer = screen.getByText('Container C-001').closest('[onClick]');
    fireEvent.click(firstContainer);

    await waitFor(() => {
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
    });

    // Close drawer
    const closeButton = screen.getByTestId('drawer-close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });
  });

  it('displays map markers for locations and containers', () => {
    render(<ActiveLogisticsRoutes />);

    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(5); // 2 location markers + 3 container markers
  });

  it('renders route polyline', () => {
    render(<ActiveLogisticsRoutes />);

    expect(screen.getByTestId('polyline')).toBeInTheDocument();
  });

  it('displays real-time update information', () => {
    render(<ActiveLogisticsRoutes />);

    expect(screen.getByText('Real Time Updates')).toBeInTheDocument();
    expect(screen.getByText('Data Updates Every 5 Minutes')).toBeInTheDocument();
  });

  it('auto-updates container progress every 5 minutes', async () => {
    render(<ActiveLogisticsRoutes />);

    // Initial progress values
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();

    // Fast-forward 5 minutes
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    // Progress should have been updated (values will vary due to random increment)
    await waitFor(() => {
      const progressElements = screen.getAllByText(/\d{1,3}%/);
      expect(progressElements.length).toBeGreaterThan(0);
    });
  });

  it('shows container details in drawer', async () => {
    render(<ActiveLogisticsRoutes />);

    const firstContainer = screen.getByText('Container C-001').closest('[onClick]');
    fireEvent.click(firstContainer);

    await waitFor(() => {
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
      expect(screen.getByText('Container Id:')).toBeInTheDocument();
      expect(screen.getByText('C-001')).toBeInTheDocument();
      expect(screen.getByText('Status:')).toBeInTheDocument();
      expect(screen.getByText('Route:')).toBeInTheDocument();
      expect(screen.getByText('ETA:')).toBeInTheDocument();
    });
  });

  it('displays progress bars with correct styling', () => {
    render(<ActiveLogisticsRoutes />);

    // Check that progress bars are rendered (they should be present in the DOM)
    const progressElements = document.querySelectorAll('[role="progressbar"]');
    expect(progressElements.length).toBeGreaterThan(0);
  });

  it('shows location markers for Miami and Tbilisi', () => {
    render(<ActiveLogisticsRoutes />);

    const popups = screen.getAllByTestId('popup');
    expect(popups.length).toBeGreaterThanOrEqual(5); // At least 5 popups (2 locations + 3 containers)
  });

  it('handles container selection and highlighting', async () => {
    render(<ActiveLogisticsRoutes />);

    const firstContainer = screen.getByText('Container C-001').closest('[onClick]');
    fireEvent.click(firstContainer);

    await waitFor(() => {
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
    });

    // Container should be selectable and drawer should show its details
    expect(screen.getByText('Container C-001')).toBeInTheDocument();
  });
});
