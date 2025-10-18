import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Input,
  Button,
  Space,
  Typography,
  Card,
  Select,
  Slider,
  Tag,
  Divider
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  DollarOutlined,
  CarOutlined,
  CalendarOutlined,
  ClearOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CatalogFilters = ({ onSearch, onFiltersChange, onSortChange, loading = false }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    brand: [],
    priceRange: [0, 100000],
    bodyType: [],
    year: [],
    condition: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Quick filter presets for catalog
  const quickFilters = [
    { key: 'budget', label: 'Under $15K', icon: '💰', action: () => handleQuickFilter('priceRange', [0, 15000]) },
    { key: 'luxury', label: 'Luxury', icon: '👑', action: () => handleQuickFilter('brand', ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus']) },
    { key: 'suv', label: 'SUVs', icon: '🚙', action: () => handleQuickFilter('bodyType', ['SUV']) },
    { key: 'newer', label: '2020+', icon: '🆕', action: () => handleQuickFilter('year', [2020, 2024]) },
    { key: 'excellent', label: 'Excellent', icon: '✨', action: () => handleQuickFilter('condition', ['Excellent']) }
  ];

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleQuickFilter = (filterKey, value) => {
    handleFilterChange(filterKey, value);
  };

  const handleSearch = () => {
    onSearch?.({ search: searchValue, filters, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      brand: [],
      priceRange: [0, 100000],
      bodyType: [],
      year: [],
      condition: []
    };
    setFilters(clearedFilters);
    setSearchValue('');
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return searchValue ||
           filters.brand.length > 0 ||
           filters.bodyType.length > 0 ||
           filters.year.length > 0 ||
           filters.condition.length > 0 ||
           filters.priceRange[0] !== 0 ||
           filters.priceRange[1] !== 100000;
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8fafc', padding: '20px 16px', borderRadius: '12px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card style={{ borderRadius: '8px' }} styles={{ body: { padding: '16px' } }}>
            <div style={{ height: '60px', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      padding: '20px 16px',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
            styles={{ body: { padding: '20px' } }}
          >
          {/* Top Row - Search and Sort */}
          <Row gutter={16} align="middle" style={{ marginBottom: '16px' }}>
            <Col xs={24} md={16} lg={18}>
              <Input
                placeholder={t('search_catalog')}
                prefix={<SearchOutlined style={{ color: '#64748b' }} />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={handleSearch}
                size="large"
                style={{
                  borderRadius: '25px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </Col>
            <Col xs={24} md={8} lg={6}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                size="large"
                style={{ width: '100%', borderRadius: '8px' }}
                suffixIcon={<SortAscendingOutlined />}
              >
                <Option value="relevance">{t('sort_relevance')}</Option>
                <Option value="price_low">{t('sort_price_low')}</Option>
                <Option value="price_high">{t('sort_price_high')}</Option>
                <Option value="year_new">{t('sort_newest')}</Option>
                <Option value="mileage">{t('sort_mileage')}</Option>
              </Select>
            </Col>
          </Row>

          {/* Quick Filters Row */}
          <div style={{ marginBottom: '16px' }}>
            <Text style={{
              fontSize: '13px',
              color: '#64748b',
              fontWeight: '600',
              marginBottom: '8px',
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Quick Filters
            </Text>
            <Space wrap size={8}>
              {quickFilters.map((filter) => (
                <Button
                  key={filter.key}
                  type="text"
                  size="small"
                  onClick={filter.action}
                  style={{
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 12px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.color = '#3b82f6';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.color = '#475569';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </Button>
              ))}
            </Space>
          </div>

          {/* Advanced Filters Toggle */}
          <Row align="middle" justify="space-between">
            <Col>
              <Button
                type="text"
                icon={<FilterOutlined />}
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  color: '#64748b',
                  fontSize: '13px',
                  padding: '4px 0'
                }}
              >
                Advanced Filters
              </Button>
            </Col>
            <Col>
              {hasActiveFilters() && (
                <Button
                  type="text"
                  icon={<ClearOutlined />}
                  onClick={clearAllFilters}
                  size="small"
                  style={{
                    color: '#ef4444',
                    fontSize: '12px'
                  }}
                >
                  Clear All
                </Button>
              )}
            </Col>
          </Row>

          {/* Advanced Filters Panel */}
          {showAdvanced && (
            <>
              <Divider style={{ margin: '12px 0' }} />
              <Row gutter={[16, 16]}>
                {/* Price Range */}
                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text style={{
                      fontSize: '12px',
                      color: '#374151',
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      <DollarOutlined style={{ marginRight: '4px' }} />
                      Price Range
                    </Text>
                    <div style={{ padding: '0 8px' }}>
                      <Slider
                        range
                        min={0}
                        max={100000}
                        step={1000}
                        value={filters.priceRange}
                        onChange={(value) => handleFilterChange('priceRange', value)}
                        trackStyle={{ backgroundColor: '#10b981' }}
                        handleStyle={{ borderColor: '#10b981' }}
                      />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '4px'
                      }}>
                        <Text style={{ fontSize: '11px', color: '#64748b' }}>
                          ${filters.priceRange[0].toLocaleString()}
                        </Text>
                        <Text style={{ fontSize: '11px', color: '#64748b' }}>
                          ${filters.priceRange[1].toLocaleString()}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Brand */}
                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text style={{
                      fontSize: '12px',
                      color: '#374151',
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      <CarOutlined style={{ marginRight: '4px' }} />
                      Brand
                    </Text>
                    <Select
                      mode="multiple"
                      placeholder="Select brands"
                      value={filters.brand}
                      onChange={(value) => handleFilterChange('brand', value)}
                      size="small"
                      style={{ width: '100%' }}
                      maxTagCount={2}
                      allowClear
                    >
                      {['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Chevrolet'].map(brand => (
                        <Option key={brand} value={brand}>{brand}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                {/* Body Type */}
                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text style={{
                      fontSize: '12px',
                      color: '#374151',
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      Body Type
                    </Text>
                    <Select
                      mode="multiple"
                      placeholder="Select types"
                      value={filters.bodyType}
                      onChange={(value) => handleFilterChange('bodyType', value)}
                      size="small"
                      style={{ width: '100%' }}
                      maxTagCount={2}
                      allowClear
                    >
                      {['SUV', 'Sedan', 'Truck', 'Coupe', 'Van', 'Hatchback'].map(type => (
                        <Option key={type} value={type}>{type}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                {/* Year */}
                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text style={{
                      fontSize: '12px',
                      color: '#374151',
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      <CalendarOutlined style={{ marginRight: '4px' }} />
                      Year
                    </Text>
                    <Select
                      mode="multiple"
                      placeholder="Select years"
                      value={filters.year}
                      onChange={(value) => handleFilterChange('year', value)}
                      size="small"
                      style={{ width: '100%' }}
                      maxTagCount={2}
                      allowClear
                    >
                      {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(year => (
                        <Option key={year} value={year}>{year}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>
            </>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <Text style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: '600',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Active Filters:
                </Text>
                <Space wrap size={4}>
                  {filters.brand.map(brand => (
                    <Tag key={`brand-${brand}`} color="blue" size="small">
                      {brand}
                    </Tag>
                  ))}
                  {filters.bodyType.map(type => (
                    <Tag key={`type-${type}`} color="green" size="small">
                      {type}
                    </Tag>
                  ))}
                  {filters.year.map(year => (
                    <Tag key={`year-${year}`} color="orange" size="small">
                      {year}
                    </Tag>
                  ))}
                  {filters.condition.map(condition => (
                    <Tag key={`condition-${condition}`} color="purple" size="small">
                      {condition}
                    </Tag>
                  ))}
                  {searchValue && (
                    <Tag color="cyan" size="small">
                      Search: {searchValue}
                    </Tag>
                  )}
                </Space>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

CatalogFilters.propTypes = {
  onSearch: PropTypes.func,
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  loading: PropTypes.bool
};

export default CatalogFilters;
