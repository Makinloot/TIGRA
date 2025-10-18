import React, { useState, useEffect } from 'react';
import {
  Drawer, Button, Row, Col, Card, Descriptions, Tag, Typography,
  Space, Divider, Statistic, Timeline, Empty, Alert, Tabs
} from 'antd';
import {
  DollarOutlined, CarOutlined, EnvironmentOutlined,
  ClockCircleOutlined, UserOutlined, PhoneOutlined,
  CheckCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import ECheckPaymentModal from '../ECheckPaymentModal';
import DispatchTasks from '../DispatchTasks';
import DispatchExpenses from '../DispatchExpenses';
import { mockDispatchVehicles } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Title, Text } = Typography;

const DispatchDetailsDrawer = ({ dispatchId, open, onClose }) => {
  const [dispatch, setDispatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (open && dispatchId) {
      fetchDispatchDetails();
    }
  }, [open, dispatchId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDispatchDetails = async () => {
    setLoading(true);

    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/dispatches/{dispatchId}
      // Expected Data: DispatchVehicle object

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundDispatch = mockDispatchVehicles.find(d => d.id === dispatchId);
      setDispatch(foundDispatch || null);
    } catch (error) {
      console.error('Failed to fetch dispatch details:', error);
      setDispatch(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_transit': return 'blue';
      case 'pending': return 'orange';
      case 'cancelled': return 'red';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'green';
      case 'processing': return 'blue';
      case 'pending': return 'orange';
      case 'failed': return 'red';
      default: return 'default';
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Drawer
        title={
          <Space>
            <CarOutlined />
            {t('dispatch_details')} - {dispatchId}
          </Space>
        }
        open={open}
        onClose={onClose}
        width={800}
        footer={
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={onClose}>
              {t('close')}
            </Button>
            {dispatch && dispatch.paymentStatus !== 'paid' && (
              <Button
                type="primary"
                size="large"
                onClick={() => setIsPaymentModalOpen(true)}
                icon={<DollarOutlined />}
              >
                {t('initiate_echeck_payment')}
              </Button>
            )}
          </Space>
        }
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>
              <Text>{t('loading_dispatch_details')}</Text>
            </div>
          </div>
        ) : dispatch ? (
          <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
            <Tabs.TabPane tab={t('overview')} key="1">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Status Overview */}
                <Card>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                      <Statistic
                        title={t('dispatch_status')}
                        value={t(dispatch.dispatchStatus)}
                        valueStyle={{ color: getStatusColor(dispatch.dispatchStatus) }}
                        prefix={
                          dispatch.dispatchStatus === 'completed' ? <CheckCircleOutlined /> :
                          dispatch.dispatchStatus === 'cancelled' ? <ExclamationCircleOutlined /> :
                          <ClockCircleOutlined />
                        }
                      />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Statistic
                        title={t('payment_status')}
                        value={t(dispatch.paymentStatus)}
                        valueStyle={{ color: getPaymentStatusColor(dispatch.paymentStatus) }}
                        prefix={<DollarOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Statistic
                        title={t('total_price')}
                        value={dispatch.price}
                        prefix="$"
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Statistic
                        title={t('vin')}
                        value={dispatch.vin}
                        valueStyle={{ fontSize: '14px' }}
                      />
                    </Col>
                  </Row>
                </Card>

                {/* Vehicle Information */}
                <Card title={
                  <Space>
                    <CarOutlined />
                    {t('vehicle_information')}
                  </Space>
                }>
                  <Descriptions column={2} bordered>
                    <Descriptions.Item label={t('vin')}>
                      <Text strong>{dispatch.vin}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={t('vehicle')}>
                      {dispatch.vehicleInfo.year} {dispatch.vehicleInfo.make} {dispatch.vehicleInfo.model}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('auction')}>
                      {dispatch.auction || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('driver')}>
                      {dispatch.driverNumber || 'Not assigned'}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Logistics Information */}
                <Card title={
                  <Space>
                    <EnvironmentOutlined />
                    {t('logistics_information')}
                  </Space>
                }>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label={t('pickup_location')}>
                      {dispatch.warehouse}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('pickup_date')}>
                      {formatDate(dispatch.pickupDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('delivery_date')}>
                      {formatDate(dispatch.deliveryDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('route')}>
                      {dispatch.route || 'Standard route'}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Additional Details */}
                <Card title={t('additional_details')}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <div>
                        <Text strong>{t('appointment_r1')}:</Text>
                        <Tag color={dispatch.isAppointmentR1 ? 'green' : 'default'} style={{ marginLeft: 8 }}>
                          {dispatch.isAppointmentR1 ? t('yes') : t('no')}
                        </Tag>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div>
                        <Text strong>{t('appointment_r2')}:</Text>
                        <Tag color={dispatch.isAppointmentR2 ? 'green' : 'default'} style={{ marginLeft: 8 }}>
                          {dispatch.isAppointmentR2 ? t('yes') : t('no')}
                        </Tag>
                      </div>
                    </Col>
                    <Col xs={24}>
                      <div>
                        <Text strong>{t('photo_status')}:</Text>
                        <Tag color={dispatch.photoStatus === 'completed' ? 'green' : 'orange'} style={{ marginLeft: 8 }}>
                          {t(dispatch.photoStatus)}
                        </Tag>
                      </div>
                    </Col>
                    <Col xs={24}>
                      <div>
                        <Text strong>{t('comment')}:</Text>
                        <div style={{ marginTop: 8, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 4 }}>
                          {dispatch.comment || t('no_comments')}
                        </div>
                      </div>
                    </Col>
                    <Col xs={24}>
                      <div>
                        <Text strong>{t('time_added')}:</Text>
                        <Text style={{ marginLeft: 8 }}>
                          {new Date(dispatch.timeAdded).toLocaleString()}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </Card>

                {/* Payment Alert */}
                {dispatch.paymentStatus === 'paid' && (
                  <Alert
                    message={t('payment_completed')}
                    description={t('this_dispatch_has_been_paid')}
                    type="success"
                    showIcon
                  />
                )}

                {dispatch.paymentStatus === 'processing' && (
                  <Alert
                    message={t('payment_processing')}
                    description={t('your_payment_is_being_processed')}
                    type="info"
                    showIcon
                  />
                )}
              </Space>
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('tasks')} key="2">
              <DispatchTasks dispatchId={dispatchId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('expenses')} key="3">
              <DispatchExpenses dispatchId={dispatchId} />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <Empty
            description={t('dispatch_not_found')}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Drawer>

      <ECheckPaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        dispatchId={dispatchId}
        amount={dispatch?.price || 0}
        dispatchDetails={dispatch}
      />
    </>
  );
};

DispatchDetailsDrawer.propTypes = {
  dispatchId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DispatchDetailsDrawer;
