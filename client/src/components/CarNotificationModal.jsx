import React from 'react';
import {
  Button,
  Typography,
  Space,
  Avatar,
  Divider,
  Empty,
  Row,
  Col,
  Tag,
  message
} from 'antd';
import {
  BellOutlined,
  DollarOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CarOutlined as CarIcon
} from '@ant-design/icons';

const { Title, Text } = Typography;

// TODO-FX: Replace with real API endpoint when backend ready
// This component shows car-specific notifications

const CarNotificationModal = ({ car, onClose }) => {

  if (!car) return null;

  // Mock car notifications - in real app, this would be fetched from API
  const mockCarNotifications = [
    {
      id: 'car-notif-1',
      type: 'bid_update',
      title: 'New Bid Placed',
      message: `A new bid of $${(car.currentBid + 100).toLocaleString()} was placed on this vehicle`,
      bidder: 'bidder_456',
      newBid: car.currentBid + 100,
      timestamp: '2024-10-15T12:30:00Z',
      read: false
    },
    {
      id: 'car-notif-2',
      type: 'price_alert',
      title: 'Price Alert',
      message: `This ${car.year} ${car.title.split(' ')[1]} is ${Math.round(((car.startingBid - car.currentBid) / car.startingBid) * 100)}% below starting price`,
      discount: Math.round(((car.startingBid - car.currentBid) / car.startingBid) * 100),
      timestamp: '2024-10-15T10:15:00Z',
      read: false
    },
    {
      id: 'car-notif-3',
      type: 'auction_update',
      title: 'Auction Status',
      message: `Auction ending in ${car.timeLeft}. ${car.bids} total bids placed.`,
      timeLeft: car.timeLeft,
      totalBids: car.bids,
      timestamp: '2024-10-15T08:45:00Z',
      read: true
    },
    {
      id: 'car-notif-4',
      type: 'similar_vehicle',
      title: 'Similar Vehicle Available',
      message: `Similar ${car.title.split(' ')[1]} found in nearby location`,
      similarLocation: 'Nearby Dealership',
      timestamp: '2024-10-14T16:20:00Z',
      read: true
    }
  ];

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
      case 'bid_update':
        return <DollarOutlined style={{ color: '#1890ff' }} />;
      case 'price_alert':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'auction_update':
        return <ClockCircleOutlined style={{ color: '#52c41a' }} />;
      case 'similar_vehicle':
        return <CarIcon style={{ color: '#722ed1' }} />;
      default:
        return <BellOutlined />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'bid_update':
        return '#1890ff';
      case 'price_alert':
        return '#faad14';
      case 'auction_update':
        return '#52c41a';
      case 'similar_vehicle':
        return '#722ed1';
      default:
        return '#d9d9d9';
    }
  };

  const unreadCount = mockCarNotifications.filter(n => !n.read).length;

  const handleMarkAsRead = () => {
    // In real app, this would call an API to mark notification as read
    message.success('Notification marked as read');
  };

  const handleViewAllNotifications = () => {
    // In real app, this would navigate to full notifications page
    message.info('Navigate to full notifications page');
  };

  return (
    <div style={{
      width: 'clamp(320px, 95vw, 400px)',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
      border: '1px solid #f0f0f0'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Title level={4} style={{ margin: 0, fontSize: '16px' }}>
          {car.title} Notifications
          {unreadCount > 0 && (
            <Tag
              color="blue"
              style={{
                marginLeft: '8px',
                fontSize: '10px'
              }}
            >
              {unreadCount} new
            </Tag>
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

      {/* Car Info Summary */}
      <div style={{
        padding: '12px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Row align="middle" gutter={12}>
          <Col flex="none">
            <Avatar
              src={car.photos[0]}
              icon={<CarOutlined />}
              size={32}
              shape="square"
            />
          </Col>
          <Col flex="auto">
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: '14px' }}>
                {car.title}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Lot ID: {car.lotId} • Current: ${car.currentBid.toLocaleString()}
              </Text>
            </Space>
          </Col>
          <Col flex="none">
            <Tag color="orange">
              {car.timeLeft}
            </Tag>
          </Col>
        </Row>
      </div>

      {/* Notification List */}
      <div style={{
        maxHeight: '350px',
        overflowY: 'auto',
        padding: mockCarNotifications.length > 0 ? '8px 0' : '20px'
      }}>
        {mockCarNotifications.length > 0 ? (
          mockCarNotifications.map((notification, index) => (
            <div key={notification.id}>
              <div
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  backgroundColor: notification.read ? 'transparent' : '#f6ffed',
                  borderLeft: notification.read ? 'none' : `3px solid ${getNotificationColor(notification.type)}`,
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => handleMarkAsRead(notification.id)}
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
                          {formatTimestamp(notification.timestamp)}
                        </Text>
                        {!notification.read && (
                          <Button
                            type="link"
                            size="small"
                            style={{ padding: 0, height: 'auto', fontSize: '12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(notification.id);
                            }}
                          >
                            Mark read
                          </Button>
                        )}
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </div>
              {index < mockCarNotifications.length - 1 && (
                <Divider style={{ margin: '0 20px' }} />
              )}
            </div>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications for this vehicle"
            style={{ margin: '20px 0' }}
          />
        )}
      </div>

      {/* Footer */}
      {mockCarNotifications.length > 0 && (
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <Button type="link" size="small" style={{ padding: 0 }} onClick={handleViewAllNotifications}>
            View All Car Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarNotificationModal;
