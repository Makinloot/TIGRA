import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Calendar, Badge, Spin, Alert } from 'antd';
import { mockDispatchVehicles } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmCalendarPage = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO-FX: Replace with real API call.
    // API Endpoint: GET /api/crm/dispatch/active (Used by DispatchDashboard, CrmPipeline, and CrmCalendar)
    // Expected Data: Array of dispatch objects with pickupDate and deliveryDate
    const loadDispatches = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use mock data - filter for active dispatches only
        const activeDispatches = mockDispatchVehicles.filter(vehicle =>
          vehicle.dispatchStatus === 'active'
        );

        setDispatches(activeDispatches);
      } catch (err) {
        setError(t('failed_to_load_dispatches'));
        console.error('Failed to load dispatches:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDispatches();
  }, []);

  // Helper function to get events for a specific day
  const getEventsForDay = (date) => {
    const dateString = date.format('YYYY-MM-DD');

    return dispatches
      .map(dispatch => {
        const events = [];

        // Check for pickup date match
        if (dispatch.pickupDate && dispatch.pickupDate.startsWith(dateString)) {
          events.push({
            id: `${dispatch.id}-pickup`,
            vin: dispatch.vin,
            type: 'pickup',
            isPickup: true
          });
        }

        // Check for delivery date match
        if (dispatch.deliveryDate) {
          const deliveryDate = new Date(dispatch.deliveryDate).toISOString().split('T')[0];
          if (deliveryDate === dateString) {
            events.push({
              id: `${dispatch.id}-delivery`,
              vin: dispatch.vin,
              type: 'delivery',
              isPickup: false
            });
          }
        }

        return events;
      })
      .flat()
      .sort((a, b) => a.vin.localeCompare(b.vin)); // Sort by VIN for consistent display
  };

  // Date cell render function
  const dateCellRender = (value) => {
    const listData = getEventsForDay(value);
    if (listData.length === 0) return null;

    return (
      <ul style={{ listStyle: 'none', padding: '4px 0', margin: 0 }}>
        {listData.map(item => (
          <li key={item.id} style={{ marginBottom: '4px' }}>
            <Badge
              status={item.isPickup ? 'success' : 'processing'}
              text={`${item.isPickup ? t('pickup') : t('delivery')}: ${item.vin}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <Card title={t('dispatch_calendar')}>
        <Spin size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title={t('dispatch_calendar')}>
        <Alert
          message={t('error')}
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card title={t('dispatch_calendar')}>
      <Calendar
        dateCellRender={dateCellRender}
        fullscreen={true}
      />
    </Card>
  );
};

CrmCalendarPage.propTypes = {
  // No props required - component manages its own state
};

export default CrmCalendarPage;
