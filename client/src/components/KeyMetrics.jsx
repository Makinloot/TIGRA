import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { CarOutlined, CheckCircleOutlined, TruckOutlined, DollarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const KeyMetrics = ({ keyMetrics }) => {
  const getMetricIcon = (title) => {
    const iconStyle = { fontSize: '32px', color: '#1890ff' };

    switch (title) {
      case 'Active Auctions':
        return <DollarOutlined style={iconStyle} />;
      case 'Vehicles Listed':
        return <CarOutlined style={iconStyle} />;
      case 'Delivered Vehicles':
        return <CheckCircleOutlined style={{ ...iconStyle, color: '#52c41a' }} />;
      case 'Partner Carriers':
        return <TruckOutlined style={{ ...iconStyle, color: '#faad14' }} />;
      default:
        return <CarOutlined style={iconStyle} />;
    }
  };

  return (
    <div id="key-metrics-section" style={{ backgroundColor: 'white', padding: '40px 0' }} className="ultra-compact-section-spacing">
      <div className="full-width-section">
        <Row gutter={[12, 12]}>
          {keyMetrics.map((metric, index) => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} key={index}>
              <Card
                style={{
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}
                styles={{ body: { padding: '24px 16px' } }}
                hoverable
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {/* Metric Icon */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e6f7ff';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >
                    {getMetricIcon(metric.title)}
                  </div>

                  {/* Metric Statistic */}
                  <Statistic
                    title={metric.title}
                    value={metric.value}
                    valueStyle={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#1890ff'
                    }}
                    formatter={(value) => value.toLocaleString()}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

KeyMetrics.propTypes = {
  keyMetrics: PropTypes.array.isRequired,
};

export default KeyMetrics;
