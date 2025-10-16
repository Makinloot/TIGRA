import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Carousel, Typography, Space, Empty } from 'antd';
import CardRenderer from '../CardRenderer';
import LogisticsMap from '../Map';
import ContainerList from '../ContainerList';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Title, Text } = Typography;

const SectionRenderer = ({ section, data }) => {
  const { layout, card, title, subtitle, id } = section;

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/sections/{id}
  // Expected Data: Array of items matching card.content structure

  const renderGrid = () => (
    <Row gutter={layout.gap || 12}>
      {data.map((item) => (
        <Col
          key={item.id}
          xs={24}
          sm={layout.columns?.sm ? 24 / layout.columns.sm : 24}
          md={layout.columns?.md ? 24 / layout.columns.md : 12}
          lg={layout.columns?.lg ? 24 / layout.columns.lg : 8}
          xl={layout.columns?.xl ? 24 / layout.columns.xl : 6}
        >
          <CardRenderer card={card} item={item} />
        </Col>
      ))}
    </Row>
  );

  const renderCarousel = () => (
    <Carousel
      dots={false}
      slidesToShow={layout.columns?.xl || 4}
      slidesToScroll={1}
      autoplay
      autoplaySpeed={4000}
      responsive={[
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: layout.columns?.lg || 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: layout.columns?.md || 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: layout.columns?.sm || 1,
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
          <CardRenderer card={card} item={item} />
        </div>
      ))}
    </Carousel>
  );

  const renderMasonry = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${layout.columns?.lg || 3}, 1fr)`,
        gap: layout.gap || 12
      }}
      className="responsive-masonry-grid"
    >
      {data.map((item) => (
        <CardRenderer key={item.id} card={card} item={item} />
      ))}
    </div>
  );

  const renderSplit = () => {
    const { left, right } = layout;

    return (
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          {left.component === 'Map' && left.library === 'react-map-gl' && (
            <LogisticsMap
              routeDemo={left.data.route_demo}
              style={left.style}
            />
          )}
        </Col>
        <Col xs={24} lg={12}>
          {right.component === 'ContainerList' && (
            <ContainerList
              header={right.header}
              cards={right.cards}
              style={right.style}
            />
          )}
        </Col>
      </Row>
    );
  };

  const renderLayout = () => {
    switch (layout.type) {
      case 'carousel':
        return renderCarousel();
      case 'masonry':
        return renderMasonry();
      case 'split':
        return renderSplit();
      case 'grid':
      default:
        return renderGrid();
    }
  };

  const sectionStyle = {
    padding: layout.padding || 'py-10 px-6',
    background: layout.background || 'white',
    ...layout.style
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
        {layout.type === 'split' || (data && data.length > 0) ? (
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
    layout: PropTypes.shape({
      type: PropTypes.oneOf(['grid', 'carousel', 'masonry', 'split']).isRequired,
      columns: PropTypes.object,
      gap: PropTypes.number,
      padding: PropTypes.string,
      background: PropTypes.string,
      style: PropTypes.object
    }).isRequired,
    card: PropTypes.object.isRequired
  }).isRequired,
  data: PropTypes.array.isRequired
};

export default SectionRenderer;
