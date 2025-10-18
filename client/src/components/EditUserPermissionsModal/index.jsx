import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Transfer, Input, Button, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  mockCrmUsers,
  SYSTEM_ROLES,
  mockMasterPermissionList,
  mockRolePermissionMap
} from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const EditUserPermissionsModal = ({ open, onClose, userId }) => {
  const [form] = Form.useForm();
  const [targetKeys, setTargetKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const isCreateMode = userId === null;

  useEffect(() => {
    if (open) {
      if (isCreateMode) {
        // Create mode: reset form
        form.resetFields();
        setTargetKeys([]);
      } else {
        // Edit mode: load existing user data
        // TODO-FX: Replace with real API call.
        // API Endpoint: GET /api/crm/users/{userId}
        // Expected Data: {id: string, name: string, email: string, baseRole: string, customPermissions: string[]}
        const user = mockCrmUsers.find(u => u.id === userId);
        if (user) {
          form.setFieldsValue({
            name: user.name,
            email: user.email,
            baseRole: user.baseRole,
            customPermissions: user.customPermissions
          });
          setTargetKeys(user.customPermissions);
        }
      }
    }
  }, [open, userId, form, isCreateMode]);

  const handleRoleChange = (selectedRole) => {
    // When role changes, update the Transfer component with the template permissions
    const templatePermissions = mockRolePermissionMap[selectedRole] || [];
    setTargetKeys(templatePermissions);
    form.setFieldsValue({ customPermissions: templatePermissions });
  };

  const handleTransferChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    form.setFieldsValue({ customPermissions: newTargetKeys });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (isCreateMode) {
        // TODO-FX: Replace with real API call.
        // API Endpoint: POST /api/crm/users
        // Expected Data: {name: string, email: string, password: string, baseRole: string, customPermissions: string[]}
        console.log('Creating new user:', values);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // TODO-FX: Replace with real API call.
        // API Endpoint: PUT /api/crm/users/{userId}
        // Expected Data: {name: string, email: string, baseRole: string, customPermissions: string[]}
        console.log('Updating user:', userId, values);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      onClose();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isCreateMode ? t('add_new_user') : t('edit_user_permissions')}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t('cancel')}
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleSave}>
          {t('save')}
        </Button>,
      ]}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}
      >
        {isCreateMode && (
          <>
            <Form.Item
              name="name"
              label={t('name')}
              rules={[{ required: true, message: t('name_is_required') }]}
            >
              <Input placeholder={t('enter_user_name')} />
            </Form.Item>

            <Form.Item
              name="email"
              label={t('email')}
              rules={[
                { required: true, message: t('email_is_required') },
                { type: 'email', message: t('invalid_email') }
              ]}
            >
              <Input placeholder={t('enter_email')} />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('password')}
              rules={[{ required: true, message: t('password_is_required') }]}
            >
              <Input.Password placeholder={t('enter_password')} />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="baseRole"
          label={t('base_role')}
          rules={[{ required: true, message: t('base_role_is_required') }]}
        >
          <Select
            placeholder={t('select_a_base_role')}
            onChange={handleRoleChange}
            options={SYSTEM_ROLES.map(role => ({
              value: role.key,
              label: role.label
            }))}
          />
        </Form.Item>

        <Form.Item
          name="customPermissions"
          label={t('custom_functions')}
          rules={[{ required: true, message: t('custom_functions_is_required') }]}
        >
          <Transfer
            dataSource={mockMasterPermissionList}
            targetKeys={targetKeys}
            onChange={handleTransferChange}
            render={(item) => item.title}
            titles={[t('available_functions'), t('assigned_functions')]}
            listStyle={{
              width: 300,
              height: 300,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditUserPermissionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default EditUserPermissionsModal;
