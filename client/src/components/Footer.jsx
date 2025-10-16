import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider, Button } from 'antd';
import { GlobalOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import { footerLinks } from '../mocks/_mockData';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: <FacebookOutlined />, key: 'facebook' },
    { icon: <TwitterOutlined />, key: 'twitter' },
    { icon: <LinkedinOutlined />, key: 'linkedin' },
    { icon: <InstagramOutlined />, key: 'instagram' }
  ];

  return (
    <AntFooter
      style={{
        backgroundColor: '#1f1f1f',
        color: 'white',
        height: 120,
        padding: '40px 0 20px' /* TODO-FX: Adjusted vertical padding to fit 120px height, horizontal padding inherited from responsive-layout-padding */
      }}
    >
      <div style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          {/* Company Info */}
          <Col xs={24} md={8}>
            <Space direction="vertical" size="large">
              <div>
                <Title level={3} style={{ color: 'white', margin: '0 0 12px 0' }}>
                  AutoAuction
                </Title>
                <Text style={{ color: '#a6a6a6', lineHeight: 1.6 }}>
                  Smart Auto Auctions. Global Logistics. Connecting buyers and sellers worldwide with AI-powered auction and logistics solutions.
                </Text>
              </div>

              {/* Social Media */}
              <Space size="middle">
                {socialIcons.map((social) => (
                  <Button
                    key={social.key}
                    type="text"
                    icon={social.icon}
                    style={{
                      color: '#a6a6a6',
                      border: '1px solid #404040',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px'
                    }}
                    onClick={() => console.log('Social media clicked:', social.key)}
                  />
                ))}
              </Space>
            </Space>
          </Col>

          {/* Links */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'white', marginBottom: '24px' }}>
              Quick Links
            </Title>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  style={{
                    color: '#a6a6a6',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '4px 0',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = '#a6a6a6'}
                >
                  {link.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Language & Contact */}
          <Col xs={24} md={8}>
            <Space direction="vertical" size="large">
              {/* Language Switcher */}
              <div>
                <Title level={4} style={{ color: 'white', marginBottom: '12px' }}>
                  Language
                </Title>
                <Button
                  type="text"
                  icon={<GlobalOutlined />}
                  style={{
                    color: '#a6a6a6',
                    padding: '8px 16px',
                    border: '1px solid #404040',
                    borderRadius: '6px'
                  }}
                  onClick={() => console.log('Language switcher clicked')}
                >
                  EN / RU
                </Button>
              </div>

              {/* Contact Info */}
              <div>
                <Title level={4} style={{ color: 'white', marginBottom: '12px' }}>
                  Contact
                </Title>
                <Space direction="vertical" size="small">
                  <Text style={{ color: '#a6a6a6' }}>
                    support@autoauction.com
                  </Text>
                  <Text style={{ color: '#a6a6a6' }}>
                    1-800-AUTO-AUC
                  </Text>
                  <Text style={{ color: '#a6a6a6' }}>
                    Mon-Fri: 8AM-8PM EST
                  </Text>
                </Space>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#404040', margin: '48px 0 24px' }} />

        {/* Compliance & Copyright */}
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Space direction="vertical" size="small">
              <Text style={{ color: '#666', fontSize: '12px', lineHeight: 1.5 }}>
                © {currentYear} AutoAuction Logistics Platform. All rights reserved.
              </Text>
              <Text style={{ color: '#666', fontSize: '12px', lineHeight: 1.5 }}>
                Licensed auction company. All vehicle sales are subject to our terms and conditions.
                Vehicle history reports provided by third-party services.
              </Text>
            </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Space size="large">
              <Text style={{ color: '#666', fontSize: '12px' }}>
                SEC Filings
              </Text>
              <Text style={{ color: '#666', fontSize: '12px' }}>
                Privacy Shield Certified
              </Text>
              <Text style={{ color: '#666', fontSize: '12px' }}>
                SOC 2 Type II Compliant
              </Text>
            </Space>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;
