import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, List, Tag, Statistic, Alert, Spin, Row, Col, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { mockSystemMonitors } from '../../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const SystemHealth = () => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/crm/admin/system-health
  // Expected Data: Array<{ id: string, scriptName: string, lastRun: string, status: 'healthy' | 'failed' | 'running' }>
  useEffect(() => {
    const loadSystemHealth = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use mock data
        setMonitors(mockSystemMonitors);
        setError(null);
      } catch (err) {
        setError(t('failed_to_load_system_health'));
        console.error('Failed to load system health data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSystemHealth();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'running':
        return <ClockCircleOutlined style={{ color: '#1890ff' }} />;
      case 'failed':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#d9d9d9' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'success';
      case 'running':
        return 'processing';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    return t(`status_${status}`);
  };

  const formatLastRun = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getHealthyCount = () => monitors.filter(m => m.status === 'healthy').length;
  const getFailedCount = () => monitors.filter(m => m.status === 'failed').length;
  const getRunningCount = () => monitors.filter(m => m.status === 'running').length;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message={t('system_health_error')}
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title={t('system_health_monitoring')}>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Statistic
              title={t('healthy_scripts')}
              value={getHealthyCount()}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title={t('running_scripts')}
              value={getRunningCount()}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title={t('failed_scripts')}
              value={getFailedCount()}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<CloseCircleOutlined />}
            />
          </Col>
        </Row>
      </Card>

      <Card title={t('script_status')}>
        <List
          dataSource={monitors}
          renderItem={(monitor) => (
            <List.Item
              actions={[
                <Tag color={getStatusColor(monitor.status)}>
                  {getStatusIcon(monitor.status)}
                  <span style={{ marginLeft: 4 }}>{getStatusText(monitor.status)}</span>
                </Tag>
              ]}
            >
              <List.Item.Meta
                title={monitor.scriptName}
                description={`${t('last_run')}: ${formatLastRun(monitor.lastRun)}`}
              />
            </List.Item>
          )}
          locale={{
            emptyText: t('no_scripts_found')
          }}
        />
      </Card>

      {getFailedCount() > 0 && (
        <Alert
          message={t('system_alerts')}
          description={`${getFailedCount()} ${t('scripts_require_attention')}`}
          type="warning"
          showIcon
        />
      )}
    </Space>
  );
};

SystemHealth.propTypes = {};

export default SystemHealth;
