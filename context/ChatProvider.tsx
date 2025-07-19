"use client";

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

// --- Types & Enums ---
export enum ChatAIState {
  Idle = "idle",
  GeneratingCode = "generating_code",
  CodeComplete = "code_complete",
  GeneratingVideo = "generating_video",
  VideoComplete = "video_complete",
  Error = "error",
}

export interface Message {
  id: string
  content: string
  code?: string
  videoUrl?: string
  isStreaming?: boolean
  timestamp: Date
  error?: string
}

export interface Chat {
  id: string
  title: string
  createdAt: Date
  aiState: ChatAIState
  error?: string
}

// --- Context Types ---
interface ChatContextType {
  chats: Chat[]
  currentChatId: string | null
  setCurrentChatId: (chatId: string | null) => void
  createChat: (firstMessage?: Message) => string
  getChat: (id: string) => Chat | undefined
  addMessage: (message: Message) => void
  updateMessage: (messageId: string, updates: Partial<Message>) => void
  deleteChat: (id: string) => void
  renameChat: (id: string, title: string) => void
  setChatAIState: (chatId: string, aiState: ChatAIState, error?: string) => void
  clearChatError: (chatId: string) => void
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// --- Provider ---
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([]);

  // Create a new chat, optionally with a first message
  const createChat = useCallback((firstMessage?: Message) => {
    const chatId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    const newChat: Chat = {
      id: chatId,
      title: firstMessage?.content.slice(0, 50) + "..." || "New Chat",
      createdAt: new Date(),
      aiState: ChatAIState.Idle,
      error: undefined,
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(chatId)
    return chatId
  }, [])

  // Get a chat by id and set as current if not already
  const getChat = useCallback(
    (id: string) => {
      const chat = chats.find((chat) => chat.id === id)
      if (chat && currentChatId !== id) {
        setCurrentChatId(chat.id)
      }
      return chat
    },
    [chats, currentChatId],
  )

  // Add a message to a chat
  const addMessage = useCallback(
    ( message: Message) => {
      setMessages(prev => [...prev, message]);

    },
    [currentChatId],
  )

  // Update a message in a chat
  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      setMessages(prev =>prev.map(msg => msg.id===messageId ? {...msg, ...updates} : msg));

    },
    [currentChatId],
  )

  // Delete a chat
  const deleteChat = useCallback(
    (id: string) => {
      setChats((prev) => prev.filter((chat) => chat.id !== id))
      if (currentChatId === id) {
        setCurrentChatId(null)
      }
    },
    [currentChatId],
  )

  // Rename a chat
  const renameChat = useCallback(
    (id: string, title: string) => {
      setChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, title } : chat)))
      if (currentChatId === id) {
        setCurrentChatId(id)
      }
    },
    [currentChatId],
  )

  // Set AI state and error for a chat
  const setChatAIState = useCallback(
    (chatId: string, aiState: ChatAIState, error?: string) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, aiState, error: error ?? undefined } : chat
        )
      )
      if (currentChatId === chatId) {
        setCurrentChatId(chatId)
      }
    },
    [currentChatId],
  )

  // Clear error for a chat
  const clearChatError = useCallback(
    (chatId: string) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, error: undefined } : chat
        )
      )
      if (currentChatId === chatId) {
        setCurrentChatId(null)
      }
    },
    [currentChatId],
  )

  // --- Context Value ---
  const contextValue: ChatContextType = {
    chats,
    currentChatId,
    setCurrentChatId,
    createChat,
    getChat,
    addMessage,
    updateMessage,
    deleteChat,
    renameChat,
    setChatAIState,
    clearChatError,
    messages,
    setMessages,
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}

// --- Hooks for easy access ---
export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

// Helper: get current chat only
export function useCurrentChat() {
  const { currentChatId, chats } = useChat()
  return chats.find((c) => c.id === currentChatId);
}

// Helper: get chat by id
export function useChatById(chatId: string) {
  const { chats } = useChat()
  return chats.find((c) => c.id === chatId)
}
