import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Carousel, Typography, Space, Empty } from 'antd';
import CardRenderer from '../CardRenderer';
import AuctionCard2025 from '../AuctionCard2025';
import ActiveLogisticsRoutes from '../ActiveLogisticsRoutes';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Title, Text } = Typography;

const SectionRenderer = ({ section, data }) => {
  const { layout, card, title, subtitle, id, type, component, visual_theme } = section;

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/sections/{id}
  // Expected Data: Array of items matching card.content structure

  // Handler functions for AuctionCard2025
  const handlePlaceBid = (auctionId) => {
    console.log('Place bid on auction:', auctionId);
    // TODO-FX: Implement bid placement logic
  };

  const handleViewDetails = (auctionId) => {
    console.log('View details for auction:', auctionId);
    // TODO-FX: Navigate to auction details page
  };

  const renderGrid = () => (
    <Row gutter={layout?.gap || 12}>
      {data.map((item) => (
        <Col
          key={item.id}
          xs={24}
          sm={layout?.columns?.sm ? 24 / layout.columns.sm : 24}
          md={layout?.columns?.md ? 24 / layout.columns.md : 12}
          lg={layout?.columns?.lg ? 24 / layout.columns.lg : 8}
          xl={layout?.columns?.xl ? 24 / layout.columns.xl : 6}
        >
          {component === 'AuctionCard2025' ? (
            <AuctionCard2025
              auction={item}
              onPlaceBid={handlePlaceBid}
              onViewDetails={handleViewDetails}
              showExtraData={id === 'ai-picks'}
              visualTheme={visual_theme}
              sectionId={id}
            />
          ) : (
            <CardRenderer card={card} item={item} />
          )}
        </Col>
      ))}
    </Row>
  );

  const renderCarousel = () => {
    const autoplaySpeed = visual_theme?.layout?.speed === 'medium' ? 4000 :
                         visual_theme?.layout?.speed === 'slow' ? 6000 :
                         visual_theme?.layout?.speed === 'fast' ? 2500 : 4000;

    return (
      <Carousel
        dots={false}
        slidesToShow={layout?.columns?.xl || 4}
        slidesToScroll={1}
        autoplay={visual_theme?.layout?.autoplay !== false}
        autoplaySpeed={autoplaySpeed}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: layout?.columns?.lg || 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: layout?.columns?.md || 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: layout?.columns?.sm || 1,
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
      >
        {data.map((item) => (
          <div key={item.id} style={{ padding: '0 8px' }}>
            {component === 'AuctionCard2025' ? (
              <AuctionCard2025
                auction={item}
                onPlaceBid={handlePlaceBid}
                onViewDetails={handleViewDetails}
                showExtraData={id === 'ai-picks'}
                visualTheme={visual_theme}
                sectionId={id}
              />
            ) : (
              <CardRenderer card={card} item={item} />
            )}
          </div>
        ))}
      </Carousel>
    );
  };

  const renderMasonry = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${layout?.columns?.lg || 3}, 1fr)`,
        gap: layout?.gap || 12
      }}
      className="responsive-masonry-grid"
    >
      {data.map((item) => (
        component === 'AuctionCard2025' ? (
          <AuctionCard2025
            key={item.id}
            auction={item}
            onPlaceBid={handlePlaceBid}
            onViewDetails={handleViewDetails}
            showExtraData={true}
            visualTheme={visual_theme}
            sectionId={id}
          />
        ) : (
          <CardRenderer key={item.id} card={card} item={item} />
        )
      ))}
    </div>
  );

  const renderLayout = () => {
    // Handle SectionMap type specially
    if (type === 'SectionMap') {
      return <ActiveLogisticsRoutes />;
    }

    switch (layout?.type || 'grid') {
      case 'carousel':
        return renderCarousel();
      case 'masonry':
        return renderMasonry();
      case 'grid':
      default:
        return renderGrid();
    }
  };

  const sectionStyle = {
    padding: visual_theme?.layout?.padding || layout?.padding || 'py-10 px-6',
    background: visual_theme?.palette?.background || layout?.background || 'white',
    borderRadius: visual_theme?.layout?.rounded || layout?.rounded,
    boxShadow: visual_theme?.layout?.shadow || layout?.shadow,
    ...(layout?.style || {})
  };

  return (
    <div
      id={id}
      className="section-spacing"
      style={sectionStyle}
    >
      <div className="full-width-section">
        {/* Section Header */}
        {(title || subtitle) && (
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            {title && (
              <Title level={3} style={{ marginBottom: '8px', fontSize: '20px' }}>
                {title}
              </Title>
            )}
            {subtitle && (
              <Text style={{ fontSize: '14px', color: '#666' }}>
                {subtitle}
              </Text>
            )}
          </div>
        )}

        {/* Content */}
        {data && data.length > 0 ? (
          renderLayout()
        ) : (
          <Empty description={t('no_items_found')} />
        )}
      </div>
    </div>
  );
};

SectionRenderer.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    component: PropTypes.string,
    layout: PropTypes.shape({
      type: PropTypes.oneOf(['grid', 'carousel', 'masonry']),
      columns: PropTypes.object,
      gap: PropTypes.number,
      padding: PropTypes.string,
      background: PropTypes.string,
      style: PropTypes.object
    }),
    card: PropTypes.object
  }).isRequired,
  data: PropTypes.array.isRequired
};

export default SectionRenderer;