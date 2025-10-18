import React from 'react';
import { Modal, Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmModulePickerModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogisticsClick = () => {
    navigate('/crm/logistics');
    onClose();
  };

  return (
    <Modal
      title={t('select_crm_module')}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Text type="secondary">
          {t('choose_crm_module_description')}
        </Text>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button
            block
            size="large"
            disabled
            style={{ height: '60px' }}
          >
            {t('sales_module')} - {t('coming_soon')}
          </Button>

          <Button
            type="primary"
            block
            size="large"
            onClick={handleLogisticsClick}
            style={{ height: '60px' }}
          >
            {t('logistics_module')}
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

CrmModulePickerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CrmModulePickerModal;
