import React, { useState } from 'react';
import { Typography, Space, Card, Button, Table, Checkbox } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// ACL matrix data - all editable fields from Technical Specification §1
const aclFields = [
  { key: 'vin', field: t('vin') },
  { key: 'auction', field: t('auction') },
  { key: 'make', field: t('make') },
  { key: 'model', field: t('model') },
  { key: 'year', field: t('year') },
  { key: 'warehouse', field: t('warehouse') },
  { key: 'pickupDate', field: t('pickup_date') },
  { key: 'deliveryDate', field: t('delivery_date') },
  { key: 'driverNumber', field: t('driver_number') },
  { key: 'route', field: t('route') },
  { key: 'price', field: t('price') },
  { key: 'isPaid', field: t('payment_status') },
  { key: 'comment', field: t('comment') },
  { key: 'photoStatus', field: t('photos') },
  { key: 'timeAdded', field: t('time_added') },
  { key: 'dispatchStatus', field: t('dispatch_status') },
];

const AclManager = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [aclMatrix, setAclMatrix] = useState(
    // Initialize with default permissions (all roles can read, only dispatcher can edit)
    aclFields.map(field => ({
      key: field.key,
      field: field.field,
      r1: true, // Role 1 (Dispatcher) - can edit
      r2: false, // Role 2 (Logistics) - read only
      r3: false, // Role 3 (Payment) - read only
    }))
  );

  // Handle checkbox changes
  const handlePermissionChange = (fieldKey, role, checked) => {
    setAclMatrix(prevMatrix =>
      prevMatrix.map(item =>
        item.key === fieldKey
          ? { ...item, [role]: checked }
          : item
      )
    );
  };

  // Handle save permissions
  const handleSavePermissions = async () => {
    setIsSaving(true);

    try {
      // TODO-FX: Implement API call (PUT /api/crm/admin/acl)
      // Payload: { permissions: aclMatrix }
      // Expected Response: { success: boolean, message: string }

      console.log('Saving ACL permissions:', aclMatrix);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message (would normally come from API)
      console.log('ACL permissions saved successfully');
    } catch (error) {
      console.error('Failed to save ACL permissions:', error);
      // TODO-FX: Show error notification to user
    } finally {
      setIsSaving(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: t('field_name'),
      dataIndex: 'field',
      key: 'field',
      width: 200,
    },
    {
      title: t('role_1_dispatcher'),
      dataIndex: 'r1',
      key: 'r1',
      width: 150,
      align: 'center',
      render: (checked, record) => (
        <Checkbox
          checked={checked}
          onChange={(e) => handlePermissionChange(record.key, 'r1', e.target.checked)}
        />
      ),
    },
    {
      title: t('role_2_logistics'),
      dataIndex: 'r2',
      key: 'r2',
      width: 150,
      align: 'center',
      render: (checked, record) => (
        <Checkbox
          checked={checked}
          onChange={(e) => handlePermissionChange(record.key, 'r2', e.target.checked)}
        />
      ),
    },
    {
      title: t('role_3_payment'),
      dataIndex: 'r3',
      key: 'r3',
      width: 150,
      align: 'center',
      render: (checked, record) => (
        <Checkbox
          checked={checked}
          onChange={(e) => handlePermissionChange(record.key, 'r3', e.target.checked)}
        />
      ),
    },
  ];
  return (
    <Card
      title={t('access_control_management')}
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={isSaving}
          onClick={handleSavePermissions}
        >
          {t('save_permissions')}
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={aclMatrix}
        rowKey="key"
        pagination={false}
        size="middle"
        bordered
        scroll={{ x: 650 }}
      />
    </Card>
  );
};

AclManager.propTypes = {
  isDark: PropTypes.bool
};

export default AclManager;
