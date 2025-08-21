// hooks/useCodeStreaming.ts
import { useCallback, useRef } from "react";
import { streamCodeGeneration, StreamCallbacks } from "@/services/chatservice";

export interface UseCodeStreamingOptions {
  onChunk?: (chunk: string, messageId: string) => void;
  onComplete?: (messageId: string) => void;
  onError?: (error: string, messageId: string) => void;
  onConnectionError?: (error: Error) => void;
}

export interface StreamingState {
  isStreaming: boolean;
  error: string | null;
  messageId: string | null;
}

/**
 * Custom hook for managing code streaming independently from ChatProvider
 * Useful for components that need streaming functionality outside of the main chat context
 */
export function useCodeStreaming() {
  const abortControllerRef = useRef<(() => void) | null>(null);

  const startStreaming = useCallback(async (
    messageId: string, 
    callbacks: UseCodeStreamingOptions
  ): Promise<() => void> => {
    // Abort any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current();
    }

    try {
      const abortFunction = await streamCodeGeneration(messageId, {
        onChunk: callbacks.onChunk,
        onComplete: (msgId) => {
          abortControllerRef.current = null;
          callbacks.onComplete?.(msgId);
        },
        onError: (error, msgId) => {
          abortControllerRef.current = null;
          callbacks.onError?.(error, msgId);
        },
        onConnectionError: (error) => {
          abortControllerRef.current = null;
          callbacks.onConnectionError?.(error);
        }
      });

      abortControllerRef.current = abortFunction;
      return abortFunction;

    } catch (error) {
      console.error('Failed to start streaming:', error);
      callbacks.onConnectionError?.(error as Error);
      throw error;
    }
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current();
      abortControllerRef.current = null;
    }
  }, []);

  const isStreaming = abortControllerRef.current !== null;

  return {
    startStreaming,
    stopStreaming,
    isStreaming
  };
}

/**
 * Simple utility function for one-off streaming without hooks
 * Useful for API calls or one-time streaming operations
 */
export async function streamCode(
  messageId: string,
  onChunk: (chunk: string) => void,
  onComplete?: () => void,
  onError?: (error: string) => void
): Promise<() => void> {
  return streamCodeGeneration(messageId, {
    onChunk: (chunk) => onChunk(chunk),
    onComplete: () => onComplete?.(),
    onError: (error) => onError?.(error),
    onConnectionError: (error) => {
      console.error('Stream connection error:', error);
      onError?.('Connection error occurred');
    }
  });
}
