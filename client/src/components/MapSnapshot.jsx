import React from 'react';
import { Row, Col, Card, Typography, Space, Tag, Divider } from 'antd';
import { GlobalOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const MapSnapshot = ({ shipmentRoutes }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit': return 'blue';
      case 'loading': return 'orange';
      case 'delivered': return 'green';
      default: return 'default';
    }
  };

  return (
    <div style={{ padding: '80px 0', backgroundColor: '#fafafa' }}>
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            <GlobalOutlined style={{ color: '#1890ff', marginRight: '12px' }} />
            Active Logistics Routes
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Real-time tracking of vehicles in transit across our global network
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* Map Placeholder */}
            <Card
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: 'none',
                height: '400px'
              }}
              styles={{ body: { padding: 0, height: '100%' } }}
            >
              <div style={{
                height: '100%',
                background: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* World Map Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.5
                }} />

                {/* Route Markers */}
                <div style={{
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '18px',
                  fontWeight: 500,
                  zIndex: 1
                }}>
                  <GlobalOutlined style={{ fontSize: '64px', marginBottom: '16px', color: '#1890ff' }} />
                  <div>Interactive Logistics Map</div>
                  <div style={{ fontSize: '14px', marginTop: '8px', color: '#999' }}>
                    Real-time shipment tracking
                  </div>
                </div>

                {/* Route Lines (simulated) */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                  }}
                  viewBox="0 0 400 300"
                >
                  {/* Simulated route lines */}
                  <path
                    d="M 50 200 Q 150 150 250 100 Q 300 80 350 120"
                    stroke="#1890ff"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                  <path
                    d="M 80 180 Q 180 130 280 80"
                    stroke="#52c41a"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                  <path
                    d="M 120 220 Q 200 180 320 140"
                    stroke="#faad14"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* Route Details */}
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {shipmentRoutes.map((route) => (
                <Card
                  key={route.id}
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: 'none'
                  }}
                  styles={{ body: { padding: '24px' } }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Route #{route.id}
                      </Text>
                      <Tag color={getStatusColor(route.status)}>
                        {route.status}
                      </Tag>
                    </div>

                    <div>
                      <Text style={{ color: '#666', fontSize: '14px' }}>
                        {route.origin} → {route.destination}
                      </Text>
                    </div>

                    <Row gutter={16}>
                      <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CarOutlined style={{ color: '#1890ff' }} />
                          <Text style={{ fontSize: '14px' }}>
                            {route.vehicleCount} vehicles
                          </Text>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ClockCircleOutlined style={{ color: '#faad14' }} />
                          <Text style={{ fontSize: '14px' }}>
                            {route.eta}
                          </Text>
                        </div>
                      </Col>
                    </Row>
                  </Space>
                </Card>
              ))}

              <Divider />

              <div style={{ textAlign: 'center' }}>
                <Text style={{ color: '#666' }}>
                  Track shipments in real-time through our logistics dashboard
                </Text>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

MapSnapshot.propTypes = {
  shipmentRoutes: PropTypes.array.isRequired,
};

export default MapSnapshot;
