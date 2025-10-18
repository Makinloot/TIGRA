import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons';
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
  const navigate = useNavigate();

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

  const handleTrackVehicle = () => {
    navigate('/track');
    onClose();
  };


  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      destroyOnHidden
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
                კეთილი იყო ბრუნება
              </Typography.Text>
            </div>
          </Space>

          {/* Role Switcher */}
          <Select
            value={userRole}
            onChange={handleRoleSwitch}
            style={{ width: '100%' }}
            options={[
              { value: 'user', label: 'მომხმარებელი' },
              { value: 'dealer', label: 'დილერი' },
            ]}
          />
        </div>

        {/* Space between header and menu sections */}
        <div style={{ height: '20px' }}></div>

        {/* Menu Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Auction & Trading Section */}
          <Card size="small" className="profile-section-card" bordered>
            <div className="font-medium text-gray-900 mb-2 text-sm">აუქციონი და ვაჭრობა</div>
            <Divider style={{ margin: '8px 0' }} />
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="text"
                icon={<DollarOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'my_bids' })}
              >
                ჩემი ბიდი
              </Button>
              <Button
                type="text"
                icon={<EyeOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'watchlist' })}
              >
                დათვალიერების სია
              </Button>
              <Button
                type="text"
                icon={<TrophyOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'won_vehicles' })}
              >
                მოგებული ავტომობილები
              </Button>
            </Space>
          </Card>

          {/* Space between Auction & Logistics sections */}
          <div style={{ height: '16px' }}></div>

          {/* Logistics & Shipping Section */}
          <Card size="small" className="profile-section-card" bordered>
            <div className="font-medium text-gray-900 mb-2 text-sm">ლოგისტიკა და გადაზიდვა</div>
            <Divider style={{ margin: '8px 0' }} />
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="text"
                icon={<GlobalOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={handleTrackVehicle}
              >
                ავტომობილის თვალყური
              </Button>
              <Button
                type="text"
                icon={<ToolOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'track_shipments' })}
              >
                ამტვერეთ გადაზიდვა
              </Button>
              <Button
                type="text"
                icon={<CalculatorOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'shipping_calculator' })}
              >
                გადაზიდვის კალკულატორი
              </Button>
            </Space>
          </Card>

          {/* Space between Logistics & Account sections */}
          <div style={{ height: '16px' }}></div>

          {/* Account & Settings Section */}
          <Card size="small" className="profile-section-card" bordered>
            <div className="font-medium text-gray-900 mb-2 text-sm">ანგარიში და პარამეტრები</div>
            <Divider style={{ margin: '8px 0' }} />
            <Space direction="vertical" size="middle" className="w-full">
              <Button
                type="text"
                icon={<SettingOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'profile_settings' })}
              >
                პროფილის პარამეტრები
              </Button>
              <Button
                type="text"
                icon={<CreditCardOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'payment_methods' })}
              >
                გადახდის მეთოდები
              </Button>
              <Button
                type="text"
                icon={<BellOutlined />}
                className="profile-menu-item w-full justify-start h-auto py-2"
                onClick={() => handleMenuClick({ key: 'notifications' })}
              >
                შეტყობინებები
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
              გამოსვლა
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
