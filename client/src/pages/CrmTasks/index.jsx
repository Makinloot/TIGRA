import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { Table, Card, Tag, Spin, Alert, Empty, Space, Button } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { mockTasks, SYSTEM_ROLES } from '../../mocks/_mockData';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmTasks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO-FX: Replace with real API call.
        // API Endpoint: GET /api/crm/tasks
        // Expected Data: Array of task objects
        await new Promise(resolve => setTimeout(resolve, 800));

        setTasks(mockTasks);
      } catch (err) {
        setError(t('failed_to_load_tasks'));
        console.error('Failed to load tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Get status color and icon
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

  // Render status tag
  const renderStatus = (status) => {
    const statusProps = getStatusProps(status);
    return (
      <Tag color={statusProps.color} icon={statusProps.icon}>
        {statusProps.text}
      </Tag>
    );
  };

  // Render assigned to (map role key to label)
  const renderAssignedTo = (assignedTo) => {
    const role = SYSTEM_ROLES.find(r => r.key === assignedTo);
    return role ? role.label : assignedTo;
  };

  // Render VIN as link to dispatch details
  const renderRelatedVin = (vin) => (
    <Link to={`/crm/dispatch?vin=${vin}`}>
      {vin}
    </Link>
  );

  // CSV export configuration
  const csvHeaders = [
    { label: t('title'), key: 'title' },
    { label: t('related_vin'), key: 'relatedVin' },
    { label: t('status'), key: 'status' },
    { label: t('assigned_to'), key: 'assignedTo' },
    { label: t('due_date'), key: 'dueDate' }
  ];

  // TODO-FX: Connect to i18n library.
  const csvData = tasks;

  // Table columns
  const columns = [
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: t('related_vin'),
      dataIndex: 'relatedVin',
      key: 'relatedVin',
      render: renderRelatedVin,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: renderStatus,
      filters: [
        { text: t('pending'), value: 'pending' },
        { text: t('completed'), value: 'completed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t('due_date'),
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => new Date(date).toLocaleDateString('en-US'),
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    },
    {
      title: t('assigned_to'),
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: renderAssignedTo,
      filters: SYSTEM_ROLES.map(role => ({ text: role.label, value: role.key })),
      onFilter: (value, record) => record.assignedTo === value,
    },
  ];

  // Handle loading state
  if (loading) {
    return (
      <Card title={t('my_tasks')}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            {t('loading_tasks')}
          </div>
        </div>
      </Card>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Card title={t('my_tasks')}>
        <Alert
          message={t('error')}
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card
      title={t('my_tasks')}
      extra={
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={`${t('my_tasks').toLowerCase().replace(' ', '-')}-export.csv`}
        >
          <Button
            icon={<DownloadOutlined />}
            disabled={loading || tasks.length === 0}
          >
            {t('export_to_csv')} {/* TODO-FX: Connect to i18n library. */}
          </Button>
        </CSVLink>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${t('of')} ${total} ${t('tasks')}`
          }}
          locale={{
            emptyText: (
              <Empty
                description={t('no_tasks_found')}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          }}
        />
      </Space>
    </Card>
  );
};

CrmTasks.propTypes = {
  // Add props when needed
};

export default CrmTasks;
