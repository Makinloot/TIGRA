/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import StatisticsMap from './StatisticsMap';

// Mock the i18n translation function
const mockTranslate = (key) => key;

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockTranslate
  })
}));

describe('StatisticsMap', () => {
  const renderWithI18n = (component) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  test('renders loading state correctly', () => {
    renderWithI18n(<StatisticsMap loading={true} />);

    expect(screen.getByText('Loading map...')).toBeInTheDocument();
  });

  test('renders List component with container data when not loading', () => {
    renderWithI18n(<StatisticsMap loading={false} />);

    // Check that the List header is rendered
    expect(screen.getByText('container_locations')).toBeInTheDocument();

    // Check that container locations are displayed
    expect(screen.getByText('CN-001: Port of Savannah, GA - Loading Complete')).toBeInTheDocument();
    expect(screen.getByText('CN-002: At Sea, Mid-Atlantic Ocean')).toBeInTheDocument();
    expect(screen.getByText('CN-003: Port of Charleston, SC - Awaiting Departure')).toBeInTheDocument();
  });

  test('renders Empty component when mockContainerMapData is empty', () => {
    // Mock empty data by temporarily modifying the mock
    const originalMock = jest.requireActual('../../mocks/_mockData').mockContainerMapData;
    jest.doMock('../../mocks/_mockData', () => ({
      mockContainerMapData: []
    }));

    // Force re-import of the component to use the mocked data
    jest.resetModules();
    const StatisticsMapWithEmpty = require('./StatisticsMap').default;

    renderWithI18n(<StatisticsMapWithEmpty loading={false} />);

    expect(screen.getByText('no_container_locations')).toBeInTheDocument();

    // Restore original mock
    jest.doMock('../../mocks/_mockData', () => ({
      mockContainerMapData: originalMock
    }));
  });
});
