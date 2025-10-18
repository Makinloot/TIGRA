import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Select, Input, Button, message } from 'antd';
import { cancelDispatch } from '../../utils/cmsUtils';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { TextArea } = Input;
const { Option } = Select;

const CancelDispatchModal = ({ open, onClose, dispatchId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Cancellation reasons as per Spec §5.1
  const cancellationReasons = [
    { value: 'weather_delay', label: t('weather_delay') },
    { value: 'vehicle_issue', label: t('vehicle_issue') },
    { value: 'driver_unavailable', label: t('driver_unavailable') },
    { value: 'customer_request', label: t('customer_request') },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Call the cancelDispatch utility function
      await cancelDispatch(dispatchId, values.reason, values.comment);

      // TODO-FX: Replace with real API call.
      // API Endpoint: PUT /api/dispatches/{dispatchId}/cancel
      // Payload: { reason: string, comment: string, cancelledBy: string, timestamp: Date }
      // Expected Response: Updated dispatch object

      message.success(t('dispatch_cancelled_successfully'));
      onSuccess?.();
      onClose();
      form.resetFields();
    } catch (error) {
      console.error('Failed to cancel dispatch:', error);
      message.error(t('failed_to_cancel_dispatch'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={t('cancel_dispatch')}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t('cancel')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          loading={loading}
          onClick={() => form.submit()}
        >
          {t('confirm_cancellation')}
        </Button>,
      ]}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          reason: undefined,
          comment: '',
        }}
      >
        <Form.Item
          name="reason"
          label={t('cancellation_reason')}
          rules={[
            { required: true, message: t('please_select_cancellation_reason') },
          ]}
        >
          <Select placeholder={t('select_cancellation_reason')}>
            {cancellationReasons.map((reason) => (
              <Option key={reason.value} value={reason.value}>
                {reason.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="comment"
          label={t('cancellation_comment')}
          rules={[
            { required: true, message: t('please_provide_cancellation_comment') },
            { min: 10, message: t('comment_must_be_at_least_10_characters') },
          ]}
        >
          <TextArea
            placeholder={t('explain_the_reason_for_cancellation')}
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CancelDispatchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatchId: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default CancelDispatchModal;
