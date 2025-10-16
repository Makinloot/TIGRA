import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Carousel } from 'antd';
import PropTypes from 'prop-types';
import AuctionCard from './AuctionCard';
import QuickViewModal from './QuickViewModal';

const { Title, Text } = Typography;

const AuctionCardList = ({ auctions }) => {
  const [visibleRows, setVisibleRows] = useState(3); // Start with 3 rows (15 cards on desktop)
  const [loading, setLoading] = useState(false);
  const [quickViewAuction, setQuickViewAuction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992); // lg breakpoint is 992px in Ant Design
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const cardsPerRow = {
    xxl: 5, // Desktop: 5 cards per row
    xl: 5,  // Desktop: 5 cards per row
    lg: 2,  // Tablet: 2 cards per row
    md: 2,  // Tablet: 2 cards per row
    sm: 1,  // Mobile: 1 card per row
    xs: 1   // Mobile: 1 card per row
  };

  const initialCards = cardsPerRow.xl * visibleRows; // Use xl breakpoint for initial calculation

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setVisibleRows(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const handleQuickView = (auction) => {
    setQuickViewAuction(auction);
    setModalVisible(true);
  };

  const handleAddToFavorites = (auctionId) => {
    console.log('Added to favorites:', auctionId);
    // TODO-FX: Implement favorites functionality
  };

  const handleCompare = (cars) => {
    console.log('Compare cars:', cars.map(car => car.id));
    // TODO-FX: Implement compare functionality - this could navigate to a comparison page
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setQuickViewAuction(null);
  };

  // Calculate how many cards to show based on current visible rows
  const displayedAuctions = auctions.slice(0, initialCards);

  return (
    <div id="auction-card-list-section" style={{ backgroundColor: '#fafafa' }} className="section-spacing">
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            Featured Auctions
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Live auctions ending soon - place your bids now
          </Text>
        </div>

        {/* Responsive Grid/Carousel View - TODO-FX: Full-width responsive layout implemented */}
        {isDesktop ? (
          // Desktop: Grid layout (lg and above)
          <Row gutter={[16, 16]}>
            {displayedAuctions.map((auction) => (
              <Col
                lg={12}  // Tablet: 2 cards per row (24/2 = 12)
                xl={4}   // Desktop: 5 cards per row (24/5 = 4.8, but we use 4 and adjust with Row gutter)
                xxl={4}  // Desktop: 5 cards per row (24/5 = 4.8, but we use 4 and adjust with Row gutter)
                key={auction.id}
              >
                <AuctionCard
                  auction={auction}
                  onQuickView={handleQuickView}
                  onAddToFavorites={handleAddToFavorites}
                  onCompare={handleCompare}
                />
              </Col>
            ))}
          </Row>
        ) : (
          // Tablet/Mobile: Swipe-enabled carousel (below lg)
          <div>
            <Carousel
              dots={true}
              slidesToShow={window.innerWidth >= 768 ? 2 : 1} // 2 cards on tablet (md), 1 on mobile
              slidesToScroll={1}
              swipeToSlide={true}
              draggable={true}
              infinite={false}
              arrows={false} // Hide arrows, rely on swipe
              style={{ marginBottom: '24px' }}
            >
              {displayedAuctions.map((auction) => (
                <div key={auction.id} style={{ padding: '0 8px' }}>
                  <AuctionCard
                    auction={auction}
                    onQuickView={handleQuickView}
                    onAddToFavorites={handleAddToFavorites}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Load More Button */}
        {displayedAuctions.length < auctions.length && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button
              type="default"
              size="large"
              loading={loading}
              onClick={handleLoadMore}
              style={{ padding: '0 40px', height: '48px' }}
            >
              {loading ? 'Loading...' : `Load More (${auctions.length - displayedAuctions.length} remaining)`}
            </Button>
          </div>
        )}

        {/* View All Button (when all loaded) */}
        {displayedAuctions.length >= auctions.length && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button
              type="primary"
              size="large"
              style={{ padding: '0 40px', height: '48px' }}
              onClick={() => console.log('View all auctions')}
            >
              View All Auctions
            </Button>
          </div>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          auction={quickViewAuction}
          visible={modalVisible}
          onClose={handleModalClose}
          onAddToFavorites={handleAddToFavorites}
        />
      </div>
    </div>
  );
};

AuctionCardList.propTypes = {
  auctions: PropTypes.array.isRequired,
};

export default AuctionCardList;
