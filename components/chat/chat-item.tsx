import React, { useState } from "react";
import {
  MessageCircle,
  MoreHorizontal,
  Edit2,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { Chat } from "@/context/ChatProvider";

type ChatItemProps = {
  chat: Chat;
  isActive: boolean;
  isOpen: boolean;
};

export const ChatItem = ({
  chat,
  isActive = false,
  isOpen = true,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);
  const [showOptions, setShowOptions] = useState(false);

  const handleRename = () => {
    if (editTitle.trim() && editTitle !== chat.title) {

    }
    setIsEditing(false);
    setShowOptions(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(chat.title);
    setIsEditing(false);
    setShowOptions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  // TODO: Implement these

  const onRename=(chatId:string)=>{};
  const onSelect=(chatId:string)=>{};
  const onDelete=(chatId:string)=>{};

  return (
    <div
      className={`group relative flex items-center w-full rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-input/30 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => !isEditing && setShowOptions(false)}
    >
      <button
        onClick={() => !isEditing && onSelect(chat.id)}
        className={`cursor-pointer flex items-center w-full p-3 rounded-lg transition-all ${
          isOpen ? "justify-start" : "justify-center"
        }`}
        disabled={isEditing}
      >
        <MessageCircle size={16} className="flex-shrink-0" />

        {isOpen && (
          <div className="flex-1 ml-3 min-w-0">
            {isEditing ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleRename}
                className="w-full bg-transparent border-none outline-none text-sm"
                autoFocus
              />
            ) : (
              <span className="block text-sm truncate text-left">
                {chat.title}
              </span>
            )}
            
          </div>
        )}
      </button>

      {/* Options Menu */}
      {isOpen && (showOptions || isEditing) && (
        <div className="absolute right-2 flex items-center space-x-1">
          {isEditing ? (
            <>
              <button
                onClick={handleRename}
                className="p-1 rounded hover:bg-accent text-green-600 hover:text-green-700"
              >
                <Check size={14} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 rounded hover:bg-accent text-red-600 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="p-1 rounded hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                title="Rename chat"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chat.id);
                }}
                className="p-1 rounded hover:bg-accent text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete chat"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
