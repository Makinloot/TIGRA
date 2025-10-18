import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CrmMessages from './index';

/* global jest, describe, test, expect, beforeEach */

// Mock dependencies
jest.mock('../../mocks/_mockData', () => ({
  mockMessageConversations: [
    {
      id: '1',
      userName: 'Dispatcher (John)',
      lastMessage: 'Please check VIN ABC123DEF456G, it is on hold.',
      timestamp: '2025-10-17T10:00:00Z'
    },
    {
      id: '2',
      userName: 'Driver (Mike)',
      lastMessage: 'Vehicle delivered successfully',
      timestamp: '2025-10-17T09:30:00Z'
    }
  ],
  getMockMessages: jest.fn((conversationId) => {
    if (conversationId === '1') {
      return [
        {
          id: 'msg1',
          author: 'Dispatcher (John)',
          content: 'Please check VIN ABC123DEF456G, it is on hold.',
          timestamp: '2025-10-17T10:00:00Z'
        },
        {
          id: 'msg2',
          author: 'Current User',
          content: 'Will check it right away.',
          timestamp: '2025-10-17T10:05:00Z'
        }
      ];
    }
    if (conversationId === '2') {
      return [
        {
          id: 'msg3',
          author: 'Driver (Mike)',
          content: 'Vehicle delivered successfully',
          timestamp: '2025-10-17T09:30:00Z'
        }
      ];
    }
    return [];
  })
}));

jest.mock('../../utils/cmsUtils', () => ({
  linkifyVINs: jest.fn((content) => content)
}));

describe('CrmMessages', () => {
  // TODO-FX: Connect to i18n library.
  const t = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  beforeEach(() => {
    // Mock for Ant Design components
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('should render the messaging interface layout', async () => {
    render(<CrmMessages />);

    // Check for main elements
    expect(await screen.findByText('Messages')).toBeInTheDocument();
    expect(screen.getByText(t('select_a_conversation'))).toBeInTheDocument();
  });

  test('should load and display conversations in the inbox', async () => {
    render(<CrmMessages />);

    // Wait for conversations to load
    expect(await screen.findByText('Dispatcher (John)')).toBeInTheDocument();
    expect(screen.getByText('Driver (Mike)')).toBeInTheDocument();
    expect(screen.getByText('Please check VIN ABC123DEF456G, it is on hold.')).toBeInTheDocument();
  });

  test('should show empty state when no conversations exist', async () => {
    // Mock empty conversations
    jest.doMock('../../mocks/_mockData', () => ({
      mockMessageConversations: [],
      getMockMessages: jest.fn(() => [])
    }));

    render(<CrmMessages />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    expect(screen.getByText(t('no_conversations_found'))).toBeInTheDocument();
  });

  test('should display messages when conversation is selected', async () => {
    render(<CrmMessages />);

    // Wait for conversations to load
    await screen.findByText('Dispatcher (John)');

    // Click on a conversation
    const conversationItem = screen.getByText('Dispatcher (John)').closest('div');
    await userEvent.click(conversationItem);

    // Should show messages
    expect(await screen.findByText('Please check VIN ABC123DEF456G, it is on hold.')).toBeInTheDocument();
    expect(screen.getByText('Will check it right away.')).toBeInTheDocument();
  });

  test('should handle loading state when switching conversations', async () => {
    render(<CrmMessages />);

    // Wait for conversations to load
    await screen.findByText('Dispatcher (John)');

    // Click on first conversation
    const firstConversation = screen.getByText('Dispatcher (John)').closest('div');
    await userEvent.click(firstConversation);

    // Should show loading initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Wait for messages to load
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('should send messages', async () => {
    render(<CrmMessages />);

    // Wait for conversations to load
    await screen.findByText('Dispatcher (John)');

    // Select conversation
    const conversationItem = screen.getByText('Dispatcher (John)').closest('div');
    await userEvent.click(conversationItem);

    // Wait for messages to load
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Type and send message
    const messageInput = screen.getByPlaceholderText(t('type_your_message'));
    await userEvent.type(messageInput, 'This is a test message');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    // Message should be sent (input cleared)
    expect(messageInput.value).toBe('');
  });

  test('should disable send button when message is empty', async () => {
    render(<CrmMessages />);

    // Wait for conversations to load
    await screen.findByText('Dispatcher (John)');

    // Select conversation
    const conversationItem = screen.getByText('Dispatcher (John)').closest('div');
    await userEvent.click(conversationItem);

    // Wait for messages to load
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Send button should be disabled with empty message
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  test('should show empty messages state', async () => {
    // Mock conversation with no messages
    jest.doMock('../../mocks/_mockData', () => ({
      mockMessageConversations: [
        {
          id: 'empty',
          userName: 'Empty Conversation',
          lastMessage: 'No messages',
          timestamp: '2025-10-17T10:00:00Z'
        }
      ],
      getMockMessages: jest.fn(() => [])
    }));

    render(<CrmMessages />);

    // Wait for conversations to load
    await screen.findByText('Empty Conversation');

    // Select conversation
    const conversationItem = screen.getByText('Empty Conversation').closest('div');
    await userEvent.click(conversationItem);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Should show empty messages state
    expect(screen.getByText(t('no_messages_yet'))).toBeInTheDocument();
  });

  test('should handle send button loading state', async () => {
    render(<CrmMessages />);

    // Wait for conversations to load
    await screen.findByText('Dispatcher (John)');

    // Select conversation
    const conversationItem = screen.getByText('Dispatcher (John)').closest('div');
    await userEvent.click(conversationItem);

    // Wait for messages to load
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Type message
    const messageInput = screen.getByPlaceholderText(t('type_your_message'));
    await userEvent.type(messageInput, 'Test message');

    // Click send (button should show loading state)
    const sendButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(sendButton);

    // Button should be in loading state
    expect(sendButton).toHaveAttribute('aria-disabled', 'true');
  });
});
