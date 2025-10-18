import React from 'react';
import { Card, Empty } from 'antd';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DispatchComments = ({ dispatchId: _dispatchId }) => {
  void _dispatchId; // Parameter will be used when implementing the comments functionality
  // TODO-BIZ: Implement comment thread with replies and 5-photo attachments (Spec §3)
  return (
    <Card title={t('dispatch_comments')} size="small">
      <Empty
        description={t('comments_system_not_implemented')}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Card>
  );
};

DispatchComments.propTypes = {
  dispatchId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  onCommentAdd: PropTypes.func
};

export default DispatchComments;
