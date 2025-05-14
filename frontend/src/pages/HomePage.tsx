
import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { MainLayout } from '@/components/layout/MainLayout';
import { useChats } from '@/hooks/useApi';
import { useChatStore } from '@/store/chatStore';

const HomePage = () => {

  const {data,isFetching} = useChats()
  const {setChats, chats} = useChatStore()

  React.useEffect(() => {
    if (data) {
      const chatData = data.map(({ _id, createdAt, ...rest }) => {
        return {
          id: _id,
          createdAt,
          ...rest,
        };
      });
  
      setChats(chatData); 
     
    }
  }, [data, setChats]);
  return (
    <MainLayout>
      <div className="flex h-full flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Chat</h1>
          <p className="text-muted-foreground">
            Start a conversation with the AI assistant
          </p>
        </div>
        <div className="relative flex-1 overflow-hidden rounded-lg border bg-background shadow">
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
