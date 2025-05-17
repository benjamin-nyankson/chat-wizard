import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, MoreVertical } from "lucide-react";
import { Chat, useChatStore } from "../../store/chatStore";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MenuOptions } from "../ui/MenuOptions";
import { useNavigate,useLocation } from "react-router-dom";

export default function ChatButton({
  chat,
  onClose,
}: {
  chat: Chat;
  onClose: () => void;
}) {
  const {
    currentChatId,
    setCurrentChatId,
    deleteChat,
  } = useChatStore();

  const navigate = useNavigate();
  const location = useLocation()

  const handleChatClick = (chatId: string) => {
    setCurrentChatId(chatId);
    if(location.pathname !== "/chats") navigate("/chats");
  
    if (onClose) onClose();
  };

  const chatMenuItems = [
    {
      label: "Copy",
      onClick: () => navigator.clipboard.writeText(chat.title || "New Chat"),
      icon: <Copy className="h-4 w-4" />,
    },
    {
      label: "Delete",
      onClick: () => deleteChat(chat.id),
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
    },
  ];

  const showMenu = currentChatId === chat.id;

  return (
    <div className="relative group">
      <Button
        variant={currentChatId === chat.id ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-between pr-8 text-left",
          currentChatId === chat.id && "bg-accent"
        )}
        onClick={() => handleChatClick(chat.id)}
      >
        <div className="flex-1 truncate">
          {chat.title || "New Chat"}
          <div className="text-xs text-muted-foreground">
            {format(new Date(chat.createdAt), "MMM d, yyyy")}
          </div>
        </div>
      </Button>

      <div
        className={cn(
          "absolute right-2 top-2 transition-opacity duration-200",
          showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuOptions options={chatMenuItems}>
          <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </MenuOptions>
      </div>
    </div>
  );
}
