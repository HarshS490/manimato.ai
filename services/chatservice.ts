// services/chatService.ts

import { Chat, Message } from "@/context/ChatProvider";

export async function fetchChats(): Promise<Chat[]> {
  try {
    const res = await fetch("/api/chats");
    if (!res.ok) throw new Error("Failed to fetch chats");
    return await res.json();
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
}

export async function fetchMessages(chatId: string): Promise<Message[]> {
  try {
    const res = await fetch(`/api/messages?chatId=${chatId}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return await res.json();
  } catch (error) {
    console.error(`Error fetching messages for chat ${chatId}:`, error);
    throw error;
  }
}

export async function createChatAPI(chat: Chat) {
  try {
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chat),
    });
    if (!res.ok) throw new Error("Failed to create chat");
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

export async function deleteChatAPI(chatId: string) {
  try {
    const res = await fetch(`/api/chats/${chatId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete chat");
  } catch (error) {
    console.error(`Error deleting chat ${chatId}:`, error);
    throw error;
  }
}

export async function addMessageAPI(message: Message) {
  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error("Failed to add message");
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
}


export async function sendMessageAPI(message: Message) {
  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return await res.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

// Types for streaming responses
export interface StreamChunk {
  type: "code_chunk" | "completed" | "error";
  data: string;
  message_id: number;
}

export interface StreamCallbacks {
  onChunk?: (chunk: string, messageId: string) => void;
  onComplete?: (messageId: string) => void;
  onError?: (error: string, messageId: string) => void;
  onConnectionError?: (error: Error) => void;
}

/**
 * Streams code generation from the backend API
 * @param messageId - The ID of the message to stream code for
 * @param callbacks - Callback functions for handling stream events
 * @returns A function to abort the stream
 */
export async function streamCodeGeneration(
  messageId: string,
  callbacks: StreamCallbacks
): Promise<() => void> {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(`/api/v1/${messageId}/stream-code`, {
      method: "GET",
      signal,
      headers: {
        "Accept": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const processStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            
            // Parse SSE format (data: {...})
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.substring(6); // Remove "data: " prefix
                const parsed: StreamChunk = JSON.parse(jsonStr);
                
                switch (parsed.type) {
                  case "code_chunk":
                    callbacks.onChunk?.(parsed.data, messageId);
                    break;
                  case "completed":
                    callbacks.onComplete?.(messageId);
                    return; // Exit the stream processing
                  case "error":
                    callbacks.onError?.(parsed.data, messageId);
                    return; // Exit the stream processing
                }
              } catch (parseError) {
                console.error("Failed to parse SSE data:", parseError);
                // Continue processing other chunks even if one fails
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Stream aborted');
          return;
        }
        
        console.error("Stream processing error:", error);
        callbacks.onConnectionError?.(error as Error);
      } finally {
        reader.releaseLock();
      }
    };

    // Start processing the stream
    processStream();

  } catch (error) {
    console.error("Failed to start stream:", error);
    callbacks.onConnectionError?.(error as Error);
  }

  // Return abort function
  return () => {
    controller.abort();
  };
}