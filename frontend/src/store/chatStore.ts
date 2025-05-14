
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MessageRole = 'user' | 'assistant' | 'system';

export type Message = {
  id: string;
  content: string;
  role: MessageRole;
  createdAt: string;
  _id?: string; // Optional field for MongoDB ObjectId
};

export type Chat = {
  id: string;
  messages: Message[];
  title?: string;
  createdAt: string;
};

type ChatState = {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  setCurrentChatId: (id: string | null) => void;
  createChat: () => void;
  addMessage: (chatId: string, message: Message) => void;
  deleteChat: (chatId: string) => void;
  clearChats: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setChats: (chats: Chat[]) => void;
  updateChat:(chatId: string, updatedChat: Partial<Chat>) => void;
  updateChatId:(chatId: string, updatedChatId: string) => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,
      isLoading: false,
      setCurrentChatId: (id) => set({ currentChatId: id }),
      setChats: (chats) => set({ chats }),
      createChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          messages: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
      },
      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: [...chat.messages, message],
                title: chat.title || (message.role === 'user' && chat.messages.length === 0 ? message.content.substring(0, 30) : chat.title),
              };
            }
            return chat;
          }),
        })),
      deleteChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
        })),
      clearChats: () => set({ chats: [], currentChatId: null }),
      setIsLoading: (isLoading) => set({ isLoading }),
      updateChat: (chatId, updatedChat) =>
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              return { ...chat, ...updatedChat };
            }
            return chat;
          }),
        })),
        updateChatId: (chatId, updatedChatId) =>
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId ? { ...chat, id: updatedChatId } : chat
            ),
            currentChatId:
              state.currentChatId === chatId ? updatedChatId : state.currentChatId,
          })),
        
    }),
    {
      name: 'chat-storage',
    }
  )
);
