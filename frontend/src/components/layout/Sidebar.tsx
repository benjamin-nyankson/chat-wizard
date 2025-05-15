import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { useAuthStore } from "../../store/authStore";
import Logo from "../Logo";

import ThemeToggle from "../ui/theme-toggle";
import ChatButton from "../chat/ChatButton";

type SidebarProps = {
  onClose?: () => void;
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { chats, createChat, clearChats } = useChatStore();

  const handleLogout = () => {
    logout();
    clearChats();
    navigate("/login");
  };

  const handleNewChat = () => {
    createChat();
    if (onClose) onClose();
  };

  const isAdmin = user?.role === "admin";

  return (
    <aside className="flex h-full w-full flex-col bg-sidebar p-4">
      <div className="mb-2 flex items-center justify-between">
        <Logo />
      </div>

      <Button
        onClick={handleNewChat}
        className="mb-4 w-full gap-2"
        variant="default"
      >
        <Plus className="h-4 w-4" /> New Chat
      </Button>

      <div className="flex-1 overflow-auto">
        <div className="space-y-3">
          {chats.map((chat, index) => {
            return <ChatButton key={chat.id} chat={chat} onClose={onClose} />;
          })}
        </div>
      </div>

      <div className="border-t border-sidebar-border pt-4 space-y-2 mt-auto">
        {isAdmin && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              navigate("/admin");
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
            navigate("/settings");
            if (onClose) onClose();
          }}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <div className="ml-4">
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
