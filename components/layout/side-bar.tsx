"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MessageSquare, Edit2, Trash2, Check, X } from "lucide-react"
import { useChat } from "@/context/ChatProvider"

interface SidebarProps {
  onClose: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const { chats, deleteChat, renameChat } = useChat()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const router = useRouter()

  const handleNewChat = () => {
    router.push("/new")
    onClose()
  }

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`)
    onClose()
  }

  const handleEditStart = (chat: any) => {
    setEditingId(chat.id)
    setEditTitle(chat.title)
  }

  const handleEditSave = () => {
    if (editingId && editTitle.trim()) {
      renameChat(editingId, editTitle.trim())
    }
    setEditingId(null)
    setEditTitle("")
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditTitle("")
  }

  const handleDelete = (chatId: string) => {
    deleteChat(chatId)
  }

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={handleNewChat}
          className="w-full bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground border border-sidebar-border"
        >
          <Plus size={16} className="mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2">
        {chats.length === 0 ? (
          <div className="text-center text-sidebar-foreground/60 mt-8">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p>No chats yet</p>
            <p className="text-sm">Create your first animation</p>
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="group relative p-3 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors"
              >
                {editingId === chat.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditSave()
                        if (e.key === "Escape") handleEditCancel()
                      }}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleEditSave}
                      className="text-primary hover:text-primary/80 p-1"
                    >
                      <Check size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleEditCancel}
                      className="text-destructive hover:text-destructive/80 p-1"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div onClick={() => handleChatClick(chat.id)} className="flex-1">
                      <h3 className="text-sidebar-foreground text-sm font-medium truncate">{chat.title}</h3>
                    </div>

                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditStart(chat)
                        }}
                        className="text-sidebar-foreground/60 hover:text-sidebar-foreground p-1"
                      >
                        <Edit2 size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(chat.id)
                        }}
                        className="text-destructive hover:text-destructive/80 p-1"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
