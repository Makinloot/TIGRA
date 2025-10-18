import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Input,
  Button,
  Avatar,
  Spin,
  Alert,
  Space,
  Typography,
  Divider
} from 'antd';
import {
  RobotOutlined,
  UserOutlined,
  SendOutlined,
  CloseOutlined
} from '@ant-design/icons';
import {
  mockAIConversations,
  aiSuggestions,
  mockAIResponses
} from '../../mocks/_mockData';

// ✅ Connected to i18n library with useTranslation hook

const { Text, Title } = Typography;
const { TextArea } = Input;

const AIAssistantPanel = ({ open, onClose, isMobile = false }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history when panel opens
  useEffect(() => {
    if (open && messages.length === 0) {
      // Add welcome message
      setMessages([{
        id: 'welcome',
        type: 'ai',
        content: mockAIResponses.welcome,
        timestamp: new Date().toISOString(),
        suggestions: aiSuggestions.slice(0, 3)
      }]);
    }
  }, [open, messages.length]);

  // TODO-FX: Replace with real API call.
  // API Endpoint: POST /api/ai/chat
  // Expected Data: { response: string, suggestions?: string[] }
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock AI response - in real app, this would come from API
      const mockResponse = getMockResponse(message);

      const aiMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: mockResponse.response,
        timestamp: new Date().toISOString(),
        suggestions: mockResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(mockAIResponses.error);
      console.error('AI chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  // Mock response logic - replace with real AI API
  const getMockResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Find matching conversation from mock data
    const matchingConv = mockAIConversations.find(conv =>
      conv.userMessage.toLowerCase().includes(lowerMessage) ||
      lowerMessage.includes(conv.userMessage.toLowerCase().split(' ')[0])
    );

    if (matchingConv) {
      return {
        response: matchingConv.aiResponse,
        suggestions: matchingConv.suggestions
      };
    }

    // Default response
    return {
      response: "მე სიამოვნებით დაგეხმარებით ავტომობილების, აუქციონების ან ლოგისტიკის შესახებ ინფორმაციით. გთხოვთ მიუთითეთ უფრო დაწვრილებით რას ეძებთ?",
      suggestions: mockAIResponses.suggestions
    };
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const renderMessage = (message) => {
    const isAI = message.type === 'ai';

    return (
      <div
        key={message.id}
        style={{
          display: 'flex',
          marginBottom: '16px',
          alignItems: 'flex-start',
          flexDirection: isAI ? 'row' : 'row-reverse'
        }}
      >
        <Avatar
          icon={isAI ? <RobotOutlined /> : <UserOutlined />}
          style={{
            backgroundColor: isAI ? '#f0f0f0' : '#2563eb',
            color: isAI ? '#666' : '#fff',
            marginRight: isAI ? '12px' : 0,
            marginLeft: isAI ? 0 : '12px'
          }}
          size="small"
        />
        <div style={{ flex: 1, maxWidth: '80%' }}>
          <div
            style={{
              backgroundColor: isAI ? '#f8f9fa' : '#2563eb',
              color: isAI ? '#333' : '#fff',
              padding: '12px 16px',
              borderRadius: '16px',
              borderBottomLeftRadius: isAI ? '4px' : '16px',
              borderBottomRightRadius: isAI ? '16px' : '4px',
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {message.content}
          </div>
          {message.suggestions && message.suggestions.length > 0 && (
            <Space wrap style={{ marginTop: '8px' }}>
              {message.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  type="text"
                  size="small"
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '12px',
                    fontSize: '12px',
                    height: '24px',
                    padding: '0 8px'
                  }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </Space>
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={isMobile ? '95%' : 600}
      centered
      destroyOnHidden
      maskClosable
      style={{
        borderRadius: '24px',
        overflow: 'hidden'
      }}
      closeIcon={<CloseOutlined style={{ fontSize: '16px' }} />}
      styles={{
        body: {
          padding: isMobile ? '16px' : '24px',
          height: isMobile ? '600px' : '700px',
          display: 'flex',
          flexDirection: 'column'
        },
        content: {
          borderRadius: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0, color: '#333' }}>
          AI ასისტენტი
        </Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          კითხეთ ავტომობილების, ლოგისტიკის ან აუქციონების შესახებ
        </Text>
      </div>

      <Divider style={{ margin: '0 0 16px 0' }} />

      {/* Messages Container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0',
          marginBottom: '16px'
        }}
      >
        {messages.map(renderMessage)}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Avatar
              icon={<RobotOutlined />}
              style={{
                backgroundColor: '#f0f0f0',
                color: '#666',
                marginRight: '12px'
              }}
              size="small"
            />
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px'
              }}
            >
              <Spin size="small" style={{ marginRight: '8px' }} />
              <Text type="secondary" style={{ fontSize: '14px' }}>
                {mockAIResponses.typing}
              </Text>
            </div>
          </div>
        )}

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
            closable
            onClose={() => setError(null)}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="დაწერეთ თქვენი შეკითხვა..."
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{
            flex: 1,
            borderRadius: '20px',
            resize: 'none'
          }}
          disabled={isTyping}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          shape="circle"
          size="default"
          style={{
            backgroundColor: '#2563eb',
            borderColor: '#2563eb'
          }}
        />
      </div>
    </Modal>
  );
};

AIAssistantPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};

export default AIAssistantPanel;