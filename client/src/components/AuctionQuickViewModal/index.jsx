import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Row,
  Col,
  Image,
  Typography,
  Statistic,
  Descriptions,
  Tag,
  Spin,
  Alert,
  Progress,
  Space
} from 'antd';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  CarOutlined
} from '@ant-design/icons';
import { getMockVehicleById } from '../../mocks/_mockData';

const AuctionQuickViewModal = ({ open, onClose, vehicleId }) => {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    price: 0,
    bidders: 0
  });
  const abortControllerRef = useRef(null);


  const fetchVehicle = useCallback(async () => {
    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setAnimatedValues({ price: 0, bidders: 0 });

    try {
      // Check if request was aborted
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      // Check if request was aborted before API call
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      // Simulate minimal API delay (much faster)
      await new Promise(resolve => setTimeout(resolve, 200));

      const data = getMockVehicleById(vehicleId);
      if (!data) {
        throw new Error(t('modal.vehicle_not_found'));
      }

      setVehicle(data);
      setAnimatedValues({ price: data.price, bidders: data.activeBidders });

      setLoading(false);

    } catch (err) {
      if (!abortControllerRef.current.signal.aborted) {
        setError(err.message);
        setLoading(false);
      }
    }
  }, [vehicleId, t]);

  useEffect(() => {
    let isMounted = true;

    if (open && vehicleId) {
      fetchVehicle();
    } else if (!open && isMounted) {
      // Reset all states when modal closes
      setVehicle(null);
      setError(null);
      setLoading(false);
      setAnimatedValues({ price: 0, bidders: 0 });
    }

    return () => {
      isMounted = false;
      // Abort any ongoing request when effect cleans up
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [open, vehicleId, fetchVehicle]);

  const handleClose = () => {
    // Immediately abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Reset all states immediately
    setVehicle(null);
    setError(null);
    setLoading(false);
    setAnimatedValues({ price: 0, bidders: 0 });

    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      maskClosable={true}
      keyboard={true}
      width={{
        xs: '95%',
        sm: '90%',
        md: '85%',
        lg: 900,
        xl: 900,
        xxl: 900
      }}
      centered
      destroyOnHidden={false}
      transitionName=""
      styles={{
        body: { padding: '24px' },
        mask: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
      style={{
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Space direction="vertical" size="middle" align="center">
            <Spin size="large" />
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              {t('modal.loading_vehicle')}
            </div>
          </Space>
        </div>
      )}

      {error && (
        <Alert
          message={t('error')}
          description={error}
          type="error"
          showIcon
          style={{
            marginBottom: '24px',
            animation: 'slideDown 0.3s ease-out'
          }}
        />
      )}

      {vehicle && !loading && !error && (
        <div style={{ animation: 'slideUp 0.4s ease-out' }}>
          <Row gutter={24}>
            {/* Left Column - Images */}
            <Col xs={24} md={12}>
              <Image.PreviewGroup
                items={vehicle.images}
              >
                <Image
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease',
                    cursor: 'zoom-in'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </Image.PreviewGroup>

              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {vehicle.images.slice(1, 5).map((image, index) => (
                  <Image.PreviewGroup
                    key={index}
                    items={vehicle.images}
                  >
                    <Image
                      src={image}
                      alt={`${vehicle.title} - ${index + 2}`}
                      style={{
                        width: '80px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#1890ff';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'transparent';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                  </Image.PreviewGroup>
                ))}
              </div>

              <div style={{ marginTop: '16px', animation: 'bounceIn 0.6s ease-out' }}>
                <Tag
                  color="gold"
                  style={{
                    animation: 'pulse 2s infinite',
                    fontWeight: 'bold'
                  }}
                >
                  <ThunderboltOutlined style={{ marginRight: '4px' }} />
                  {t('modal.condition_good')}
                </Tag>
              </div>
            </Col>

            {/* Right Column - Details */}
            <Col xs={24} md={12}>
              {/* Header */}
              <Typography.Title
                level={3}
                style={{
                  marginBottom: '16px',
                  animation: 'slideInLeft 0.5s ease-out'
                }}
              >
                {vehicle.title}
              </Typography.Title>

              <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={24} style={{ animation: 'slideInLeft 0.6s ease-out' }}>
                  <Space>
                    <EnvironmentOutlined style={{ color: '#1890ff' }} />
                    <span>{vehicle.location}</span>
                  </Space>
                </Col>
                <Col span={24} style={{ animation: 'slideInLeft 0.7s ease-out' }}>
                  <Space>
                    <CalendarOutlined style={{ color: '#52c41a' }} />
                    <span>{vehicle.year}</span>
                  </Space>
                </Col>
              </Row>

              {/* Animated Stats */}
              <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={8} style={{ animation: 'slideInUp 0.8s ease-out' }}>
                  <Statistic
                    title={
                      <span style={{ fontSize: '14px', color: '#666' }}>
                        <DollarOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
                        {t('modal.current_bid')}
                      </span>
                    }
                    value={animatedValues.price}
                    prefix="$"
                    valueStyle={{
                      color: '#1890ff',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(24, 144, 255, 0.2)'
                    }}
                  />
                </Col>
                <Col xs={24} sm={8} style={{ animation: 'slideInUp 0.9s ease-out' }}>
                  <Statistic
                    title={
                      <span style={{ fontSize: '14px', color: '#666' }}>
                        <ClockCircleOutlined style={{ marginRight: '4px', color: '#faad14' }} />
                        {t('modal.time_left')}
                      </span>
                    }
                    value={vehicle.timeLeft}
                    valueStyle={{
                      color: '#faad14',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  />
                </Col>
                <Col xs={24} sm={8} style={{ animation: 'slideInUp 1s ease-out' }}>
                  <Statistic
                    title={
                      <span style={{ fontSize: '14px', color: '#666' }}>
                        <UserOutlined style={{ marginRight: '4px', color: '#52c41a' }} />
                        {t('modal.active_bidders')}
                      </span>
                    }
                    value={animatedValues.bidders}
                    valueStyle={{
                      color: '#52c41a',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(82, 196, 26, 0.2)'
                    }}
                  />
                </Col>
              </Row>

              {/* Vehicle Details */}
              <Descriptions
                title={
                  <span style={{ animation: 'slideInUp 1.1s ease-out' }}>
                    <SettingOutlined style={{ marginRight: '8px' }} />
                    {t('modal.vehicle_details')}
                  </span>
                }
                bordered
                column={2}
                size="small"
                style={{
                  animation: 'slideInUp 1.2s ease-out',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <Descriptions.Item
                  label={
                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      <CarOutlined style={{ marginRight: '4px' }} />
                      {t('modal.engine')}
                    </span>
                  }
                  style={{ animation: 'fadeIn 1.3s ease-out' }}
                >
                  {vehicle.details.engine}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      <SettingOutlined style={{ marginRight: '4px' }} />
                      {t('modal.transmission')}
                    </span>
                  }
                  style={{ animation: 'fadeIn 1.4s ease-out' }}
                >
                  {vehicle.details.transmission}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      <ThunderboltOutlined style={{ marginRight: '4px' }} />
                      {t('modal.mileage')}
                    </span>
                  }
                  style={{ animation: 'fadeIn 1.5s ease-out' }}
                >
                  {vehicle.details.mileage}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      <CarOutlined style={{ marginRight: '4px' }} />
                      {t('modal.condition')}
                    </span>
                  }
                  style={{ animation: 'fadeIn 1.6s ease-out' }}
                >
                  {vehicle.details.condition}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </div>
      )}
    </Modal>
  );
};

AuctionQuickViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vehicleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default AuctionQuickViewModal;
