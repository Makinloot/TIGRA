import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Progress, Space, Tag, Typography } from 'antd';
import { GlobalOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

// Demo shipping routes data
const shippingRoutes = [
  {
    id: 'route-1',
    from: { city: 'Savannah, GA', country: 'USA', coords: [32.0809, -81.0912] },
    to: { city: 'Poti', country: 'Georgia', coords: [42.1500, 41.6670] },
    containers: [
      {
        id: 'CN-001',
        progress: 85,
        status: 'In Transit',
        eta: '2 days',
        position: 'Eastern Mediterranean',
        cargo: 'Electronics',
        value: '$450,000'
      },
      {
        id: 'CN-002',
        progress: 45,
        status: 'In Transit',
        eta: '5 days',
        position: 'Atlantic Ocean',
        cargo: 'Machinery',
        value: '$780,000'
      }
    ],
    vessel: 'Ever Green',
    departure: '2024-01-15',
    arrival: '2024-01-25'
  },
  {
    id: 'route-2',
    from: { city: 'Charleston, SC', country: 'USA', coords: [32.7765, -79.9311] },
    to: { city: 'Batumi', country: 'Georgia', coords: [41.6168, 41.6367] },
    containers: [
      {
        id: 'CN-003',
        progress: 92,
        status: 'Arriving Soon',
        eta: '18 hours',
        position: 'Black Sea',
        cargo: 'Automotive Parts',
        value: '$320,000'
      },
      {
        id: 'CN-004',
        progress: 78,
        status: 'In Transit',
        eta: '3 days',
        position: 'Mediterranean Sea',
        cargo: 'Textiles',
        value: '$195,000'
      }
    ],
    vessel: 'Ocean Pride',
    departure: '2024-01-12',
    arrival: '2024-01-22'
  },
  {
    id: 'route-3',
    from: { city: 'Jacksonville, FL', country: 'USA', coords: [30.3322, -81.6557] },
    to: { city: 'Poti', country: 'Georgia', coords: [42.1500, 41.6670] },
    containers: [
      {
        id: 'CN-005',
        progress: 35,
        status: 'In Transit',
        eta: '7 days',
        position: 'Central Atlantic',
        cargo: 'Chemicals',
        value: '$620,000'
      }
    ],
    vessel: 'Sea Voyager',
    departure: '2024-01-18',
    arrival: '2024-01-28'
  }
];

// Status color mapping
const getStatusColor = (status) => {
  switch (status) {
    case 'Arriving Soon': return 'orange';
    case 'In Transit': return 'blue';
    case 'Delayed': return 'red';
    case 'Delivered': return 'green';
    default: return 'gray';
  }
};

const ContainerCard = ({ container, route }) => {

  return (
    <Card
      size="small"
      style={{
        marginBottom: '12px',
        borderLeft: `4px solid ${getStatusColor(container.status) === 'blue' ? '#1890ff' :
          getStatusColor(container.status) === 'orange' ? '#faad14' :
          getStatusColor(container.status) === 'red' ? '#ff4d4f' : '#52c41a'}`
      }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong style={{ fontSize: '14px' }}>{container.id}</Text>
          <Tag color={getStatusColor(container.status)} size="small">
            {container.status}
          </Tag>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <EnvironmentOutlined style={{ marginRight: '4px' }} />
            {container.position}
          </Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <ClockCircleOutlined style={{ marginRight: '4px' }} />
            ETA: {container.eta}
          </Text>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <Text style={{ fontSize: '12px' }}>{container.cargo}</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'bold' }}>{container.value}</Text>
          </div>
          <Progress
            percent={container.progress}
            size="small"
            status={container.status === 'Delayed' ? 'exception' : 'active'}
            strokeColor={getStatusColor(container.status) === 'blue' ? '#1890ff' :
              getStatusColor(container.status) === 'orange' ? '#faad14' :
              getStatusColor(container.status) === 'red' ? '#ff4d4f' : '#52c41a'}
          />
        </div>

        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          <GlobalOutlined style={{ marginRight: '4px' }} />
          {route.from.city} → {route.to.city} • {route.vessel}
        </div>
      </Space>
    </Card>
  );
};

const DashboardMap = ({ loading = false }) => {
  const { t: translate } = useTranslation();
  const [animatedProgress, setAnimatedProgress] = useState({});

  // Simulate progress animation for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress(prev => {
        const newProgress = { ...prev };
        shippingRoutes.forEach(route => {
          route.containers.forEach(container => {
            if (container.progress < 100 && container.status === 'In Transit') {
              const currentProgress = newProgress[container.id] || container.progress;
              newProgress[container.id] = Math.min(currentProgress + Math.random() * 0.5, 100);
            }
          });
        });
        return newProgress;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            {translate('dashboard.shippingRoutes')}
          </div>
        }
        style={{ height: '600px' }}
      >
        <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Loading shipping routes...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GlobalOutlined style={{ marginRight: '8px' }} />
          {translate('dashboard.shippingRoutes')}
        </div>
      }
      style={{ height: '600px' }}
    >
      <div style={{ height: '500px', overflow: 'auto' }}>
        <Space direction="vertical" size="medium" style={{ width: '100%' }}>
          {shippingRoutes.map((route) => (
            <div key={route.id}>
              <div style={{
                background: '#f5f5f5',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '12px',
                border: '1px solid #d9d9d9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Text strong style={{ fontSize: '16px' }}>
                    {route.from.city} → {route.to.city}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {route.vessel}
                  </Text>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Departure: {route.departure} • Arrival: {route.arrival}
                </div>
              </div>

              <div style={{ paddingLeft: '16px' }}>
                {route.containers.map((container) => (
                  <ContainerCard
                    key={container.id}
                    container={{
                      ...container,
                      progress: animatedProgress[container.id] || container.progress
                    }}
                    route={route}
                  />
                ))}
              </div>
            </div>
          ))}
        </Space>
      </div>
    </Card>
  );
};

DashboardMap.propTypes = {
  loading: PropTypes.bool
};

export default DashboardMap;
