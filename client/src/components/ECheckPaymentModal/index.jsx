import React, { useState, useRef } from 'react';
import {
  Modal, Form, Input, Button, Statistic, Spin, Alert, Row, Col, Space
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ReactToPrint from 'react-to-print';
import PropTypes from 'prop-types';
import InvoiceTemplate from '../InvoiceTemplate';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const ECheckPaymentModal = ({
  open,
  onClose,
  dispatchId,
  amount,
  dispatchDetails
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef();

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: POST /api/payments/echeck/submit
      // Request Body: { dispatchId: string, amount: number, bankName: string, routingNumber: string, accountNumber: string }
      // Expected Response: { success: true, transactionId: string, paymentStatus: 'processing' }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('eCheck payment submitted:', {
        dispatchId,
        amount,
        ...values
      });

      setPaymentSubmitted(true);
    } catch (error) {
      console.error('Failed to submit eCheck payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setPaymentSubmitted(false);
      form.resetFields();
      onClose();
    }
  };

  return (
    <>
      <Modal
        title={t('submit_echeck_payment')}
        open={open}
        onCancel={handleClose}
        footer={null}
        width={600}
        destroyOnClose
      >
        {paymentSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Alert
              message={t('payment_submitted')}
              description={`${t('your_echeck_payment_for_dispatch')} ${dispatchId} ${t('has_been_submitted_and_is_being_processed')}`}
              type="success"
              showIcon
              style={{ marginBottom: 24 }}
            />
            <Space direction="vertical" size="large">
              <Statistic
                title={t('payment_amount')}
                value={amount}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
              />
              <Space>
                <ReactToPrint
                  trigger={() => (
                    <Button icon={<DownloadOutlined />}>
                      {t('download_invoice_pdf')}
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
                <Button type="primary" onClick={handleClose}>
                  {t('close')}
                </Button>
              </Space>
            </Space>
          </div>
        ) : (
          <div>
            <Row justify="center" style={{ marginBottom: 24 }}>
              <Col>
                <Statistic
                  title={t('payment_amount')}
                  value={amount}
                  prefix="$"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </Row>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={loading}
            >
              <Form.Item
                name="bankName"
                label={t('bank_name')}
                rules={[{ required: true, message: t('please_enter_bank_name') }]}
              >
                <Input placeholder={t('enter_bank_name')} />
              </Form.Item>

              <Form.Item
                name="routingNumber"
                label={t('routing_number')}
                rules={[
                  { required: true, message: t('please_enter_routing_number') },
                  { len: 9, message: t('routing_number_must_be_9_digits') },
                  { pattern: /^\d{9}$/, message: t('routing_number_must_contain_only_digits') }
                ]}
              >
                <Input
                  placeholder="123456789"
                  maxLength={9}
                />
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label={t('account_number')}
                rules={[{ required: true, message: t('please_enter_account_number') }]}
              >
                <Input
                  placeholder={t('enter_account_number')}
                  type="password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button onClick={handleClose} disabled={loading}>
                    {t('cancel')}
                  </Button>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {loading ? t('submitting_payment') : t('submit_payment')}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      {/* Hidden invoice template for PDF generation */}
      <div style={{ display: 'none' }}>
        <InvoiceTemplate
          ref={componentRef}
          dispatch={dispatchDetails}
        />
      </div>
    </>
  );
};

ECheckPaymentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatchId: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  dispatchDetails: PropTypes.object,
};

export default ECheckPaymentModal;
