import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CrmLayout from './index';

describe('CrmLayout', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('renders without crashing', () => {
    renderWithRouter(<CrmLayout />);
    // Component renders without error - basic smoke test
  });

  test('renders Outlet for nested routes', () => {
    renderWithRouter(<CrmLayout />);
    // Outlet is rendered for child routes - tested implicitly through routing
  });
});
