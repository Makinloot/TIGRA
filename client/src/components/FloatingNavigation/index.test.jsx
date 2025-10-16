import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingNavigation from './index';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: mockScrollTo,
});

// Set default window.innerWidth for tests
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024,
});

// Mock document.getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: mockGetElementById,
});

// Mock window.addEventListener and removeEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: mockAddEventListener,
});
Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: mockRemoveEventListener,
});

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('FloatingNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 300,
    });
    // Reset localStorage mocks
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render floating navigation menu when scrolled past threshold', () => {
    // Mock element for hero section
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    // Check if navigation buttons are rendered
    expect(screen.getByTitle('Hero Slider')).toBeInTheDocument();
    expect(screen.getByTitle('Search Filters')).toBeInTheDocument();
    expect(screen.getByTitle('How It Works')).toBeInTheDocument();
    expect(screen.getByTitle('Key Metrics')).toBeInTheDocument();
  });

  it('should not render when scroll position is below threshold', () => {
    // Set scroll position below threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    });

    const { container } = render(<FloatingNavigation contentCounts={{}} />);

    // Should return null (not render anything)
    expect(container.firstChild).toBeNull();
  });

  it('should scroll to correct section when button is clicked', () => {
    const mockElement = {
      offsetTop: 500,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    const heroButton = screen.getByTitle('Hero Slider');
    fireEvent.click(heroButton);

    // Should call scrollTo with correct offset (element position - header offset)
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 420, // 500 - 80 (header offset)
      behavior: 'smooth'
    });
  });

  it('should scroll to top when scroll to top button is clicked', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    const scrollTopButton = screen.getByTitle('Scroll To Top');
    fireEvent.click(scrollTopButton);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('should highlight active section based on scroll position', () => {
    const mockHeroElement = {
      offsetTop: 0,
      getBoundingClientRect: () => ({ top: -50, bottom: 150 })
    };

    const mockSearchElement = {
      offsetTop: 400,
      getBoundingClientRect: () => ({ top: 100, bottom: 200 })
    };

    mockGetElementById.mockImplementation((id) => {
      if (id === 'hero-slider-container') return mockHeroElement;
      if (id === 'search-filters-section') return mockSearchElement;
      return null;
    });

    render(<FloatingNavigation contentCounts={{}} />);

    // Hero section should be active (within viewport range)
    const heroButton = screen.getByTitle('Hero Slider');
    expect(heroButton.closest('button')).toHaveClass('active');
  });

  it('should handle section scrolling with proper offset for fixed header', () => {
    const mockElement = {
      offsetTop: 1000,
      getBoundingClientRect: () => ({ top: 200, bottom: 300 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    const metricsButton = screen.getByTitle('Key Metrics');
    fireEvent.click(metricsButton);

    // Should account for header height (64px) + additional padding (16px) = 80px offset
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 920, // 1000 - 80
      behavior: 'smooth'
    });
  });

  it('should add and remove scroll event listeners on mount/unmount', () => {
    const { unmount } = render(<FloatingNavigation />);

    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle missing DOM elements gracefully', () => {
    mockGetElementById.mockReturnValue(null);

    render(<FloatingNavigation contentCounts={{}} />);

    const heroButton = screen.getByTitle('Hero Slider');
    fireEvent.click(heroButton);

    // Should not call scrollTo when element is not found
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should start with menu visible by default', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    // Should show all navigation buttons initially including back to top
    expect(screen.getByTitle('Hero Slider')).toBeInTheDocument();
    expect(screen.getByTitle('Back To Top')).toBeInTheDocument();
    expect(screen.getByTitle('Hide Menu')).toBeInTheDocument();
  });

  it('should toggle menu visibility when hide menu button is clicked', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    // Initially shows full menu
    expect(screen.getByTitle('Hero Slider')).toBeInTheDocument();
    expect(screen.getByTitle('Hide Menu')).toBeInTheDocument();

    // Click hide menu button
    const hideButton = screen.getByTitle('Hide Menu');
    fireEvent.click(hideButton);

    // Should now show compact view
    expect(screen.queryByTitle('Hero Slider')).not.toBeInTheDocument();
    expect(screen.getByTitle('Show Menu')).toBeInTheDocument();
  });

  it('should show full menu when show menu button is clicked in compact view', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    // Hide menu first
    const hideButton = screen.getByTitle('Hide Menu');
    fireEvent.click(hideButton);

    // Should be in compact view
    expect(screen.getByTitle('Show Menu')).toBeInTheDocument();

    // Click show menu button
    const showButton = screen.getByTitle('Show Menu');
    fireEvent.click(showButton);

    // Should show full menu again
    expect(screen.getByTitle('Hero Slider')).toBeInTheDocument();
    expect(screen.getByTitle('Hide Menu')).toBeInTheDocument();
  });

  it('should apply compact class to container when menu is hidden', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    const { container } = render(<FloatingNavigation />);

    // Initially no compact class
    expect(container.firstChild).not.toHaveClass('compact');

    // Hide menu
    const hideButton = screen.getByTitle('Hide Menu');
    fireEvent.click(hideButton);

    // Should have compact class
    expect(container.firstChild).toHaveClass('compact');
  });

  it('should render back to top button as last item in full menu', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    // Get all buttons in the navigation
    const navigationContainer = screen.getByTitle('Hero Slider').closest('.floating-navigation');
    const buttons = navigationContainer.querySelectorAll('button');

    // Back to top button should be the last button in full view
    const lastButton = buttons[buttons.length - 1];
    expect(lastButton).toHaveAttribute('title', 'Back To Top');
  });

  it('should render only show menu button in compact view', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    // Hide menu to enter compact view
    const hideButton = screen.getByTitle('Hide Menu');
    fireEvent.click(hideButton);

    // In compact view, should have only show menu button
    const navigationContainer = screen.getByTitle('Show Menu').closest('.floating-navigation');
    const buttons = navigationContainer.querySelectorAll('button');

    // Should have exactly 1 button: show menu
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAttribute('title', 'Show Menu');
  });

  it('should scroll to top when back to top button is clicked', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={{}} />);

    const backToTopButton = screen.getByTitle('Back To Top');
    fireEvent.click(backToTopButton);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('should display content counts on navigation buttons', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    const contentCounts = {
      auctions: 15,
      newsArticles: 8,
      partners: 12
    };

    render(<FloatingNavigation contentCounts={contentCounts} />);

    // Check that tooltips include count information
    expect(screen.getByTitle('Live Auctions (15)')).toBeInTheDocument();
    expect(screen.getByTitle('Latest News (8)')).toBeInTheDocument();
    expect(screen.getByTitle('Our Partners (12)')).toBeInTheDocument();
    expect(screen.getByTitle('Shipment Map (12)')).toBeInTheDocument();

    // Check that count badges are rendered
    const navigationContainer = screen.getByTitle('Live Auctions (15)').closest('.floating-navigation');
    const countBadges = navigationContainer.querySelectorAll('.floating-nav-count');
    expect(countBadges.length).toBeGreaterThan(0);
  });

  it('should not display count badges for zero or null counts', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    const contentCounts = {
      auctions: 0,
      newsArticles: null,
      partners: 5
    };

    render(<FloatingNavigation contentCounts={contentCounts} />);

    // Check tooltips
    expect(screen.getByTitle('Live Auctions')).toBeInTheDocument(); // No count shown
    expect(screen.getByTitle('Latest News')).toBeInTheDocument(); // No count shown
    expect(screen.getByTitle('Our Partners (5)')).toBeInTheDocument(); // Count shown
    expect(screen.getByTitle('Shipment Map')).toBeInTheDocument(); // No count shown
  });

  it('should handle empty contentCounts prop gracefully', () => {
    const mockElement = {
      offsetTop: 200,
      getBoundingClientRect: () => ({ top: -100, bottom: 100 })
    };
    mockGetElementById.mockReturnValue(mockElement);

    render(<FloatingNavigation contentCounts={undefined} />);

    // Should render without counts
    expect(screen.getByTitle('Live Auctions')).toBeInTheDocument();
    expect(screen.getByTitle('Latest News')).toBeInTheDocument();
    expect(screen.getByTitle('Shipment Map')).toBeInTheDocument();
    expect(screen.getByTitle('Our Partners')).toBeInTheDocument();
  });

  it('should load menu hidden state from localStorage on initialization', () => {
    mockLocalStorage.getItem.mockReturnValue('true'); // Menu was hidden

    render(<FloatingNavigation contentCounts={{}} />);

    // Should show compact view with show menu button
    expect(screen.getByTitle('Show Menu')).toBeInTheDocument();
    expect(screen.queryByTitle('Hero Slider')).not.toBeInTheDocument();
  });

  it('should save menu state to localStorage when toggled', () => {
    mockLocalStorage.getItem.mockReturnValue('false'); // Menu starts visible

    render(<FloatingNavigation contentCounts={{}} />);

    // Initially should not be hidden
    expect(mockLocalStorage.setItem).not.toHaveBeenCalledWith('floatingNavMenuHidden', 'true');

    // Hide the menu
    const hideButton = screen.getByTitle('Hide Menu');
    fireEvent.click(hideButton);

    // Should save hidden state
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('floatingNavMenuHidden', 'true');
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage not available');
    });

    // Should not crash, should use default state (false)
    expect(() => {
      render(<FloatingNavigation contentCounts={{}} />);
    }).not.toThrow();

    // Should still render normally
    expect(screen.getByTitle('Hero Slider')).toBeInTheDocument();
  });

  it('should persist menu state across component re-mounts', () => {
    mockLocalStorage.getItem.mockReturnValue('true'); // Menu was hidden

    const { unmount } = render(<FloatingNavigation contentCounts={{}} />);

    // Should be compact initially
    expect(screen.getByTitle('Show Menu')).toBeInTheDocument();

    unmount();

    // Re-render with same localStorage state
    render(<FloatingNavigation contentCounts={{}} />);

    // Should still be compact
    expect(screen.getByTitle('Show Menu')).toBeInTheDocument();
    expect(screen.queryByTitle('Hero Slider')).not.toBeInTheDocument();
  });

  // TODO-FX: Add tests for responsive behavior when testing framework supports CSS media queries
  // - Test hiding on mobile screens (< 768px)
  // - Test adjusted positioning on tablets (768px - 1023px)
  // - Test button size adjustments

  // TODO-FX: Add accessibility tests
  // - Test ARIA labels and roles
  // - Test keyboard navigation
  // - Test screen reader compatibility

  // TODO-FX: Add animation and interaction tests
  // - Test hover effects
  // - Test active state transitions
  // - Test smooth scrolling animations
});
