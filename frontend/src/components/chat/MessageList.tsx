
import React, { useRef, useEffect } from 'react';
import { Message, useChatStore } from '@/store/chatStore';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // for tables, strikethrough, task lists, etc.
import rehypeHighlight from 'rehype-highlight'; // optional: syntax highlighting for code
import 'highlight.js/styles/github.css'; // or another theme

type MessageListProps = {
  chatId: string | null;
};

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message-${message.role} p-4 rounded-lg mb-4`}>
      <div className="flex items-start gap-3">
        <Avatar className="shrink-0">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
            {isUser ? 'U' : 'AI'}
          </div>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">{isUser ? 'You' : 'AI Assistant'}</span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), 'HH:mm')}
            </span>
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              children={message.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MessageList = ({ chatId }: MessageListProps) => {
  const { chats, isLoading } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentChat = chatId ? chats.find((chat) => chat.id === chatId) : null;
  const messages = React.useMemo(() => currentChat?.messages || [], [currentChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chatId || !currentChat) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium">Welcome to AI Chat</h3>
          <p className="text-muted-foreground">Start a new conversation to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium">New Conversation</h3>
            <p className="text-muted-foreground">Start typing to chat with the AI.</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message,idx) => (
            <ChatMessage key={message._id} message={message} />
          ))}
          {isLoading && (
            <div className="chat-message-assistant p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <Avatar className="shrink-0">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-secondary">
                    AI
                  </div>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">AI Assistant</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(), 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground animate-pulse-slow">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};
