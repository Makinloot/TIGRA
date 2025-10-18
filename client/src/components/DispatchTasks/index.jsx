import React, { useState, useEffect, useCallback } from 'react';
import {
  List, Button, Modal, Form, Input, Select, DatePicker,
  Tag, Spin, Empty, Space, message
} from 'antd';
import { PlusOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { mockTasks, SYSTEM_ROLES } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DispatchTasks = ({ dispatchId }) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchTasksForDispatch = useCallback(async () => {
    if (!dispatchId) return;

    try {
      setLoading(true);

      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/crm/dispatch/{dispatchId}/tasks
      // Expected Data: Array of task objects
      await new Promise(resolve => setTimeout(resolve, 600));

      // For demo: filter tasks by dispatchId (in real implementation, API would do this)
      // Since our mock data doesn't have dispatchId, we'll show a subset for demo
      const dispatchTasks = mockTasks.filter(task => task.relatedVin.includes(dispatchId?.toString() || ''));
      setTasks(dispatchTasks);
    } catch (error) {
      console.error('Failed to fetch tasks for dispatch:', error);
      message.error(t('failed_to_load_tasks'));
    } finally {
      setLoading(false);
    }
  }, [dispatchId]);

  useEffect(() => {
    if (dispatchId) {
      fetchTasksForDispatch();
    }
  }, [dispatchId, fetchTasksForDispatch]);

  const handleAddTask = async (values) => {
    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: POST /api/crm/tasks
      // Request Body: { title: string, assignedTo: string, dueDate: string, dispatchId: string }
      // Expected Response: { success: true, task: TaskObject }
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTask = {
        id: Date.now().toString(),
        title: values.title,
        status: 'pending',
        assignedTo: values.assignedTo,
        relatedVin: `VIN${dispatchId}`, // Mock VIN based on dispatchId
        createdBy: 'role_1', // Current user role
        dueDate: values.dueDate.format('YYYY-MM-DD')
      };

      setTasks(prevTasks => [...prevTasks, newTask]);
      setIsModalOpen(false);
      form.resetFields();
      message.success(t('task_created_successfully'));
    } catch (error) {
      console.error('Failed to create task:', error);
      message.error(t('failed_to_create_task'));
    }
  };

  const getStatusProps = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'green',
          icon: <CheckCircleOutlined />,
          text: t('completed')
        };
      case 'pending':
      default:
        return {
          color: 'orange',
          icon: <ClockCircleOutlined />,
          text: t('pending')
        };
    }
  };

  const renderTaskItem = (task) => {
    const statusProps = getStatusProps(task.status);
    const assignedRole = SYSTEM_ROLES.find(r => r.key === task.assignedTo);

    return (
      <List.Item
        key={task.id}
        actions={[
          <Tag key="status" color={statusProps.color} icon={statusProps.icon}>
            {statusProps.text}
          </Tag>
        ]}
      >
        <List.Item.Meta
          title={<strong>{task.title}</strong>}
          description={
            <Space direction="vertical" size="small">
              <div>
                <strong>{t('assigned_to')}:</strong> {assignedRole?.label || task.assignedTo}
              </div>
              <div>
                <strong>{t('due_date')}:</strong> {new Date(task.dueDate).toLocaleDateString('en-US')}
              </div>
              <div>
                <strong>{t('created_by')}:</strong> {SYSTEM_ROLES.find(r => r.key === task.createdBy)?.label || task.createdBy}
              </div>
            </Space>
          }
        />
      </List.Item>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          {t('loading_tasks')}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          {t('add_new_task')}
        </Button>

        <List
          dataSource={tasks}
          renderItem={renderTaskItem}
          locale={{
            emptyText: (
              <Empty
                description={t('no_tasks_for_this_dispatch')}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          }}
        />
      </Space>

      <Modal
        title={t('create_new_task')}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTask}
          initialValues={{
            assignedTo: 'role_2' // Default to Logistics/Shipping Coordinator
          }}
        >
          <Form.Item
            name="title"
            label={t('task_title')}
            rules={[{ required: true, message: t('please_enter_task_title') }]}
          >
            <Input placeholder={t('enter_task_title')} />
          </Form.Item>

          <Form.Item
            name="assignedTo"
            label={t('assign_to')}
            rules={[{ required: true, message: t('please_select_assignee') }]}
          >
            <Select placeholder={t('select_role')}>
              {SYSTEM_ROLES.map(role => (
                <Select.Option key={role.key} value={role.key}>
                  {role.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label={t('due_date')}
            rules={[{ required: true, message: t('please_select_due_date') }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder={t('select_due_date')}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
              }}>
                {t('cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('create_task')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

DispatchTasks.propTypes = {
  dispatchId: PropTypes.string.isRequired,
};

export default DispatchTasks;
