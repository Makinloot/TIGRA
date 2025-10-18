import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Row, Col, Select, Button, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  PhoneOutlined,
  MailOutlined,
  InfoCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const PublicLayout = () => {
  const handleLanguageChange = (lang) => {
    // TODO-FX: Connect to i18n library and replace with real language switching.
    // API Endpoint: POST /api/user/language
    // Expected Data: { language: string }
    console.log(`Language changed to: ${lang}`);
  };

  const languageOptions = [
    {
      label: '🇬🇪 ქართული',
      value: 'ka',
      key: 'ka'
    },
    {
      label: '🇬🇧 English',
      value: 'en',
      key: 'en'
    }
  ];

  const handleContactClick = () => {
    // TODO-FX: Implement contact functionality
    // Could open a modal, navigate to contact page, or show contact info
    console.log('Contact clicked');
  };

  const handleAboutClick = () => {
    // TODO-FX: Navigate to about page or show about modal
    console.log('About clicked');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            {/* Company Logo - Links back to main site */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png"
                alt="AutoAuction Logo"
                style={{
                  maxHeight: '48px',
                  objectFit: 'contain'
                }}
              />
            </Link>
          </Col>

          <Col>
            {/* Navigation Buttons */}
            <Space size="large">
              <Button
                type="text"
                icon={<HomeOutlined />}
                onClick={() => window.location.href = '/'}
                style={{ fontWeight: '500' }}
              >
                {t('home')}
              </Button>
              <Button
                type="text"
                icon={<InfoCircleOutlined />}
                onClick={handleAboutClick}
                style={{ fontWeight: '500' }}
              >
                {t('about')}
              </Button>
              <Button
                type="text"
                icon={<PhoneOutlined />}
                onClick={handleContactClick}
                style={{ fontWeight: '500' }}
              >
                {t('contact')}
              </Button>
            </Space>
          </Col>

          <Col>
            {/* Language Switcher */}
            <Select
              defaultValue="en"
              onChange={handleLanguageChange}
              options={languageOptions}
              style={{ width: 140 }}
              size="small"
              aria-label={t('language')}
            />
          </Col>
        </Row>
      </Header>

      <Content
        style={{
          padding: '24px',
          background: '#f5f5f5',
          minHeight: 'calc(100vh - 64px - 200px)' // Account for footer
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          background: '#001529',
          color: '#fff',
          padding: '40px 24px 20px'
        }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div style={{ marginBottom: '16px' }}>
              <img
                src="/logo.png"
                alt="AutoAuction Logo"
                style={{
                  maxHeight: '40px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </div>
            <p style={{ color: '#ccc', marginBottom: '16px' }}>
              {t('professional_vehicle_transportation_services')}
            </p>
            <p style={{ color: '#ccc', fontSize: '14px' }}>
              {t('trusted_by_thousands_of_customers_worldwide')}
            </p>
          </Col>

          <Col xs={24} md={8}>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '16px' }}>
              {t('quick_links')}
            </h4>
            <Space direction="vertical" size="small">
              <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>
                {t('home')}
              </Link>
              <Link to="/auctions" style={{ color: '#ccc', textDecoration: 'none' }}>
                {t('auctions')}
              </Link>
              <Link to="/catalog" style={{ color: '#ccc', textDecoration: 'none' }}>
                {t('vehicle_catalog')}
              </Link>
              <Link to="/statistics" style={{ color: '#ccc', textDecoration: 'none' }}>
                {t('statistics')}
              </Link>
            </Space>
          </Col>

          <Col xs={24} md={8}>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '16px' }}>
              {t('contact_information')}
            </h4>
            <Space direction="vertical" size="small">
              <div style={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
                <PhoneOutlined style={{ marginRight: '8px' }} />
                <span>+995 555 123 456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
                <MailOutlined style={{ marginRight: '8px' }} />
                <span>support@autoauction.ge</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', color: '#ccc' }}>
                <HomeOutlined style={{ marginRight: '8px', marginTop: '4px' }} />
                <span>
                  Tbilisi, Georgia<br />
                  24/7 Customer Support
                </span>
              </div>
            </Space>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid #444',
            marginTop: '32px',
            paddingTop: '20px',
            textAlign: 'center',
            color: '#888',
            fontSize: '14px'
          }}
        >
          <p>
            © 2025 AutoAuction. {t('all_rights_reserved')}.
            <span style={{ marginLeft: '16px' }}>
              <a href="#" style={{ color: '#888', textDecoration: 'none', margin: '0 8px' }}>
                {t('privacy_policy')}
              </a>
              |
              <a href="#" style={{ color: '#888', textDecoration: 'none', margin: '0 8px' }}>
                {t('terms_of_service')}
              </a>
            </span>
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

PublicLayout.propTypes = {};

export default PublicLayout;
