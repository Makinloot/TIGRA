import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const Partners = ({ partners }) => {
  return (
    <div id="partners-section" style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            Trusted by Industry Leaders
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Partnering with the world's most trusted logistics and insurance companies
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          {partners.map((partner, index) => (
            <Col xs={12} sm={8} md={6} lg={4} xl={4} xxl={4} key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  backgroundColor: '#fafafa',
                  borderRadius: '12px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  minHeight: '80px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={() => console.log('Partner clicked:', partner.name)}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{
                    maxWidth: '120px',
                    maxHeight: '60px',
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = 'grayscale(100%)';
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: '48px 0' }} />

        <div style={{ textAlign: 'center' }}>
          <Text style={{ color: '#666', fontSize: '14px' }}>
            Our platform integrates with industry-standard systems to ensure seamless operations and maximum security.
          </Text>
        </div>
      </div>
    </div>
  );
};

Partners.propTypes = {
  partners: PropTypes.array.isRequired,
};

export default Partners;
