import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Badge } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  HeartOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const BottomMenu = ({ isDark, currentPage, onPageChange }) => {
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
        onClick={({ key }) => onPageChange && onPageChange(key)}
        style={{
          flex: 1,
          justifyContent: 'space-around',
          borderBottom: 'none',
          background: 'transparent',
          maxWidth: '600px',
          margin: '0 auto',
        }}
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
