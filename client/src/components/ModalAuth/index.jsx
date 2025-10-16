import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Tabs,
  Form,
  Input,
  Button,
  Radio,
  Space,
  Row,
  Col,
  Alert,
  Spin,
  Typography
} from 'antd';
import {
  LoginOutlined,
  UserAddOutlined,
  GoogleOutlined,
  FacebookOutlined
} from '@ant-design/icons';
import { t } from '../../i18n';

const { Text, Link } = Typography;

const ModalAuth = ({
  visible,
  onClose,
  onLogin,
  onRegister,
  onSocialAuth,
  loading = false,
  error = null
}) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  // TODO-FX: Replace with real API call.
  // API Endpoint: POST /api/auth/login
  // Expected Data: { email: string, password: string, role: string }
  const handleLogin = async (values) => {
    try {
      // Mock login logic - replace with actual API call
      await onLogin(values);
      onClose();
    } catch (error) {
      // Error handled by parent component
      console.error('Login error:', error);
    }
  };

  // TODO-FX: Replace with real API call.
  // API Endpoint: POST /api/auth/register
  // Expected Data: { full_name: string, email: string, password: string, role: string }
  const handleRegister = async (values) => {
    try {
      // Mock register logic - replace with actual API call
      await onRegister(values);
      onClose();
    } catch (error) {
      // Error handled by parent component
      console.error('Register error:', error);
    }
  };

  const handleSocialAuth = (provider) => {
    // TODO-FX: Replace with real social auth integration
    // API Endpoint: POST /api/auth/social/{provider}
    onSocialAuth(provider);
  };

  const validatePasswordMatch = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(t('passwords_do_not_match')));
    },
  });

  // Tab items configuration for the new Tabs API
  const tabItems = [
    {
      key: 'login',
      label: t('sign_in'),
      children: (
        <Form
          form={loginForm}
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
        >
          <Form.Item
            label={t('email')}
            name="email"
            rules={[
              { required: true, message: t('email_required') },
              { type: 'email', message: t('email_invalid') }
            ]}
          >
            <Input
              placeholder={t('email_placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              { required: true, message: t('password_required') },
              { min: 8, message: t('password_min_length') }
            ]}
          >
            <Input.Password
              placeholder={t('password_placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('i_am_a')}
            name="role"
            rules={[{ required: true, message: t('role_required') }]}
          >
            <Radio.Group size="large">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Radio value="user">{t('user')}</Radio>
                <Radio value="dealer">{t('dealer')}</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
            <Col>
              <Link href="/forgot-password" style={{ fontSize: '14px' }}>
                {t('forgot_password')}
              </Link>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              icon={<LoginOutlined />}
              loading={loading}
            >
              {t('sign_in')}
            </Button>
          </Form.Item>
        </Form>
      )
    },
    {
      key: 'register',
      label: t('create_account'),
      children: (
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
        >
          <Form.Item
            label={t('full_name')}
            name="full_name"
            rules={[
              { required: true, message: t('full_name_required') },
              { min: 2, message: t('full_name_min_length') }
            ]}
          >
            <Input
              placeholder={t('full_name_placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('email')}
            name="email"
            rules={[
              { required: true, message: t('email_required') },
              { type: 'email', message: t('email_invalid') }
            ]}
          >
            <Input
              placeholder={t('email_placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              { required: true, message: t('password_required') },
              { min: 8, message: t('password_min_length') },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: t('password_policy')
              }
            ]}
          >
            <Input.Password
              placeholder={t('password_placeholder_register')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('confirm_password')}
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: t('confirm_password_required') },
              validatePasswordMatch
            ]}
          >
            <Input.Password
              placeholder={t('confirm_password_placeholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={t('select_account_type')}
            name="role"
            rules={[{ required: true, message: t('role_required') }]}
          >
            <Radio.Group size="large">
              <Space direction="vertical" style={{ width: '100%', gap: '8px' }}>
                <Radio value="user">{t('user_account_desc')}</Radio>
                <Radio value="dealer">{t('dealer_account_desc')}</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <div style={{ marginBottom: '24px' }}>
            <Text style={{ fontSize: '14px', color: '#6b7280' }}>
              {t('agreement_text')}{' '}
              <Link href="/terms" target="_blank">{t('terms')}</Link>{' '}
              {t('and')}{' '}
              <Link href="/privacy" target="_blank">{t('privacy_policy')}</Link>
            </Text>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              icon={<UserAddOutlined />}
              loading={loading}
            >
              {t('create_account')}
            </Button>
          </Form.Item>
        </Form>
      )
    }
  ];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={{
        xs: '95%',
        sm: '90%',
        md: '85%',
        lg: 400,
        xl: 400,
        xxl: 400
      }}
      centered
      destroyOnHidden
      styles={{
        body: { padding: '32px' },
        mask: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
      style={{
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <Spin spinning={loading} tip={t('authenticating')}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            {t('welcome_back')}
          </Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          size="large"
          items={tabItems}
        />

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Text style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', display: 'block' }}>
            {t('or_continue_with')}
          </Text>
          <Space>
            <Button
              icon={<GoogleOutlined />}
              size="large"
              onClick={() => handleSocialAuth('google')}
              style={{ borderRadius: '8px' }}
            >
              {t('google')}
            </Button>
            <Button
              icon={<FacebookOutlined />}
              size="large"
              onClick={() => handleSocialAuth('facebook')}
              style={{ borderRadius: '8px' }}
            >
              {t('facebook')}
            </Button>
          </Space>
        </div>
      </Spin>
    </Modal>
  );
};

ModalAuth.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onSocialAuth: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default ModalAuth;
