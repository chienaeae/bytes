import { useRef, useState } from 'react';

import { ChatResizeTextarea } from '@/components/chat/chat-resize-textarea/ChatResizeTextarea';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/chat/expandable-chat';
import { streamChat } from '@/service/core/chat';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

export default function ChatSupport() {
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const currentQuestion = message;
    setMessage('');
    setIsStreaming(true);

    try {
      await streamChat(currentQuestion, {
        onStart: () => {
          setIsStreaming(true);
        },
        onMessage: (message) => {
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + message, isLoading: false },
            ];
          });
        },
        onComplete: () => {
          setIsStreaming(false);
        },
      });
    } catch (error) {
      console.error('Stream error:', error);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <ExpandableChat size="lg" position="bottom-right">
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat with our AI ✨</h1>
        <p>Ask any question for our AI to answer</p>
        {/*** Add your utility button here! ***
        <div className="flex gap-2 items-center pt-2">
          <Button variant="secondary">New Chat</Button>
          <Button variant="secondary">See FAQ</Button>
        </div> */}
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList ref={messagesContainerRef} className="scrollbar">
          {messages.map((message) => (
            <ChatBubble key={message.id} variant={message.role === 'user' ? 'sent' : 'received'}>
              <ChatBubbleAvatar fallback={message.role === 'user' ? 'U' : '🤖'} />
              <ChatBubbleMessage
                variant={message.role === 'user' ? 'sent' : 'received'}
                isLoading={message.isLoading}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring outline-1 outline-border"
        >
          <ChatResizeTextarea
            disabled={isStreaming}
            onKeyDown={handleKeyDown}
            value={message}
            onChange={setMessage}
            minLength={2}
          />
          {/*** Add your utility button here! ***
          <div className="flex items-center py-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </div> */}
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
