import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Steps, Form, Input, Select, DatePicker, InputNumber,
  Button, Row, Col, Space, message
} from 'antd';
import { validateVIN, autoParseVIN } from '../../utils/cmsUtils';
import { getMockDriverStats, mockAuctions, mockWarehouses } from '../../mocks/_mockData';
import DriverAnalyticsPopup from '../DriverAnalyticsPopup';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const { Step } = Steps;
const { Option } = Select;

const AddDispatchModal = ({ open, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [driverStats, setDriverStats] = useState(null);
  const [showDriverAnalytics, setShowDriverAnalytics] = useState(false);
  const formRef = useRef();

  const steps = [
    {
      title: t('core_info'),
      description: t('vin_auction_warehouse'),
    },
    {
      title: t('logistics_details'),
      description: t('pickup_delivery_dates'),
    },
    {
      title: t('financials'),
      description: t('price_payment_status'),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleVinBlur = async () => {
    const form = formRef.current;
    if (!form) return;

    const vin = form.getFieldValue('vin');
    if (!vin) return;

    // Validate VIN
    const isValid = validateVIN(vin);
    if (!isValid) {
      return;
    }

    try {
      // Auto-parse VIN for make, model, year
      const vehicleInfo = await autoParseVIN(vin);
      form.setFieldsValue({
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        year: vehicleInfo.year,
      });
    } catch (error) {
      console.error('Failed to auto-parse VIN:', error);
      message.error(t('failed_to_parse_vin'));
    }
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Auto-generate creation date
      const finalData = {
        ...values,
        creationDate: new Date().toISOString()
      };

      // TODO-FX: Replace with real API call.
      // API Endpoint: POST /api/crm/dispatch
      // Request Body: { vin: string, auction: string, warehouse: string, pickupDate: string,
      // deliveryDate: string, driverNumber: string, route: string, price: number, isPaid: boolean,
      // storageFee: number, comment: string, creationDate: string }
      // Expected Response: Created dispatch object

      console.log('Submitting dispatch:', finalData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      message.success(t('dispatch_created_successfully'));
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to create dispatch:', error);
      message.error(t('failed_to_create_dispatch'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDriverNumberBlur = async (e) => {
    const driverNumber = e.target.value?.trim();
    if (!driverNumber) {
      setDriverStats(null);
      setShowDriverAnalytics(false);
      return;
    }

    try {
      // Fetch driver analytics (Spec §5.4)
      const stats = getMockDriverStats(driverNumber);
      setDriverStats(stats);
      setShowDriverAnalytics(true);
    } catch (error) {
      console.error('Failed to fetch driver stats:', error);
      setDriverStats(null);
      setShowDriverAnalytics(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    setCurrentStep(0);
    setDriverStats(null);
    setShowDriverAnalytics(false);
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Core Info
        return (
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="vin"
                label={t('vin')}
                rules={[
                  { required: true, message: t('vin_is_required') },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      return validateVIN(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error(t('invalid_vin_format')));
                    }
                  }
                ]}
                validateTrigger="onBlur"
              >
                <Input
                  placeholder={t('enter_17_character_vin')}
                  onBlur={handleVinBlur}
                  maxLength={17}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="make"
                label={t('make')}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="model"
                label={t('model')}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="year"
                label={t('year')}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="auction"
                label={t('auction')}
                rules={[{ required: true, message: t('auction_is_required') }]}
              >
                <Select
                  placeholder={t('select_auction')}
                  options={mockAuctions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="warehouse"
                label={t('warehouse')}
                rules={[{ required: true, message: t('warehouse_is_required') }]}
              >
                <Select
                  placeholder={t('select_warehouse')}
                  options={mockWarehouses}
                />
              </Form.Item>
            </Col>
          </Row>
        );

      case 1: // Logistics Details
        return (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="pickupDate"
                label={t('pickup_date')}
                rules={[{ required: true, message: t('pickup_date_is_required') }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder={t('select_pickup_date')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="deliveryDate"
                label={t('delivery_date')}
                rules={[{ required: true, message: t('delivery_date_is_required') }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder={t('select_delivery_date')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="driverNumber"
                label={t('driver_number')}
                rules={[{ required: true, message: t('driver_number_is_required') }]}
              >
                <Input
                  placeholder={t('enter_driver_number')}
                  onBlur={handleDriverNumberBlur}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="route"
                label={t('route')}
                rules={[{ required: true, message: t('route_is_required') }]}
              >
                <Input placeholder={t('enter_route_from_to')} />
              </Form.Item>
            </Col>
          </Row>
        );

      case 2: // Financials
        return (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label={t('price')}
                rules={[{ required: true, message: t('price_is_required') }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder={t('enter_price')}
                  prefix="$"
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="isPaid"
                label={t('payment_status')}
                rules={[{ required: true, message: t('payment_status_is_required') }]}
              >
                <Select placeholder={t('select_payment_status')}>
                  <Option value={false}>{t('pending')}</Option>
                  <Option value={true}>{t('paid')}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="storageFee"
                label={t('storage_fee')}
                rules={[{ required: true, message: t('storage_fee_is_required') }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder={t('enter_storage_fee')}
                  prefix="$"
                  min={0}
                  precision={2}
                  initialValue={0}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="comment"
                label={t('comment')}
                rules={[{ required: true, message: t('comment_is_required') }]}
              >
                <Input.TextArea
                  placeholder={t('enter_comment')}
                  rows={3}
                />
              </Form.Item>
            </Col>
          </Row>
        );

      default:
        return null;
    }
  };

  const isStepComplete = (step) => {
    const form = formRef.current;
    if (!form) return false;

    switch (step) {
      case 0:
        return form.getFieldValue('vin') && form.getFieldValue('auction') && form.getFieldValue('warehouse');
      case 1:
        return form.getFieldValue('pickupDate') && form.getFieldValue('deliveryDate') &&
               form.getFieldValue('driverNumber') && form.getFieldValue('route');
      case 2:
        return form.getFieldValue('price') !== undefined && form.getFieldValue('isPaid') !== undefined &&
               form.getFieldValue('storageFee') !== undefined && form.getFieldValue('comment');
      default:
        return false;
    }
  };

  const canProceed = () => {
    return true; // Temporarily allow proceeding for testing UI
  };

  const canSubmit = () => {
    return steps.every((_, index) => isStepComplete(index));
  };

  return (
    <Modal
      title={t('add_new_dispatch')}
      open={open}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t('cancel')}
        </Button>,
        currentStep > 0 && (
          <Button key="prev" onClick={prev}>
            {t('previous')}
          </Button>
        ),
        currentStep < steps.length - 1 ? (
          <Button
            key="next"
            type="primary"
            onClick={next}
            disabled={!canProceed()}
          >
            {t('next')}
          </Button>
        ) : (
          <Button
            key="submit"
            type="primary"
            loading={isSubmitting}
            onClick={() => formRef.current?.submit()}
            disabled={!canSubmit()}
          >
            {t('create_dispatch')}
          </Button>
        ),
      ]}
    >
      <div style={{ marginBottom: 24 }}>
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </Steps>
      </div>

      <Form
        ref={formRef}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          isPaid: false,
        }}
      >
          {renderStepContent(currentStep)}
        </Form>

        <DriverAnalyticsPopup
          stats={driverStats}
          open={showDriverAnalytics}
          onClose={() => setShowDriverAnalytics(false)}
        />
      </Modal>
    );
  };

AddDispatchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default AddDispatchModal;
