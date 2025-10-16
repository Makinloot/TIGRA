import React from 'react';
import { Carousel, Typography, Button, Space } from 'antd';
import PropTypes from 'prop-types';
import AuctionCard2025 from './AuctionCard2025';

const { Title, Text } = Typography;

const FeaturedAuctions = ({ featuredAuctions }) => {
  const handlePlaceBid = (auctionId) => {
    console.log('Place bid on featured auction:', auctionId);
    // TODO-FX: Implement bid placement logic
  };

  const handleViewDetails = (auctionId) => {
    console.log('View details for featured auction:', auctionId);
    // TODO-FX: Navigate to auction details page
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className="section-spacing">
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={3} style={{ marginBottom: '8px' }}>
            🔥 Special Offers Ending Soon
          </Title>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            Limited time deals — bid now before they're gone!
          </Text>
        </div>

        {/* Responsive carousel with AuctionCard2025 components */}
        <Carousel
          dots={false}
          slidesToShow={4}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={5000}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]}
          style={{ marginBottom: '24px' }}
        >
          {featuredAuctions.map((auction) => (
            <div key={auction.id} style={{ padding: '0 12px' }}>
              <AuctionCard2025
                auction={auction}
                onPlaceBid={handlePlaceBid}
                onViewDetails={handleViewDetails}
                showExtraData={true}
              />
            </div>
          ))}
        </Carousel>

        <div style={{ textAlign: 'center' }}>
          <Button
            type="link"
            style={{ fontSize: '14px' }}
            onClick={() => console.log('View all special offers')}
          >
            View All Special Offers →
          </Button>
        </div>
      </div>
    </div>
  );
};

FeaturedAuctions.propTypes = {
  featuredAuctions: PropTypes.array.isRequired,
};

export default FeaturedAuctions;
