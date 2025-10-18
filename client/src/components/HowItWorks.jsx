import React from 'react';
import { Row, Col, Card, Typography, Space } from 'antd';
import { SearchOutlined, SafetyOutlined, TruckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <SearchOutlined style={{ fontSize: '20px', color: '#1890ff' }} />,
      title: t('howItWorks.steps.browse.title'),
      description: t('howItWorks.steps.browse.description'),
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      alt: t('howItWorks.steps.browse.alt')
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '20px', color: '#52c41a' }} />,
      title: t('howItWorks.steps.bid.title'),
      description: t('howItWorks.steps.bid.description'),
      image: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      alt: t('howItWorks.steps.bid.alt')
    },
    {
      icon: <TruckOutlined style={{ fontSize: '20px', color: '#faad14' }} />,
      title: t('howItWorks.steps.shipping.title'),
      description: t('howItWorks.steps.shipping.description'),
      image: "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      alt: t('howItWorks.steps.shipping.alt')
    }
  ];
  return (
    <div id="how-it-works-section" style={{ padding: '40px 0', backgroundColor: 'white' }}>
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px', fontSize: '24px' }}>
            {t('howItWorks.title')}
          </Title>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            {t('howItWorks.subtitle')}
          </Text>
        </div>

        <Row gutter={[12, 12]}>
          {steps.map((step, index) => (
            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} key={index}>
              <Card
                style={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
                styles={{ body: { padding: '24px 16px' } }}
                hoverable
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  {/* Step illustration image */}
                  <div style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '16px'
                  }}>
                    <img
                      src={step.image}
                      alt={step.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    margin: '0 auto'
                  }}>
                    {step.icon}
                  </div>

                  <div>
                    <Title level={4} style={{ marginBottom: '4px', fontSize: '16px' }}>
                      {step.title}
                    </Title>
                    <Text style={{ color: '#666', lineHeight: 1.4, fontSize: '14px' }}>
                      {step.description}
                    </Text>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    margin: '0 auto'
                  }}>
                    {index + 1}
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HowItWorks;
