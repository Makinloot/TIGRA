import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Progress, Space, Tag, Typography, Row, Col, Avatar, Divider } from 'antd';
import { GlobalOutlined, ClockCircleOutlined, EnvironmentOutlined, TruckOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

// Live container tracking data with simulated movement
const liveContainerData = [
  {
    id: 'CN-001',
    cargo: 'Electronics',
    value: '$450,000',
    origin: 'Savannah, GA, USA',
    destination: 'Poti, Georgia',
    currentPosition: 'At Sea - Mid-Atlantic Ocean',
    coordinates: [35.0, -45.0], // Simulated coordinates
    progress: 0,
    status: 'In Transit',
    eta: '3 days 12 hours',
    vessel: 'Ever Green Voyager',
    transportMode: 'ship',
    lastUpdate: new Date(),
    route: [
      { location: 'Savannah Port', progress: 0, completed: true },
      { location: 'Atlantic Crossing', progress: 25, completed: true },
      { location: 'Mid-Atlantic', progress: 50, completed: false },
      { location: 'Mediterranean Sea', progress: 75, completed: false },
      { location: 'Black Sea', progress: 90, completed: false },
      { location: 'Poti Port', progress: 100, completed: false }
    ]
  },
  {
    id: 'CN-002',
    cargo: 'Machinery Parts',
    value: '$780,000',
    origin: 'Charleston, SC, USA',
    destination: 'Batumi, Georgia',
    currentPosition: 'Port of Charleston - Loading',
    coordinates: [32.8, -79.9],
    progress: 0,
    status: 'Loading',
    eta: '7 days 8 hours',
    vessel: 'Ocean Pride',
    transportMode: 'ship',
    lastUpdate: new Date(),
    route: [
      { location: 'Charleston Port', progress: 0, completed: false },
      { location: 'Atlantic Crossing', progress: 25, completed: false },
      { location: 'Mediterranean Sea', progress: 75, completed: false },
      { location: 'Black Sea', progress: 90, completed: false },
      { location: 'Batumi Port', progress: 100, completed: false }
    ]
  },
  {
    id: 'CN-003',
    cargo: 'Automotive Parts',
    value: '$320,000',
    origin: 'Jacksonville, FL, USA',
    destination: 'Poti, Georgia',
    currentPosition: 'Mediterranean Sea - Approaching Suez Canal',
    coordinates: [31.0, 32.0],
    progress: 0,
    status: 'In Transit',
    eta: '2 days 6 hours',
    vessel: 'Sea Voyager',
    transportMode: 'ship',
    lastUpdate: new Date(),
    route: [
      { location: 'Jacksonville Port', progress: 0, completed: true },
      { location: 'Gulf of Mexico', progress: 10, completed: true },
      { location: 'Atlantic Ocean', progress: 25, completed: true },
      { location: 'Suez Canal', progress: 70, completed: false },
      { location: 'Red Sea', progress: 80, completed: false },
      { location: 'Gulf of Aden', progress: 85, completed: false },
      { location: 'Arabian Sea', progress: 90, completed: false },
      { location: 'Poti Port', progress: 100, completed: false }
    ]
  },
  {
    id: 'CN-004',
    cargo: 'Textiles',
    value: '$195,000',
    origin: 'Miami, FL, USA',
    destination: 'Batumi, Georgia',
    currentPosition: 'Black Sea - En Route to Batumi',
    coordinates: [42.5, 37.0],
    progress: 0,
    status: 'In Transit',
    eta: '18 hours',
    vessel: 'Blue Wave',
    transportMode: 'ship',
    lastUpdate: new Date(),
    route: [
      { location: 'Miami Port', progress: 0, completed: true },
      { location: 'Caribbean Sea', progress: 15, completed: true },
      { location: 'Atlantic Ocean', progress: 40, completed: true },
      { location: 'Mediterranean Sea', progress: 75, completed: true },
      { location: 'Black Sea', progress: 95, completed: false },
      { location: 'Batumi Port', progress: 100, completed: false }
    ]
  }
];

// Transport mode icons
const getTransportIcon = (mode) => {
  switch (mode) {
    case 'truck': return <TruckOutlined />;
    default: return <GlobalOutlined />;
  }
};

// Status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return '#52c41a';
    case 'In Transit': return '#1890ff';
    case 'Loading': return '#faad14';
    case 'Delayed': return '#ff4d4f';
    case 'Customs': return '#722ed1';
    default: return '#d9d9d9';
  }
};

const ContainerRouteProgress = ({ route }) => (
  <div style={{ marginTop: '12px' }}>
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      {route.map((step) => (
        <div key={step.location} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: step.completed ? '#52c41a' : step.progress > step.location ? '#1890ff' : '#d9d9d9',
              flexShrink: 0
            }}
          />
          <Text
            style={{
              fontSize: '12px',
              color: step.completed ? '#52c41a' : '#666',
              flex: 1
            }}
          >
            {step.location}
          </Text>
          {step.completed && (
            <Text style={{ fontSize: '10px', color: '#52c41a' }}>✓</Text>
          )}
        </div>
      ))}
    </Space>
  </div>
);

const LiveContainerTracker = ({ loading = false }) => {
  const [containers, setContainers] = useState(liveContainerData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(prevContainers =>
        prevContainers.map(container => {
          let newProgress = container.progress;
          let newStatus = container.status;
          let newPosition = container.currentPosition;

          // Simulate progress based on current status
          if (container.status === 'In Transit' && Math.random() > 0.7) {
            newProgress = Math.min(container.progress + Math.random() * 2, 100);
          } else if (container.status === 'Loading' && Math.random() > 0.8) {
            newStatus = 'In Transit';
            newPosition = 'Departed from port';
          }

          // Update position based on progress
          if (newProgress > 20 && newProgress < 40) {
            newPosition = 'Atlantic Ocean crossing';
          } else if (newProgress > 40 && newProgress < 60) {
            newPosition = 'Approaching European waters';
          } else if (newProgress > 60 && newProgress < 80) {
            newPosition = 'Mediterranean Sea';
          } else if (newProgress > 80 && newProgress < 95) {
            newPosition = 'Black Sea approach';
          } else if (newProgress > 95) {
            newPosition = 'Arriving at destination port';
          }

          return {
            ...container,
            progress: newProgress,
            status: newStatus,
            currentPosition: newPosition,
            lastUpdate: new Date()
          };
        })
      );
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            {'კონტეინერების ცოცხალ თვალთვალი'}
          </div>
        }
        style={{ height: '600px' }}
      >
        <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>{'იტვირთება ცოცხალ თვალთვალი...'}</div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            {'კონტეინერების ცოცხალ თვალთვალი'}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <ClockCircleOutlined style={{ marginRight: '4px' }} />
{'ბოლო განახლება:'} {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      }
      style={{ height: '600px' }}
    >
      <div style={{ height: '500px', overflow: 'auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {containers.map((container) => (
            <Card
              key={container.id}
              size="small"
              style={{
                borderLeft: `4px solid ${getStatusColor(container.status)}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Space direction="vertical" size="small">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar
                        icon={getTransportIcon(container.transportMode)}
                        style={{ backgroundColor: getStatusColor(container.status) }}
                        size="small"
                      />
                      <Title level={5} style={{ margin: 0, fontSize: '16px' }}>
                        {container.id}
                      </Title>
                      <Tag color={getStatusColor(container.status)} size="small">
                        {container.status === 'In Transit' ? 'ტრანზიტში' :
                         container.status === 'Loading' ? 'იტვირთება' :
                         container.status}
                      </Tag>
                    </div>

                    <div>
                      <Text strong style={{ fontSize: '14px' }}>{container.cargo}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {'ღირებულება'}: {container.value}
                      </Text>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <EnvironmentOutlined style={{ color: '#1890ff' }} />
                      <Text style={{ fontSize: '12px' }}>{container.currentPosition}</Text>
                    </div>
                  </Space>
                </Col>

                <Col xs={24} md={8}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text style={{ fontSize: '12px', color: '#666' }}>{'მარშრუტის პროგრესი'}</Text>
                      <Progress
                        percent={Math.round(container.progress)}
                        size="small"
                        status={container.status === 'Delayed' ? 'exception' : 'active'}
                        strokeColor={getStatusColor(container.status)}
                        showInfo={false}
                      />
                      <Text style={{ fontSize: '11px', color: '#666' }}>
                        {Math.round(container.progress)}% {'დასრულებული'} • {'ETA'}: {container.eta}
                      </Text>
                    </div>

                    <div>
                      <Text style={{ fontSize: '12px' }}>
                        <strong>{'გასვლის წერტილი'}:</strong> {container.origin}
                      </Text>
                      <br />
                      <Text style={{ fontSize: '12px' }}>
                        <strong>{'დანიშნულების ადგილი'}:</strong> {container.destination}
                      </Text>
                    </div>
                  </Space>
                </Col>

                <Col xs={24} md={8}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text style={{ fontSize: '12px', color: '#666' }}>{'გემი'}: {container.vessel}</Text>
                      <br />
                      <Text style={{ fontSize: '11px', color: '#999' }}>
                        {'ბოლო განახლება'}: {container.lastUpdate.toLocaleTimeString()}
                      </Text>
                    </div>

                    <ContainerRouteProgress route={container.route} />
                  </Space>
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      </div>
    </Card>
  );
};

LiveContainerTracker.propTypes = {
  loading: PropTypes.bool
};

export default LiveContainerTracker;
