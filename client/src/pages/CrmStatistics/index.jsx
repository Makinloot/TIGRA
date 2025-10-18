import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Spin, Alert, Empty, Space } from 'antd';
import {
  TruckOutlined,
  UserOutlined,
  DollarOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  BarChartOutlined,
  HeartOutlined,
  RiseOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { mockCrmStats } from '../../mocks/_mockData';
import DispatchVolumeChart from '../../components/Charts/DispatchVolumeChart';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmStatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/crm/statistics
  // Query Params: ?range=today | weekly | monthly
  // Expected Data: { dispatchesToday: 42, dispatchesWeekly: 210, dispatchesMonthly: 890, totalRevenue: 7710000, totalExpenses: 2313000, pendingPaymentTotal: 120500, avgDeliveryTimeDays: 4.5 }
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use mock data
        setStats(mockCrmStats);
      } catch {
        setError(t('error_loading_statistics'));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message={t('error')}
        description={error}
        type="error"
        showIcon
        style={{ margin: '24px' }}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Primary KPIs Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('dispatches_today')}
              value={stats.dispatchesToday}
              prefix={<TruckOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('active_drivers')}
              value={stats.activeDrivers}
              prefix={<UserOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('total_revenue_all_time')}
              value={stats.totalRevenue}
              prefix={<DollarOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('vehicles_in_transit')}
              value={stats.vehiclesInTransit}
              prefix={<CarOutlined style={{ color: '#722ed1' }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Secondary KPIs Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('avg_delivery_time_days')}
              value={stats.avgDeliveryTimeDays}
              suffix="days"
              precision={1}
              prefix={<ClockCircleOutlined style={{ color: '#13c2c2' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('on_time_delivery_rate')}
              value={stats.onTimeDeliveryRate}
              suffix="%"
              precision={1}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('customer_satisfaction_score')}
              value={stats.customerSatisfactionScore}
              suffix="/5"
              precision={1}
              prefix={<StarOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('avg_revenue_per_dispatch')}
              value={stats.avgRevenuePerDispatch}
              prefix={<DollarOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Financial Overview Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="borderless">
            <Statistic
              title={t('pending_payment_total')}
              value={stats.pendingPaymentTotal}
              prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />}
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="borderless">
            <Statistic
              title={t('collected_this_month')}
              value={stats.collectedThisMonth}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card variant="borderless">
            <Statistic
              title={t('overdue_payments')}
              value={stats.overduePayments}
              prefix={<ExclamationCircleOutlined style={{ color: '#cf1322' }} />}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Profit Analysis Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="borderless">
            <Statistic
              title={t('total_expenses')}
              value={stats.totalExpenses}
              prefix={<DollarOutlined style={{ color: '#ff4d4f' }} />}
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card variant="borderless">
            <Statistic
              title={t('net_profit')}
              value={stats.totalRevenue - stats.totalExpenses}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{
                color: (stats.totalRevenue - stats.totalExpenses) >= 0 ? '#52c41a' : '#ff4d4f'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          {/* Empty column for balance */}
        </Col>
      </Row>

      {/* Performance Metrics Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('dispatch_success_rate')}
              value={stats.performanceMetrics.dispatchSuccessRate}
              suffix="%"
              precision={1}
              prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('driver_utilization_rate')}
              value={stats.performanceMetrics.driverUtilizationRate}
              suffix="%"
              precision={1}
              prefix={<BarChartOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('customer_retention_rate')}
              value={stats.performanceMetrics.customerRetentionRate}
              suffix="%"
              precision={1}
              prefix={<HeartOutlined style={{ color: '#eb2f96' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title={t('profit_margin')}
              value={stats.performanceMetrics.profitMargin}
              suffix="%"
              precision={1}
              prefix={<RiseOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Dispatch Volume Chart */}
      <Row>
        <Col span={24}>
          <Card title={t('dispatch_volume_over_time')}>
            <DispatchVolumeChart data={stats.monthlyTrends} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

CrmStatisticsPage.propTypes = {
  // No props required for this page component
};

export default CrmStatisticsPage;
