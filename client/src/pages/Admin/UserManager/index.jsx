import React, { useState } from 'react';
import { Card, Button, Table, Tag, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { mockCrmUsers, SYSTEM_ROLES } from '../../../mocks/_mockData';
import EditUserPermissionsModal from '../../../components/EditUserPermissionsModal';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const UserManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // TODO-FX: Replace with real API call.
  // API Endpoint: GET /api/crm/users
  // Expected Data: Array<{id: string, name: string, email: string, baseRole: string, customPermissions: string[]}>
  const users = mockCrmUsers;

  const handleAddNewUser = () => {
    setEditingUserId(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUserId(null);
  };

  const getRoleLabel = (roleKey) => {
    const role = SYSTEM_ROLES.find(r => r.key === roleKey);
    return role ? role.label : roleKey;
  };

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('base_role'),
      dataIndex: 'baseRole',
      key: 'baseRole',
      render: (baseRole) => (
        <Tag color="blue">{getRoleLabel(baseRole)}</Tag>
      ),
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.id)}
          >
            {t('edit_permissions')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t('user_management')}
      extra={
        <Button type="primary" onClick={handleAddNewUser}>
          {t('add_new_user')}
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
      />

      <EditUserPermissionsModal
        open={isModalOpen}
        onClose={handleModalClose}
        userId={editingUserId}
      />
    </Card>
  );
};

UserManager.propTypes = {
  // No props required for this page component
};

export default UserManager;
