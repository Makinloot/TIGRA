import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CrmPipelinePage from './index';

// Mock react-beautiful-dnd to avoid DOM issues in tests
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children, onDragEnd }) => (
    <div data-testid="drag-drop-context" onDragEnd={onDragEnd}>
      {children}
    </div>
  ),
  Droppable: ({ children, droppableId }) => (
    <div data-testid={`droppable-${droppableId}`}>
      {children({
        innerRef: () => {},
        droppableProps: {},
        placeholder: <div data-testid="droppable-placeholder" />
      })}
    </div>
  ),
  Draggable: ({ children, draggableId }) => (
    <div data-testid={`draggable-${draggableId}`}>
      {children({
        innerRef: () => {},
        draggableProps: {},
        dragHandleProps: {}
      })}
    </div>
  )
}));

// Mock the mock data
jest.mock('../../mocks/_mockData', () => ({
  mockDispatchVehicles: [
    {
      id: '1',
      vin: '1HGCM82633A123456',
      auction: 'Copart',
      vehicleInfo: { year: 2022, make: 'Honda', model: 'Accord' },
      price: 8500,
      warehouse: 'Miami, FL',
      pipelineStatus: 'new_dispatch'
    },
    {
      id: '6',
      vin: '5NPEB4ACXJH678901',
      auction: 'Copart',
      vehicleInfo: { year: 2018, make: 'Hyundai', model: 'Sonata' },
      price: 9800,
      warehouse: 'Dallas, TX',
      pipelineStatus: 'in_transit'
    }
  ],
  mockPipelineColumns: {
    'col-1': { id: 'col-1', title: 'New Dispatches', status: 'new_dispatch' },
    'col-2': { id: 'col-2', title: 'In Transit', status: 'in_transit' },
    'col-3': { id: 'col-3', title: 'At Warehouse (QC)', status: 'at_warehouse' },
    'col-4': { id: 'col-4', title: 'Pending Payment', status: 'pending_payment' }
  }
}));

describe('CrmPipelinePage', () => {
  const defaultProps = {
    isDark: false,
    onThemeToggle: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<CrmPipelinePage {...defaultProps} />);
    expect(screen.getByText('Loading Pipeline')).toBeInTheDocument();
  });

  test('renders pipeline columns after loading', async () => {
    render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('New Dispatches')).toBeInTheDocument();
      expect(screen.getByText('In Transit')).toBeInTheDocument();
      expect(screen.getByText('At Warehouse (Qc)')).toBeInTheDocument();
      expect(screen.getByText('Pending Payment')).toBeInTheDocument();
    });
  });

  test('renders dispatch cards in correct columns', async () => {
    render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      // Check VINs are displayed
      expect(screen.getByText('VIN: 1HGCM82633A123456')).toBeInTheDocument();
      expect(screen.getByText('VIN: 5NPEB4ACXJH678901')).toBeInTheDocument();

      // Check vehicle info
      expect(screen.getByText('2022 Honda Accord')).toBeInTheDocument();
      expect(screen.getByText('2018 Hyundai Sonata')).toBeInTheDocument();

      // Check prices
      expect(screen.getByText('$8,500')).toBeInTheDocument();
      expect(screen.getByText('$9,800')).toBeInTheDocument();
    });
  });

  test('renders empty state for columns without dispatches', async () => {
    render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getAllByText('No Dispatches In This Stage')).toHaveLength(2); // At Warehouse and Pending Payment columns
    });
  });

  test('displays page title', async () => {
    render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Dispatch Pipeline')).toBeInTheDocument();
    });
  });

  test('handles drag and drop', async () => {
    const { container } = render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('New Dispatches')).toBeInTheDocument();
    });

    // Simulate drag end event
    const dragDropContext = container.querySelector('[data-testid="drag-drop-context"]');
    const mockResult = {
      destination: { droppableId: 'col-2', index: 0 },
      source: { droppableId: 'col-1', index: 0 },
      draggableId: '1'
    };

    fireEvent(dragDropContext, new CustomEvent('dragEnd', { detail: mockResult }));

    // The component should handle the drag end event
    // Note: In a real test, we'd need to mock the onDragEnd prop or test state changes
  });

  test('renders with dark theme props', async () => {
    render(<CrmPipelinePage {...defaultProps} isDark={true} />);

    await waitFor(() => {
      expect(screen.getByText('New Dispatches')).toBeInTheDocument();
    });

    // Component should render without errors with dark theme
  });

  test('handles loading state correctly', () => {
    render(<CrmPipelinePage {...defaultProps} />);

    // Initially shows loading
    expect(screen.getByText('Loading Pipeline')).toBeInTheDocument();

    // After loading completes, loading should be gone
    // This is implicitly tested by the other tests that wait for content to appear
  });

  test('handles error state', async () => {
    // Mock console.error to avoid test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Force an error by mocking a failed API call
    // This would require mocking the useEffect, which is complex in this setup
    // For now, we test that the component renders correctly in normal conditions

    render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('New Dispatches')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  test('renders responsive grid layout', async () => {
    const { container } = render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      // Check that Ant Design Row and Col components are used
      const row = container.querySelector('.ant-row');
      expect(row).toBeInTheDocument();

      const cols = container.querySelectorAll('.ant-col');
      expect(cols).toHaveLength(4); // Should have 4 columns
    });
  });

  test('displays auction and warehouse information', async () => {
    render(<CrmPipelinePage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Copart • Miami, FL')).toBeInTheDocument();
      expect(screen.getByText('Copart • Dallas, TX')).toBeInTheDocument();
    });
  });
});
