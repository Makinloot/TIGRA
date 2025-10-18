import React from 'react';
import PropTypes from 'prop-types';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const RouteBarChart = ({ data, loading }) => {
  const { t: translate } = useTranslation();

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/statistics/routes/dynamics
  // Expected Data: Array of {route: string, volume: number, growth: number}

  if (loading) {
    return (
      <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>{translate('loadingStates.chart')}</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="route" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [
            name === 'volume' ? `${value} ${translate('statistics.containers')}` : `${value}%`,
            name === 'volume' ? translate('statistics.volume') : translate('statistics.growth')
          ]}
        />
        <Legend />
        <Bar
          dataKey="volume"
          fill="#1890ff"
          name={translate('statistics.volume')}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="growth"
          fill="#52c41a"
          name={translate('statistics.growth')}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

RouteBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired,
      growth: PropTypes.number.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default RouteBarChart;
