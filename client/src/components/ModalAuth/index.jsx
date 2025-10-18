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
      return Promise.reject(new Error('პაროლები არ ემთხვევა'));
    },
  });

  // Tab items configuration for the new Tabs API
  const tabItems = [
    {
      key: 'login',
      label: 'შესვლა',
      children: (
        <Form
          form={loginForm}
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
        >
          <Form.Item
            label="ელფოსტა"
            name="email"
            rules={[
              { required: true, message: 'ელფოსტა აუცილებელია' },
              { type: 'email', message: 'გთხოვთ შეიყვანოთ სწორი ელფოსტა' }
            ]}
          >
            <Input
              placeholder="you@example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="პაროლი"
            name="password"
            rules={[
              { required: true, message: 'პაროლი აუცილებელია' },
              { min: 8, message: 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო' }
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="მე ვარ"
            name="role"
            rules={[{ required: true, message: 'გთხოვთ აირჩიეთ ანგარიშის ტიპი' }]}
          >
            <Radio.Group size="large">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Radio value="user">მომხმარებელი</Radio>
                <Radio value="dealer">დილერი</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
            <Col>
              <Link href="/forgot-password" style={{ fontSize: '14px' }}>
                დაგავიწყდა პაროლი?
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
              შესვლა
            </Button>
          </Form.Item>
        </Form>
      )
    },
    {
      key: 'register',
      label: 'ანგარიშის შექმნა',
      children: (
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
        >
          <Form.Item
            label="სრული სახელი"
            name="full_name"
            rules={[
              { required: true, message: 'სრული სახელი აუცილებელია' },
              { min: 2, message: 'სრული სახელი უნდა იყოს მინიმუმ 2 სიმბოლო' }
            ]}
          >
            <Input
              placeholder="ივან ივანოვი"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="ელფოსტა"
            name="email"
            rules={[
              { required: true, message: 'ელფოსტა აუცილებელია' },
              { type: 'email', message: 'გთხოვთ შეიყვანოთ სწორი ელფოსტა' }
            ]}
          >
            <Input
              placeholder="you@example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="პაროლი"
            name="password"
            rules={[
              { required: true, message: 'პაროლი აუცილებელია' },
              { min: 8, message: 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'პაროლი უნდა შეიცავდეს მინიმუმ 1 დიდ ასოს, 1 პატარა ასოს და 1 ციფრს'
              }
            ]}
          >
            <Input.Password
              placeholder="შექმენით პაროლი"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="პაროლის დადასტურება"
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'გთხოვთ დაადასტუროთ პაროლი' },
              validatePasswordMatch
            ]}
          >
            <Input.Password
              placeholder="გაიმეორეთ პაროლი"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="აირჩიეთ ანგარიშის ტიპი"
            name="role"
            rules={[{ required: true, message: 'გთხოვთ აირჩიეთ ანგარიშის ტიპი' }]}
          >
            <Radio.Group size="large">
              <Space direction="vertical" style={{ width: '100%', gap: '8px' }}>
                <Radio value="user">მომხმარებელი — ყიდვისა და ბიდის დაკელება</Radio>
                <Radio value="dealer">დილერი — შეუძლია ავტომობილების დაკელება და გაყიდვა</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <div style={{ marginBottom: '24px' }}>
            <Text style={{ fontSize: '14px', color: '#6b7280' }}>
              ანგარიშის შექმნით, თქვენ ეთანხმებით ჩვენს{' '}
              <Link href="/terms" target="_blank">მომსახურების პირობებს</Link>{' '}
              და{' '}
              <Link href="/privacy" target="_blank">კონფიდენციალობის პოლიტიკას</Link>
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
              ანგარიშის შექმნა
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
      <Spin spinning={loading} tip="პირადობის დადასტურება...">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            კეთილი იყო ბრუნება
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
            ან გააგრძელეთ
          </Text>
          <Space>
            <Button
              icon={<GoogleOutlined />}
              size="large"
              onClick={() => handleSocialAuth('google')}
              style={{ borderRadius: '8px' }}
            >
              Google
            </Button>
            <Button
              icon={<FacebookOutlined />}
              size="large"
              onClick={() => handleSocialAuth('facebook')}
              style={{ borderRadius: '8px' }}
            >
              Facebook
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
