import React from 'react';
import { Button, Space } from 'antd';
import { PlayCircleOutlined, AppstoreOutlined, LoginOutlined } from '@ant-design/icons';

const StickyBar = () => {
  const actions = [
    {
      key: 'auction',
      label: 'ცოცხალ აუქციონში გაწევრდეთ',
      icon: <PlayCircleOutlined />,
      type: 'primary',
      action: () => console.log('ცოცხალ აუქციონში გაწევრდეთ clicked')
    },
    {
      key: 'catalog',
      label: 'კატალოგი',
      icon: <AppstoreOutlined />,
      type: 'default',
      action: () => console.log('კატალოგი clicked')
    },
    {
      key: 'login',
      label: 'CRM-ში შესვლა',
      icon: <LoginOutlined />,
      type: 'link',
      action: () => console.log('CRM-ში შესვლა clicked')
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'white',
      borderTop: '1px solid #f0f0f0',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      padding: '8px'
    }}>
      <div className="full-width-section">
        <Space size="small" wrap style={{ width: '100%', justifyContent: 'center' }}>
          {actions.map((action) => (
            <Button
              key={action.key}
              type={action.type}
              icon={action.icon}
              size="default"
              style={{
                minWidth: '120px',
                height: '32px',
                fontWeight: 600,
                borderRadius: '4px',
                paddingLeft: '12px',
                paddingRight: '12px'
              }}
              onClick={action.action}
            >
              {action.label}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default StickyBar;
