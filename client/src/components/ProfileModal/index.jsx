import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Avatar, Button, Menu, Card, Space, Divider, Select, Typography } from 'antd';
import './index.css';
import {
  DollarOutlined,
  EyeOutlined,
  TrophyOutlined,
  ToolOutlined,
  CalculatorOutlined,
  SettingOutlined,
  CreditCardOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { t } from '../../i18n';
import { mockUserProfile } from '../../mocks/_mockData';

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/user/profile
// Expected Data: { id: number, name: string, email: string, role: string, avatar: string }

const ProfileModal = ({
  visible,
  onClose,
  onMenuItemClick,
  onRoleSwitch,
  onLogout
}) => {
  const [userRole, setUserRole] = useState(mockUserProfile.role);

  const handleRoleSwitch = (value) => {
    setUserRole(value);
    onRoleSwitch?.(value);
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      onMenuItemClick?.(key);
      onClose();
    }
  };

  const handleLogout = () => {
    onLogout?.();
    onClose();
  };


  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      destroyOnClose
      maskClosable
      centered
      styles={{
        body: {
          padding: 0,
          backgroundColor: '#fff',
          borderRadius: '8px'
        },
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }
      }}
    >
      <div className="flex flex-col max-h-[80vh]">
        {/* Clean Profile Block */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <Space size="middle" align="center" style={{ marginBottom: 20 }}>
            <Avatar
              size={64}
              src={mockUserProfile.avatar}
              icon={<UserOutlined />}
              className="border-2 border-white shadow-sm"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                Demo User
              </Typography.Title>
              <Typography.Text type="secondary">
                Welcome back
              </Typography.Text>
            </div>
          </Space>

          {/* Role Switcher */}
          <Select
            value={userRole}
            onChange={handleRoleSwitch}
            style={{ width: '100%' }}
            options={[
              { value: 'user', label: t('user_role') },
              { value: 'dealer', label: t('dealer_role') },
            ]}
          />
        </div>

        {/* Space between header and menu sections */}
        <div style={{ height: '20px' }}></div>

        {/* Menu Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Auction & Trading Section */}
          <Card size="small" className="profile-section-card" bordered>
            <div className="font-medium text-gray-900 mb-2 text-sm">{t('auction_trading')}</div>
            <Divider style={{ margin: '8px 0' }} />
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="text"
                icon={<DollarOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'my_bids' })}
              >
                {t('my_bids')}
              </Button>
              <Button
                type="text"
                icon={<EyeOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'watchlist' })}
              >
                {t('watchlist')}
              </Button>
              <Button
                type="text"
                icon={<TrophyOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'won_vehicles' })}
              >
                {t('won_vehicles')}
              </Button>
            </Space>
          </Card>

          {/* Space between Auction & Logistics sections */}
          <div style={{ height: '16px' }}></div>

          {/* Logistics & Shipping Section */}
          <Card size="small" className="profile-section-card" bordered>
            <div className="font-medium text-gray-900 mb-2 text-sm">{t('logistics_shipping')}</div>
            <Divider style={{ margin: '8px 0' }} />
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="text"
                icon={<ToolOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'track_shipments' })}
              >
                {t('track_shipments')}
              </Button>
              <Button
                type="text"
                icon={<CalculatorOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'shipping_calculator' })}
              >
                {t('shipping_calculator')}
              </Button>
            </Space>
          </Card>

          {/* Space between Logistics & Account sections */}
          <div style={{ height: '16px' }}></div>

          {/* Account & Settings Section */}
          <Card size="small" className="profile-section-card" bordered>
            <div className="font-medium text-gray-900 mb-2 text-sm">{t('account_settings')}</div>
            <Divider style={{ margin: '8px 0' }} />
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="text"
                icon={<SettingOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'profile_settings' })}
              >
                {t('profile_settings')}
              </Button>
              <Button
                type="text"
                icon={<CreditCardOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'payment_methods' })}
              >
                {t('payment_methods')}
              </Button>
              <Button
                type="text"
                icon={<BellOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'notifications' })}
              >
                {t('notifications')}
              </Button>
            </Space>
          </Card>

          {/* Space before Logout section */}
          <div style={{ height: '16px' }}></div>

          {/* Logout Section */}
          <Card size="small" className="profile-section-card" bordered>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              danger
              className="profile-menu-item w-full justify-start h-auto py-2"
              onClick={() => handleMenuClick({ key: 'logout' })}
            >
              {t('logout')}
            </Button>
          </Card>
        </div>

      </div>
    </Modal>
  );
};

ProfileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMenuItemClick: PropTypes.func,
  onRoleSwitch: PropTypes.func,
  onLogout: PropTypes.func
};

export default ProfileModal;
