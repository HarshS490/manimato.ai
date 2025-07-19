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
}

export interface Message {
  id: string
  prompt: string
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
  // Removed aiState and error from here
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
  
  // Separate AI state management
  chatAIStates: Record<string, ChatAIState>
  chatErrors: Record<string, string>
  setChatAIState: (aiState: ChatAIState, error?: string) => void
  clearChatError: (chatId: string) => void
  getCurrentChatAIState: () => ChatAIState
  getCurrentChatError: () => string | undefined
  
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// --- Provider ---
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  
  // Separate state for AI states and errors
  const [chatAIStates, setChatAIStates] = useState<Record<string, ChatAIState>>({})
  const [chatErrors, setChatErrors] = useState<Record<string, string>>({})

  // Create a new chat, optionally with a first message
  const createChat = useCallback((firstMessage?: Message) => {
    const chatId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    const newChat: Chat = {
      id: chatId,
      title: firstMessage?.prompt.slice(0, 50) + "..." || "New Chat",
      createdAt: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(chatId)
    
    // Initialize AI state for new chat
    setChatAIStates(prev => ({ ...prev, [chatId]: ChatAIState.Idle }))
    
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
  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  // Update a message in a chat
  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, ...updates } : msg))
  }, [])

  // Delete a chat
  const deleteChat = useCallback((id: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id))
    
    // Clean up AI state and errors for deleted chat
    setChatAIStates(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
    setChatErrors(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
    
    if (currentChatId === id) {
      setCurrentChatId(null)
    }
  }, [currentChatId])

  // Rename a chat
  const renameChat = useCallback((id: string, title: string) => {
    setChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, title } : chat)))
  }, [])

  // Set AI state and error for a chat - now only updates AI state, not chats array
  const setChatAIState = useCallback((aiState: ChatAIState, error?: string) => {
    if(currentChatId === null) return
    setChatAIStates(prev => ({ ...prev, [currentChatId]: aiState }))
    
    if (error) {
      setChatErrors(prev => ({ ...prev, [currentChatId]: error }))
    } else {
      setChatErrors(prev => {
        const { [currentChatId]: _, ...rest } = prev
        return rest
      })
    }
  }, [])

  // Clear error for a chat
  const clearChatError = useCallback((chatId: string) => {
    setChatErrors(prev => {
      const { [chatId]: _, ...rest } = prev
      return rest
    })
  }, [])

  // Helper functions to get current chat's AI state and error
  const getCurrentChatAIState = useCallback(() => {
    return currentChatId ? (chatAIStates[currentChatId] || ChatAIState.Idle) : ChatAIState.Idle
  }, [currentChatId, chatAIStates])

  const getCurrentChatError = useCallback(() => {
    return currentChatId ? chatErrors[currentChatId] : undefined
  }, [currentChatId, chatErrors])

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
    chatAIStates,
    chatErrors,
    setChatAIState,
    clearChatError,
    getCurrentChatAIState,
    getCurrentChatError,
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
  return chats.find((c) => c.id === currentChatId)
}

// Helper: get current chat's AI state
export function useCurrentChatAIState() {
  const { getCurrentChatAIState } = useChat()
  return getCurrentChatAIState()
}

// Helper: get current chat's error
export function useCurrentChatError() {
  const { getCurrentChatError } = useChat()
  return getCurrentChatError()
}

// Helper: get chat by id
export function useChatById(chatId: string) {
  const { chats } = useChat()
  return chats.find((c) => c.id === chatId)
}

// Helper: get AI state for specific chat
export function useChatAIState(chatId: string) {
  const { chatAIStates } = useChat()
  return chatAIStates[chatId] || ChatAIState.Idle
}

// Helper: get error for specific chat
export function useChatError(chatId: string) {
  const { chatErrors } = useChat()
  return chatErrors[chatId]
}

// Helper: check if specific chat AI is busy
export function useIsChatAIBusy(chatId: string) {
  const aiState = useChatAIState(chatId)
  return aiState === ChatAIState.GeneratingCode || aiState === ChatAIState.GeneratingVideo
}

// Helper: get all chat AI states (useful for debugging or admin views)
export function useAllChatAIStates() {
  const { chatAIStates, chatErrors } = useChat()
  return { aiStates: chatAIStates, errors: chatErrors }
}