import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { GlobalOutlined, CarOutlined, TruckOutlined } from '@ant-design/icons';

// TODO-FX: Replace with real react-map-gl implementation when compatibility issues are resolved
// API Endpoint: GET /api/logistics/map/data
// Expected Data: Route coordinates and vehicle positions

const LogisticsMap = ({ routeDemo, style }) => {
  const getIconForVehicle = (icon) => {
    switch (icon) {
      case 'ship':
        return <GlobalOutlined style={{ fontSize: '20px', color: '#1890ff' }} />;
      case 'truck':
        return <TruckOutlined style={{ fontSize: '20px', color: '#52c41a' }} />;
      default:
        return <CarOutlined style={{ fontSize: '20px', color: '#1890ff' }} />;
    }
  };

  return (
    <Card
      style={{
        height: style?.height || '500px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        border: '1px solid #e2e8f0',
        ...style
      }}
      bodyStyle={{ padding: 0, height: '100%', position: 'relative' }}
    >
      {/* Simple Demo Map Background */}
      <div style={{
        height: '100%',
        background: `url('https://storage.googleapis.com/gweb-uniblog-publish-prod/images/blurry_images_ML.width-500.format-webp.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '20px'
      }}>
        {/* Simple Route Visualization */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '300px',
          height: '200px',
          marginBottom: '20px'
        }}>
          {/* Route Line */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 300 200"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {/* Curved route path */}
            <path
              d="M 30 150 Q 80 120 150 80 Q 220 40 270 70"
              stroke="#2563eb"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8,4"
              opacity="0.8"
            />

            {/* Origin Point */}
            <circle cx="30" cy="150" r="8" fill="#10b981" stroke="white" strokeWidth="2" />

            {/* Destination Point */}
            <circle cx="270" cy="70" r="8" fill="#ef4444" stroke="white" strokeWidth="2" />

            {/* Vehicle Points */}
            <circle cx="80" cy="120" r="10" fill="white" stroke="#1890ff" strokeWidth="3" />
            <circle cx="150" cy="80" r="10" fill="white" stroke="#1890ff" strokeWidth="3" />
            <circle cx="220" cy="40" r="10" fill="white" stroke="#52c41a" strokeWidth="3" />
          </svg>

          {/* Vehicle Icons */}
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '26.7%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            animation: 'pulse 2s infinite'
          }}>
            {getIconForVehicle('ship')}
          </div>

          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            animation: 'pulse 2s infinite 0.5s'
          }}>
            {getIconForVehicle('ship')}
          </div>

          <div style={{
            position: 'absolute',
            top: '20%',
            left: '73.3%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            animation: 'pulse 2s infinite 1s'
          }}>
            {getIconForVehicle('truck')}
          </div>
        </div>

        {/* Route Labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '300px',
          marginBottom: '16px'
        }}>
          <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>
            {routeDemo.origin.city}
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#ef4444' }}>
            {routeDemo.destination.city}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          background: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '12px',
          marginTop: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }} />
            <span>Origin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }} />
            <span>Destination</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '2px', background: '#2563eb' }} />
            <span>Shipping Route</span>
          </div>
        </div>

        {/* Title */}
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#666',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          <GlobalOutlined style={{ fontSize: '32px', marginBottom: '8px', color: '#1890ff' }} />
          <div>Transatlantic Route Demo</div>
        </div>
      </div>
    </Card>
  );
};

LogisticsMap.propTypes = {
  routeDemo: PropTypes.shape({
    origin: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      coords: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    destination: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      coords: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    path: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      style: PropTypes.object
    }).isRequired,
    vehicles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      coords: PropTypes.arrayOf(PropTypes.number),
      eta: PropTypes.string,
      status: PropTypes.string,
      icon: PropTypes.string
    })).isRequired
  }).isRequired,
  style: PropTypes.object
};

export default LogisticsMap;
