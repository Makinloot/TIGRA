import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollProgressIndicator.css';

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // TODO-FX: Replace with real API call if needed.
    // This component uses browser scroll events for progress calculation.

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Initial calculation
    updateScrollProgress();

    // Cleanup
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

ScrollProgressIndicator.propTypes = {
  // No props needed for this component
};

export default ScrollProgressIndicator;
