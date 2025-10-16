import React from 'react';
import {
  Dropdown,
  Button,
  Typography,
  Space,
  Avatar,
  Divider,
  Empty,
  Badge,
  Row,
  Col
} from 'antd';
import {
  BellOutlined,
  DollarOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// TODO-FX: Replace with real API endpoint when backend ready
// Mock notification data - should be fetched from backend API
const mockNotifications = [
  {
    id: 1,
    type: 'price_change',
    title: 'Price Decreased',
    message: '2020 Honda Civic price dropped by $500',
    vehicle: '2020 Honda Civic',
    lotId: 'AA-2024-001',
    oldPrice: 13000,
    newPrice: 12500,
    timestamp: '2024-10-15T10:30:00Z',
    read: false
  },
  {
    id: 2,
    type: 'new_listing',
    title: 'New Similar Vehicle',
    message: 'Similar Honda Civic listed in your area',
    vehicle: '2020 Honda Civic',
    lotId: 'AA-2024-017',
    price: 12800,
    timestamp: '2024-10-15T09:15:00Z',
    read: false
  },
  {
    id: 3,
    type: 'price_change',
    title: 'Price Increased',
    message: '2019 Toyota Camry price increased by $200',
    vehicle: '2019 Toyota Camry',
    lotId: 'AA-2024-002',
    oldPrice: 15600,
    newPrice: 15800,
    timestamp: '2024-10-14T16:45:00Z',
    read: true
  },
  {
    id: 4,
    type: 'auction_ending',
    title: 'Auction Ending Soon',
    message: 'Your tracked 2021 Ford F-150 auction ends in 2 hours',
    vehicle: '2021 Ford F-150',
    lotId: 'AA-2024-003',
    currentBid: 28500,
    timestamp: '2024-10-14T14:20:00Z',
    read: false
  },
  {
    id: 5,
    type: 'new_listing',
    title: 'New Vehicle Match',
    message: 'New BMW X3 matches your search criteria',
    vehicle: '2019 BMW X3',
    lotId: 'AA-2024-018',
    price: 22900,
    timestamp: '2024-10-14T11:30:00Z',
    read: true
  }
];

const NotificationModal = ({ onClose }) => {
  // TODO-FX: Implement backend API integration for fetching user notifications
  // const [notifications, setNotifications] = useState([]);
  // const [loading, setLoading] = useState(false);
  //
  // useEffect(() => {
  //   if (visible) {
  //     fetchNotifications();
  //   }
  // }, [visible]);
  //
  // const fetchNotifications = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await api.get('/notifications');
  //     setNotifications(response.data);
  //   } catch (error) {
  //     console.error('Failed to fetch notifications:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'price_change':
        return <DollarOutlined style={{ color: '#1890ff' }} />;
      case 'new_listing':
        return <CarOutlined style={{ color: '#52c41a' }} />;
      case 'auction_ending':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return <BellOutlined />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'price_change':
        return '#1890ff';
      case 'new_listing':
        return '#52c41a';
      case 'auction_ending':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div style={{
      width: 'clamp(300px, 90vw, 350px)',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
      border: '1px solid #f0f0f0'
    }}>
      {/* TODO-FX: Responsive notification modal uses clamp() for full-width layout.
         Scales from 300px to 350px within 90vw max to prevent horizontal overflow. */}
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Title level={4} style={{ margin: 0, fontSize: '16px' }}>
          Notifications
          {unreadCount > 0 && (
            <Badge
              count={unreadCount}
              style={{
                marginLeft: '8px',
                backgroundColor: '#1890ff',
                fontSize: '10px'
              }}
            />
          )}
        </Title>
        <Button
          type="text"
          icon={<CloseOutlined />}
          size="small"
          onClick={onClose}
          style={{ color: '#666' }}
        />
      </div>

      {/* Notification List */}
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        padding: mockNotifications.length > 0 ? '8px 0' : '20px'
      }}>
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notification, index) => (
            <div key={notification.id}>
              <div
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  backgroundColor: notification.read ? 'transparent' : '#f6ffed',
                  borderLeft: notification.read ? 'none' : `3px solid ${getNotificationColor(notification.type)}`,
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => {
                  // TODO-FX: Implement navigation to vehicle/auction detail page
                  console.log('Navigate to notification:', notification);
                }}
              >
                <Row gutter={12} align="top">
                  <Col flex="none">
                    <Avatar
                      icon={getNotificationIcon(notification.type)}
                      size={32}
                      style={{
                        backgroundColor: notification.read ? '#f5f5f5' : '#fff',
                        border: `1px solid ${getNotificationColor(notification.type)}`
                      }}
                    />
                  </Col>
                  <Col flex="auto">
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <Text strong style={{
                        fontSize: '14px',
                        color: notification.read ? '#666' : '#000'
                      }}>
                        {notification.title}
                      </Text>
                      <Text style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </Text>
                      <Space size={8} style={{ fontSize: '12px', color: '#999' }}>
                        <Text style={{ fontSize: '12px', color: '#999' }}>
                          {notification.vehicle}
                        </Text>
                        <Text style={{ fontSize: '12px', color: '#999' }}>
                          •
                        </Text>
                        <Text style={{ fontSize: '12px', color: '#999' }}>
                          {formatTimestamp(notification.timestamp)}
                        </Text>
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </div>
              {index < mockNotifications.length - 1 && (
                <Divider style={{ margin: '0 20px' }} />
              )}
            </div>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications yet"
            style={{ margin: '20px 0' }}
          />
        )}
      </div>

      {/* Footer */}
      {mockNotifications.length > 0 && (
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <Button type="link" size="small" style={{ padding: 0 }}>
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
