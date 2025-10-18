import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DispatchVolumeChart = ({ data }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#fff',
          padding: '12px',
          border: '1px solid #e6e6e6',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#1890ff' }}>
            {`${label} 2025`}
          </p>
          <p style={{ margin: '0', color: '#52c41a' }}>
            {`${t('dispatches')}: ${data.dispatches.toLocaleString()}`}
          </p>
          <p style={{ margin: '0', color: '#722ed1' }}>
            {`${t('revenue')}: $${data.revenue.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            stroke="#666"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="dispatches"
            stroke="#1890ff"
            strokeWidth={3}
            dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#1890ff', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

DispatchVolumeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    dispatches: PropTypes.number.isRequired,
    revenue: PropTypes.number
  })).isRequired
};

export default DispatchVolumeChart;
