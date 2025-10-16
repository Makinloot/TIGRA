import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatButton } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './index.css';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show button after scrolling past 400px (more generous threshold than navigation menu)
      setIsVisible(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="back-to-top-container">
      <FloatButton
        icon={<UpOutlined />}
        tooltip={t('scroll_to_top')}
        onClick={scrollToTop}
        style={{
          backgroundColor: '#1890ff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
        }}
      />
    </div>
  );
};

BackToTop.propTypes = {
  // No props needed for this component
};

export default BackToTop;
