import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin, Alert, Empty, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AuctionCardList from '../../components/AuctionCardList';
import { mockItems } from '../../mocks/_mockData';

const { Content } = Layout;
const { Title, Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/auctions/items
// Expected Data: Array of auction items with isAuction: true
const fetchAuctionItems = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Filter for auction items
  return mockItems.filter(item => item.isAuction);
};

const AuctionsPage = ({ isDark, onThemeToggle }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuctionItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const auctionItems = await fetchAuctionItems();
        setItems(auctionItems);
      } catch (err) {
        setError('Failed to load auction items. Please try again.');
        console.error('Error loading auction items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAuctionItems();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>{t('loading_auctions')}</Text>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert
          message={t('error')}
          description={error}
          type="error"
          showIcon
          style={{ margin: '20px 0' }}
        />
      );
    }

    if (items.length === 0) {
      return (
        <Empty
          description={t('no_auctions_found')}
          style={{ margin: '50px 0' }}
        />
      );
    }

  return (
    <AuctionCardList auctions={items} showTitle={false} />
  );
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Auctions - AutoMarketLogistic</title>
        <meta
          name="description"
          content="Participate in live vehicle auctions. Bid on premium cars with real-time updates and competitive pricing."
        />
        <meta name="keywords" content="car auctions, vehicle auctions, live bidding, auto auctions, bid on cars" />
        <meta property="og:title" content="Live Vehicle Auctions - AutoMarketLogistic" />
        <meta property="og:description" content="Join live auctions and bid on premium vehicles worldwide." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://automarketlogistic.com/auctions" />
      </Helmet>

      {/* Header */}
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />

      <Layout className="responsive-layout-padding fade-in-content">
        {/* Main Content */}
        <Content style={{ padding: '64px 0' }}>
          {renderContent()}
        </Content>

        {/* Footer */}
        <Footer />
      </Layout>

    </>
  );
};

AuctionsPage.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired
};

export default AuctionsPage;
