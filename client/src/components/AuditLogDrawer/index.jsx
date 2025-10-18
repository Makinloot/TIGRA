import React, { useState, useEffect } from 'react';
import { Drawer, Timeline, Spin, Empty, Typography } from 'antd';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Text } = Typography;

const AuditLogDrawer = ({ dispatchId, open, onClose }) => {
  const [auditEntries, setAuditEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && dispatchId) {
      fetchAuditLog();
    }
  }, [open, dispatchId]);

  const fetchAuditLog = async () => {
    setLoading(true);

    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/dispatches/{dispatchId}/audit-log
      // Expected Data: Array<{id: string, timestamp: string, user: string, action: string, field: string, oldValue: any, newValue: any}>

      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock audit entries for demonstration
      const mockAuditEntries = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          user: 'dispatcher_john',
          action: 'created',
          field: 'dispatch',
          oldValue: null,
          newValue: 'New dispatch created',
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 1.5 hours ago
          user: 'dispatcher_john',
          action: 'updated',
          field: 'driverNumber',
          oldValue: null,
          newValue: 'DRV001',
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
          user: 'system',
          action: 'updated',
          field: 'paymentStatus',
          oldValue: 'pending',
          newValue: 'processing',
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
          user: 'dispatcher_sarah',
          action: 'updated',
          field: 'warehouse',
          oldValue: 'Miami, FL',
          newValue: 'Orlando, FL',
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
          user: 'dispatcher_sarah',
          action: 'updated',
          field: 'comment',
          oldValue: 'Clean vehicle',
          newValue: 'Clean vehicle, ready for transport',
        },
      ];

      setAuditEntries(mockAuditEntries);
    } catch (error) {
      console.error('Failed to fetch audit log:', error);
      setAuditEntries([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Drawer
      title={`${t('audit_log_for_dispatch')} ${dispatchId}`}
      open={open}
      onClose={onClose}
      width={600}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            <Text>{t('loading_audit_log')}</Text>
          </div>
        </div>
      ) : auditEntries.length > 0 ? (
        <Timeline
          mode="left"
          items={auditEntries.map((entry) => ({
            key: entry.id,
            label: new Date(entry.timestamp).toLocaleString(),
            children: (
              <div>
                <Text strong>{entry.user.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
                <br />
                <Text type="secondary">
                  {entry.action === 'created' && `${t('created')} ${t(entry.field)}`}
                  {entry.action === 'updated' && `${t('changed')} ${t(entry.field)} ${t('from')} "${entry.oldValue || t('empty')}" ${t('to')} "${entry.newValue || t('empty')}"`}
                </Text>
              </div>
            ),
          }))}
        />
      ) : (
        <Empty
          description={t('no_audit_entries_found')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Drawer>
  );
};

AuditLogDrawer.propTypes = {
  dispatchId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AuditLogDrawer;
