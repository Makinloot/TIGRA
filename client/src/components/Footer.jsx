import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Typography, Space, Button, Divider } from 'antd';
import {
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { footerConfig } from '../mocks/_mockData';
import { t } from '../i18n';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

// TODO-FX: Connect to i18n library.
const translate = (key) => t(key);

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/footer/config
// Expected Data: Footer configuration with brand, navigation, resources, and contact sections

const Footer = () => {
  const socialIconMap = {
    twitter: <TwitterOutlined />,
    linkedin: <LinkedinOutlined />,
    youtube: <YoutubeOutlined />
  };

  const renderBrandSection = () => (
    <div>
      <Title level={3} style={{ color: 'white', margin: '0 0 16px 0' }}>
        {footerConfig.brand.title}
      </Title>
      <Space direction="vertical" size="small" style={{ marginBottom: '24px' }}>
        <Text style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>
          {footerConfig.brand.tagline}
        </Text>
        <Text style={{ color: '#64748b', lineHeight: 1.6, fontSize: '14px' }}>
          {footerConfig.brand.description}
        </Text>
      </Space>

      {/* Social Media Links */}
      <Space size="middle">
        {footerConfig.brand.socialLinks.map((social) => (
          <Button
            key={social.icon}
            type="text"
            icon={socialIconMap[social.icon]}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            style={{
              color: '#64748b',
              border: '1px solid #475569',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#60a5fa';
              e.target.style.borderColor = '#60a5fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#64748b';
              e.target.style.borderColor = '#475569';
            }}
          />
        ))}
      </Space>
    </div>
  );

  const renderNavigationSection = () => (
    <div>
      <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
        {translate('platform')}
      </Title>
      <Space direction="vertical" size="small">
        {footerConfig.navigation.links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'block',
              padding: '4px 0',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
            onMouseLeave={(e) => e.target.style.color = '#64748b'}
          >
            {link.label}
          </Link>
        ))}
      </Space>
    </div>
  );

  const renderResourcesSection = () => (
    <div>
      <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
        {translate('resources')}
      </Title>
      <Space direction="vertical" size="small">
        {footerConfig.resources.links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            style={{
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'block',
              padding: '4px 0',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
            onMouseLeave={(e) => e.target.style.color = '#64748b'}
          >
            {link.label}
          </Link>
        ))}
      </Space>
    </div>
  );

  const renderContactSection = () => (
    <div>
      <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
        {translate('contact')}
      </Title>
      <Space direction="vertical" size="small" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <EnvironmentOutlined style={{ color: '#64748b', marginTop: '2px' }} />
          <Text style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5 }}>
            {footerConfig.contact.address}
          </Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneOutlined style={{ color: '#64748b' }} />
          <Text style={{ color: '#64748b', fontSize: '14px' }}>
            {footerConfig.contact.phone}
          </Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MailOutlined style={{ color: '#64748b' }} />
          <Text style={{ color: '#64748b', fontSize: '14px' }}>
            {footerConfig.contact.email}
          </Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <ClockCircleOutlined style={{ color: '#64748b', marginTop: '2px' }} />
          <Text style={{ color: '#64748b', fontSize: '14px' }}>
            {footerConfig.contact.hours}
          </Text>
        </div>
      </Space>

      <Button
        type="primary"
        icon={<MailOutlined />}
        href={footerConfig.contact.cta.url}
        style={{
          backgroundColor: '#2563eb',
          borderColor: '#2563eb',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#1d4ed8';
          e.target.style.borderColor = '#1d4ed8';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#2563eb';
          e.target.style.borderColor = '#2563eb';
        }}
      >
        {translate('get_a_quote')}
      </Button>
    </div>
  );

  return (
    <>
      {/* Schema markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify([
          footerConfig.brand.schemaMarkup,
          footerConfig.navigation.schemaMarkup,
          footerConfig.contact.schemaMarkup,
          footerConfig.resources.richSnippet
        ])}
      </script>

      <AntFooter
        style={{
          backgroundColor: '#0f172a',
          color: '#f1f5f9',
          padding: '64px 0 32px',
          borderTop: '1px solid #334155'
        }}
        role="contentinfo"
        aria-label="Site footer"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[32, 48]}>
            {/* Brand Section */}
            <Col xs={24} md={12} lg={6}>
              {renderBrandSection()}
            </Col>

            {/* Navigation Section */}
            <Col xs={24} md={6} lg={6}>
              {renderNavigationSection()}
            </Col>

            {/* Resources Section */}
            <Col xs={24} md={6} lg={6}>
              {renderResourcesSection()}
            </Col>

            {/* Contact Section */}
            <Col xs={24} md={12} lg={6}>
              {renderContactSection()}
            </Col>
          </Row>

          <Divider style={{ borderColor: '#334155', margin: '48px 0 32px' }} />

          {/* Subfooter */}
          <Row gutter={[24, 24]} align="middle" justify="space-between">
            <Col xs={24} md={12}>
              <Text style={{ color: '#64748b', fontSize: '14px' }}>
                {footerConfig.subfooter.copyright}
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Space size="large" style={{ float: 'right' }}>
                {footerConfig.subfooter.links.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    style={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.target.style.color = '#64748b'}
                  >
                    {link.label}
                  </Link>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      </AntFooter>
    </>
  );
};

Footer.propTypes = {
  // No props required for this component as it uses mock data
};

export default Footer;
