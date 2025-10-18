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
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

const SearchAndFilters = ({ onSearch, onFiltersChange, onSortChange, loading = false }) => {
  const { t } = useTranslation();
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
    { label: t('search.filters.under10k'), key: 'under_10k' },
    { label: t('search.filters.electric'), key: 'electric' },
    { label: t('search.filters.lowMileage'), key: 'low_mileage' },
    { label: t('search.filters.suvOnly'), key: 'suv_only' },
    { label: t('search.filters.certified'), key: 'certified' },
    { label: t('search.filters.year2020Plus'), key: 'newer_2020' },
    { label: t('search.filters.trucks'), key: 'trucks' },
    { label: t('search.filters.luxury'), key: 'luxury' }
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
      <div style={{ backgroundColor: '#f9fafb', padding: '24px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9fafb'
            }}
            styles={{ body: { padding: '24px 16px' } }}
          >
            <Skeleton active />
            <Skeleton active />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div id="search-filters-section" style={{ backgroundColor: '#f9fafb', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9fafb'
          }}
          styles={{ body: { padding: '24px 16px' } }}
        >
          {/* Title and Subtitle - Compact */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={3} style={{ margin: 0, marginBottom: '4px', color: '#1f2937', fontWeight: 'bold' }}>
              {t('search.title')}
            </Title>
            <Text style={{ fontSize: '14px', color: '#6b7280', lineHeight: '20px' }}>
              {t('search.subtitle')}
            </Text>
          </div>

          {/* Main Search Bar */}
          <div style={{ marginBottom: '16px' }}>
            <Row gutter={16} align="middle">
              <Col xs={24} sm={24} md={16} lg={18} xl={20}>
                <Input
                  placeholder={t('search.placeholder')}
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
                  {t('search.button')}
                </Button>
              </Col>
            </Row>

            {/* Recent Searches - Compact */}
            {savedSearches.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <Text style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', display: 'block' }}>
                  {t('search.recentSearches')}
                </Text>
                <Space wrap size={4}>
                  {savedSearches.slice(0, 4).map((search, index) => (
                    <Tag
                      key={index}
                      style={{
                        borderRadius: '12px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        border: '1px solid #e5e7eb',
                        fontSize: '11px'
                      }}
                      onClick={() => setSearchValue(search)}
                    >
                      {search}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {/* Quick Filters - Compact */}
            <div style={{ marginTop: '12px' }}>
              <Text style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', display: 'block' }}>
                {t('search.quickFilters')}
              </Text>
              <Space wrap size={6}>
                {quickFilters.slice(0, 6).map((filter) => (
                  <Button
                    key={filter.key}
                    type="text"
                    size="small"
                    style={{
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      color: '#6b7280',
                      fontSize: '11px',
                      height: '24px'
                    }}
                    onClick={() => handleQuickFilter(filter.key)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </Space>
            </div>
          </div>

          {/* Sort and Save Search - Compact */}
          <Row gutter={12} align="middle" style={{ marginBottom: '16px' }}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div>
                <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                  {t('search.sortBy')}
                </Text>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  size="large"
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  <Option value="relevance">{t('sort.relevance')}</Option>
                  <Option value="price_low">{t('sort.priceLow')}</Option>
                  <Option value="price_high">{t('sort.priceHigh')}</Option>
                  <Option value="mileage">{t('sort.mileage')}</Option>
                  <Option value="year_new">{t('sort.yearNew')}</Option>
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
                  {isSearchSaved ? t('common.saved') : t('search.saveSearch')}
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Filter Panel - Compact */}
          <Card
            style={{
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff'
            }}
            styles={{ body: { padding: '16px' } }}
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
                      {t('search.advancedFilters')}
                    </Text>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      {/* Make */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <div>
                          <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                            {t('search.make')}
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder={t('search.selectMakes')}
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
                          <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                            {t('search.model')}
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder={t('search.selectModels')}
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
                          <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                            {t('search.year')}
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder={t('search.selectYears')}
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
                          <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                            {t('search.priceRange')} {filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
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
                          <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                            {t('search.bodyType')}
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder={t('search.selectBodyTypes')}
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
                          <Text strong style={{ fontSize: '12px', color: '#374151', marginBottom: '6px', display: 'block' }}>
                            {t('search.condition')}
                          </Text>
                          <Select
                            mode="multiple"
                            placeholder={t('search.selectCondition')}
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
