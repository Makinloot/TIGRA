import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Empty } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

// Import mock container map data
import { mockContainerMapData } from '../../mocks/_mockData';

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/logistics/routes/map-data
// Expected Data: Map configuration with routes and container positions

const StatisticsMap = ({ loading = false }) => {
  const { t: translate } = useTranslation();

  if (loading) {
    return (
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GlobalOutlined style={{ marginRight: '8px' }} />
            {translate('statistics.mapRoutes')}
          </div>
        }
        style={{ height: '500px' }}
      >
        <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Loading map...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GlobalOutlined style={{ marginRight: '8px' }} />
          {translate('statistics.mapRoutes')}
        </div>
      }
      style={{ height: '500px' }}
    >
      <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
        <List
          header={translate('container_locations')} // TODO-FX: Connect to i18n library.
          dataSource={mockContainerMapData}
          locale={{
            emptyText: <Empty description={translate('no_container_locations')} /> // TODO-FX: Connect to i18n library.
          }}
          renderItem={(item) => (
            <List.Item>
              <div>
                <strong>{item.id}:</strong> {item.location}
              </div>
            </List.Item>
          )}
          style={{ height: '100%', overflow: 'auto' }}
        />
      </div>
    </Card>
  );
};

StatisticsMap.propTypes = {
  loading: PropTypes.bool
};

export default StatisticsMap;
