import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Button, Modal, Form, Input, InputNumber, Select, Spin, Empty, Alert,
  Space, Popconfirm, message, Typography
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, DollarOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { getMockExpenses } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Text } = Typography;
const { Option } = Select;

const DispatchExpenses = ({ dispatchId }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/crm/dispatch/{dispatchId}/expenses
      // Expected Data: Array<{id: string, type: 'storage' | 'fedex' | 'other', description: string, amount: number, date: string}>

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const fetchedExpenses = getMockExpenses(dispatchId);
      setExpenses(fetchedExpenses);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setError(t('failed_to_load_expenses'));
    } finally {
      setLoading(false);
    }
  }, [dispatchId]);

  useEffect(() => {
    if (dispatchId) {
      fetchExpenses();
    }
  }, [dispatchId, fetchExpenses]);

  const handleAddExpense = async (values) => {
    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: POST /api/crm/dispatch/{dispatchId}/expenses
      // Payload: { type: string, description: string, amount: number }
      // Expected Response: { id: string, ...expenseData }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      const newExpense = {
        id: Date.now().toString(),
        type: values.type,
        description: values.description,
        amount: values.amount,
        date: new Date().toISOString().split('T')[0]
      };

      setExpenses(prev => [...prev, newExpense]);
      setIsModalVisible(false);
      form.resetFields();
      message.success(t('expense_added_successfully'));
    } catch (err) {
      console.error('Failed to add expense:', err);
      message.error(t('failed_to_add_expense'));
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: DELETE /api/crm/expenses/{expenseId}

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
      message.success(t('expense_deleted_successfully'));
    } catch (err) {
      console.error('Failed to delete expense:', err);
      message.error(t('failed_to_delete_expense'));
    }
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getExpenseTypeLabel = (type) => {
    switch (type) {
      case 'storage': return t('storage');
      case 'fedex': return t('fedex');
      case 'other': return t('other');
      default: return type;
    }
  };

  const columns = [
    {
      title: t('type'),
      dataIndex: 'type',
      key: 'type',
      render: (type) => getExpenseTypeLabel(type),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    {
      title: t('description'),
      dataIndex: 'description',
      key: 'description',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => formatCurrency(amount),
      align: 'right',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
      render: (date) => formatDate(date),
      responsive: ['md', 'lg', 'xl']
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title={t('confirm_delete_expense')}
            description={t('this_action_cannot_be_undone')}
            onConfirm={() => handleDeleteExpense(record.id)}
            okText={t('yes')}
            cancelText={t('no')}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              {t('delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text>{t('loading_expenses')}</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message={t('error_loading_expenses')}
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text strong>{t('expenses')}</Text>
          <div style={{ marginTop: 4 }}>
            <Text type="secondary">
              {t('total_expenses')}: {formatCurrency(totalExpenses)}
            </Text>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          {t('add_expense')}
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={expenses}
        rowKey="id"
        pagination={false}
        size="small"
        locale={{
          emptyText: (
            <Empty
              description={t('no_expenses_found')}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )
        }}
        scroll={{ x: 600 }}
      />

      <Modal
        title={
          <Space>
            <DollarOutlined />
            {t('add_expense')}
          </Space>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddExpense}
        >
          <Form.Item
            name="type"
            label={t('expense_type')}
            rules={[{ required: true, message: t('please_select_expense_type') }]}
          >
            <Select placeholder={t('select_expense_type')}>
              <Option value="storage">{t('storage')}</Option>
              <Option value="fedex">{t('fedex')}</Option>
              <Option value="other">{t('other')}</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={t('description')}
            rules={[{ required: true, message: t('please_enter_description') }]}
          >
            <Input placeholder={t('enter_expense_description')} />
          </Form.Item>

          <Form.Item
            name="amount"
            label={t('amount')}
            rules={[
              { required: true, message: t('please_enter_amount') },
              { type: 'number', min: 0.01, message: t('amount_must_be_positive') }
            ]}
          >
            <InputNumber
              placeholder={t('enter_amount')}
              prefix="$"
              min={0.01}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}>
                {t('cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('add_expense')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

DispatchExpenses.propTypes = {
  dispatchId: PropTypes.string.isRequired,
};

export default DispatchExpenses;
