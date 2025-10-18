import React from 'react';
import PropTypes from 'prop-types';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

// TODO-FX: Connect to i18n library.

const SalesLineChart = ({ data, loading }) => {
  const { t: translate } = useTranslation();

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/statistics/sales/monthly
  // Expected Data: Array of {month: string, sales: number, target: number}

  if (loading) {
    return (
      <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>{translate('loadingStates.chart')}</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickFormatter={(value) => `₾${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value, name) => [
            `₾${value.toLocaleString()}`,
            name === 'sales' ? translate('statistics.sales') : translate('statistics.target')
          ]}
          labelFormatter={(label) => `${translate('statistics.month')}: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#1890ff"
          strokeWidth={2}
          name={translate('statistics.sales')}
          dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#1890ff', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#52c41a"
          strokeWidth={2}
          strokeDasharray="5 5"
          name={translate('statistics.target')}
          dot={{ fill: '#52c41a', strokeWidth: 2, r: 4 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

SalesLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
      target: PropTypes.number
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default SalesLineChart;
