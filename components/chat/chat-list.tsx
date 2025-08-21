import { useChats } from "@/context/ChatProvider";
import { useState } from "react";
import { ChatItem } from "./chat-item";
import { MessageSquare } from "lucide-react";

export const ChatList = ({ isOpen = true }) => {
  const { chats, isLoading } = useChats();

  const [activeChat, setActiveChat] = useState("1");

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {chats.length === 0 ? (
        <div className="text-center text-sidebar-foreground/60 mt-8">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
          <p>No chats yet</p>
          <p className="text-sm">Create your first animation</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-1 p-2">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={activeChat === chat.id}
              isOpen={isOpen}
            />
          ))}

          {chats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <p className="text-sm">No chats yet</p>
              <p className="text-xs opacity-60 mt-1">
                Start a new conversation
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
