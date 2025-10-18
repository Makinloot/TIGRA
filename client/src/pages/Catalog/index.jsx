import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Spin, Alert, Empty, Card, Button, Typography, Affix, Drawer, FloatButton } from 'antd';
const { Text } = Typography;
import { FilterOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CatalogFilters from '../../components/CatalogFilters';
import AuctionCard2025 from '../../components/AuctionCard2025';
import AuctionQuickViewModal from '../../components/AuctionQuickViewModal';
import { mockItems } from '../../mocks/_mockData';

const { Content } = Layout;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// TODO-FX: Replace with real API call.
// API Endpoint: GET /api/catalog/items
// Expected Data: Array of catalog items with isAuction: false
const fetchCatalogItems = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Filter for catalog items (non-auction items)
  return mockItems.filter(item => !item.isAuction);
};

const CatalogPage = ({ isDark, onThemeToggle }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    filters: {
      brand: [],
      model: [],
      year: [],
      priceRange: [0, 100000],
      bodyType: [],
      condition: [],
      vin: ''
    },
    sortBy: 'relevance'
  });

  useEffect(() => {
    const loadCatalogItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const catalogItems = await fetchCatalogItems();
        setItems(catalogItems);
      } catch (err) {
        setError('Failed to load catalog items. Please try again.');
        console.error('Error loading catalog items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCatalogItems();
  }, []);

  // Filter and sort items based on search criteria
  const filteredItems = useMemo(() => {
    let filtered = items.filter(item => {
      // Search text filter
      if (searchFilters.search) {
        const searchLower = searchFilters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(searchLower);
        const matchesDescription = item.description?.toLowerCase().includes(searchLower);
        const matchesLocation = item.location?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesDescription && !matchesLocation) {
          return false;
        }
      }

      // Brand filter
      if (searchFilters.filters.brand.length > 0) {
        if (!searchFilters.filters.brand.includes(item.brand)) {
          return false;
        }
      }

      // Model filter
      if (searchFilters.filters.model.length > 0) {
        if (!searchFilters.filters.model.includes(item.model)) {
          return false;
        }
      }

      // Year filter
      if (searchFilters.filters.year.length > 0) {
        if (!searchFilters.filters.year.includes(item.year)) {
          return false;
        }
      }

      // Price range filter
      if (item.currentBid < searchFilters.filters.priceRange[0] ||
          item.currentBid > searchFilters.filters.priceRange[1]) {
        return false;
      }

      // Body type filter
      if (searchFilters.filters.bodyType.length > 0) {
        if (!searchFilters.filters.bodyType.includes(item.bodyType)) {
          return false;
        }
      }

      // Condition filter
      if (searchFilters.filters.condition.length > 0) {
        if (!searchFilters.filters.condition.includes(item.condition)) {
          return false;
        }
      }

      // VIN filter
      if (searchFilters.filters.vin) {
        if (!item.vin?.toLowerCase().includes(searchFilters.filters.vin.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (searchFilters.sortBy) {
        case 'price_low':
          return a.currentBid - b.currentBid;
        case 'price_high':
          return b.currentBid - a.currentBid;
        case 'mileage':
          return a.mileage - b.mileage;
        case 'year_new':
          return b.year - a.year;
        case 'relevance':
        default:
          return 0; // Keep original order for relevance
      }
    });

    return filtered;
  }, [items, searchFilters]);

  const handleSearch = (searchData) => {
    setSearchFilters(searchData);
  };

  const handleFiltersChange = (filters) => {
    setSearchFilters(prev => ({ ...prev, filters }));
  };

  const handleSortChange = (sortBy) => {
    setSearchFilters(prev => ({ ...prev, sortBy }));
  };

  const handleViewDetails = (itemId) => {
    setSelectedVehicleId(itemId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedVehicleId(null);
  };

  const handleContactSeller = (itemId) => {
    console.log('Contact seller for catalog item:', itemId);
    // TODO-FX: Open contact seller modal or navigate to contact page
  };

  const renderItemCard = (item) => (
    <div key={item.id} style={{ height: '100%' }}>
      <AuctionCard2025
        auction={{
          ...item,
          isLive: false,
          timeLeft: null,
          endTime: null,
          biddersCount: 0,
          isHotDeal: false,
          transportReady: true,
          verifiedSeller: true
        }}
        onPlaceBid={handleViewDetails}
        onViewDetails={handleContactSeller}
        onImageClick={handleViewDetails}
        showExtraData={false}
        sectionId="catalog"
        isCatalog={true}
      />
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>{t('loading_catalog')}</Text>
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

    if (filteredItems.length === 0) {
      return (
        <Empty
          description={t('no_items_found')}
          style={{ margin: '50px 0' }}
        />
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {filteredItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={4} xl={4} xxl={4} key={item.id}>
            {renderItemCard(item)}
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Catalog - AutoMarketLogistic</title>
        <meta
          name="description"
          content="Browse our extensive catalog of vehicles for direct purchase. Quality pre-owned cars available immediately."
        />
        <meta name="keywords" content="car catalog, vehicle catalog, buy car, pre-owned cars, direct purchase" />
        <meta property="og:title" content="Vehicle Catalog - AutoMarketLogistic" />
        <meta property="og:description" content="Browse our catalog of vehicles available for direct purchase." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://automarketlogistic.com/catalog" />
      </Helmet>

      {/* Header */}
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />

      <Layout className="fade-in-content">
        {/* Main Content */}
        <Content>
          <div className="full-width-section" style={{ paddingTop: '20px' }}>
            {renderContent()}
          </div>
        </Content>

        {/* Footer */}
        <Footer />
      </Layout>

      {/* Floating Filter Button */}
      <FloatButton
        icon={<FilterOutlined />}
        onClick={() => setFilterDrawerOpen(true)}
        tooltip="Filter & Sort"
        style={{
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: '50%'
        }}
      />

      {/* Filter Drawer */}
      <Drawer
        title="Filters & Sorting"
        placement="right"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        width={400}
        styles={{ body: { padding: 0 } }}
      >
        <CatalogFilters
          onSearch={handleSearch}
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
          loading={loading}
        />
      </Drawer>

      {/* Auction Quick View Modal */}
      <AuctionQuickViewModal
        open={modalOpen}
        onClose={handleModalClose}
        vehicleId={selectedVehicleId}
      />
    </>
  );
};

CatalogPage.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired
};

export default CatalogPage;
