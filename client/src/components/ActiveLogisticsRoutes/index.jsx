import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Progress, Tag, Drawer, Button, Space, Row, Col, Alert, Spin } from 'antd';
import { GlobalOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// Mock data for USA → Georgia route with 3 containers
const routeData = {
  from: {
    city: 'Miami, USA',
    coords: [25.7617, -80.1918]
  },
  to: {
    city: 'Tbilisi, Georgia',
    coords: [41.7167, 44.7833]
  },
  polyline: {
    coordinates: [
      [25.7617, -80.1918], // Miami, USA
      [30.0, -60.0],       // Atlantic Ocean
      [35.0, -40.0],       // Mid-Atlantic
      [40.0, -20.0],       // Near Europe
      [42.0, 35.0],        // Mediterranean
      [41.7167, 44.7833]   // Tbilisi, Georgia
    ],
    color: 'blue',
    dashArray: '5,10'
  }
};

const initialContainers = [
  {
    id: 'C-001',
    label: 'Container C-001',
    status: 'In Transit',
    location: [25.7617, -80.1918],
    destination: [41.7167, 44.7833],
    eta: 'Dec 15, 2025',
    progress: 65,
    description: 'Electronics shipment - Miami → Tbilisi'
  },
  {
    id: 'C-002',
    label: 'Container C-002',
    status: 'Loading',
    location: [25.7617, -80.1918],
    destination: [41.7167, 44.7833],
    eta: 'Dec 20, 2025',
    progress: 25,
    description: 'Automotive parts - Miami → Tbilisi'
  },
  {
    id: 'C-003',
    label: 'Container C-003',
    status: 'In Transit',
    location: [25.7617, -80.1918],
    destination: [41.7167, 44.7833],
    eta: 'Dec 10, 2025',
    progress: 85,
    description: 'Machinery equipment - Miami → Tbilisi'
  }
];

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/routes/active
// Expected Data: Array of active containers with real-time data

// Custom marker icons
const createContainerIcon = (containerId, progress) => {
  const color = progress > 75 ? '#22c55e' : progress > 50 ? '#3b82f6' : progress > 25 ? '#f59e0b' : '#ef4444';

  return L.divIcon({
    className: 'custom-container-marker',
    html: `
      <div style="
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        ${containerId.split('-')[1]}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const createLocationIcon = (type) => {
  const isStart = type === 'start';
  const bgColor = isStart ? '#2563eb' : '#16a34a';

  return L.divIcon({
    className: 'custom-location-marker',
    html: `
      <div style="
        background: ${bgColor};
        border: 4px solid white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          background: white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const ActiveLogisticsRoutes = ({ loading = false }) => {
  const { t } = useTranslation();
  const [containers, setContainers] = useState(initialContainers);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Auto-update containers every 5 minutes
  const updateContainerData = useCallback(() => {
    setContainers(prevContainers =>
      prevContainers.map(container => ({
        ...container,
        progress: Math.min(100, container.progress + Math.floor(Math.random() * 3)),
        eta: container.eta // Keep ETA static for demo
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updateContainerData, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [updateContainerData]);

  // Cleanup function for map container issues
  useEffect(() => {
    return () => {
      const mapEl = document.querySelector('.leaflet-container');
      if (mapEl && mapEl._leaflet_id) {
        mapEl._leaflet_id = null;
      }
    };
  }, []);

  const handleContainerClick = (container) => {
    setSelectedContainer(container);
    setDrawerVisible(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit': return 'blue';
      case 'loading': return 'orange';
      case 'delivered': return 'green';
      default: return 'gray';
    }
  };

  const getProgressColor = (progress) => {
    if (progress > 75) return '#22c55e';
    if (progress > 50) return '#3b82f6';
    if (progress > 25) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <div style={{ color: '#666' }}>{t('loadingStates.logisticsRoutes')}</div>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ height: '500px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', overflow: 'hidden', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GlobalOutlined style={{ marginRight: '8px', color: '#3b82f6' }} />
          {t('logistics.title')}
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          {t('logistics.subtitle')}
        </p>
      </div>

      <Row gutter={16} style={{ height: 'calc(100% - 80px)' }}>
        {/* Map Section */}
        <Col xs={24} lg={16} style={{ height: '100%' }}>
          <div style={{ height: '100%', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <MapContainer
              key="active-logistics-map"
              center={[25.7617, -80.1918]}
              zoom={3}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Route Polyline */}
              <Polyline
                positions={routeData.polyline.coordinates}
                pathOptions={{
                  color: routeData.polyline.color,
                  weight: 4,
                  opacity: 0.8,
                  dashArray: routeData.polyline.dashArray
                }}
              />

              {/* Start Point - Miami */}
              <Marker
                position={routeData.from.coords}
                icon={createLocationIcon('start')}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{routeData.from.city}</strong><br/>
                    <small style={{ color: '#666' }}>{t('logistics.departurePoint')}</small>
                  </div>
                </Popup>
              </Marker>

              {/* End Point - Tbilisi */}
              <Marker
                position={routeData.to.coords}
                icon={createLocationIcon('end')}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{routeData.to.city}</strong><br/>
                    <small style={{ color: '#666' }}>{t('logistics.destination')}</small>
                  </div>
                </Popup>
              </Marker>

              {/* Container Markers */}
              {containers.map((container) => (
                <Marker
                  key={container.id}
                  position={container.location}
                  icon={createContainerIcon(container.id, container.progress)}
                  eventHandlers={{
                    click: () => handleContainerClick(container)
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{container.label}</div>
                      <div style={{ marginBottom: '8px' }}>
                        <Progress
                          percent={container.progress}
                          size="small"
                          strokeColor={getProgressColor(container.progress)}
                        />
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          {container.progress}% {t('logistics.complete')}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {container.description}<br/>
                        ETA: {container.eta}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Col>

        {/* Container List */}
        <Col xs={24} lg={8} style={{ height: '100%', overflowY: 'auto' }}>
          <div style={{ height: '100%', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'semibold', marginBottom: '16px', color: '#1f2937' }}>
              {t('logistics.activeContainers')}
            </h4>

            <Space direction="vertical" style={{ width: '100%' }}>
              {containers.map((container) => (
                <Card
                  key={container.id}
                  size="small"
                  hoverable
                  onClick={() => handleContainerClick(container)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'semibold', color: '#1f2937' }}>
                      {container.label}
                    </span>
                    <Tag color={getStatusColor(container.status)} size="small">
                      {container.status}
                    </Tag>
                  </div>

                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    {routeData.from.city} → {routeData.to.city}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      <ClockCircleOutlined style={{ marginRight: '4px' }} />
                      ETA: {container.eta}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937' }}>
                      {container.progress}%
                    </span>
                  </div>

                  <Progress
                    percent={container.progress}
                    size="small"
                    strokeColor={getProgressColor(container.progress)}
                    showInfo={false}
                  />
                </Card>
              ))}
            </Space>

            <Alert
              message={t('logistics.realTimeUpdates')}
              description={t('logistics.dataUpdates')}
              type="info"
              showIcon
              style={{ marginTop: '16px', fontSize: '12px' }}
            />
          </div>
        </Col>
      </Row>

      {/* Container Details Drawer */}
      <Drawer
        title={selectedContainer?.label}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
      >
        {selectedContainer && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <strong>{t('logistics.containerId')}:</strong> {selectedContainer.id}
            </div>
            <div>
              <strong>{t('status')}:</strong>
              <Tag color={getStatusColor(selectedContainer.status)} style={{ marginLeft: '8px' }}>
                {selectedContainer.status}
              </Tag>
            </div>
            <div>
              <strong>{t('logistics.route')}:</strong> {routeData.from.city} → {routeData.to.city}
            </div>
            <div>
              <strong>{t('logistics.eta')}:</strong> {selectedContainer.eta}
            </div>
            <div>
              <strong>{t('logistics.description')}:</strong> {selectedContainer.description}
            </div>
            <div>
              <strong>{t('logistics.progress')}:</strong>
              <Progress
                percent={selectedContainer.progress}
                strokeColor={getProgressColor(selectedContainer.progress)}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div>
              <strong>{t('logistics.currentLocation')}:</strong>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                <EnvironmentOutlined style={{ marginRight: '4px' }} />
                {selectedContainer.location[0].toFixed(4)}, {selectedContainer.location[1].toFixed(4)}
              </div>
            </div>
          </Space>
        )}
      </Drawer>
    </div>
  );
};

ActiveLogisticsRoutes.propTypes = {
  loading: PropTypes.bool
};

export default ActiveLogisticsRoutes;
