import React from 'react';
import { Modal, Descriptions, Tag, Empty } from 'antd';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DriverAnalyticsPopup = ({ stats, open, onClose }) => {
  if (!stats) {
    return (
      <Modal
        title={t('driver_analytics')}
        open={open}
        onCancel={onClose}
        footer={null}
        width={600}
      >
        <Empty
          description={t('no_driver_stats_available')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Modal>
    );
  }

  const items = [
    {
      key: 'totalDispatches',
      label: t('total_dispatches'),
      children: stats.totalDispatches,
    },
    {
      key: 'totalCancels',
      label: t('total_cancels'),
      children: stats.totalCancels,
    },
    {
      key: 'redCircles',
      label: t('red_circles'),
      children: (
        <Tag color="red">
          {stats.redCircles}
        </Tag>
      ),
    },
    {
      key: 'successRate',
      label: t('success_rate'),
      children: stats.totalDispatches > 0
        ? `${Math.round(((stats.totalDispatches - stats.totalCancels) / stats.totalDispatches) * 100)}%`
        : '0%',
    },
  ];

  return (
    <Modal
      title={`${t('driver_analytics')} - ${stats.driverNumber || t('unknown_driver')}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Descriptions
        bordered
        column={2}
        items={items}
        size="small"
      />
    </Modal>
  );
};

DriverAnalyticsPopup.propTypes = {
  stats: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DriverAnalyticsPopup;
