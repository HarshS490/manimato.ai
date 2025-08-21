"use client";

import { fetchChats, fetchMessages, createChatAPI, sendMessageAPI, streamCodeGeneration } from "@/services/chatservice";
import { useRouter } from "next/navigation";
import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// --- Types ---
export enum AIProcessingState {
  Idle = "idle",
  GeneratingCode = "generating_code",
  CodeComplete = "code_complete", 
  GeneratingVideo = "generating_video",
  VideoComplete = "video_complete",
  Error = "error"
}

export interface Message {
  id: string;
  prompt: string;
  code?: string;
  videoUrl?: string;
  isStreaming?: boolean;
  timestamp: Date;
  error?: string;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: Date;
}

interface ChatContextType {
  // Chat management
  chats: Chat[];
  currentChat: Chat | null;
  
  // Message management
  messages: Message[];
  isProcessing: boolean;
  
  // AI Processing State
  aiState: AIProcessingState;
  aiStatusMessage: string;
  
  // Actions
  sendMessage: (prompt: string) => Promise<void>;
  selectChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  updateMessageById: (messageId: string, updates: Partial<Message> | ((prevMessage: Message) => Partial<Message>)) => void;
  
  // Loading states
  isLoadingChats: boolean;
  isLoadingMessages: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// --- Provider ---
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // State
  const [chats, setChats] = useState<Chat[]>([{
    createdAt:new Date(),
    id: '1',
    title:"Dummy chat Room."
  }]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  
  // AI Processing State
  const [aiState, setAiState] = useState<AIProcessingState>(AIProcessingState.Idle);
  const [aiStatusMessage, setAiStatusMessage] = useState("");

  // Load chats on mount
  useEffect(() => {
    loadChats();
  }, []);

  // Load messages when current chat changes
  useEffect(() => {
    if (currentChat) {
      loadMessages(currentChat.id);
    } else {
      setMessages([]);
    }
  }, [currentChat?.id]);

  // --- API Calls ---
  const loadChats = async () => {
    try {
      setIsLoadingChats(true);
      const fetchedChats = await fetchChats();
      setChats(fetchedChats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setIsLoadingChats(false);
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      setIsLoadingMessages(true);
      const fetchedMessages = await fetchMessages(chatId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // --- Actions ---
  const updateAIStatus = useCallback((state: AIProcessingState, message: string = "") => {
    setAiState(state);
    setAiStatusMessage(message);
  }, []);

  // Helper function to update message by ID
  const updateMessageById = useCallback((messageId: string, updates: Partial<Message> | ((prevMessage: Message) => Partial<Message>)) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const updatesToApply = typeof updates === 'function' ? updates(msg) : updates;
        return { ...msg, ...updatesToApply };
      }
      return msg;
    }));
  }, []);

  const sendMessage = useCallback(async (prompt: string) => {
    setIsProcessing(true);
    updateAIStatus(AIProcessingState.GeneratingCode, "Analyzing your request and generating code...");
    
    try {
      // Create new message
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        prompt,
        timestamp: new Date(),
        isStreaming: true,
      };

      let chatToUse = currentChat;

      // If no current chat, create a new one
      if (!chatToUse) {
        const chatId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        const newChat: Chat = {
          id: chatId,
          title: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
          createdAt: new Date(),
        };

        // Create chat in backend
        await createChatAPI(newChat);
        
        // Update local state
        setChats(prev => [newChat, ...prev]);
        setCurrentChat(newChat);
        chatToUse = newChat;
        
        // Navigate to new chat
        router.push(`/chat/${chatId}`);
      }

      // Add message to UI immediately
      setMessages(prev => [...prev, newMessage]);

      // Send message to backend first
      await sendMessageAPI(newMessage);

      // // Start streaming - the service handles all stream logic
      // await streamCodeGeneration(newMessage.id, {
      //   onChunk: (chunk: string, messageId: string) => {
      //     updateMessageById(messageId, (prevMessage: Message) => ({
      //       code: (prevMessage.code || '') + chunk,
      //       isStreaming: true
      //     }));
      //   },
        
      //   onComplete: (messageId: string) => {
      //     updateMessageById(messageId, { isStreaming: false });
      //     updateAIStatus(AIProcessingState.CodeComplete, "Code generation completed");
      //     // TODO: Start video generation process here if needed
      //   },
        
      //   onError: (error: string, messageId: string) => {
      //     updateMessageById(messageId, { 
      //       error, 
      //       isStreaming: false 
      //     });
      //     updateAIStatus(AIProcessingState.Error, `Failed to generate code: ${error}`);
      //   },
        
      //   onConnectionError: (error: Error) => {
      //     console.error('Stream connection error:', error);
      //     updateAIStatus(AIProcessingState.Error, "Connection error. Please try again.");
      //   }
      // });

    } catch (error) {
      console.error('Failed to send message:', error);
      updateAIStatus(AIProcessingState.Error, "Failed to process your request. Please try again.");
    } finally {
      setIsProcessing(false);
      updateAIStatus(AIProcessingState.Idle);
    }
  }, [currentChat, router, updateAIStatus, updateMessageById, messages]);

  const selectChat = useCallback(async (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
      router.push(`/chat/${chatId}`);
      // Reset AI state when switching chats
      updateAIStatus(AIProcessingState.Idle);
    }
  }, [chats, router, updateAIStatus]);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      // Delete from backend (you'll need to implement this API call)
      // await deleteChatAPI(chatId);
      
      // Update local state
      setChats(prev => prev.filter(c => c.id !== chatId));
      
      // If deleting current chat, clear it
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
        updateAIStatus(AIProcessingState.Idle);
        router.push('/chat/new');
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  }, [currentChat, router, updateAIStatus]);

  // --- Context Value ---
  const contextValue: ChatContextType = {
    chats,
    currentChat,
    messages,
    isProcessing,
    aiState,
    aiStatusMessage,
    sendMessage,
    selectChat,
    deleteChat,
    updateMessageById,
    isLoadingChats,
    isLoadingMessages,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

// --- Hooks ---
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

// Helper hooks for common use cases
export function useCurrentChat() {
  const { currentChat } = useChat();
  return currentChat;
}

export function useMessages() {
  const { messages, isLoadingMessages } = useChat();
  return { messages, isLoading: isLoadingMessages };
}

export function useChats() {
  const { chats, isLoadingChats } = useChat();
  return { chats, isLoading: isLoadingChats };
}

export function useAIStatus() {
  const { aiState, aiStatusMessage, isProcessing } = useChat();
  return { 
    aiState, 
    aiStatusMessage, 
    isProcessing,
    isIdle: aiState === AIProcessingState.Idle,
    isGeneratingCode: aiState === AIProcessingState.GeneratingCode,
    isGeneratingVideo: aiState === AIProcessingState.GeneratingVideo,
    isComplete: aiState === AIProcessingState.VideoComplete,
    hasError: aiState === AIProcessingState.Error
  };
}

export function useStreamCode() {
  const { updateMessageById } = useChat();
  
  const startStreaming = useCallback(async (messageId: string, onStatusUpdate?: (state: AIProcessingState, message?: string) => void) => {
    try {
      onStatusUpdate?.(AIProcessingState.GeneratingCode, "Generating code...");
      
      const abortController = await streamCodeGeneration(messageId, {
        onChunk: (chunk: string, msgId: string) => {
          // Use functional update to accumulate chunks properly
          updateMessageById(msgId, (prevMessage: Message) => ({
            code: (prevMessage.code || '') + chunk,
            isStreaming: true
          }));
        },
        
        onComplete: (msgId: string) => {
          updateMessageById(msgId, { isStreaming: false });
          onStatusUpdate?.(AIProcessingState.CodeComplete, "Code generation completed");
        },
        
        onError: (error: string, msgId: string) => {
          updateMessageById(msgId, { 
            error, 
            isStreaming: false 
          });
          onStatusUpdate?.(AIProcessingState.Error, `Failed to generate code: ${error}`);
        },
        
        onConnectionError: (error: Error) => {
          console.error('Stream connection error:', error);
          onStatusUpdate?.(AIProcessingState.Error, "Connection error. Please try again.");
        }
      });
      
      return abortController;
    } catch (error) {
      console.error('Failed to start streaming:', error);
      onStatusUpdate?.(AIProcessingState.Error, "Failed to start code generation");
      throw error;
    }
  }, [updateMessageById]);
  
  return { startStreaming };
}