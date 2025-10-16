import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Tag, Avatar } from 'antd';
import { CalendarOutlined, ReadOutlined, ArrowRightOutlined, EyeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const NewsSection = ({ newsArticles }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div id="news-section" style={{ backgroundColor: 'white' }} className="section-spacing">
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            <ReadOutlined style={{ color: '#1890ff', marginRight: '12px' }} />
            Latest News & Updates
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Stay informed with the latest automotive auction news and industry insights
          </Text>
        </div>

        {/* TODO-FX: News section with responsive grid layout
           Desktop: 3 cards per row, Tablet: 2 cards per row, Mobile: 1 card per row */}
        <Row gutter={[24, 24]}>
          {newsArticles && newsArticles.length > 0 ? newsArticles.map((article) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} key={article?.id || 'unknown'}>
              <Card
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: hoveredCard === article?.id ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                  border: `1px solid ${hoveredCard === article?.id ? '#1890ff' : '#e9ecef'}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  transform: hoveredCard === article?.id ? 'translateY(-4px)' : 'translateY(0px)'
                }}
                styles={{ body: { padding: 0 } }}
                hoverable
                onMouseEnter={() => setHoveredCard(article?.id)}
                onMouseLeave={() => setHoveredCard(null)}
                cover={
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img
                      alt={article?.title || 'News article'}
                      src={article?.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredCard === article?.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px'
                    }}>
                      <Tag color="#1890ff" style={{ fontSize: '11px' }}>
                        {article?.category || 'News'}
                      </Tag>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '6px',
                      padding: '6px 8px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <EyeOutlined style={{ fontSize: '12px', color: '#fff' }} />
                        <Text style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>
                          {(article.views || 0).toLocaleString()}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CommentOutlined style={{ fontSize: '12px', color: '#fff' }} />
                        <Text style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>
                          {article.comments || 0}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShareAltOutlined style={{ fontSize: '12px', color: '#fff' }} />
                        <Text style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>
                          {article.shares || 0}
                        </Text>
                      </div>
                    </div>
                  </div>
                }
                onClick={() => console.log('Read article:', article?.id)}
              >
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text style={{
                      fontSize: '12px',
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CalendarOutlined />
                      {article?.date || 'Date not available'}
                    </Text>
                  </div>

                  <Title level={4} style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    lineHeight: 1.3
                  }}>
                    {article?.title || 'Untitled Article'}
                  </Title>

                  <Paragraph
                    style={{
                      color: '#666',
                      lineHeight: 1.5,
                      margin: '0 0 16px 0',
                      fontSize: '14px'
                    }}
                    ellipsis={{ rows: 3 }}
                  >
                    {article?.summary || 'No summary available.'}
                  </Paragraph>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar
                        size={24}
                        src={article.avatar || 'https://via.placeholder.com/24x24?text=A'}
                        style={{ border: '1px solid #e9ecef' }}
                      />
                      <Text style={{ fontSize: '12px', color: '#999' }}>
                        By {article?.author || 'Unknown Author'}
                      </Text>
                    </div>
                    <Button
                      type="default"
                      size="small"
                      style={{ fontSize: '12px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Read full article:', article?.id);
                      }}
                    >
                      Read More
                      <ArrowRightOutlined style={{ marginLeft: '4px' }} />
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          )) : null}
        </Row>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button
            type="default"
            size="large"
            style={{ padding: '0 32px', height: '48px' }}
            onClick={() => console.log('View all news')}
          >
            View All News & Updates
          </Button>
        </div>
      </div>
    </div>
  );
};

NewsSection.propTypes = {
  newsArticles: PropTypes.array.isRequired,
};

export default NewsSection;
