import React, { useState } from 'react';
import {
  Modal,
  Carousel,
  Button,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Divider
} from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const QuickViewModal = ({ auction, visible, onClose, onAddToFavorites }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!auction) return null;

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'green';
      case 'very good': return 'blue';
      case 'good': return 'orange';
      default: return 'default';
    }
  };

  const handleCarouselChange = (current) => {
    setCurrentPhotoIndex(current);
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={{
        xs: '95%',    // Mobile: almost full width
        sm: '90%',    // Small tablet: 90% width
        md: '85%',    // Medium: 85% width
        lg: 800,      // Desktop: fixed 800px
        xl: 800,
        xxl: 800
      }}
      centered
      destroyOnHidden
      styles={{ body: { padding: '16px' } }}
    >
      <Row gutter={[24, 24]}>
        {/* Photo Carousel */}
        <Col xs={24} lg={12}>
          <div style={{ position: 'relative' }}>
            <Carousel
              dots={true}
              afterChange={handleCarouselChange}
              style={{ marginBottom: '16px' }}
            >
              {auction.photos.map((photo, index) => (
                <div key={index} style={{ height: '300px' }}>
                  <img
                    alt={`${auction.title} - ${index + 1}`}
                    src={photo}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              ))}
            </Carousel>

            {/* Thumbnail strip */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {auction.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`thumbnail-${index}`}
                  onClick={() => setCurrentPhotoIndex(index)}
                  style={{
                    width: '60px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: currentPhotoIndex === index ? '2px solid #1890ff' : '2px solid transparent',
                    cursor: 'pointer',
                    opacity: currentPhotoIndex === index ? 1 : 0.7
                  }}
                />
              ))}
            </div>
          </div>
        </Col>

        {/* Auction Details */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Title and Lot ID */}
            <div>
              <Title level={3} style={{ margin: '0 0 8px 0' }}>
                {auction.title}
              </Title>
              <Text style={{ color: '#666' }}>
                Lot ID: {auction.lotId}
              </Text>
            </div>

            {/* Price Information */}
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div>
                  <Text style={{ fontSize: '14px', color: '#666' }}>
                    Starting Bid
                  </Text>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    ${auction.startingBid.toLocaleString()}
                  </div>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div>
                  <Text style={{ fontSize: '14px', color: '#666' }}>
                    Current Bid
                  </Text>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                    ${auction.currentBid.toLocaleString()}
                  </div>
                </div>
              </Space>
            </div>

            {/* Auction Info */}
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <ClockCircleOutlined style={{ color: '#faad14' }} />
                  <Text>Time Left: {auction.timeLeft}</Text>
                </Space>
                <Tag color="#1890ff">{auction.bids} bids</Tag>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <EnvironmentOutlined style={{ color: '#666' }} />
                  <Text>{auction.location}</Text>
                </Space>
                <Tag color={getConditionColor(auction.condition)}>
                  {auction.condition}
                </Tag>
              </div>

              <div>
                <Text style={{ color: '#666' }}>
                  {auction.year} • {auction.mileage.toLocaleString()} miles
                </Text>
              </div>
            </Space>

            {/* Action Buttons */}
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="primary"
                size="large"
                block
                style={{ height: '48px', fontWeight: 600 }}
                onClick={() => console.log('Go to Auction:', auction.id)}
              >
                Go to Auction
              </Button>

              <Button
                type="default"
                size="large"
                block
                icon={<HeartOutlined />}
                style={{ height: '48px' }}
                onClick={() => onAddToFavorites(auction.id)}
              >
                Add to Favorites
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default QuickViewModal;
