import { Mic, Paperclip } from 'lucide-react';
import { useRef, useState } from 'react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';

import { ChatResizeTextarea } from './chat-resize-textarea/ChatResizeTextarea';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

export function AiChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello, how has your day been?',
      role: 'user',
    },
    {
      id: '2',
      content: 'I am doing well, thank you for asking. How can I help you today?',
      role: 'assistant',
    },
    {
      id: '3',
      content: 'I am doing well, thank you for asking. How can I help you today?',
      role: 'user',
    },
    {
      id: '4',
      content: 'I am doing well, thank you for asking. How can I help you today?',
      role: 'assistant',
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStreaming) return;

    // Add user message to the chat history, and trigger SSE connection
    setMessages((prev) => {
      const userMessage: ChatMessage = {
        id: String(prev.length + 1),
        content: message,
        role: 'user',
      };
      const assistantMessage: ChatMessage = {
        id: String(prev.length + 2),
        content: '',
        role: 'assistant',
        isLoading: true,
      };
      return [...prev, userMessage, assistantMessage];
    });
    setMessage('');
    setIsStreaming(true);

    const eventSource = new EventSource(import.meta.env.VITE_API_URL + '/mock-chat');
    eventSourceRef.current = eventSource;
    eventSource.onmessage = (event) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.role === 'assistant') {
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + JSON.parse(event.data).m,
            isLoading: false,
          };
          return [...prev.slice(0, -1), updatedMessage];
        }
        return prev;
      });
    };

    const closeEventSource = () => {
      setIsStreaming(false);
      eventSource.close();
      eventSourceRef.current = null;
    };

    eventSource.addEventListener('complete', () => {
      closeEventSource();
    });
    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      closeEventSource();
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-muted/40 outline-1 outline-border rounded-2xl">
      <div className="flex-1 w-full overflow-y-hidden">
        <ChatMessageList ref={messagesContainerRef} className="scrollbar">
          {messages.map((message) => (
            <ChatBubble key={message.id} variant={message.role === 'user' ? 'sent' : 'received'}>
              <ChatBubbleAvatar fallback={message.role === 'user' ? 'US' : 'AI'} />
              <ChatBubbleMessage
                variant={message.role === 'user' ? 'sent' : 'received'}
                isLoading={message.isLoading}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>
      <div className="px-4 pb-4">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring outline-1 outline-border"
        >
          <ChatResizeTextarea
            disabled={isStreaming}
            onKeyDown={handleKeyDown}
            value={message}
            onChange={setMessage}
          />
          <div className="flex items-center py-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
