import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatButton, Tooltip, Grid } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import AIAssistantPanel from '../AIAssistantPanel';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { useBreakpoint } = Grid;

const FloatingAIAssistant = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const screens = useBreakpoint();

  // Show button after component mounts with slight delay for smooth appearance
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
  };

  // Responsive button size: 56px on mobile, 64px on desktop
  const buttonSize = screens.xs ? 56 : 64;
  const buttonPosition = screens.xs ? 20 : 28;

  if (!isVisible) return null;

  return (
    <>
      <Tooltip title={t('ask_ai_assistant')} placement="top">
        <FloatButton
          icon={<RobotOutlined />}
          type="primary"
          style={{
            position: 'fixed',
            bottom: `${buttonPosition}px`,
            left: `${buttonPosition}px`,
            zIndex: 1050, // Above sticky bar (z-index: 1000)
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            borderRadius: '50%',
            backgroundColor: '#2563eb',
            border: 'none',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
            transition: 'all 0.3s ease-in-out'
          }}
          onClick={handleButtonClick}
          className="floating-ai-assistant"
        />
      </Tooltip>

      <AIAssistantPanel
        open={isPanelOpen}
        onClose={handlePanelClose}
        isMobile={screens.xs}
      />
    </>
  );
};

export default FloatingAIAssistant;
