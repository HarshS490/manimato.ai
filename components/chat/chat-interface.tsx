"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { EnhancedMessageBubble } from "@/components/chat/enhanced-message-bubble";
import { InputBox } from "@/components/chat/input-box";
import { RightPreviewPanel } from "@/components/preview/right-preview-panel";
import { useChat, useCurrentChat } from "@/context/ChatProvider";
import WidthWrapper from "../layout/width-wrapper";
import clsx from "clsx";

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
    messages,
    sendMessage,
    aiState,
    aiStatusMessage,
    isLoadingChats,
    isProcessing,
    isLoadingMessages,
  } = useChat();

  const currentChat = useCurrentChat();

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
    if (prompt.trim() === "") return;
    // TODO: validate prompt
    sendMessage(prompt);
  };

  const handleRender = async (messageId: string) => {
    if (!chatId) return;
    // TODO: Implement render logic
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Chat Area */}
      <div className="max-w-2xl w-full mx-auto">
        <div
          className={`justify-center w-full h-full flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            previewOpen ? "mr-0" : ""
          }`}
        >
          {/* Messages */}
          <div
            className={clsx("p-4", {
              "flex-1 overflow-y-auto ": messages.length > 0,
            })}
          >
            {messages.length === 0 && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-foreground">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                      Describe a concept, I’ll{" "}
                      <span className="text-primary">visualize</span> it.
                    </h2>
                    {/* <p>Describe the animation you want to create with Manim</p> */}
                  </div>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className="mb-3">
                <EnhancedMessageBubble
                  aiState={aiState}
                  isUser={true}
                  message={message}
                  onRender={() => handleRender(message.id)}
                  onPreview={handlePreview}
                />
                <EnhancedMessageBubble
                  aiState={aiState}
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
          <div className="p-4">
            <InputBox
              onSend={handleSendMessage}
              disabled={isStreaming}
              placeholder="Describe the animation you want to create..."
            />
          </div>
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
