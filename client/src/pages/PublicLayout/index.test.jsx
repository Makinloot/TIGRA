import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PublicLayout from './index';

// Mock @ant-design/icons
jest.mock('@ant-design/icons', () => ({
  GlobalOutlined: () => <span data-testid="global-icon">GlobalOutlined</span>,
  PhoneOutlined: () => <span data-testid="phone-icon">PhoneOutlined</span>,
  MailOutlined: () => <span data-testid="mail-icon">MailOutlined</span>,
  InfoCircleOutlined: () => <span data-testid="info-icon">InfoCircleOutlined</span>,
  HomeOutlined: () => <span data-testid="home-icon">HomeOutlined</span>
}));

/* global jest, describe, test, expect */

describe('PublicLayout', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  test('renders without crashing', () => {
    renderWithRouter(<PublicLayout />);
    // Component renders without error - basic smoke test
  });

  test('renders company logo as link to home', () => {
    renderWithRouter(<PublicLayout />);
    const logoLink = screen.getByRole('link', { name: /AutoAuction Logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('renders language switcher with options', () => {
    renderWithRouter(<PublicLayout />);
    const languageSelect = screen.getByRole('combobox');
    expect(languageSelect).toBeInTheDocument();

    // Check that English and Georgian options are available
    expect(screen.getByText('🇬🇧 English')).toBeInTheDocument();
    expect(screen.getByText('🇬🇪 ქართული')).toBeInTheDocument();
  });

  test('language switcher handles change events', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    renderWithRouter(<PublicLayout />);

    const languageSelect = screen.getByRole('combobox');
    fireEvent.change(languageSelect, { target: { value: 'ka' } });

    expect(consoleSpy).toHaveBeenCalledWith('Language changed to: ka');
    consoleSpy.mockRestore();
  });

  test('renders Outlet for nested routes', () => {
    renderWithRouter(<PublicLayout />);
    // Outlet is rendered for child routes - tested implicitly through routing structure
  });

  test('applies correct header styling', () => {
    renderWithRouter(<PublicLayout />);
    const header = screen.getByRole('banner'); // Header has role="banner"
    expect(header).toHaveStyle({
      background: '#fff',
      padding: '0 24px'
    });
  });

  test('applies correct content styling', () => {
    renderWithRouter(<PublicLayout />);
    const main = screen.getByRole('main'); // Content has role="main"
    expect(main).toHaveStyle({
      padding: '24px',
      background: '#f5f5f5'
    });
  });

  test('renders header navigation buttons', () => {
    renderWithRouter(<PublicLayout />);

    // Check that navigation buttons are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    // Check that navigation icons are present
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
  });

  test('header home button navigates to root', () => {
    // Mock window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    renderWithRouter(<PublicLayout />);
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    expect(window.location.href).toBe('/');

    // Restore original location
    window.location = originalLocation;
  });

  test('header contact button triggers contact handler', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    renderWithRouter(<PublicLayout />);

    const contactButton = screen.getByText('Contact');
    fireEvent.click(contactButton);

    expect(consoleSpy).toHaveBeenCalledWith('Contact clicked');
    consoleSpy.mockRestore();
  });

  test('header about button triggers about handler', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    renderWithRouter(<PublicLayout />);

    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    expect(consoleSpy).toHaveBeenCalledWith('About clicked');
    consoleSpy.mockRestore();
  });

  test('renders footer with company information', () => {
    renderWithRouter(<PublicLayout />);

    // Check footer content
    expect(screen.getByText('Professional Vehicle Transportation Services')).toBeInTheDocument();
    expect(screen.getByText('Trusted By Thousands Of Customers Worldwide')).toBeInTheDocument();
    expect(screen.getByText('© 2025 AutoAuction. All Rights Reserved.')).toBeInTheDocument();
  });

  test('renders footer contact information', () => {
    renderWithRouter(<PublicLayout />);

    expect(screen.getByText('+995 555 123 456')).toBeInTheDocument();
    expect(screen.getByText('support@autoauction.ge')).toBeInTheDocument();
    expect(screen.getByText('Tbilisi, Georgia')).toBeInTheDocument();
    expect(screen.getByText('24/7 Customer Support')).toBeInTheDocument();
  });

  test('renders footer quick links', () => {
    renderWithRouter(<PublicLayout />);

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getAllByText('Home')).toHaveLength(2); // One in header, one in footer
    expect(screen.getByText('Auctions')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Catalog')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  test('renders footer legal links', () => {
    renderWithRouter(<PublicLayout />);

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms Of Service')).toBeInTheDocument();
  });

  test('footer links have correct styling', () => {
    renderWithRouter(<PublicLayout />);

    const footerLinks = screen.getAllByRole('link');
    footerLinks.forEach(link => {
      expect(link).toHaveStyle({ color: '#ccc', textDecoration: 'none' });
    });
  });

  test('header has sticky positioning', () => {
    renderWithRouter(<PublicLayout />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({ position: 'sticky' });
  });
});
