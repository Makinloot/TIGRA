import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import {
  Table, Spin, Alert, Empty, Row, Col, Space, Card, Tag, Tooltip,
  Typography, Button
} from 'antd';
import {
  CloseCircleOutlined, CameraOutlined, UserOutlined,
  HistoryOutlined, DownloadOutlined
} from '@ant-design/icons';
import AuditLogDrawer from '../../components/AuditLogDrawer';
import PropTypes from 'prop-types';
import { mockCancelledDispatches } from '../../mocks/_mockData';
import './index.css';

const { Column } = Table;
const { Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmCancelled = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatches, setDispatches] = useState([]);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [selectedDispatchId, setSelectedDispatchId] = useState(null);

  // Simulate API fetch
  useEffect(() => {
    const fetchCancelledDispatches = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO-FX: Replace with real API call.
        // API Endpoint: GET /api/crm/dispatch/cancelled
        // Expected Data: Array of cancelled dispatch objects
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        setDispatches(mockCancelledDispatches);
      } catch (err) {
        setError(t('failed_to_load_cancelled_dispatches'));
        console.error('Failed to load cancelled dispatch vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledDispatches();
  }, []);

  // Render payment status (cancelled status)
  const renderPaymentStatus = (status) => {
    if (status === 'cancelled') {
      return (
        <Tag color="red" icon={<CloseCircleOutlined />}>
          {t('cancelled')}
        </Tag>
      );
    }
    return <Tag>{status}</Tag>;
  };

  // Render photo status
  const renderPhotoStatus = (status) => {
    return (
      <Tooltip title={status === 'complete' ? t('photos_complete') : t('photos_missing')}>
        <CameraOutlined style={{ color: status === 'complete' ? 'green' : 'red' }} />
      </Tooltip>
    );
  };

  // Render appointment indicators
  const renderAppointmentIndicators = (value, record) => {
    return (
      <Space>
        {record?.isAppointmentR1 && <Tag color="blue">R1</Tag>}
        {record?.isAppointmentR2 && <Tag color="purple">R2</Tag>}
      </Space>
    );
  };

  // Handle audit log
  const openAuditLog = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsAuditDrawerOpen(true);
  };

  // CSV export configuration
  const csvHeaders = [
    { label: t('vin'), key: 'vin' },
    { label: t('make'), key: 'vehicleInfo.make' },
    { label: t('model'), key: 'vehicleInfo.model' },
    { label: t('year'), key: 'vehicleInfo.year' },
    { label: t('auction'), key: 'auction' },
    { label: t('pickup_date'), key: 'pickupDate' },
    { label: t('delivery_date'), key: 'deliveryDate' },
    { label: t('price'), key: 'price' },
    { label: t('payment_status'), key: 'paymentStatus' },
    { label: t('cancellation_reason'), key: 'cancellationReason' }
  ];

  // TODO-FX: Connect to i18n library.
  const csvData = dispatches.map(item => ({
    ...item,
    'vehicleInfo.make': item.vehicleInfo?.make || '',
    'vehicleInfo.model': item.vehicleInfo?.model || '',
    'vehicleInfo.year': item.vehicleInfo?.year || ''
  }));

  // Handle loading state
  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: '400px' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Alert
            message={t('error')}
            description={error}
            type="error"
            showIcon
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Card
        title={t('cancelled_list')}
        extra={
          <Space>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={`${t('cancelled_list').toLowerCase().replace(' ', '-')}-export.csv`}
            >
              <Button
                icon={<DownloadOutlined />}
                disabled={loading || dispatches.length === 0}
              >
                {t('export_to_csv')} {/* TODO-FX: Connect to i18n library. */}
              </Button>
            </CSVLink>
            <Text type="secondary">
              {t('showing_cancelled_dispatches')}
            </Text>
          </Space>
        }
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Table */}
          <Table
            dataSource={dispatches}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} ${t('of')} ${total} ${t('dispatches')}`
            }}
            scroll={{ x: 1800 }}
            locale={{
              emptyText: (
                <Empty
                  description={t('no_cancelled_dispatches_found')}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )
            }}
          >
            <Column
              title={t('vin')}
              dataIndex="vin"
              key="vin"
              fixed="left"
              width={150}
            />
            <Column
              title={t('auction')}
              dataIndex="auction"
              key="auction"
              width={100}
            />
            <Column
              title={t('vehicle_info')}
              key="vehicleInfo"
              width={150}
              render={(value, record) => (
                <div>
                  <div style={{ fontWeight: 'bold' }}>
                    {record.vehicleInfo?.year} {record.vehicleInfo?.make}
                  </div>
                  <div style={{ color: '#666' }}>
                    {record.vehicleInfo?.model}
                  </div>
                </div>
              )}
            />
            <Column
              title={t('pickup_date')}
              dataIndex="pickupDate"
              key="pickupDate"
              width={120}
              render={(date) => new Date(date).toLocaleDateString('en-US')}
            />
            <Column
              title={t('delivery_date')}
              dataIndex="deliveryDate"
              key="deliveryDate"
              width={120}
              render={(date) => new Date(date).toLocaleDateString('en-US')}
            />
            <Column
              title={t('warehouse')}
              dataIndex="warehouse"
              key="warehouse"
              width={120}
            />
            <Column
              title={t('driver')}
              dataIndex="driverNumber"
              key="driverNumber"
              width={100}
              render={(driver) => (
                <Space>
                  <UserOutlined />
                  {driver}
                </Space>
              )}
            />
            <Column
              title={t('route')}
              dataIndex="toTo"
              key="toTo"
              width={100}
            />
            <Column
              title={t('price')}
              dataIndex="price"
              key="price"
              width={100}
              render={(price) => `$${price?.toLocaleString() || '0'}`}
            />
            <Column
              title={t('appointments')}
              key="appointments"
              width={120}
              render={renderAppointmentIndicators}
            />
            <Column
              title={t('payment_status')}
              dataIndex="paymentStatus"
              key="paymentStatus"
              width={130}
              render={renderPaymentStatus}
            />
            <Column
              title={t('photos')}
              dataIndex="photoStatus"
              key="photoStatus"
              width={80}
              render={renderPhotoStatus}
            />
            <Column
              title={t('cancellation_reason')}
              dataIndex="cancellationReason"
              key="cancellationReason"
              width={180}
              render={(reason) => (
                <Tooltip title={reason}>
                  <Text ellipsis={{ tooltip: reason }}>
                    {reason || t('no_reason_provided')}
                  </Text>
                </Tooltip>
              )}
            />
            <Column
              title={t('time_added')}
              dataIndex="timeAdded"
              key="timeAdded"
              width={140}
              render={(time) => new Date(time).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            />
            <Column
              title={t('comment')}
              dataIndex="comment"
              key="comment"
              width={150}
              render={(comment) => (
                <Tooltip title={comment}>
                  <Text ellipsis={{ tooltip: comment }}>
                    {comment || t('no_comment')}
                  </Text>
                </Tooltip>
              )}
            />
            <Column
              title={t('actions')}
              key="actions"
              fixed="right"
              width={120}
              render={(text, record) => (
                <Button
                  type="link"
                  icon={<HistoryOutlined />}
                  onClick={() => openAuditLog(record.id)}
                  size="small"
                >
                  {t('audit_log')}
                </Button>
              )}
            />
          </Table>
        </Space>
      </Card>

      <AuditLogDrawer
        dispatchId={selectedDispatchId}
        open={isAuditDrawerOpen}
        onClose={() => {
          setIsAuditDrawerOpen(false);
          setSelectedDispatchId(null);
        }}
      />
    </>
  );
};

CrmCancelled.propTypes = {
  // Add props when needed
};

export default CrmCancelled;
