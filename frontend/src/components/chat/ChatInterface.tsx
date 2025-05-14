import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageList } from './MessageList';
import { useChatStore } from '@/store/chatStore';
import { useSendMessage } from '@/hooks/useApi';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    currentChatId,
    chats,
    addMessage,
    createChat,
    updateChat,
    setCurrentChatId,
    updateChatId
  } = useChatStore();

  const { mutate: sendMessageMutation, isPending } = useSendMessage();

  // Ensure there's a chat created when component mounts
  // useEffect(() => {
  //   if (!currentChatId) {
  //     createChat();
  //   }
  // }, [currentChatId, createChat]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || !currentChatId || isPending) return;

    const chat = chats.find(c => c.id === currentChatId);
    const isNewChat = !chat?.messages?.length;
    const chatIdForApi = isNewChat ? '' : currentChatId;

    const userMessage = {
      id: crypto.randomUUID(),
      content: trimmedInput,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    addMessage(currentChatId, userMessage);
    setInput('');

    sendMessageMutation(
      { message: trimmedInput, chatId: chatIdForApi },
      {
        onSuccess: (response) => {
          const assistantMessage = {
            id: response.id,
            content: response.message,
            role: 'assistant' as const,
            createdAt: new Date().toISOString(),
          };

          const { chatId: newChatId, ...chatData } = response;

          if (isNewChat) {
            updateChatId(currentChatId, newChatId);
            setCurrentChatId(newChatId);
          }

          updateChat(newChatId, chatData);
          addMessage(newChatId, assistantMessage);
        },
        onError: () => {
          toast.error('Failed to get a response. Please try again.');
        }
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex-1 overflow-hidden">
        <MessageList chatId={currentChatId} />
      </div>

      { (currentChatId && chats?.length>0) && <div className="mt-4">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none min-h-[60px] max-h-[200px]"
            disabled={isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isPending}
            className="shrink-0"
          >
             { isPending ? <div className=" flex items-center justify-center shadow-md">
            <div className="size-3 bg-black rounded-2xl animate-pulse"></div>
          </div>
             : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for a new line
        </div>
      </div>}
    </div>
  );
};
