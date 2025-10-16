import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  Typography,
  Tag,
  Space,
  Badge,
  Tooltip
} from 'antd';
import {
  ClockCircleOutlined,
  EyeOutlined,
  DollarOutlined,
  ThunderboltOutlined,
  InfoOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CarOutlined
} from '@ant-design/icons';

// TODO-FX: Connect to i18n library.
// const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Title, Text } = Typography;

const CardRenderer = ({ card, item }) => {
  const [isHovered, setIsHovered] = useState(false);

  // TODO-FX: Replace with real API call.
  // API Endpoint: POST /api/actions/{actionType}
  // Expected Data: { success: boolean, message: string }

  const handleAction = (actionType, itemId) => {
    console.log(`${actionType} action for item:`, itemId);
    // Simulate loading state for async actions
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const renderImageSection = () => {
    if (!card.image_ratio) return null;

    const aspectRatio = card.image_ratio === '16/9' ? '45%' :
                       card.image_ratio === '16/10' ? '50%' :
                       card.image_ratio === '1/1' ? '75%' : '60%';

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: aspectRatio,
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '12px'
        }}
      >
        <img
          src={item.image || item.photos?.[0] || 'https://via.placeholder.com/400x300'}
          alt={item.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy"
        />

        {/* Overlay Badges */}
        {card.overlay_badge && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px'
          }}>
            <Tag
              color={card.overlay_badge.color || 'red'}
              style={{
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              {card.overlay_badge.icon && <span style={{ marginRight: '4px' }}>🔴</span>}
              {card.overlay_badge.text}
            </Tag>
          </div>
        )}

        {/* Ribbon Badge */}
        {card.ribbon && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: card.ribbon.color || 'orange',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            transform: card.ribbon.style === 'angled' ? 'rotate(-5deg)' : 'none'
          }}>
            {card.ribbon.text}
          </div>
        )}

        {/* AI Tag */}
        {card.ai_tag && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px'
          }}>
            <Tag
              color={card.ai_tag.color || 'indigo'}
              style={{
                fontSize: '11px',
                padding: '2px 6px'
              }}
            >
              {card.ai_tag.icon === 'sparkles' && <span style={{ marginRight: '4px' }}>✨</span>}
              {card.ai_tag.text}
            </Tag>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    const { content } = card;
    if (!content) return null;

    return (
      <div style={{ marginBottom: '8px' }}>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          {content.title && (
            <Title level={5} style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', lineHeight: '1.3' }}>
              {content.title === 'Car Make & Model' ? item.title : content.title}
            </Title>
          )}

          {content.subtitle && (
            <Text style={{ fontSize: '12px', color: '#666', lineHeight: '1.3' }}>
              {content.subtitle === 'Year • Mileage • Location' ?
                `${item.year || '2020'} • ${item.mileage?.toLocaleString() || '45,000'} mi • ${item.location || 'Location'}` :
                content.subtitle}
            </Text>
          )}

          {content.description && (
            <Text style={{ fontSize: '11px', color: '#888', lineHeight: '1.3' }}>
              {content.description}
            </Text>
          )}

          {content.price && (
            <div>
              <Text style={{ fontSize: '11px', color: '#666' }}>
                {content.price.label}:
              </Text>
              <Text style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1890ff',
                marginLeft: '4px'
              }}>
                ${content.price.value === '$18,400' ?
                  (item.currentBid || item.price)?.toLocaleString() || '18,400' :
                  content.price.value}
              </Text>
            </div>
          )}

          {content.timer && (
            <div>
              <Text style={{ fontSize: '11px', color: '#666' }}>
                {content.timer.label}:
              </Text>
              <Text style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#ff4d4f',
                marginLeft: '4px'
              }}>
                {content.timer.value === '02h : 14m : 32s' ?
                  (item.timeLeft || item.timer) || '02h : 14m : 32s' :
                  content.timer.value}
              </Text>
            </div>
          )}

          {/* Car Specifications - Modern Minimalist Display */}
          {item.engine && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '6px',
                fontSize: '10px',
                textAlign: 'center'
              }}>
                {item.engine && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.engine}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>ENGINE</Text>
                  </div>
                )}

                {item.cylinders > 0 && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.cylinders} cyl
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>CYLINDERS</Text>
                  </div>
                )}

                {item.transmission && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.transmission === 'Automatic' ? 'AUTO' :
                       item.transmission === 'Manual' ? 'MANUAL' :
                       item.transmission === 'CVT' ? 'CVT' :
                       item.transmission === 'PDK' ? 'PDK' : item.transmission}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>TRANS</Text>
                  </div>
                )}

                {item.drivetrain && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.drivetrain}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>DRIVE</Text>
                  </div>
                )}

                {item.fuelType && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.fuelType}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>FUEL</Text>
                  </div>
                )}
              </div>

              {/* Additional specs row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '6px',
                fontSize: '10px',
                textAlign: 'center',
                marginTop: '6px',
                paddingTop: '6px',
                borderTop: '1px solid #e9ecef'
              }}>
                {item.condition && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#52c41a' }}>
                      {item.condition}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>CONDITION</Text>
                  </div>
                )}

                {item.color && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.color.length > 10 ? item.color.substring(0, 10) + '...' : item.color}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>COLOR</Text>
                  </div>
                )}

                {item.bodyType && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {item.bodyType}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>BODY</Text>
                  </div>
                )}

                {item.matchScore && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#faad14' }}>
                      {item.matchScore}%
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>MATCH</Text>
                  </div>
                )}

                {item.discount && (
                  <div>
                    <Text style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                      {item.discount}
                    </Text>
                    <Text style={{ color: '#666', fontSize: '9px' }}>SAVINGS</Text>
                  </div>
                )}
              </div>
            </div>
          )}
        </Space>
      </div>
    );
  };

  const renderActions = () => {
    if (!card.actions || card.actions.length === 0) return null;

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {card.actions.map((action, index) => {
          const getIcon = (iconName) => {
            switch (iconName) {
              case 'gavel': return <DollarOutlined />;
              case 'eye': return <EyeOutlined />;
              case 'zap': return <ThunderboltOutlined />;
              case 'info': return <InfoOutlined />;
              default: return null;
            }
          };

          const getButtonProps = (variant) => {
            switch (variant) {
              case 'primary':
                return { type: 'primary' };
              case 'ghost':
                return { type: 'text' };
              case 'outline':
                return { type: 'default', style: { border: '1px solid currentColor' } };
              default:
                return { type: 'default' };
            }
          };

          return (
            <Button
              key={index}
              {...getButtonProps(action.variant)}
              icon={getIcon(action.icon)}
              style={{
                flex: action.width === 'full' ? 1 :
                      action.width === '1/2' ? '0 0 calc(50% - 4px)' : 'auto',
                height: '32px'
              }}
              onClick={() => handleAction(action.label.toLowerCase().replace(/\s+/g, '_'), item.id)}
              loading={false} // TODO-FX: Add loading state management
            >
              {action.label}
            </Button>
          );
        })}
      </div>
    );
  };

  const cardStyle = {
    backgroundColor: card.style?.background || 'white',
    borderRadius: card.style?.rounded === '2xl' ? '16px' : '8px',
    boxShadow: isHovered && card.style?.hover?.includes('shadow-2xl') ?
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)' :
      card.style?.shadow === 'xl' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e9ecef',
    height: '100%',
    cursor: 'pointer',
    transition: card.style?.transition || 'all 0.3s ease',
    transform: isHovered && card.style?.hover?.includes('translate-y-') ?
      'translateY(-4px)' : 'none',
    ...(card.style?.hover?.includes('scale-105') && isHovered ? { transform: 'scale(1.05)' } : {}),
    ...(card.style?.hover?.includes('ring-2') && isHovered ? { boxShadow: '0 0 0 2px #ddd6fe, 0 2px 8px rgba(0,0,0,0.08)' } : {})
  };

  return (
    <Card
      style={cardStyle}
      styles={{ body: { padding: '16px' } }}
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderImageSection()}
      {renderContent()}
      {renderActions()}
    </Card>
  );
};

CardRenderer.propTypes = {
  card: PropTypes.shape({
    image_ratio: PropTypes.string,
    overlay_badge: PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.string,
      style: PropTypes.string,
      icon: PropTypes.string
    }),
    ribbon: PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.string,
      position: PropTypes.string,
      style: PropTypes.string
    }),
    ai_tag: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      color: PropTypes.string,
      style: PropTypes.string
    }),
    content: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      }),
      timer: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      }),
      specs: PropTypes.shape({
        showEngine: PropTypes.bool,
        showCylinders: PropTypes.bool,
        showTransmission: PropTypes.bool,
        showDrivetrain: PropTypes.bool,
        showFuelType: PropTypes.bool,
        showCondition: PropTypes.bool,
        showColor: PropTypes.bool,
        showBodyType: PropTypes.bool,
        showMatchScore: PropTypes.bool,
        showDiscount: PropTypes.bool
      })
    }),
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      variant: PropTypes.string,
      icon: PropTypes.string,
      width: PropTypes.string
    })),
    style: PropTypes.shape({
      background: PropTypes.string,
      rounded: PropTypes.string,
      shadow: PropTypes.string,
      hover: PropTypes.arrayOf(PropTypes.string),
      transition: PropTypes.string
    })
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    engine: PropTypes.string,
    cylinders: PropTypes.number,
    transmission: PropTypes.string,
    fuelType: PropTypes.string,
    drivetrain: PropTypes.string,
    bodyType: PropTypes.string,
    condition: PropTypes.string,
    color: PropTypes.string,
    year: PropTypes.number,
    mileage: PropTypes.number,
    location: PropTypes.string,
    currentBid: PropTypes.number,
    price: PropTypes.number,
    matchScore: PropTypes.number,
    discount: PropTypes.string,
    timeLeft: PropTypes.string
  }).isRequired
};

export default CardRenderer;
