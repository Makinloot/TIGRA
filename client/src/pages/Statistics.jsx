import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Typography, Row, Col, Card, Table, Divider, Tabs, Statistic, Spin, Alert } from 'antd';
import { ArrowUpOutlined, ShoppingOutlined, GlobalOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Import components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import chart components
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import LiveContainerTracker from '../components/Maps/LiveContainerTracker';

// Import mock data
import {
  monthlySales,
  categoryDistribution,
  routeDynamics,
  activeContainers
} from '../mocks/_mockData';

const { Content } = Layout;
const { Title } = Typography;

const Statistics = ({ isDark, onThemeToggle }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/statistics/overview
  // Expected Data: Object with key metrics and loading states

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const keyMetrics = [
    {
      title: t('statistics.totalSales'),
      value: '₾1,200,000',
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      change: '+12%'
    },
    {
      title: t('statistics.activeAuctions'),
      value: '54',
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      change: '+8%'
    },
    {
      title: t('statistics.activeRoutes'),
      value: '18',
      icon: <GlobalOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      change: '+15%'
    },
    {
      title: t('statistics.avgDeliveryTime'),
      value: '9 დღე',
      icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#f5222d' }} />,
      change: '-5%'
    }
  ];

  const tableColumns = [
    {
      title: t('logistics.containerId'),
      dataIndex: 'Container ID',
      key: 'containerId',
    },
    {
      title: t('common.status'),
      dataIndex: 'Status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          'In Transit': 'blue',
          'Loading': 'orange',
          'Delivered': 'green'
        };
        const statusTranslations = {
          'In Transit': t('auctionStatus.inTransit'),
          'Loading': t('auctionStatus.loading'),
          'Delivered': t('logistics.complete')
        };
        return <span style={{ color: statusColors[status] || 'gray' }}>{statusTranslations[status] || status}</span>;
      }
    },
    {
      title: t('logistics.departurePoint'),
      dataIndex: 'Origin',
      key: 'origin',
    },
    {
      title: t('logistics.destination'),
      dataIndex: 'Destination',
      key: 'destination',
    },
    {
      title: t('logistics.eta'),
      dataIndex: 'ETA',
      key: 'eta',
    }
  ];

  const chartTabs = [
    {
      key: '1',
      label: t('statistics.sales'),
      children: <LineChart data={monthlySales} loading={loading} />
    },
    {
      key: '2',
      label: t('statistics.categories'),
      children: <PieChart data={categoryDistribution} loading={loading} />
    },
    {
      key: '3',
      label: t('statistics.routes'),
      children: <BarChart data={routeDynamics} loading={loading} />
    }
  ];

  return (
    <>
      <Helmet>
        <title>სტატისტიკა - AutoMarketLogistic</title>
        <meta name="description" content="სრული ანალიტიკა და შეხედულებები ავტომობილების აუქციონებისა და ლოგისტიკის ოპერაციებისთვის" />
      </Helmet>

      <Header isDark={isDark} onThemeToggle={onThemeToggle} />

      <Content style={{ padding: '120px 24px 24px 24px', backgroundColor: isDark ? '#141414' : '#f5f5f5' }}>
        <div className="full-width-section">
          {/* Key Metrics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
            {keyMetrics.map((metric, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card
                  style={{
                    textAlign: 'center',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  hoverable
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#f5f5f5'
                    }}>
                      {metric.icon}
                    </div>

                    <Statistic
                      title={metric.title}
                      value={metric.value}
                      valueStyle={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#1890ff'
                      }}
                    />

                    <div style={{
                      fontSize: '14px',
                      color: metric.change.startsWith('+') ? '#52c41a' : '#f5222d',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <ArrowUpOutlined
                        style={{
                          marginRight: '4px',
                          transform: metric.change.startsWith('+') ? 'none' : 'rotate(180deg)'
                        }}
                      />
                      {metric.change}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider>{t('statistics.analytics')}</Divider>

          {/* Charts Section */}
          <Card
            style={{
              marginBottom: '32px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <Tabs
              defaultActiveKey="1"
              items={chartTabs}
              size="large"
            />
          </Card>

          <Divider>{t('statistics.logistics')}</Divider>

          {/* Logistics Section */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card
                title={t('logistics.activeContainers')}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <Table
                  columns={tableColumns}
                  dataSource={activeContainers}
                  pagination={false}
                  size="small"
                  scroll={{ x: 600 }}
                />

                <Alert
                  message={t('logistics.realTimeUpdates')}
                  description={t('logistics.dataUpdates')}
                  type="info"
                  showIcon
                  style={{ marginTop: '16px' }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <LiveContainerTracker loading={loading} />
            </Col>
          </Row>
        </div>
      </Content>

      <Footer />
    </>
  );
};

Statistics.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
};

export default Statistics;
