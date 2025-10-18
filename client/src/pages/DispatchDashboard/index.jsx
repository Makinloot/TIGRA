import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import {
  Table, Spin, Alert, Empty, Row, Col, Space, Input, Select, Button,
  DatePicker, Tag, Tooltip, Badge, Typography, Card, Dropdown,
  Statistic, Modal, message
} from 'antd';
import {
  SearchOutlined, FilterOutlined, ClearOutlined,
  CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined,
  CameraOutlined, UserOutlined, PlusOutlined, HistoryOutlined,
  PauseCircleOutlined, CloseCircleOutlined, DownloadOutlined
} from '@ant-design/icons';
import AddDispatchModal from '../../components/AddDispatchModal';
import CancelDispatchModal from '../../components/CancelDispatchModal';
import AuditLogDrawer from '../../components/AuditLogDrawer';
import { holdPayment } from '../../utils/cmsUtils';
import PropTypes from 'prop-types';
import { mockDispatchVehicles, mockTasks, SYSTEM_ROLES } from '../../mocks/_mockData';
import './index.css';

const { Column } = Table;
const { RangePicker } = DatePicker;
const { Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DispatchDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatches, setDispatches] = useState([]);
  const [filteredDispatches, setFilteredDispatches] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [selectedDispatchId, setSelectedDispatchId] = useState(null);

  // Filter states
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  // Simulate API fetch
  useEffect(() => {
    const fetchDispatches = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO-FX: Replace with real API call.
        // API Endpoint: GET /api/crm/dispatch
        // Query Params: ?search=, &status=, &dateRange=
        // Expected Data: Array<DispatchVehicle>
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        setDispatches(mockDispatchVehicles);
        setFilteredDispatches(mockDispatchVehicles);
      } catch (err) {
        setError(t('failed_to_load_dispatches'));
        console.error('Failed to load dispatch vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDispatches();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = dispatches;

    // Search filter (VIN, driver, warehouse, vehicle info)
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(dispatch =>
        dispatch.vin.toLowerCase().includes(searchLower) ||
        dispatch.driverNumber.toLowerCase().includes(searchLower) ||
        dispatch.warehouse.toLowerCase().includes(searchLower) ||
        dispatch.vehicleInfo.make.toLowerCase().includes(searchLower) ||
        dispatch.vehicleInfo.model.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(dispatch =>
        statusFilter.includes(dispatch.dispatchStatus)
      );
    }

    // Date range filter (pickup date)
    if (dateRange && dateRange.length === 2) {
      filtered = filtered.filter(dispatch => {
        const pickupDate = new Date(dispatch.pickupDate);
        const startDate = dateRange[0].toDate();
        const endDate = dateRange[1].toDate();
        return pickupDate >= startDate && pickupDate <= endDate;
      });
    }

    setFilteredDispatches(filtered);
  }, [dispatches, searchValue, statusFilter, dateRange]);

  // Get row style based on dispatch status (Spec §5.2 - Police Tape Pattern)
  const getRowClassName = (record) => {
    switch (record.dispatchStatus) {
      case 'new': return 'dispatch-row-new';
      case 'overdue': return 'dispatch-row-overdue';
      case 'paid': return 'dispatch-row-paid';
      case 'on_hold': return 'dispatch-row-on-hold'; // Police tape styling
      default: return '';
    }
  };

  // Render payment status with dynamic timers (Spec §2)
  const renderPaymentStatus = (status, record) => {
    // Green status - Paid
    if (status === 'paid') {
      return (
        <Tag color="green" icon={<CheckCircleOutlined />}>
          {t('paid')}
        </Tag>
      );
    }

    // Orange status - On Hold (Police Tape)
    if (status === 'on_hold') {
      return (
        <Tag color="orange" icon={<PauseCircleOutlined />}>
          {t('on_hold')}
        </Tag>
      );
    }

    // Red status - Overdue
    if (status === 'overdue') {
      return (
        <Tag color="red" icon={<ExclamationCircleOutlined />}>
          {t('payment_overdue')}
        </Tag>
      );
    }

    // Yellow status - Pending with countdown timer (Spec §2)
    if (status === 'pending' && record.deliveryDate) {
      const deliveryDate = new Date(record.deliveryDate);
      const now = new Date();

      if (deliveryDate > now) {
        // Show countdown timer for pending payments
        return (
          <Statistic.Timer
            title={t('payment_due_in')}
            value={deliveryDate}
            format="D[d] H[h] m[m] s[s]"
            size="small"
            type="countdown"
            onFinish={() => {
              // When timer expires, could trigger status update
              console.log('Payment timer expired for dispatch:', record.id);
            }}
          />
        );
      } else {
        // Past due date - should be overdue
        return (
          <Tag color="red" icon={<ExclamationCircleOutlined />}>
            {t('payment_overdue')}
          </Tag>
        );
      }
    }

    // Default pending status
    return (
      <Tag color="blue" icon={<ClockCircleOutlined />}>
        {t('pending')}
      </Tag>
    );
  };

  // Render photo status
  const renderPhotoStatus = (status) => {
    return (
      <Tooltip title={status === 'complete' ? t('photos_complete') : t('photos_missing')}>
        <Badge
          status={status === 'complete' ? 'success' : 'error'}
          text={<CameraOutlined />}
        />
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

  // Clear all filters
  const clearFilters = () => {
    setSearchValue('');
    setStatusFilter([]);
    setDateRange([]);
  };

  // Refetch dispatches data
  const refetchDispatches = async () => {
    // TODO-FX: Implement refetch logic
    // This should refetch the dispatches from the API and update the table
    console.log('Refetching dispatch data...');
    // For now, just refresh the current data
    setFilteredDispatches([...dispatches]);
  };

  // Handle payment hold (Spec §5.2)
  const handleHoldPayment = async (dispatchId) => {
    Modal.confirm({
      title: t('confirm_hold_payment'),
      content: t('hold_payment_warning'),
      okText: t('confirm'),
      cancelText: t('cancel'),
      okType: 'danger',
      onOk: async () => {
        try {
          await holdPayment(dispatchId);

          // Update local state to reflect on_hold status
          setDispatches(prevDispatches =>
            prevDispatches.map(dispatch =>
              dispatch.id === dispatchId
                ? { ...dispatch, paymentStatus: 'on_hold', dispatchStatus: 'on_hold' }
                : dispatch
            )
          );

          // TODO-FX: Auto-create QC investigation task and open task modal
          // Enhancement: After payment hold, automatically create a QC investigation task
          // This connects the payment hold workflow to the formal task management system
          const dispatch = dispatches.find(d => d.id === dispatchId);
          if (dispatch) {
            // Create QC investigation task
            const qcTask = {
              id: `qc_${dispatchId}_${Date.now()}`,
              title: t('qc_issue_investigation'),
              status: 'pending',
              assignedTo: 'role_2', // Logistics/Shipping Coordinator
              relatedVin: dispatch.vin,
              createdBy: 'role_3', // Payment role (current user)
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
            };

            // TODO-FX: Replace with real API call to create task
            // For now, add to mockTasks array
            mockTasks.push(qcTask);

            // TODO-FX: Open the Add New Task modal in DispatchDetailsDrawer with pre-filled data
            // This requires cross-component communication (Context or global state)
            // For now, just show a success message indicating task was created
            message.success(`${t('payment_held_successfully')} ${t('qc_task_created')}`);
          } else {
            message.success(t('payment_held_successfully'));
          }
        } catch (error) {
          console.error('Failed to hold payment:', error);
          message.error(t('failed_to_hold_payment'));
        }
      },
    });
  };

  // Handle view details (placeholder for future implementation)
  const handleViewDetails = (dispatchId) => {
    // TODO-FX: Implement view details modal
    console.log('Viewing details for dispatch:', dispatchId);
    message.info(t('view_details_not_implemented'));
  };

  // Handle audit log
  const openAuditLog = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsAuditDrawerOpen(true);
  };

  // Handle cancel dispatch
  const openCancelModal = (dispatchId) => {
    setSelectedDispatchId(dispatchId);
    setIsCancelModalOpen(true);
  };

  // Handle cancel modal success
  const handleCancelSuccess = () => {
    // Update local state to reflect cancelled status
    setDispatches(prevDispatches =>
      prevDispatches.map(dispatch =>
        dispatch.id === selectedDispatchId
          ? { ...dispatch, dispatchStatus: 'cancelled' }
          : dispatch
      )
    );
    setIsCancelModalOpen(false);
    setSelectedDispatchId(null);
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
    { label: t('payment_status'), key: 'paymentStatus' }
  ];

  // TODO-FX: Connect to i18n library.
  const csvData = filteredDispatches.map(item => ({
    ...item,
    'vehicleInfo.make': item.vehicleInfo?.make || '',
    'vehicleInfo.model': item.vehicleInfo?.model || '',
    'vehicleInfo.year': item.vehicleInfo?.year || ''
  }));

  // Menu props for dropdown button
  const menuProps = (record) => ({
    items: [
      {
        key: 'audit',
        icon: <HistoryOutlined />,
        label: t('audit_log'),
        onClick: () => openAuditLog(record.id),
      },
      {
        key: 'hold',
        icon: <PauseCircleOutlined />,
        label: t('hold_payment'),
        onClick: () => handleHoldPayment(record.id),
        disabled: record.paymentStatus === 'paid' || record.paymentStatus === 'on_hold',
      },
      {
        key: 'cancel',
        icon: <CloseCircleOutlined />,
        label: t('cancel_dispatch'),
        danger: true,
        onClick: () => openCancelModal(record.id),
        disabled: record.dispatchStatus === 'completed' || record.dispatchStatus === 'cancelled',
      },
    ],
  });

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
        title={t('dispatch_dashboard')}
        extra={
          <Space>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={`${t('dispatch_dashboard').toLowerCase().replace(' ', '-')}-export.csv`}
            >
              <Button
                icon={<DownloadOutlined />}
                disabled={loading || filteredDispatches.length === 0}
              >
                {t('export_to_csv')} {/* TODO-FX: Connect to i18n library. */}
              </Button>
            </CSVLink>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
            >
              {t('add_new_dispatch')}
            </Button>
          </Space>
        }
      >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Filters Section */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder={t('search_by_vin_driver_etc')}
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              mode="multiple"
              placeholder={t('filter_by_status')}
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              allowClear
            >
              <Select.Option value="new">{t('new')}</Select.Option>
              <Select.Option value="pending_payment">{t('pending_payment')}</Select.Option>
              <Select.Option value="overdue">{t('overdue')}</Select.Option>
              <Select.Option value="paid">{t('paid')}</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker
              placeholder={[t('pickup_date_from'), t('pickup_date_to')]}
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space>
              <Button
                type="primary"
                icon={<FilterOutlined />}
                disabled={!searchValue && statusFilter.length === 0 && (!dateRange || dateRange.length === 0)}
              >
                {t('apply_filters')}
              </Button>
              <Button
                icon={<ClearOutlined />}
                onClick={clearFilters}
                disabled={!searchValue && statusFilter.length === 0 && (!dateRange || dateRange.length === 0)}
              >
                {t('clear')}
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Table */}
        <Table
          dataSource={filteredDispatches}
          rowKey="id"
          rowClassName={getRowClassName}
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
                description={t('no_dispatches_found')}
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
              <Dropdown.Button
                menu={menuProps(record)}
                onClick={() => handleViewDetails(record.id)}
                size="small"
              >
                {t('view_details')}
              </Dropdown.Button>
            )}
          />
        </Table>
      </Space>
    </Card>

      <AddDispatchModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refetchDispatches}
      />

      <CancelDispatchModal
        open={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedDispatchId(null);
        }}
        dispatchId={selectedDispatchId}
        onSuccess={handleCancelSuccess}
      />

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

DispatchDashboard.propTypes = {
  // Add props when needed
};

export default DispatchDashboard;
