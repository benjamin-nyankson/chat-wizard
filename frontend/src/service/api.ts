
import { User } from "@/store/authStore";
import { toast } from "sonner";

// Update the API URL to point to our Node server
const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Login failed');
    throw error;
  }
}

export async function register(email: string, password: string, name?: string) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Registration failed');
    throw error;
  }
}

export async function sendMessage(message: string, chatId: string, token: string) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, chatId }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to send message');
    throw error;
  }
}

export async function fetchChats(token: string) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch chats');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to fetch chats');
    throw error;
  }
}

export async function deleteChat(chatId: string, token: string) {
  try {
    const response = await fetch(`${API_URL}/chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete chat');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to delete chat');
    throw error;
  }
}

// Admin API calls
export async function fetchUsers(token: string) {
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to fetch users');
    throw error;
  }
}

export async function fetchAllChats(token: string) {
  try {
    const response = await fetch(`${API_URL}/admin/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch all chats');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to fetch all chats');
    throw error;
  }
}


export async function updateUserProfile(token: string, userId: string, data: Omit<User, 'password' | 'role' | 'createdAt' | 'updatedAt' |"id">) {
  try {
    const response = await fetch(`${API_URL}/auth/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user profile');
    }
    
    return response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to update user profile');
    throw error;
  }
}