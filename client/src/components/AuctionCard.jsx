import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Carousel,
  Button,
  Space,
  Tag,
  Typography,
  Tooltip,
  Row,
  Col,
  Divider,
  Dropdown,
  Popover,
  Modal,
  Checkbox
} from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  EyeOutlined,
  ShareAltOutlined,
  BellOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './AuctionCard.css';
import ShareModal from './ShareModal';
import CompareModal from './CompareModal';
import NotificationModal from './NotificationModal';
import CarNotificationModal from './CarNotificationModal';

const { Title, Text } = Typography;

const AuctionCard = ({ auction, onQuickView, onAddToFavorites, onCompare }) => {
  const { t } = useTranslation();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const [trackPriceModalVisible, setTrackPriceModalVisible] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const carouselRef = useRef(null);

  // TODO-FX: Replace with real API data - condition mapping should come from backend
  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'green';
      case 'very good': return 'blue';
      case 'good': return 'orange';
      default: return 'default';
    }
  };

  const handlePhotoChange = (index) => {
    setCurrentPhotoIndex(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  const handleCarouselChange = (current) => {
    setCurrentPhotoIndex(current);
  };

  return (
    <Card
      className="uniform-card"
      style={{
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : undefined,
        height: '100%'
      }}
      styles={{ body: { padding: 0 } }}
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Section with Fixed Aspect Ratio */}
      <div className="uniform-card-photo auction-card-photo-section">
        <Carousel
          ref={carouselRef}
          dots={false}
          afterChange={handleCarouselChange}
          style={{ height: '100%' }}
          swipeToSlide
          draggable
        >
          {auction.photos.map((photo, index) => (
            <div key={index} style={{ height: '100%', width: '100%' }}>
              <img
                alt={`${auction.title} - ${index + 1}`}
                src={photo}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                loading="lazy"
              />
            </div>
          ))}
        </Carousel>

        {/* Navigation arrows (visible on hover) */}
        {isHovered && auction.photos.length > 1 && (
          <>
            {currentPhotoIndex > 0 && (
              <Button
                type="text"
                icon={<LeftOutlined />}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPhotoIndex(currentPhotoIndex - 1);
                  carouselRef.current?.prev();
                }}
              />
            )}
            {currentPhotoIndex < auction.photos.length - 1 && (
              <Button
                type="text"
                icon={<RightOutlined />}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPhotoIndex(currentPhotoIndex + 1);
                  carouselRef.current?.next();
                }}
              />
            )}
          </>
        )}

        {/* Top Badges */}
        <Row style={{ position: 'absolute', top: '12px', left: '12px', right: '12px' }}>
          <Col span={12}>
            <Tag color="#1890ff" style={{ margin: 0 }}>
              {auction.bids} bids
            </Tag>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Tag color="red" style={{ margin: 0 }}>
              <ClockCircleOutlined /> {auction.timeLeft}
            </Tag>
          </Col>
        </Row>

      </div>

      {/* Thumbnails Section - Below main photo */}
      {auction.photos.length > 1 && (
        <div className="auction-card-thumbnails">
          <Space size={4}>
            {auction.photos.slice(0, 5).map((photo, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePhotoChange(index);
                }}
                className={`auction-card-thumbnail ${currentPhotoIndex === index ? 'active' : ''}`}
                style={{
                  width: '60px',
                  height: '40px',
                  border: currentPhotoIndex === index ? '2px solid #1890ff' : '2px solid #e9ecef',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'none',
                  padding: 0
                }}
              >
                <img
                  src={photo}
                  alt={`thumbnail-${index}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </button>
            ))}
          </Space>
        </div>
      )}

      {/* Info Section */}
      <div className="auction-card-info-section">
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div>
            <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
              {auction.title}
            </Title>
          </div>
          <div>
            <Text style={{ fontSize: '14px', color: '#1890ff', fontWeight: 'bold' }}>
              ${auction.currentBid.toLocaleString()}
            </Text>
          </div>
          <div>
            <Text style={{ fontSize: '12px', color: '#888888' }}>
              <ClockCircleOutlined style={{ marginRight: '4px' }} />
              {auction.timeLeft}
            </Text>
          </div>
        </Space>
      </div>

      {/* Action Buttons Section */}
      <div className="auction-card-actions-section">
        <Space size={8} wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Tooltip title={t('modals.shareDetails')}>
            <Button
              type="text"
              icon={<ShareAltOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShareModalVisible(true);
              }}
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                flex: 1
              }}
            >
              Share
            </Button>
          </Tooltip>

          <Tooltip title={t('modals.addToFavorites')}>
            <Button
              type="text"
              icon={<HeartOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onAddToFavorites(auction.id);
              }}
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                flex: 1
              }}
            >
              Like
            </Button>
          </Tooltip>

          <Tooltip title={t('modals.trackPriceChanges')}>
            <Button
              type="text"
              icon={<BellOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setTrackPriceModalVisible(true);
              }}
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                flex: 1
              }}
            >
              Track Price
            </Button>
          </Tooltip>

          <Tooltip title={t('modals.addToCompare')}>
            <Button
              type="text"
              icon={<PlusOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCompareModalVisible(true);
              }}
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                flex: 1
              }}
            >
              Compare
            </Button>
          </Tooltip>
        </Space>

        {/* Primary Action Button */}
        <div className="auction-card-primary-action">
          <Button
            type="primary"
            block
            size="large"
            style={{
              borderRadius: '4px',
              height: '40px',
              fontWeight: 600
            }}
            onClick={() => console.log('Bid on auction:', auction.id)}
          >
            Bid Now
          </Button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        auction={auction}
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
      />

      {/* Compare Modal */}
      <CompareModal
        auction={auction}
        visible={compareModalVisible}
        onClose={() => setCompareModalVisible(false)}
        onAddToComparison={onCompare}
      />

      {/* Track Price Modal */}
      <Modal
        title={t('modals.trackPrice')}
        open={trackPriceModalVisible}
        onCancel={() => {
          setTrackPriceModalVisible(false);
          setSelectedChannels([]); // Reset selections on cancel
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setTrackPriceModalVisible(false);
              setSelectedChannels([]);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => {
              // TODO-FX: Implement API call to enable notifications for selected channels
              console.log('Enable notifications for channels:', selectedChannels, 'for auction:', auction.id);
              setTrackPriceModalVisible(false);
              setSelectedChannels([]);
            }}
            disabled={selectedChannels.length === 0}
          >
            Confirm
          </Button>
        ]}
        width={{
          xs: '90vw',  // mobile
          sm: 260,     // tablet
          md: 300      // desktop
        }}
        centered
        style={{
          padding: '16px'
        }}
        styles={{
          body: {
            padding: '16px'
          }
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <Text>Select where you want to receive notifications for this car</Text>
        </div>
        <Checkbox.Group
          value={selectedChannels}
          onChange={setSelectedChannels}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Checkbox value="Phone">{t('notifications.phone')}</Checkbox>
            <Checkbox value="Email">{t('notifications.email')}</Checkbox>
            <Checkbox value="Social Media">{t('notifications.socialMedia')}</Checkbox>
            <Checkbox value="Website Only">{t('notifications.websiteOnly')}</Checkbox>
          </Space>
        </Checkbox.Group>
      </Modal>
    </Card>
  );
};

export default AuctionCard;
