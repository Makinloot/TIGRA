import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icons
const createLocationIcon = (type) => {
  const isStart = type === 'start';
  const bgColor = isStart ? '#1890ff' : '#52c41a';

  return L.divIcon({
    className: 'custom-location-marker',
    html: `
      <div style="
        background: ${bgColor};
        border: 4px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          background: white;
          border-radius: 50%;
          width: 12px;
          height: 12px;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const createContainerIcon = (containerId) => {
  return L.divIcon({
    className: 'custom-container-marker',
    html: `
      <div style="
        background: #faad14;
        border: 2px solid white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
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
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

const MapComponents = ({ demoRoutes, translate, onError }) => {
  const [mapId] = useState(() => `map-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const mapRef = useRef(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Set up global error handler for map initialization
    const handleMapError = (error) => {
      if (error.message && error.message.includes('Map container is already initialized')) {
        onError();
      }
    };

    // Add global error listener
    window.addEventListener('error', handleMapError);

    // Capture current map ref for cleanup
    const currentMap = mapRef.current;

    return () => {
      window.removeEventListener('error', handleMapError);
      // Clean up any existing map instance
      if (currentMap) {
        try {
          if (currentMap && currentMap.remove) {
            currentMap.remove();
          }
        } catch (_cleanupError) { // eslint-disable-line no-unused-vars
          // Ignore cleanup errors
        }
      }
    };
  }, [onError]);

  // Only render if not already initialized
  if (hasInitialized.current) {
    return (
      <div
        id={mapId}
        style={{ height: '100%', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div>Map loaded</div>
      </div>
    );
  }

  hasInitialized.current = true;

  return (
    <div id={mapId} style={{ height: '100%', width: '100%' }}>
      <MapContainer
        ref={mapRef}
        center={[25.0, -25.0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        whenReady={() => {
          // Map is ready, prevent further re-initialization
        }}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Route Polylines */}
      {demoRoutes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.path.coordinates}
          pathOptions={{
            color: route.path.color,
            weight: route.path.weight,
            opacity: 0.8
          }}
        />
      ))}

      {/* Start and End Markers */}
      {demoRoutes.map((route) => (
        <React.Fragment key={`markers-${route.id}`}>
          <Marker
            position={route.from.coords}
            icon={createLocationIcon('start')}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{route.from.city}</strong><br/>
                <small style={{ color: '#666' }}>{translate('logistics.departurePoint')}</small>
              </div>
            </Popup>
          </Marker>

          <Marker
            position={route.to.coords}
            icon={createLocationIcon('end')}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{route.to.city}</strong><br/>
                <small style={{ color: '#666' }}>{translate('logistics.destination')}</small>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}

      {/* Container Markers */}
      {demoRoutes.map((route) =>
        route.containers.map((container) => (
          <Marker
            key={container.id}
            position={container.position}
            icon={createContainerIcon(container.id)}
          >
            <Popup>
              <div>
                <strong>{container.id}</strong><br/>
                <small>{translate('logistics.status')}: {container.status}</small>
              </div>
            </Popup>
          </Marker>
        ))
      )}
      </MapContainer>
    </div>
  );
};

MapComponents.propTypes = {
  demoRoutes: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default MapComponents;
