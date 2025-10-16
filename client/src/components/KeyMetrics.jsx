import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import PropTypes from 'prop-types';

const KeyMetrics = ({ keyMetrics }) => {
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
                styles={{ body: { padding: '16px' } }}
                hoverable
              >
                <Statistic
                  title={metric.title}
                  value={metric.value}
                  valueStyle={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1890ff'
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
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
