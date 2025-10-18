import React from 'react';
import { render, screen } from '@testing-library/react';
import DispatchVolumeChart from './DispatchVolumeChart';

/* global jest, describe, test, expect, beforeEach */

describe('DispatchVolumeChart', () => {
  // TODO-FX: Connect to i18n library.
  const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const mockChartData = [
    { month: 'Jan', dispatches: 1245, revenue: 589000 },
    { month: 'Feb', dispatches: 1189, revenue: 562000 },
    { month: 'Mar', dispatches: 1356, revenue: 641000 }
  ];

  beforeEach(() => {
    // Mock for Ant Design components
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('should render chart with data', () => {
    render(<DispatchVolumeChart data={mockChartData} />);

    // Chart should render without crashing
    // Since Recharts renders as SVG, we check for the presence of the chart container
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  test('should render with empty data gracefully', () => {
    render(<DispatchVolumeChart data={[]} />);

    // Chart should render without crashing even with empty data
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  test('should render month labels on x-axis', () => {
    render(<DispatchVolumeChart data={mockChartData} />);

    // Check for month labels (these are rendered as text elements in the SVG)
    // The text elements should contain the month names
    const svgTextElements = document.querySelectorAll('text');
    const monthTexts = Array.from(svgTextElements).filter(el =>
      ['Jan', 'Feb', 'Mar'].includes(el.textContent)
    );
    expect(monthTexts.length).toBeGreaterThan(0);
  });

  test('should have proper responsive container', () => {
    render(<DispatchVolumeChart data={mockChartData} />);

    // Check for responsive container
    const responsiveContainer = document.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });

  test('should render line chart with correct styling', () => {
    render(<DispatchVolumeChart data={mockChartData} />);

    // Check for the line path element (the actual chart line)
    const linePath = document.querySelector('.recharts-line-curve');
    expect(linePath).toBeInTheDocument();

    // Check for dots on the line
    const dots = document.querySelectorAll('.recharts-line-dot');
    expect(dots.length).toBe(mockChartData.length);
  });
});
