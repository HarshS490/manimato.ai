"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  MessageSquare,
  Edit2,
  Trash2,
  Check,
  X,
  SidebarCloseIcon,
  SidebarOpenIcon,
  Search,
} from "lucide-react";
import { useChat } from "@/context/ChatProvider";
import clsx from "clsx";
import { ChatList } from "../chat/chat-list";

export function Sidebar() {
  const { chats, deleteChat } = useChat();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const onClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNewChat = () => {
    router.push("/chat");
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleEditStart = (chat: any) => {
    setEditingId(chat.id);
    setEditTitle(chat.title);
  };

  const handleEditSave = () => {
    if (editingId && editTitle.trim()) {
      // renameChat(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleDelete = (chatId: string) => {
    deleteChat(chatId);
  };

  return (
    <div
      className={clsx(
        " shrink-0 h-full bg-sidebar border-r border-sidebar-border flex flex-col",
        isOpen ? "w-80" : "w-15"
      )}
    >
      {/* Header */}
      <div className="p-4 flex flex-col gap-4 ">
        <Button
          onClick={onClose}
          variant={"ghost"}
          className={clsx(
            "cursor-pointer flex items-center justify-center p-5 rounded-xl size-7 [&_svg]:size-6 text-muted-foreground hover:bg-input/40",
            isOpen ? "self-end" : "self-center"
          )}
        >
          {isOpen ? (
            <SidebarCloseIcon className="stroke-1" />
          ) : (
            <SidebarOpenIcon className="stroke-1" />
          )}
        </Button>

        <div
          className={clsx("flex flex-col w-full items-center transition-all ")}
        >
          <Button
            onClick={handleNewChat}
            variant={"link"}
            className={clsx(
              "cursor-pointer flex items-center w-full hover:bg-primary/10",
              {
                "justify-center p-5 rounded-full": !isOpen,
                "justify-start ": isOpen,
              }
            )}
          >
            <span
              className={clsx(
                "block bg-primary text-foreground rounded-full p-1"
              )}
            >
              <Plus />
            </span>
            <span
              className={clsx(
                "ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
                isOpen ? "block" : "hidden"
              )}
            >
              New Chat
            </span>
          </Button>
          <Button
            variant={"ghost"}
            className={clsx("w-full hover:bg-input/40 cursor-pointer", {
              "justify-center p-5 rounded-xl": !isOpen,
              "justify-start ": isOpen,
            })}
          >
            <Search />
            <span
              className={clsx(
                "ml-2 overflow-hidden whitespace-nowrap",
                isOpen ? "block" : "hidden"
              )}
            >
              Search chats
            </span>
          </Button>
        </div>
      </div>

      {/* Chat List */}
      {isOpen && <ChatList />}
    </div>
  );
}
