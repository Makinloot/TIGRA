import React from 'react';
import { Row, Col, Card, Typography, Button, Space, Tag, Progress, Carousel } from 'antd';
import { HeartOutlined, EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;
const { Meta } = Card;

const VehicleCardList = ({ recommendations }) => {
  return (
    <div style={{ backgroundColor: 'white' }} className="section-spacing">
      <div className="full-width-section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            <ThunderboltOutlined style={{ color: '#1890ff', marginRight: '12px' }} />
            AI Picks For You
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Personalized vehicle recommendations based on your preferences
          </Text>
        </div>

        {/* TODO-FX: Horizontal carousel for recommended cars - 5 cards desktop, 3 tablet, 1 mobile */}
        <Carousel
          dots={false}
          slidesToShow={5}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={5000}
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
          {recommendations.map((vehicle) => (
            <div key={vehicle.id} style={{ padding: '0 8px' }}>
              <Card
                className="uniform-card"
                styles={{ body: { padding: 0 } }}
                hoverable
                cover={
                  <div className="uniform-card-photo">
                    <img
                      alt={vehicle.title}
                      src={vehicle.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px'
                    }}>
                      <Button
                        type="text"
                        icon={<HeartOutlined />}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px'
                        }}
                        onClick={() => console.log('Favorite vehicle:', vehicle.id)}
                      />
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px'
                    }}>
                      <Tag color="#1890ff" style={{ fontWeight: 'bold' }}>
                        {vehicle.matchScore}% Match
                      </Tag>
                    </div>
                  </div>
                }
              >
                <div className="uniform-card-content">
                  <Space direction="vertical" size="small" style={{ width: '100%', flex: 1 }}>
                    <div>
                      <Title level={4} style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                        {vehicle.title}
                      </Title>
                      <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                        ${vehicle.price.toLocaleString()}
                      </Text>
                    </div>

                    <Space wrap>
                      <Text style={{ fontSize: '14px', color: '#666' }}>
                        {vehicle.year} • {vehicle.mileage.toLocaleString()} mi
                      </Text>
                    </Space>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <EnvironmentOutlined style={{ color: '#666' }} />
                      <Text style={{ fontSize: '14px', color: '#666' }}>
                        {vehicle.location}
                      </Text>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <Text style={{ fontSize: '12px', color: '#666' }}>AI Match Score</Text>
                        <Text style={{ fontSize: '12px', fontWeight: 'bold' }}>{vehicle.matchScore}%</Text>
                      </div>
                      <Progress
                        percent={vehicle.matchScore}
                        showInfo={false}
                        strokeColor="#1890ff"
                        size="small"
                      />
                    </div>
                  </Space>

                  {/* Action Button */}
                  <div className="uniform-card-actions">
                    <Button
                      type="primary"
                      block
                      style={{ borderRadius: 0, height: '48px', fontWeight: 600 }}
                      onClick={() => console.log('View vehicle:', vehicle.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button
            type="default"
            size="large"
            style={{ padding: '0 40px', height: '48px' }}
            onClick={() => console.log('View more recommendations')}
          >
            View More Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

VehicleCardList.propTypes = {
  recommendations: PropTypes.array.isRequired,
};

export default VehicleCardList;
