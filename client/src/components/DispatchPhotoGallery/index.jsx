import React from 'react';
import { Card, Empty } from 'antd';
import PropTypes from 'prop-types';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DispatchPhotoGallery = ({ dispatchId: _dispatchId }) => {
  void _dispatchId; // Parameter will be used when implementing the photo gallery functionality
  // TODO-BIZ: Implement Drag-n-Drop, reordering, and 3-6x mousewheel zoom (Spec §3)
  return (
    <Card title={t('dispatch_photos')} size="small">
      <Empty
        description={t('photo_gallery_not_implemented')}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Card>
  );
};

DispatchPhotoGallery.propTypes = {
  dispatchId: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string),
  onPhotoUpdate: PropTypes.func
};

export default DispatchPhotoGallery;
