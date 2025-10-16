import React, { useState } from 'react';
import {
  Modal,
  Button,
  Space,
  Typography,
  Input,
  Select,
  Card,
  Row,
  Col,
  Divider,
  message,
  List,
  Avatar
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  CarOutlined,
  DollarOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const CompareModal = ({ auction, visible, onClose, onAddToComparison }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  if (!auction) return null;

  // TODO-FX: Replace with real car search API call
  const mockSearchResults = [
    {
      id: 'mock-1',
      title: '2020 Toyota Camry LE',
      lotId: 'LOT-002',
      currentBid: 18500,
      location: 'Los Angeles, CA',
      year: 2020,
      mileage: 25000,
      photos: ['https://via.placeholder.com/300x200?text=Toyota+Camry']
    },
    {
      id: 'mock-2',
      title: '2021 Honda Accord EX',
      lotId: 'LOT-003',
      currentBid: 21000,
      location: 'Phoenix, AZ',
      year: 2021,
      mileage: 18000,
      photos: ['https://via.placeholder.com/300x200?text=Honda+Accord']
    },
    {
      id: 'mock-3',
      title: '2019 Ford Mustang GT',
      lotId: 'LOT-004',
      currentBid: 35000,
      location: 'Dallas, TX',
      year: 2019,
      mileage: 15000,
      photos: ['https://via.placeholder.com/300x200?text=Ford+Mustang']
    }
  ];

  const handleSearch = async (value) => {
    if (!value.trim()) return;

    setIsSearching(true);

    // TODO-FX: Replace with actual API call to search cars
    // This should call backend search endpoint with filters, pagination, and sorting
    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(car =>
        car.title.toLowerCase().includes(value.toLowerCase()) ||
        car.lotId.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };

  const handleAddToComparison = (car) => {
    if (selectedCars.length >= 3) {
      message.warning('You can compare up to 3 cars at once');
      return;
    }

    if (selectedCars.find(selected => selected.id === car.id)) {
      message.warning('This car is already in your comparison');
      return;
    }

    setSelectedCars([...selectedCars, car]);
    message.success('Car added to comparison');
  };

  const handleRemoveFromComparison = (carId) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId));
  };

  const handleStartComparison = () => {
    if (selectedCars.length === 0) {
      message.warning('Please add at least one car to compare');
      return;
    }

    // TODO-FX: Implement comparison functionality - navigate to comparison page or open comparison modal
    // TODO-FX: Save comparison session to backend for persistence across sessions
    onAddToComparison([auction, ...selectedCars]);
    message.success('Comparison started!');
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <PlusOutlined />
          <span>Compare with another car</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="compare"
          type="primary"
          onClick={handleStartComparison}
          disabled={selectedCars.length === 0}
        >
          Add to Comparison ({selectedCars.length})
        </Button>
      ]}
      width={{
        xs: '90vw',
        sm: '260px',
        md: '260px',
        lg: '300px',
        xl: '300px',
        xxl: '300px'
      }}
      centered
      destroyOnHidden
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Current Car Info */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: '8px' }}>
            Current Car
          </Text>
          <Card size="small" style={{ backgroundColor: '#f0f8ff' }}>
            <Row align="middle" gutter={16}>
              <Col flex="auto">
                <Space>
                  <Avatar
                    src={auction.photos[0]}
                    icon={<CarOutlined />}
                    size="small"
                  />
                  <div>
                    <Text strong>{auction.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {auction.lotId} • ${auction.currentBid.toLocaleString()}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  <EnvironmentOutlined /> {auction.location}
                </Text>
              </Col>
            </Row>
          </Card>
        </div>

        <Divider />

        {/* Search Section */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: '8px' }}>
            Search Car
          </Text>
          <Search
            placeholder="Search by car model, make, or lot ID..."
            onSearch={handleSearch}
            loading={isSearching}
            enterButton={<SearchOutlined />}
            size="large"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <Text strong style={{ display: 'block', marginBottom: '12px' }}>
              Search Results
            </Text>
            <List
              size="small"
              dataSource={searchResults}
              renderItem={(car) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      size="small"
                      onClick={() => handleAddToComparison(car)}
                      disabled={selectedCars.find(selected => selected.id === car.id)}
                    >
                      {selectedCars.find(selected => selected.id === car.id) ? 'Added' : 'Add'}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={car.photos[0]}
                        icon={<CarOutlined />}
                        size="small"
                      />
                    }
                    title={<Text strong>{car.title}</Text>}
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {car.lotId} • ${car.currentBid.toLocaleString()}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          <EnvironmentOutlined /> {car.location} • {car.year} • {car.mileage.toLocaleString()} mi
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}

        {/* Selected Cars for Comparison */}
        {selectedCars.length > 0 && (
          <>
            <Divider />
            <div>
              <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                Cars to Compare ({selectedCars.length}/3)
              </Text>
              <List
                size="small"
                dataSource={selectedCars}
                renderItem={(car) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        size="small"
                        danger
                        onClick={() => handleRemoveFromComparison(car.id)}
                      >
                        Remove
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={car.photos[0]}
                          icon={<CarOutlined />}
                          size="small"
                        />
                      }
                      title={<Text strong>{car.title}</Text>}
                      description={
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {car.lotId} • ${car.currentBid.toLocaleString()}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </>
        )}
      </Space>
    </Modal>
  );
};

export default CompareModal;
