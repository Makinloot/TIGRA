import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { validateVIN } from '../../utils/cmsUtils';

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const { vin } = values;

    // Validate VIN format
    if (!validateVIN(vin)) {
      message.error(t('invalid_vin_format'));
      return;
    }

    try {
      // TODO-FX: Replace with real API call.
      // API Endpoint: GET /api/public/track/{vin}
      // Expected Data: { vin: '...', status: 'in_transit', estimatedDelivery: '...', photos: { pickup: [...], delivery: [...] }, details: { make: '...', model: '...' }, history: [{ date: '...', status: '...' }] }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect to status page with VIN
      navigate(`/track/${vin}`);
    } catch {
      message.error(t('vin_lookup_failed'));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: '24px'
      }}
    >
      <Card
        title={t('track_your_vehicle')}
        style={{
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="vin"
            label={t('vehicle_identification_number')}
            rules={[
              {
                required: true,
                message: t('vin_is_required')
              },
              {
                pattern: /^[A-HJ-NPR-Z0-9]{17}$/i,
                message: t('vin_must_be_17_characters')
              }
            ]}
          >
            <Input.Search
              placeholder={t('enter_vin')}
              enterButton={t('track')}
              size="large"
              onSearch={() => form.submit()}
              autoFocus
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
