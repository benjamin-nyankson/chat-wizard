
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import * as api from '@/service/api';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

// Create a reusable query client to be used throughout the app
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

// Hook for fetching chats
export function useChats() {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => api.fetchChats(token!),
    enabled: !!token,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load chats');
        console.error(error);
      }
    }
  });
}

// Hook for admin users list
export function useUsers() {
  const { token, user } = useAuthStore();
  
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => api.fetchUsers(token!),
    enabled: !!token && user?.role === 'admin',
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load users');
        console.error(error);
      }
    }
  });
}

// Hook for admin chats list
export function useAdminChats() {
  const { token, user } = useAuthStore();
  
  return useQuery({
    queryKey: ['admin', 'chats'],
    queryFn: () => api.fetchAllChats(token!),
    enabled: !!token && user?.role === 'admin',
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load admin chats');
        console.error(error);
      }
    }
  });
}

// Hook for sending message mutation
export function useSendMessage() {
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ message, chatId }: { message: string, chatId: string }) => 
      api.sendMessage(message, chatId, token!),
    onError: (error) => {
      toast.error('Failed to send message');
      console.error(error);
    },
  });
}

// Hook for deleting chat mutation
export function useDeleteChat() {
  const { token } = useAuthStore();
  
  return useMutation({
    mutationFn: (chatId: string) => api.deleteChat(chatId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error) => {
      toast.error('Failed to delete chat');
      console.error(error);
    },
  });
}
