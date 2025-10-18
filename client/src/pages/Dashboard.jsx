import React, { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { Layout, Typography, Row, Col, Card, Avatar, Button, Table, Tabs, Statistic, Spin, Space } from 'antd';
import { UserOutlined, EditOutlined, CarOutlined, ClockCircleOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Import Header and Footer components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import chart component for dealer stats
import LineChart from '../components/Charts/LineChart';


// Import mock data
import {
  mockUserProfile,
  userBids,
  deliveryTimeline,
  dealerListings,
  clients,
  dealerStats,
  dealerDeliveryStatus
} from '../mocks/_mockData';

const { Content } = Layout;
const { Title, Text } = Typography;

// TODO-FX: Create proper authentication context
// For now, we'll use a simple context to manage user role
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  // TODO-FX: Replace with real authentication logic
  // For demo purposes, we'll default to 'user' role
  const [user, setUser] = useState(mockUserProfile);

  const switchRole = (role) => {
    setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Profile Card Component
const ProfileCard = ({ user }) => {
  const { t: translate } = useTranslation();

  return (
    <Card
      style={{
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: '24px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar
          size={64}
          src={user.avatar}
          icon={<UserOutlined />}
        />
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0, marginBottom: '4px' }}>
            {user.name}
          </Title>
          <Text type="secondary">{user.email}</Text>
        </div>
        <Button
          type="link"
          icon={<EditOutlined />}
          style={{ alignSelf: 'flex-start' }}
        >
          {translate('dashboard.editProfile')}
        </Button>
      </div>
    </Card>
  );
};

// User Dashboard Layout
const UserDashboard = () => {
  const { t: translate } = useTranslation();

  const bidColumns = [
    {
      title: translate('dashboard.lotId'),
      dataIndex: 'lotId',
      key: 'lotId',
    },
    {
      title: translate('dashboard.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: translate('dashboard.currentBid'),
      dataIndex: 'currentBid',
      key: 'currentBid',
      render: (value) => `₾${value.toLocaleString()}`
    },
    {
      title: translate('dashboard.myBid'),
      dataIndex: 'myBid',
      key: 'myBid',
      render: (value) => `₾${value.toLocaleString()}`
    },
    {
      title: translate('dashboard.timeLeft'),
      dataIndex: 'timeLeft',
      key: 'timeLeft',
    },
    {
      title: translate('dashboard.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{
          color: status === 'Leading' ? '#52c41a' : '#faad14',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      )
    }
  ];

  return (
    <>
      <Title level={3} style={{ marginBottom: '24px' }}>
        {translate('dashboard.myDashboard')}
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card
            title={translate('dashboard.delivery')}
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px 0' }}>
              {deliveryTimeline.map((item) => (
                <Card
                  key={item.key}
                  size="small"
                  style={{
                    borderRadius: '6px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <Title level={5} style={{ margin: 0, marginBottom: '1px', fontSize: '13px' }}>
                        {item.vehicle}
                      </Title>
                      <Text
                        style={{
                          color: item.status === 'done' ? '#52c41a' :
                                 item.status === 'customs' ? '#faad14' :
                                 item.status === 'georgia' ? '#1890ff' : '#d9d9d9',
                          fontWeight: 'bold',
                          fontSize: '11px'
                        }}
                      >
                        {item.status === 'done' ? 'დასრულებული' :
                         item.status === 'customs' ? 'საბაჟოზე' :
                         item.status === 'georgia' ? 'მოდის საქართველოში' :
                         item.status === 'warehouse' ? 'საწყობში' : item.status}
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {item.progress.map((step, index) => (
                      <div
                        key={step.stage}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          backgroundColor: step.completed ? '#f6ffed' : '#fafafa',
                          border: `1px solid ${step.completed ? '#b7eb8f' : '#d9d9d9'}`,
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: step.completed ? '#52c41a' : '#d9d9d9',
                            marginRight: '8px',
                            flexShrink: 0
                          }}
                        />
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {step.completed && step.date && (
                            <Text
                              style={{
                                fontSize: '10px',
                                color: '#999',
                                flexShrink: 0,
                                minWidth: '60px'
                              }}
                            >
                              {new Date(step.date).toLocaleDateString('ka-GE')}
                            </Text>
                          )}
                          <div style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontSize: '12px',
                                fontWeight: step.completed ? 'bold' : 'normal',
                                color: step.completed ? '#52c41a' : '#666',
                                lineHeight: '1.2'
                              }}
                            >
                              {step.stage === 'warehouse' ? 'საწყობში' :
                               step.stage === 'georgia' ? 'საქართველოში' :
                               step.stage === 'customs' ? 'საბაჟოზე' :
                               step.stage === 'delivered' ? 'დასრულებული' : step.label}
                            </Text>
                          </div>
                        </div>

                        {/* Connection line to next step */}
                        {index < item.progress.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '-12px',
                              left: '18px',
                              width: '2px',
                              height: '12px',
                              backgroundColor: item.progress[index + 1].completed ? '#52c41a' : '#d9d9d9'
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card
            title={translate('dashboard.myAuctions')}
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <Table
              columns={bidColumns}
              dataSource={userBids}
              pagination={false}
              size="small"
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>

    </>
  );
};

// Dealer Dashboard Layout
const DealerDashboard = () => {
  const { t: translate } = useTranslation();

  const listingColumns = [
    {
      title: translate('dashboard.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: translate('dashboard.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{
          color: status === 'Active' ? '#52c41a' : '#d9d9d9',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      )
    },
    {
      title: translate('dashboard.bids'),
      dataIndex: 'bids',
      key: 'bids',
    },
    {
      title: translate('dashboard.currentBid'),
      dataIndex: 'currentBid',
      key: 'currentBid',
      render: (value) => value ? `₾${value.toLocaleString()}` : '-'
    },
    {
      title: translate('dashboard.endTime'),
      dataIndex: 'endTime',
      key: 'endTime',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  const clientColumns = [
    {
      title: translate('dashboard.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: translate('dashboard.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: translate('dashboard.vehicles'),
      dataIndex: 'vehicles',
      key: 'vehicles',
    },
    {
      title: translate('dashboard.lastActivity'),
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  const dealerTabs = [
    {
      key: '1',
      label: translate('dashboard.myListings'),
      children: (
        <Table
          columns={listingColumns}
          dataSource={dealerListings}
          pagination={false}
          size="small"
          scroll={{ x: 600 }}
        />
      )
    },
    {
      key: '2',
      label: translate('dashboard.clients'),
      children: (
        <Table
          columns={clientColumns}
          dataSource={clients}
          pagination={false}
          size="small"
          scroll={{ x: 600 }}
        />
      )
    },
    {
      key: '3',
      label: translate('dashboard.reports'),
      children: (
        <div style={{ height: '400px' }}>
          <LineChart data={dealerStats} />
        </div>
      )
    },
    {
      key: '4',
      label: 'მიწოდება',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dealerDeliveryStatus.map((item) => (
            <Card
              key={item.key}
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                    {item.vehicle}
                  </Title>
                  <Text type="secondary">{translate('dashboard.buyer')}: {item.buyer}</Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text
                    style={{
                      color: item.status === 'done' ? '#52c41a' :
                             item.status === 'customs' ? '#faad14' :
                             item.status === 'georgia' ? '#1890ff' : '#d9d9d9',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.status === 'done' ? 'დასრულებული' :
                     item.status === 'customs' ? 'საბაჟოზე' :
                     item.status === 'georgia' ? 'მოდის საქართველოში' :
                     item.status === 'warehouse' ? 'საწყობში' : item.status}
                  </Text>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.progress.map((step, index) => (
                  <div
                    key={step.stage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      backgroundColor: step.completed ? '#f6ffed' : '#fafafa',
                      border: `2px solid ${step.completed ? '#b7eb8f' : '#d9d9d9'}`,
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: step.completed ? '#52c41a' : '#d9d9d9',
                        marginRight: '10px',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {step.completed && step.date && (
                        <Text
                          style={{
                            fontSize: '11px',
                            color: '#999',
                            flexShrink: 0,
                            minWidth: '70px'
                          }}
                        >
                          {new Date(step.date).toLocaleDateString('ka-GE')}
                        </Text>
                      )}
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: '13px',
                            fontWeight: step.completed ? 'bold' : 'normal',
                            color: step.completed ? '#52c41a' : '#666',
                            lineHeight: '1.3'
                          }}
                        >
                          {step.stage === 'warehouse' ? 'საწყობში' :
                           step.stage === 'georgia' ? 'საქართველოში' :
                           step.stage === 'customs' ? 'საბაჟოზე' :
                           step.stage === 'delivered' ? 'დასრულებული' : step.label}
                        </Text>
                      </div>
                    </div>

                    {/* Connection line to next step */}
                    {index < item.progress.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-12px',
                          left: '18px',
                          width: '2px',
                          height: '12px',
                          backgroundColor: item.progress[index + 1].completed ? '#52c41a' : '#d9d9d9'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <>
      <Title level={3} style={{ marginBottom: '24px' }}>
        {translate('dashboard.dealerDashboard')}
      </Title>

      {/* Key Metrics for Dealer */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title={translate('dashboard.totalSales')}
              value={1250000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1890ff' }}
              formatter={(value) => `₾${(value / 1000).toFixed(0)}k`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title={translate('dashboard.activeListings')}
              value={15}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title={translate('dashboard.totalClients')}
              value={8}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={dealerTabs}
          size="large"
        />
      </Card>
    </>
  );
};

const DashboardContent = ({ isDark }) => {
  const { t: translate } = useTranslation();
  const { user, switchRole } = useAuth();

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/user/profile
  // Expected Data: User profile object with role information

  return (
    <>
      <Helmet>
        <title>{translate('dashboard.title')} - AutoMarketLogistic</title>
        <meta name="description" content={translate('dashboard.description')} />
      </Helmet>

      <Content style={{ padding: '24px', backgroundColor: isDark ? '#141414' : '#f5f5f5' }}>
        <div className="full-width-section">
          {/* Demo Role Switcher - TODO: Remove in production */}
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <Space.Compact>
              <Button
                type={user.role === 'user' ? 'primary' : 'default'}
                onClick={() => switchRole('user')}
              >
                {translate('dashboard.userView')}
              </Button>
              <Button
                type={user.role === 'dealer' ? 'primary' : 'default'}
                onClick={() => switchRole('dealer')}
              >
                {translate('dashboard.dealerView')}
              </Button>
            </Space.Compact>
          </div>

          <Row gutter={[24, 48]}>
            <Col span={24}>
              {/* Profile Card */}
              <ProfileCard user={user} />

              {/* Role-based Dashboard Content */}
              {user.role === 'user' ? <UserDashboard /> : <DealerDashboard />}
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

DashboardContent.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

const Dashboard = ({ isDark, onThemeToggle }) => {
  return (
    <AuthProvider>
      {/* Header - positioned outside Layout for proper sticky behavior */}
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />

      <Layout className="responsive-layout-padding fade-in-content" style={{
        minHeight: '100vh',
        width: '100vw',
        minWidth: '100%',
        margin: '0',
        padding: 'var(--header-height, 64px) 0 0 0',
        overflowX: 'hidden'
      }}>
        <DashboardContent isDark={isDark} />

        {/* Footer */}
        <Footer />
      </Layout>
    </AuthProvider>
  );
};

Dashboard.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
};

export default Dashboard;
