"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { EnhancedMessageBubble } from "@/components/chat/enhanced-message-bubble";
import { InputBox } from "@/components/chat/input-box";
import { RightPreviewPanel } from "@/components/preview/right-preview-panel";
import {
  ChatAIState,
  useChat,
  useCurrentChat,
  type Message,
} from "@/context/ChatProvider";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInterfaceProps {
  chatId: string | null;
}

interface PreviewContent {
  code?: string;
  videoUrl?: string;
  title: string;
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(
    null
  );
  const [previewTab, setPreviewTab] = useState<"code" | "video">("code");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    getChat,
    createChat,
    addMessage,
    updateMessage,
    setChatAIState,
    messages,
    getCurrentChatAIState,
  } = useChat();

  const currentChat = useCurrentChat();
  const currentAiState = getCurrentChatAIState();
  useEffect(() => {
    if (!currentChat) {
      router.push("/new");
    }
  }, [chatId, getChat, router, currentChat]);

  const handlePreview = (content: PreviewContent, tab: "code" | "video") => {
    setPreviewContent(content);
    setPreviewTab(tab);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewContent(null);
  };

  const handleSendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;

    let activeChatId = chatId;
    const messageId = `msg_${Date.now()}_user`;
    if (!chatId) {
      const userMessage: Message = {
        id: messageId,
        prompt,
        code: "",
        isStreaming: true,
        timestamp: new Date(),
      };

      activeChatId = createChat(userMessage);
      router.push(`/chat/${activeChatId}`);
    } else {
      const userMessage: Message = {
        id: messageId,
        prompt,
        code: "",
        isStreaming: true,
        timestamp: new Date(),
      };
      addMessage(userMessage);
    }

    try {
      // stream the ai response here
      setChatAIState(ChatAIState.GeneratingCode);
    } catch (error) {
      console.error("Error generating response:", error);
      updateMessage(messageId, {
        error: "Sorry, there was an error generating the animation code.",
        isStreaming: false,
      });
    } finally {
      // stop streaming here
      // setIsStreaming(false);
    }
  };

  const handleRender = async (messageId: string) => {
    if (!chatId) return;

    try {
      setChatAIState(ChatAIState.GeneratingVideo);
      updateMessage(messageId, {
        videoUrl: "rendering",
      });

      // call api to render the video

      setChatAIState(ChatAIState.VideoComplete);
      updateMessage(messageId, {
        videoUrl: "https://example.com/rendered-video.mp4", // replace with actual video URL
      });
    } catch (error) {
      console.error("Error rendering video:", error);
      updateMessage(messageId, {
        videoUrl: undefined,
        error:
          error instanceof Error ? error.message : "Failed to render video",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          previewOpen ? "mr-0" : ""
        }`}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <h2 className="text-2xl font-semibold mb-2">
                  AI Animation Tool
                </h2>
                <p>Describe the animation you want to create with Manim</p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div>
              <EnhancedMessageBubble
                key={message.id}
                aiState={currentAiState}
                isUser={true}
                message={message}
                onRender={() => handleRender(message.id)}
                onPreview={handlePreview}
              />
              <EnhancedMessageBubble
                key={message.id}
                aiState={currentAiState}
                isUser={false}
                message={message}
                onRender={() => handleRender(message.id)}
                onPreview={handlePreview}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background">
          <InputBox
            onSend={handleSendMessage}
            disabled={isStreaming}
            placeholder="Describe the animation you want to create..."
          />
        </div>
      </div>

      {/* Right Preview Panel */}
      <RightPreviewPanel
        isOpen={previewOpen}
        onClose={handleClosePreview}
        code={previewContent?.code}
        videoUrl={previewContent?.videoUrl}
        defaultTab={previewTab}
        title={previewContent?.title || "Preview"}
      />
    </div>
  );
}
