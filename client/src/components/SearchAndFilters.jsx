import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Card,
  Slider,
  Divider,
  Collapse,
  Tag,
  Skeleton
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';

// TODO-FX: Connect to i18n library.
// const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Title, Text } = Typography;
const { Option } = Select;

const SearchAndFilters = ({ onSearch, onFiltersChange, onSortChange, loading = false }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    brand: [],
    model: [],
    year: [],
    priceRange: [0, 100000],
    bodyType: [],
    condition: [],
    vin: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [savedSearches] = useState([
    'Honda Civic 2020',
    'BMW X3',
    'Ford F-150',
    'Tesla Model 3',
    'Toyota Camry',
    'Mercedes C-Class',
    'Audi Q5',
    'Jeep Grand Cherokee'
  ]);
  const [isSearchSaved, setIsSearchSaved] = useState(false);

  // Mock data for dropdowns - TODO-FX: Replace with API calls
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Chevrolet'];
  const models = {
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
    Ford: ['F-150', 'Explorer', 'Escape', 'Mustang', 'Focus'],
    BMW: ['X3', 'X5', '3 Series', '5 Series', 'X1'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
    Audi: ['A4', 'Q5', 'A6', 'Q7', 'A3'],
    Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Titan'],
    Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Traverse']
  };
  const bodyTypes = ['SUV', 'Sedan', 'Truck', 'Coupe', 'Van', 'Hatchback', 'Wagon', 'Convertible'];
  const conditions = ['New', 'Used', 'Certified'];
  const years = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, i) => new Date().getFullYear() - i);
  const quickFilters = [
    { label: 'Under $10k', key: 'under_10k' },
    { label: 'Electric', key: 'electric' },
    { label: 'Low Mileage', key: 'low_mileage' },
    { label: 'SUVs Only', key: 'suv_only' },
    { label: 'Certified Pre-Owned', key: 'certified' },
    { label: '2020+', key: 'newer_2020' },
    { label: 'Trucks', key: 'trucks' },
    { label: 'Luxury', key: 'luxury' }
  ];

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSearch = () => {
    onSearch?.({ search: searchValue, filters, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  const handleQuickFilter = (filterKey) => {
    let newFilters = { ...filters };
    switch (filterKey) {
      case 'under_10k':
        newFilters.priceRange = [0, 10000];
        break;
      case 'electric':
        newFilters.bodyType = ['Electric'];
        break;
      case 'low_mileage':
        // This would typically filter vehicles with low mileage
        // For now, we'll just set a flag
        newFilters.lowMileage = true;
        break;
      case 'suv_only':
        newFilters.bodyType = ['SUV'];
        break;
      case 'certified':
        newFilters.condition = ['Certified'];
        break;
      case 'newer_2020':
        newFilters.year = [2020, 2024];
        break;
      case 'trucks':
        newFilters.bodyType = ['Truck'];
        break;
      case 'luxury':
        newFilters.brand = ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus'];
        break;
      default:
        break;
    }
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSaveSearch = () => {
    setIsSearchSaved(!isSearchSaved);
    // TODO-FX: Save search to user preferences
    // API Endpoint: POST /api/user/saved-searches
    // Expected Data: { searchValue, filters, sortBy }
  };

  const clearFilters = () => {
    const clearedFilters = {
      brand: [],
      model: [],
      year: [],
      priceRange: [0, 100000],
      bodyType: [],
      condition: [],
      vin: '',
      lowMileage: false
    };
    setFilters(clearedFilters);
    setSearchValue('');
    setIsSearchSaved(false);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return searchValue ||
           filters.brand.length > 0 ||
           filters.model.length > 0 ||
           filters.year.length > 0 ||
           filters.bodyType.length > 0 ||
           filters.condition.length > 0 ||
           filters.vin ||
           filters.priceRange[0] !== 0 ||
           filters.priceRange[1] !== 100000 ||
           filters.lowMileage;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f9fafb', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Card
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9fafb'
            }}
            styles={{ body: { padding: '48px 24px' } }}
          >
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div id="search-filters-section" style={{ backgroundColor: '#f9fafb', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9fafb'
          }}
          styles={{ body: { padding: '48px 24px' } }}
        >
          {/* Title and Subtitle */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={2} style={{ margin: 0, marginBottom: '8px', color: '#1f2937', fontWeight: 'bold' }}>
              Find Your Perfect Vehicle
            </Title>
            <Text style={{ fontSize: '18px', color: '#6b7280', lineHeight: '28px' }}>
              Search by VIN, filter by preferences, and sort by your priorities.
            </Text>
          </div>

          {/* Main Search Bar */}
          <div style={{ marginBottom: '24px' }}>
            <Row gutter={16} align="middle">
              <Col xs={24} sm={24} md={16} lg={18} xl={20}>
                <Input
                  placeholder="Enter VIN or keywords..."
                  prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onPressEnter={handleSearch}
                  size="large"
                  style={{
                    borderRadius: '8px',
                    fontSize: '16px',
                    padding: '12px 16px'
                  }}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={6} xl={4}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  size="large"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    fontWeight: 600,
                    backgroundColor: '#2563eb',
                    borderColor: '#2563eb'
                  }}
                  loading={loading}
                >
                  Search
                </Button>
              </Col>
            </Row>

            {/* Recent Searches */}
            {savedSearches.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <Text style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>
                  Recent Searches:
                </Text>
                <Space wrap>
                  {savedSearches.map((search, index) => (
                    <Tag
                      key={index}
                      style={{
                        borderRadius: '16px',
                        padding: '4px 12px',
                        cursor: 'pointer',
                        border: '1px solid #e5e7eb'
                      }}
                      onClick={() => setSearchValue(search)}
                    >
                      {search}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {/* Quick Filters */}
            <div style={{ marginTop: '16px' }}>
              <Text style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>
                Quick Filters:
              </Text>
              <Space wrap>
                {quickFilters.map((filter) => (
                  <Button
                    key={filter.key}
                    type="text"
                    style={{
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}
                    onClick={() => handleQuickFilter(filter.key)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </Space>
            </div>
          </div>

          {/* Sort and Save Search */}
          <Row gutter={16} align="middle" style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div>
                <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                  Sort by:
                </Text>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  size="large"
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  <Option value="relevance">Relevance</Option>
                  <Option value="price_low">Price (Low → High)</Option>
                  <Option value="price_high">Price (High → Low)</Option>
                  <Option value="mileage">Mileage</Option>
                  <Option value="year_new">Year (Newest)</Option>
                </Select>
              </div>
            </Col>
            <Col xs={24} sm={12} md={16} lg={18}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                {hasActiveFilters() && (
                  <Button
                    type="text"
                    icon={<ClearOutlined />}
                    onClick={clearFilters}
                    style={{ color: '#6b7280' }}
                  >
                    Clear Filters
                  </Button>
                )}
                <Button
                  type="text"
                  icon={isSearchSaved ? <HeartFilled style={{ color: '#ef4444' }} /> : <HeartOutlined />}
                  onClick={handleSaveSearch}
                  style={{
                    color: isSearchSaved ? '#ef4444' : '#6b7280',
                    borderRadius: '8px'
                  }}
                >
                  {isSearchSaved ? 'Saved' : 'Save Search'}
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Filter Panel */}
          <Card
            style={{
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff'
            }}
            styles={{ body: { padding: '24px' } }}
          >
            <Collapse
              defaultActiveKey={['filters']}
              ghost
              expandIconPosition="end"
              items={[
                {
                  key: 'filters',
                  label: (
                    <Text strong style={{ fontSize: '16px', color: '#374151' }}>
                      <FilterOutlined style={{ marginRight: '8px' }} />
                      Advanced Filters
                    </Text>
                  ),
                  children: (
                    <Row gutter={[24, 24]}>
                      {/* Make */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                            Make
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder="Select makes"
                            value={filters.brand}
                            onChange={(value) => handleFilterChange('brand', value)}
                            size="large"
                            style={{ width: '100%', borderRadius: '8px' }}
                            maxTagCount={2}
                            allowClear
                          >
                            {brands.map(brand => (
                              <Option key={brand} value={brand}>{brand}</Option>
                            ))}
                          </Select>
                        </div>
                      </Col>

                      {/* Model */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                            Model
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder="Select models"
                            value={filters.model}
                            onChange={(value) => handleFilterChange('model', value)}
                            size="large"
                            style={{ width: '100%', borderRadius: '8px' }}
                            maxTagCount={2}
                            allowClear
                            disabled={filters.brand.length === 0}
                          >
                            {filters.brand.length > 0 ?
                              filters.brand.flatMap(selectedBrand => (models[selectedBrand] || []).map(model => (
                                <Option key={`${selectedBrand}-${model}`} value={model}>{model}</Option>
                              ))) :
                              Object.values(models).flat().map(model => (
                                <Option key={model} value={model}>{model}</Option>
                              ))
                            }
                          </Select>
                        </div>
                      </Col>

                      {/* Year */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                            Year
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder="Select years"
                            value={filters.year}
                            onChange={(value) => handleFilterChange('year', value)}
                            size="large"
                            style={{ width: '100%', borderRadius: '8px' }}
                            maxTagCount={3}
                            allowClear
                          >
                            {years.map(year => (
                              <Option key={year} value={year}>{year}</Option>
                            ))}
                          </Select>
                        </div>
                      </Col>

                      {/* Price Range */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                            Price Range: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                          </Text>
                          <Slider
                            range
                            min={0}
                            max={100000}
                            step={1000}
                            value={filters.priceRange}
                            onChange={(value) => handleFilterChange('priceRange', value)}
                            style={{ margin: '8px 0' }}
                            trackStyle={{ backgroundColor: '#2563eb' }}
                            handleStyle={{ borderColor: '#2563eb' }}
                          />
                        </div>
                      </Col>

                      {/* Body Type */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                            Body Type
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder="Select body types"
                            value={filters.bodyType}
                            onChange={(value) => handleFilterChange('bodyType', value)}
                            size="large"
                            style={{ width: '100%', borderRadius: '8px' }}
                            maxTagCount={2}
                            allowClear
                          >
                            {bodyTypes.map(type => (
                              <Option key={type} value={type}>{type}</Option>
                            ))}
                          </Select>
                        </div>
                      </Col>

                      {/* Condition */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>
                            Condition
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder="Select condition"
                            value={filters.condition}
                            onChange={(value) => handleFilterChange('condition', value)}
                            size="large"
                            style={{ width: '100%', borderRadius: '8px' }}
                            maxTagCount={2}
                            allowClear
                          >
                            {conditions.map(condition => (
                              <Option key={condition} value={condition}>{condition}</Option>
                            ))}
                          </Select>
                        </div>
                      </Col>
                    </Row>
                  )
                }
              ]}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
};

SearchAndFilters.propTypes = {
  onSearch: PropTypes.func,
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  loading: PropTypes.bool
};

export default SearchAndFilters;
