import React from 'react';
import PropTypes from 'prop-types';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

const CategoryPieChart = ({ data, loading }) => {
  const { t: translate } = useTranslation();

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/statistics/categories/distribution
  // Expected Data: Array of {name: string, value: number, color: string}

  if (loading) {
    return (
      <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>{translate('loadingStates.chart')}</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, translate('statistics.percentage')]}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

CategoryPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default CategoryPieChart;
