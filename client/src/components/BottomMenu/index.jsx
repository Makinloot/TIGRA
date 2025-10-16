import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Badge } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  HeartOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons';
import ModalAuth from '../ModalAuth';
import { mockAuth } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const BottomMenu = ({ isDark, currentPage, onPageChange }) => {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleAuthModalOpen = () => {
    setAuthModalVisible(true);
    setAuthError(null);
  };

  const handleAuthModalClose = () => {
    setAuthModalVisible(false);
    setAuthError(null);
    setAuthLoading(false);
  };

  const handleLogin = async (credentials) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      // TODO-FX: Replace with real authentication API call
      const result = await mockAuth.login(credentials);
      console.log('Login successful:', result);
      // TODO-FX: Handle successful login (store token, update user state, redirect, etc.)
      handleAuthModalClose();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      // TODO-FX: Replace with real authentication API call
      const result = await mockAuth.register(userData);
      console.log('Registration successful:', result);
      // TODO-FX: Handle successful registration (store token, update user state, redirect, etc.)
      handleAuthModalClose();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      // TODO-FX: Replace with real social authentication API call
      const result = await mockAuth.socialAuth(provider);
      console.log('Social auth successful:', result);
      // TODO-FX: Handle successful social auth (store token, update user state, redirect, etc.)
      handleAuthModalClose();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: t('home'),
    },
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: t('search'),
    },
    {
      key: 'favorites',
      icon: <Badge count={3} size="small"><HeartOutlined /></Badge>,
      label: t('favorites'),
    },
    {
      key: 'notifications',
      icon: <Badge count={5} size="small"><BellOutlined /></Badge>,
      label: t('notifications'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('profile'),
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isDark ? '#1f1f1f' : '#fff',
        borderTop: `1px solid ${isDark ? '#434343' : '#f0f0f0'}`,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        padding: '8px 0',
        height: 'var(--bottom-menu-height, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Menu
        theme={isDark ? 'dark' : 'light'}
        mode="horizontal"
        selectedKeys={[currentPage]}
        items={menuItems}
        onClick={({ key }) => {
          if (key === 'profile') {
            handleAuthModalOpen();
          } else {
            onPageChange && onPageChange(key);
          }
        }}
        style={{
          flex: 1,
          justifyContent: 'space-around',
          borderBottom: 'none',
          background: 'transparent',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      />

      {/* Authentication Modal */}
      <ModalAuth
        visible={authModalVisible}
        onClose={handleAuthModalClose}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSocialAuth={handleSocialAuth}
        loading={authLoading}
        error={authError}
      />
    </div>
  );
};

BottomMenu.propTypes = {
  isDark: PropTypes.bool.isRequired,
  currentPage: PropTypes.string,
  onPageChange: PropTypes.func,
};

export default BottomMenu;
