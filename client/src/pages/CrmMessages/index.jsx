import React, { useState, useEffect } from 'react';
import { Layout, List, Input, Button, Card, Spin, Empty, Avatar, Typography } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { mockMessageConversations, getMockMessages } from '../../mocks/_mockData';
import { linkifyVINs } from '../../utils/cmsUtils';

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

// TODO-FX: Connect to i18n library.
const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const CrmMessages = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);

  // Load conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        // TODO-FX: Replace with real API call.
        // API Endpoint: GET /api/crm/messages/conversations
        // Expected Data: Array<{id: string, userName: string, lastMessage: string, timestamp: string}>
        setConversations(mockMessageConversations);
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConversationId) {
        setMessages([]);
        return;
      }

      try {
        setLoading(true);
        // TODO-FX: Replace with real API call.
        // API Endpoint: GET /api/crm/messages/{conversationId}
        // Expected Data: Array<{id: string, author: string, content: string, timestamp: string}>
        const conversationMessages = getMockMessages(selectedConversationId);
        setMessages(conversationMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedConversationId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversationId) return;

    try {
      setSending(true);
      const message = {
        id: Date.now().toString(),
        author: 'Current User',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      // TODO-FX: Replace with real API call.
      // API Endpoint: POST /api/crm/messages/{conversationId}
      // Expected Payload: { content: string }

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Update last message in conversation
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversationId
            ? { ...conv, lastMessage: newMessage.trim(), timestamp: new Date().toISOString() }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const renderMessageContent = (content) => {
    return linkifyVINs(content);
  };

  return (
    <Layout style={{ height: 'calc(100vh - 64px)' }}>
      <Sider
        width={300}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          overflow: 'auto'
        }}
      >
        <div style={{ padding: '16px 16px 0' }}>
          <Text strong style={{ fontSize: '16px' }}>
            {t('messages')}
          </Text>
          // TODO-FX: Connect to i18n library.
        </div>

        {loading && conversations.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <List
            dataSource={conversations}
            renderItem={(conversation) => (
              <List.Item
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedConversationId === conversation.id ? '#f0f8ff' : 'transparent',
                  borderBottom: '1px solid #f0f0f0',
                  padding: '12px 16px'
                }}
                onClick={() => setSelectedConversationId(conversation.id)}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<Text strong>{conversation.userName}</Text>}
                  description={
                    <div>
                      <Text ellipsis style={{ width: '100%' }}>
                        {conversation.lastMessage}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {new Date(conversation.timestamp).toLocaleString()}
                      </Text>
                    </div>
                  }
                />
              </List.Item>
            )}
            locale={{
              emptyText: (
                <Empty
                  description={t('no_conversations_found')}
                  // TODO-FX: Connect to i18n library.
                />
              )
            }}
          />
        )}
      </Sider>

      <Content style={{ display: 'flex', flexDirection: 'column' }}>
        {selectedConversationId ? (
          <Card
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin />
                </div>
              ) : (
                <List
                  dataSource={messages}
                  renderItem={(message) => (
                    <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={<Text strong>{message.author}</Text>}
                        description={
                          <div>
                            <div style={{ marginBottom: '4px' }}>
                              {renderMessageContent(message.content)}
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {new Date(message.timestamp).toLocaleString()}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{
                    emptyText: (
                      <Empty
                        description={t('no_messages_yet')}
                        // TODO-FX: Connect to i18n library.
                      />
                    )
                  }}
                />
              )}
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', padding: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <TextArea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t('type_your_message')}
                    // TODO-FX: Connect to i18n library.
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    disabled={sending}
                    onPressEnter={(e) => {
                      if (!e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  loading={sending}
                  disabled={!newMessage.trim()}
                >
                  {t('send')}
                  // TODO-FX: Connect to i18n library.
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <Empty
              description={
                <div>
                  <Text style={{ fontSize: '16px', marginBottom: '8px' }}>
                    {t('select_a_conversation')}
                  </Text>
                  // TODO-FX: Connect to i18n library.
                  <Text type="secondary">
                    {t('choose_from_the_list_to_start_messaging')}
                  </Text>
                  // TODO-FX: Connect to i18n library.
                </div>
              }
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

CrmMessages.propTypes = {
  // No props required for this page component
};

export default CrmMessages;
