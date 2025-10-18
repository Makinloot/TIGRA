import React from 'react';
import { Card, Empty } from 'antd';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const UserMessaging = ({ vin }) => {
  // TODO-BIZ: Implement user-to-user messaging with VIN auto-linking (Spec §3)
  return (
    <Card title={`${t('messaging_for')} ${vin}`} size="small">
      <Empty
        description={t('messaging_system_not_implemented')}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Card>
  );
};

UserMessaging.propTypes = {
  vin: PropTypes.string.isRequired,
  messages: PropTypes.array,
  onMessageSend: PropTypes.func
};

export default UserMessaging;
