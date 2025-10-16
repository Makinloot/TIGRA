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
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import NotificationModal from './NotificationModal';
import { navigation } from '../mocks/_mockData';

const { Header: AntHeader } = Layout;

const Header = ({ isDark, onThemeToggle }) => {
  const [current, setCurrent] = useState('home');
  const [searchValue, setSearchValue] = useState('');

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const userMenuItems = [
    {
      key: 'login',
      icon: <LoginOutlined />,
      label: 'Login',
    },
    {
      key: 'register',
      icon: <UserAddOutlined />,
      label: 'Register',
    },
  ];

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

        {/* User Menu */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: ({ key }) => {
              console.log('User action:', key);
            },
          }}
          placement="bottomRight"
        >
          <Button
            type="primary"
            icon={<UserOutlined />}
            style={{ borderRadius: '6px' }}
          >
            Login
          </Button>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
