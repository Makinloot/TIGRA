import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceTemplate from './index';

// Mock forwardRef for testing
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  forwardRef: (component) => component
}));

const mockDispatch = {
  id: 'DISP001',
  vin: '1HGCM82633A123456',
  price: 2500,
  vehicleInfo: {
    make: 'Honda',
    model: 'Accord',
    year: 2020
  },
  pickupDate: '2025-01-15',
  warehouse: 'Miami, FL',
  deliveryDate: '2025-01-20'
};

describe('InvoiceTemplate', () => {
  it('renders invoice with company information', () => {
    render(<InvoiceTemplate dispatch={mockDispatch} />);

    expect(screen.getByText('Tigra Logistics')).toBeInTheDocument();
    expect(screen.getByText('Professional Vehicle Transport Services')).toBeInTheDocument();
    expect(screen.getByText('TIGRA Logistics Inc.')).toBeInTheDocument();
    expect(screen.getByText('123 Transport Avenue')).toBeInTheDocument();
    expect(screen.getByText('Miami, FL 33101')).toBeInTheDocument();
  });

  it('renders invoice details correctly', () => {
    render(<InvoiceTemplate dispatch={mockDispatch} />);

    expect(screen.getByText('Invoice')).toBeInTheDocument();
    expect(screen.getByText('Invoice Number')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('displays vehicle information', () => {
    render(<InvoiceTemplate dispatch={mockDispatch} />);

    expect(screen.getByText('Honda Accord 2020')).toBeInTheDocument();
    expect(screen.getByText('VIN: 1HGCM82633A123456')).toBeInTheDocument();
    expect(screen.getByText('Pickup: Miami, FL')).toBeInTheDocument();
    expect(screen.getByText('Dispatch Id: DISP001')).toBeInTheDocument();
  });

  it('displays service description and pricing', () => {
    render(<InvoiceTemplate dispatch={mockDispatch} />);

    expect(screen.getByText('Vehicle Transport Service')).toBeInTheDocument();
    expect(screen.getByText('$2,500')).toBeInTheDocument();
  });

  it('renders payment information section', () => {
    render(<InvoiceTemplate dispatch={mockDispatch} />);

    expect(screen.getByText('Payment Information')).toBeInTheDocument();
    expect(screen.getByText('Payment Method: Echeck')).toBeInTheDocument();
    expect(screen.getByText('Payment Status: Processing')).toBeInTheDocument();
  });

  it('displays footer with contact information', () => {
    render(<InvoiceTemplate dispatch={mockDispatch} />);

    expect(screen.getByText('Thank You For Choosing Tigra Logistics')).toBeInTheDocument();
    expect(screen.getByText('For Questions Contact Us At (305) 555-0123 | info@tigralogistics.com')).toBeInTheDocument();
  });

  it('handles missing dispatch gracefully', () => {
    const { container } = render(<InvoiceTemplate dispatch={null} />);

    expect(container.firstChild).toBeNull();
  });

  it('handles incomplete vehicle info', () => {
    const incompleteDispatch = {
      ...mockDispatch,
      vehicleInfo: {}
    };

    render(<InvoiceTemplate dispatch={incompleteDispatch} />);

    expect(screen.getByText('VIN: 1HGCM82633A123456')).toBeInTheDocument();
    expect(screen.getByText('$2,500')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    const highPriceDispatch = {
      ...mockDispatch,
      price: 100000
    };

    render(<InvoiceTemplate dispatch={highPriceDispatch} />);

    expect(screen.getByText('$100,000')).toBeInTheDocument();
  });

  it('accepts ref forwarding', () => {
    const ref = React.createRef();
    render(<InvoiceTemplate ref={ref} dispatch={mockDispatch} />);

    expect(ref.current).toBeTruthy();
  });
});
