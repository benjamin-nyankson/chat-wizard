
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '../ui/theme-toggle';


type SidebarProps = {
  onClose?: () => void;
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { chats, currentChatId, createChat, setCurrentChatId, deleteChat, clearChats } = useChatStore();
  const { theme, toggleTheme } = useTheme();


  const handleLogout = () => {
    logout();
    clearChats();
    navigate('/login');
  };

  const handleNewChat = () => {
    createChat();
    if (onClose) onClose();
  };

  const handleChatClick = (chatId: string) => {
    setCurrentChatId(chatId);
    console.log('Chat clicked:', chatId);
    if (onClose) onClose();
  };

  const isAdmin = user?.role === 'admin';

  return (
    <aside className="flex h-full w-full flex-col bg-sidebar p-4">
      <div className="mb-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-sidebar-foreground">AI Chat</h1>
        </Link>
      </div>

      <Button 
        onClick={handleNewChat} 
        className="mb-4 w-full gap-2"
        variant="default"
      >
        <Plus className="h-4 w-4" /> New Chat
      </Button>

      <div className="flex-1 overflow-auto">
        <div className="space-y-1">
          {chats.map((chat,index) => (
            <Button
              key={chat.id + index}
              variant={currentChatId === chat.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-between pr-2 text-left",
                currentChatId === chat.id && "bg-accent"
              )}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className="flex-1 truncate">
                {chat.title || 'New Chat'}
                <div className="text-xs text-muted-foreground">
                  {format(new Date(chat.createdAt), 'MMM d, yyyy')}
                </div>
              </div>
              <div className="text-xs text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              >
              <Trash2 className="h-4 w-4" />
              </div>

            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-sidebar-border pt-4 space-y-2 mt-auto">
        {isAdmin && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              navigate('/admin');
              if (onClose) onClose();
            }}
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin Dashboard
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => {
            navigate('/settings');
            if (onClose) onClose();
          }}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <div className='ml-4'>
        <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
