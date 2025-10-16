import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIAssistantPanel from './index';

// Mock the mock data imports
jest.mock('../../mocks/_mockData', () => ({
  mockAIConversations: [
    {
      id: 'conv-1',
      userMessage: "What vehicles are available?",
      aiResponse: "I found several vehicles available.",
      suggestions: ["Show me SUVs"]
    }
  ],
  aiSuggestions: ["What vehicles are available?", "How does shipping work?"],
  mockAIResponses: {
    welcome: "Hello! I'm your AI assistant.",
    typing: "AI is typing...",
    error: "I'm having trouble connecting.",
    suggestions: ["Tell me about vehicles", "How does shipping work?"]
  }
}));

describe('AIAssistantPanel', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    isMobile: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when open is true', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Ask about vehicles, logistics, or auctions')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<AIAssistantPanel {...defaultProps} open={false} />);

    expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
  });

  it('displays welcome message on initial open', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    expect(screen.getByText("Hello! I'm your AI assistant.")).toBeInTheDocument();
  });

  it('shows typing indicator when sending message', async () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('AI is typing...')).toBeInTheDocument();
    });
  });

  it('sends message and receives response', async () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'What vehicles are available?' } });
    fireEvent.click(sendButton);

    // Wait for typing indicator to disappear and response to appear
    await waitFor(() => {
      expect(screen.queryByText('AI is typing...')).not.toBeInTheDocument();
    });

    // Check if user message is displayed
    expect(screen.getByText('What vehicles are available?')).toBeInTheDocument();

    // Check if AI response is displayed (mock response)
    await waitFor(() => {
      expect(screen.getByText(/I'd be happy to help/)).toBeInTheDocument();
    });
  });

  it('disables send button when input is empty', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  it('enables send button when input has content', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test message' } });

    expect(sendButton).not.toBeDisabled();
  });

  it('sends message on Enter key press', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });

    // Check if typing indicator appears (message was sent)
    expect(screen.getByText('AI is typing...')).toBeInTheDocument();
  });

  it('does not send message on Enter+Shift', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', shiftKey: true });

    // Check if typing indicator does not appear (message was not sent)
    expect(screen.queryByText('AI is typing...')).not.toBeInTheDocument();
  });

  it('handles suggestion click', async () => {
    render(<AIAssistantPanel {...defaultProps} />);

    // Wait for suggestions to be rendered
    await waitFor(() => {
      expect(screen.getByText('What vehicles are available?')).toBeInTheDocument();
    });

    const suggestionButton = screen.getByText('What vehicles are available?');
    fireEvent.click(suggestionButton);

    // Check if typing indicator appears (suggestion was sent as message)
    expect(screen.getByText('AI is typing...')).toBeInTheDocument();
  });

  it('shows error message on API failure', async () => {
    // Mock a failed API call by overriding the mock
    jest.doMock('../../mocks/_mockData', () => ({
      mockAIConversations: [],
      aiSuggestions: [],
      mockAIResponses: {
        welcome: "Hello!",
        typing: "AI is typing...",
        error: "Connection failed",
        suggestions: []
      }
    }));

    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Connection failed')).toBeInTheDocument();
    });
  });

  it('applies mobile styles when isMobile is true', () => {
    render(<AIAssistantPanel {...defaultProps} isMobile={true} />);

    // The modal should be rendered with mobile-specific props
    // This is more of an integration test, but we can check if the component renders
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<AIAssistantPanel {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('clears error when alert is closed', async () => {
    // First trigger an error
    render(<AIAssistantPanel {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your question...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Connection failed')).toBeInTheDocument();
    });

    // Close the error alert
    const closeAlertButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeAlertButton);

    await waitFor(() => {
      expect(screen.queryByText('Connection failed')).not.toBeInTheDocument();
    });
  });
});
