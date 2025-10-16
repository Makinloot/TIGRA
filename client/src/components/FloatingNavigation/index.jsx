import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, FloatButton } from 'antd';
import {
  PlayCircleOutlined,
  SearchOutlined,
  BulbOutlined,
  BarChartOutlined,
  CarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  ReadOutlined,
  GlobalOutlined,
  TeamOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import './index.css';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const FloatingNavigation = ({ contentCounts = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuHidden, setIsMenuHidden] = useState(() => {
    // Load saved state from localStorage
    try {
      const saved = localStorage.getItem('floatingNavMenuHidden');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Define navigation items with their corresponding section IDs, icons, and content counts
  const navigationItems = useMemo(() => [
    {
      id: 'hero',
      icon: <PlayCircleOutlined />,
      label: t('hero_slider'),
      targetId: 'hero-slider-container',
      count: null // Hero doesn't show count
    },
    {
      id: 'search',
      icon: <SearchOutlined />,
      label: t('search_filters'),
      targetId: 'search-filters-section',
      count: null // Search filters don't show count
    },
    {
      id: 'how-it-works',
      icon: <BulbOutlined />,
      label: t('how_it_works'),
      targetId: 'how-it-works-section',
      count: null // How it works doesn't show count
    },
    {
      id: 'key-metrics',
      icon: <BarChartOutlined />,
      label: t('key_metrics'),
      targetId: 'key-metrics-section',
      count: contentCounts.keyMetrics || 0
    },
    {
      id: 'auctions',
      icon: <CarOutlined />,
      label: t('live_auctions'),
      targetId: 'auction-card-list-section',
      count: contentCounts.auctions || 0
    },
    {
      id: 'featured',
      icon: <FireOutlined />,
      label: t('featured_auctions'),
      targetId: 'featured-auctions',
      count: contentCounts.featuredAuctions || 0
    },
    {
      id: 'news',
      icon: <ReadOutlined />,
      label: t('latest_news'),
      targetId: 'news-section',
      count: contentCounts.newsArticles || 0
    },
    {
      id: 'map',
      icon: <GlobalOutlined />,
      label: t('shipment_map'),
      targetId: 'active-logistics-routes',
      count: contentCounts.shipmentRoutes || 0
    },
    {
      id: 'partners',
      icon: <TeamOutlined />,
      label: t('our_partners'),
      targetId: 'logistics-partners-slider',
      count: contentCounts.partners || 0
    },
    {
      id: 'back-to-top',
      icon: '⬆️', // Using emoji instead of UpOutlined icon
      label: t('back_to_top'),
      targetId: 'back-to-top', // Special identifier for back to top action
      count: null // No count for back to top
    }
  ], [contentCounts]);

  // Handle scroll to section or back to top
  const handleNavigationClick = (targetId) => {
    if (targetId === 'back-to-top') {
      // Scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Scroll to top of specific section
      const element = document.getElementById(targetId);
      if (element) {
        // Smaller offset to position section at top of viewport (just account for header)
        const offset = 20; // Reduced from 80 to position at top
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Show/hide floating menu based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeVisible = scrollY > 200;

      if (shouldBeVisible !== shouldRender) {
        if (shouldBeVisible) {
          // Fade in
          setShouldRender(true);
          setTimeout(() => setIsVisible(true), 50);
        } else {
          // Fade out
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 300); // Match animation duration
        }
      }

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.targetId);
      let currentSection = '';

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]); // eslint-disable-line react-hooks/exhaustive-deps -- shouldRender intentionally omitted to prevent infinite loop

  // Save menu state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('floatingNavMenuHidden', JSON.stringify(isMenuHidden));
    } catch (error) {
      // Silently fail if localStorage is not available
      console.warn('Unable to save floating navigation state:', error);
    }
  }, [isMenuHidden]);

  // Toggle menu visibility with animation
  const toggleMenuVisibility = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMenuHidden(!isMenuHidden);
      setIsVisible(true);
    }, 150); // Match animation duration
  };

  if (!shouldRender) return null;

  return (
    <div className={`floating-navigation ${isVisible ? 'visible' : ''} ${isMenuHidden ? 'compact' : ''}`}>
      {isMenuHidden ? (
        // Compact view: only show menu and scroll to top
        <>
          {/* Show menu button */}
          <Tooltip title={t('show_menu')} placement="left">
            <Button
              type="default"
              shape="circle"
              size="small"
              icon={<EyeOutlined />}
              onClick={toggleMenuVisibility}
              className="floating-nav-button floating-nav-show-menu"
              style={{
                width: '32px',
                height: '32px',
                fontSize: '14px'
              }}
            />
          </Tooltip>
        </>
      ) : (
        // Full view: show all navigation buttons + hide menu button + scroll to top
        <>
          {/* Navigation buttons */}
          {navigationItems.map((item) => (
            <Tooltip
              key={item.id}
              title={item.count !== null ? `${item.label} (${item.count})` : item.label}
              placement="left"
            >
              <Button
                type={activeSection === item.targetId ? 'primary' : 'default'}
                shape="circle"
                size="large"
                icon={item.icon === '⬆️' ? null : item.icon}
                onClick={() => handleNavigationClick(item.targetId)}
                className={`floating-nav-button ${activeSection === item.targetId ? 'active' : ''}`}
              >
                {item.icon === '⬆️' && '⬆️'}
                {item.count !== null && item.count > 0 && (
                  <span className="floating-nav-count">{item.count}</span>
                )}
              </Button>
            </Tooltip>
          ))}

          {/* Hide menu button */}
          <Tooltip title={t('hide_menu')} placement="left">
            <Button
              type="default"
              shape="circle"
              size="large"
              icon={<EyeInvisibleOutlined />}
              onClick={toggleMenuVisibility}
              className="floating-nav-button"
            />
          </Tooltip>
        </>
      )}
    </div>
  );
};

FloatingNavigation.propTypes = {
  contentCounts: PropTypes.shape({
    keyMetrics: PropTypes.number,
    auctions: PropTypes.number,
    featuredAuctions: PropTypes.number,
    newsArticles: PropTypes.number,
    shipmentRoutes: PropTypes.number,
    partners: PropTypes.number
  })
};

export default FloatingNavigation;
