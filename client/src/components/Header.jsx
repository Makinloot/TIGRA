import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Input,
  Button,
  Space,
  Switch,
  Dropdown,
  Avatar,
  Badge
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
  BellOutlined,
  MenuOutlined
} from '@ant-design/icons';
import NotificationModal from './NotificationModal';
import ModalAuth from './ModalAuth';
import ProfileModal from './ProfileModal';
import { navigation } from '../mocks/_mockData';
import { mockAuth } from '../mocks/_mockData';

const { Header: AntHeader } = Layout;

const Header = ({ isDark, onThemeToggle }) => {
  const [current, setCurrent] = useState('home');
  const [searchValue, setSearchValue] = useState('');
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

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

  const handleProfileModalOpen = () => {
    setProfileModalVisible(true);
  };

  const handleProfileModalClose = () => {
    setProfileModalVisible(false);
  };

  const handleMenuItemClick = (key) => {
    console.log('ProfileModal menu item clicked:', key);
    // TODO-FX: Implement navigation logic based on menu item key
    // - my_bids: Navigate to bids page
    // - watchlist: Navigate to watchlist page
    // - won_vehicles: Navigate to won vehicles page
    // - saved_searches: Navigate to saved searches page
    // - track_shipments: Navigate to shipment tracking page
    // - shipping_calculator: Navigate to calculator page
    // - documents_center: Navigate to documents page
    // - profile_settings: Navigate to profile settings page
    // - payment_methods: Navigate to payment methods page
    // - notifications: Navigate to notifications page
  };

  const handleRoleSwitch = (newRole) => {
    console.log('User role switched to:', newRole);
    // TODO-FX: Update user role in state and API
  };

  const handleLogout = () => {
    console.log('User logged out');
    // TODO-FX: Clear user session, redirect to login page
  };


  return (
    <AntHeader
      style={{
        background: isDark ? '#1f1f1f' : '#fff',
        width: '100%',
        margin: '0',
        padding: '0 16px', /* TODO-FX: Full-width header with responsive horizontal padding - 16px desktop/tablet, 8px mobile */
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo.png"
          alt="AutoAuction Logo"
          className="logo-responsive"
          style={{
            maxHeight: '48px',
            objectFit: 'contain'
          }}
        />
      </a>

      {/* Navigation Menu */}
      <Menu
        theme={isDark ? 'dark' : 'light'}
        mode="horizontal"
        selectedKeys={[current]}
        items={navigation}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          justifyContent: 'center',
          borderBottom: 'none',
          background: 'transparent',
        }}
      />

      {/* Right Side Actions */}
      <Space size="large" align="center">
        {/* Global Search */}
        <Input
          placeholder="Search VIN, Lot ID, Model..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            width: 'clamp(200px, 25vw, 280px)',
            minWidth: '200px',
            maxWidth: '280px'
          }}
          allowClear
        />
        {/* TODO-FX: Responsive search input uses clamp() for full-width layout compatibility.
           Scales from 200px to 280px to prevent horizontal overflow on all screen sizes. */}

        {/* Theme Toggle */}
        <Space>
          <SunOutlined />
          <Switch
            checked={isDark}
            onChange={onThemeToggle}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </Space>

        {/* Profile Notifications */}
        <Dropdown
          popupRender={() => <NotificationModal onClose={() => {}} />}
          trigger={['click']}
          placement="bottomRight"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <Badge count={3} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ border: 'none' }}
              title="Profile Notifications"
            />
          </Badge>
        </Dropdown>

        {/* Profile Modal Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          style={{ border: 'none', color: isDark ? '#fff' : '#000' }}
          title="Open Profile Menu"
          onClick={handleProfileModalOpen}
        />

        {/* User Button */}
        <Button
          type="primary"
          icon={<UserOutlined />}
          style={{ borderRadius: '6px' }}
          onClick={handleAuthModalOpen}
        >
          Login
        </Button>
      </Space>

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

      {/* Profile Modal */}
      <ProfileModal
        visible={profileModalVisible}
        onClose={handleProfileModalClose}
        onMenuItemClick={handleMenuItemClick}
        onRoleSwitch={handleRoleSwitch}
        onLogout={handleLogout}
      />
    </AntHeader>
  );
};

export default Header;
