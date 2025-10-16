import React from 'react';
import { Row, Col, Typography, Carousel, Button, Tag } from 'antd';
import { ClockCircleOutlined, DollarOutlined, EyeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const FeaturedAuctions = ({ featuredAuctions }) => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className="section-spacing">
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={3} style={{ marginBottom: '8px' }}>
            🔥 Special Offers Ending Soon
          </Title>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            Limited time deals - bid now before they're gone!
          </Text>
        </div>

        {/* TODO-FX: Horizontal carousel for featured auctions - full-width with responsive padding
           Desktop: Shows 5 cards, Tablet: 3 cards, Mobile: 1 card with swipe */}
        <Carousel
          dots={false}
          slidesToShow={5}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={4000}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
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
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #e9ecef',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
                onClick={() => console.log('View featured auction:', auction.id)}
              >
                <div style={{ flex: 1, marginBottom: '16px' }}>
                  <div style={{
                    width: '100%',
                    height: '140px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    position: 'relative'
                  }}>
                    <img
                      src={auction.image}
                      alt={auction.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px'
                    }}>
                      <Tag color="red" style={{ fontWeight: 'bold' }}>
                        <ClockCircleOutlined /> {auction.timeLeft}
                      </Tag>
                    </div>
                  </div>

                  <Title level={5} style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                    {auction.title}
                  </Title>

                  <div style={{ marginBottom: '12px' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                      ${auction.currentBid.toLocaleString()}
                    </Text>
                    <Text style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                      Current bid
                    </Text>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Text style={{ fontSize: '12px', color: '#666' }}>
                      <DollarOutlined /> Starting: ${auction.startingBid.toLocaleString()}
                    </Text>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    type="primary"
                    size="small"
                    style={{ flex: 1, height: '32px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Bid on featured auction:', auction.id);
                    }}
                  >
                    Bid Now
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    icon={<EyeOutlined />}
                    style={{
                      height: '32px',
                      width: '32px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Quick view featured auction:', auction.id);
                    }}
                  />
                </div>
              </div>
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
