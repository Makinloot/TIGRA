import React from 'react';
import PropTypes from 'prop-types';
import { Card, Progress, Typography, Space, Tag, Divider } from 'antd';
import { GlobalOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Title, Text } = Typography;

const ContainerList = ({ header, cards, style }) => {
  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/logistics/containers/active
  // Expected Data: Array of active container tracking data

  const getStatusColor = (statusColor) => {
    switch (statusColor) {
      case 'blue': return 'blue';
      case 'indigo': return 'geekblue';
      case 'green': return 'green';
      default: return 'default';
    }
  };

  return (
    <Card
      style={{
        background: style?.background || 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        height: style?.height || 'auto',
        ...style
      }}
      styles={{ body: { padding: '24px' } }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <GlobalOutlined style={{ color: '#1890ff' }} />
          {header?.title || t('active_containers')}
        </Title>
        <Text style={{ color: '#666', fontSize: '14px' }}>
          {header?.subtitle || t('tracking_updates_in_real_time')}
        </Text>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            size="small"
            style={{
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease'
            }}
            styles={{ body: { padding: '16px' } }}
            hoverable
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
                    {card.title}
                  </Text>
                  <Text style={{ color: '#666', fontSize: '14px' }}>
                    {card.subtitle}
                  </Text>
                </div>
                <Tag color={getStatusColor(card.status_color)}>
                  {card.status}
                </Tag>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text style={{ fontSize: '14px', color: '#666' }}>
                    {t('progress')}
                  </Text>
                  <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {card.progress}%
                  </Text>
                </div>
                <Progress
                  percent={card.progress}
                  showInfo={false}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  trailColor="#f0f0f0"
                  strokeWidth={8}
                />
              </div>

              {/* Details */}
              <div style={{ background: '#fafafa', padding: '12px', borderRadius: '8px' }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GlobalOutlined style={{ color: '#1890ff', fontSize: '14px' }} />
                    <Text style={{ fontSize: '14px' }}>
                      <strong>{card.details.vessel}</strong>
                    </Text>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClockCircleOutlined style={{ color: '#faad14', fontSize: '14px' }} />
                    <Text style={{ fontSize: '14px', color: '#666' }}>
                      {t('last_update')}: {card.details.last_update}
                    </Text>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <EnvironmentOutlined style={{ color: '#52c41a', fontSize: '14px' }} />
                    <Text style={{ fontSize: '14px', color: '#666' }}>
                      {card.details.location}
                    </Text>
                  </div>
                </Space>
              </div>

              {/* ETA */}
              <div style={{ textAlign: 'center', padding: '8px', background: '#e6f7ff', borderRadius: '6px' }}>
                <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff' }}>
                  {t('eta')}: {card.eta}
                </Text>
              </div>
            </Space>
          </Card>
        ))}
      </Space>

      <Divider />

      <div style={{ textAlign: 'center' }}>
        <Text style={{ color: '#666', fontSize: '14px' }}>
          {t('track_shipments_in_real_time_through_our_logistics_dashboard')}
        </Text>
      </div>
    </Card>
  );
};

ContainerList.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string
  }),
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    eta: PropTypes.string.isRequired,
    status: PropTypes.string,
    status_color: PropTypes.string,
    details: PropTypes.shape({
      vessel: PropTypes.string,
      last_update: PropTypes.string,
      location: PropTypes.string
    }).isRequired
  })).isRequired,
  style: PropTypes.object
};

export default ContainerList;

