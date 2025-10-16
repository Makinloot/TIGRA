import React, { useState } from 'react';
import {
  Modal,
  Button,
  Space,
  Typography,
  message,
  Input,
  Divider,
  Row,
  Col
} from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
  CopyOutlined,
  CheckOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ShareModal = ({ auction, visible, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!auction) return null;

  // TODO-FX: Replace with real share URL generation from backend API
  // This should call a backend endpoint that generates short URLs and tracks share analytics
  const shareUrl = `${window.location.origin}/auction/${auction.id}`;
  const shareText = `Check out this ${auction.title} - Current bid: $${auction.currentBid.toLocaleString()}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      message.success('Link copied to clipboard!');
      // TODO-FX: Track share event in analytics - call backend API to log share action
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        message.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        message.error('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShareFacebook = () => {
    // TODO-FX: Integrate with Facebook SDK for proper sharing
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    // TODO-FX: Integrate with Twitter SDK for proper sharing
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Modal
      title={
        <Space>
          <LinkOutlined />
          <span>Share this car</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={{
        xs: '90vw',
        sm: '260px',
        md: '260px',
        lg: '300px',
        xl: '300px',
        xxl: '300px'
      }}
      centered
      destroyOnHidden
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Car Info Preview */}
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e8e8e8'
        }}>
          <Title level={5} style={{ margin: '0 0 8px 0' }}>
            {auction.title}
          </Title>
          <Text style={{ color: '#666' }}>
            Lot ID: {auction.lotId} • Current Bid: ${auction.currentBid.toLocaleString()}
          </Text>
        </div>

        {/* Share URL */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: '8px' }}>
            Share Link
          </Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              value={shareUrl}
              readOnly
              style={{ flex: 1 }}
            />
            <Button
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopyLink}
              type={copied ? "primary" : "default"}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        <Divider />

        {/* Social Media Sharing */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: '16px' }}>
            Share on Social Media
          </Text>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                icon={<FacebookOutlined />}
                block
                size="large"
                onClick={handleShareFacebook}
                style={{
                  backgroundColor: '#1877f2',
                  borderColor: '#1877f2',
                  height: '48px',
                  fontWeight: 600
                }}
              >
                Share on Facebook
              </Button>
            </Col>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                icon={<TwitterOutlined />}
                block
                size="large"
                onClick={handleShareTwitter}
                style={{
                  backgroundColor: '#1da1f2',
                  borderColor: '#1da1f2',
                  height: '48px',
                  fontWeight: 600
                }}
              >
                Share on Twitter
              </Button>
            </Col>
          </Row>
        </div>

        {/* Additional sharing text */}
        <div>
          <Text strong style={{ display: 'block', marginBottom: '8px' }}>
            Message Preview
          </Text>
          <TextArea
            value={shareText}
            readOnly
            rows={2}
            style={{ resize: 'none' }}
          />
        </div>
      </Space>
    </Modal>
  );
};

export default ShareModal;
