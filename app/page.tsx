"use client"

import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  Plus,
  Play,
  Code,
  ThumbsUp,
  Download,
  Share,
  User,
  Bot,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Settings,
  History,
  Scissors,
  Type,
  Gauge,
  Pause,
  Volume2,
  Maximize,
  Edit3,
  Sparkles,
  Terminal,
  Layers,
} from "lucide-react"

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  messageCount: number
}

interface CodeBlock {
  code: string
  language: string
}

interface VideoEditingState {
  trimStart: number
  trimEnd: number
  speed: number
  textOverlays: Array<{
    id: string
    text: string
    x: number
    y: number
    duration: number
    startTime: number
  }>
  volume: number
}

export default function ElegantDarkAIGenerator() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Sine Wave Animation",
      lastMessage: "Create a beautiful sine wave with colors",
      timestamp: "2 hours ago",
      messageCount: 4,
    },
    {
      id: "2",
      title: "Matrix Transformation",
      lastMessage: "Linear algebra visualization",
      timestamp: "1 day ago",
      messageCount: 6,
    },
    {
      id: "3",
      title: "Calculus Derivatives",
      lastMessage: "Show derivative calculation",
      timestamp: "3 days ago",
      messageCount: 2,
    },
  ])

  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [videoEditing, setVideoEditing] = useState<VideoEditingState>({
    trimStart: 0,
    trimEnd: 100,
    speed: 1,
    textOverlays: [],
    volume: 80,
  })
  const [showVideoEditor, setShowVideoEditor] = useState(false)
  const [newOverlayText, setNewOverlayText] = useState("")

  // Sample messages to showcase the interface
  const [sampleMessages] = useState([
    {
      id: "sample-1",
      role: "user" as const,
      content: "Create a beautiful sine wave animation with smooth color transitions",
    },
    {
      id: "sample-2",
      role: "assistant" as const,
      content: `I'll create a stunning sine wave animation with smooth color transitions for you.

\`\`\`python
from manim import *

class ColorfulSineWave(Scene):
    def construct(self):
        # Create axes
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[-2, 2, 1],
            x_length=10,
            y_length=6,
            axis_config={"color": BLUE},
        )
        
        # Create sine wave function
        sine_graph = axes.plot(
            lambda x: np.sin(x),
            color=GREEN,
            x_range=[-4, 4],
        )
        
        # Add color gradient
        sine_graph.set_color_by_gradient(TEAL, GREEN, YELLOW, ORANGE, RED)
        
        # Animate the creation
        self.play(Create(axes))
        self.play(Create(sine_graph), run_time=3)
        
        # Add wave motion
        self.play(
            sine_graph.animate.shift(RIGHT * 2),
            rate_func=there_and_back,
            run_time=4
        )
        
        self.wait(2)
\`\`\`

This animation creates a colorful sine wave with a beautiful gradient that transitions from teal to red. The wave has smooth motion and will render as a high-quality video.`,
    },
  ])

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    id: activeConversation,
    initialMessages: activeConversation === "1" ? sampleMessages : [],
  })

  // Check if we have any assistant responses to show the output panel
  const hasResponses = messages.some((m) => m.role === "assistant")

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `New Conversation`,
      lastMessage: "Just started",
      timestamp: "Just now",
      messageCount: 0,
    }
    setConversations([newConversation, ...conversations])
    setActiveConversation(newConversation.id)
    setSelectedMessageId(null)
  }

  const extractCodeFromMessage = (content: string): CodeBlock[] => {
    const codeBlocks: CodeBlock[] = []
    const regex = /```(\w+)?\n([\s\S]*?)```/g
    let match

    while ((match = regex.exec(content)) !== null) {
      codeBlocks.push({
        language: match[1] || "python",
        code: match[2].trim(),
      })
    }

    return codeBlocks
  }

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      const feedbackMessage = `Please improve the previous code based on this feedback: ${feedback}`
      handleSubmit(new Event("submit") as any, {
        data: { message: feedbackMessage },
      })
      setFeedback("")
      setShowFeedback(false)
    }
  }

  const simulateVideoGeneration = (code: string) => {
    return "/placeholder.svg?height=400&width=600&text=Generated+Video+Preview"
  }

  const handleMessageClick = (messageId: string, role: string) => {
    if (role === "assistant") {
      setSelectedMessageId(messageId)
    }
  }

  const addTextOverlay = () => {
    if (newOverlayText.trim()) {
      const newOverlay = {
        id: Date.now().toString(),
        text: newOverlayText,
        x: 50,
        y: 50,
        duration: 3,
        startTime: 1,
      }
      setVideoEditing((prev) => ({
        ...prev,
        textOverlays: [...prev.textOverlays, newOverlay],
      }))
      setNewOverlayText("")
    }
  }

  const removeTextOverlay = (id: string) => {
    setVideoEditing((prev) => ({
      ...prev,
      textOverlays: prev.textOverlays.filter((overlay) => overlay.id !== id),
    }))
  }

  // Get the message to display (selected or latest assistant message)
  const selectedMessage = messages.find((m) => m.id === selectedMessageId)
  const latestAssistantMessage = messages.filter((m) => m.role === "assistant").pop()
  const displayMessage = selectedMessage || latestAssistantMessage
  const displayCodeBlocks = displayMessage ? extractCodeFromMessage(displayMessage.content) : []

  // Auto-select latest message when new response comes in
  useEffect(() => {
    if (latestAssistantMessage && !selectedMessageId) {
      setSelectedMessageId(latestAssistantMessage.id)
    }
  }, [latestAssistantMessage, selectedMessageId])

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-gray-100">
      {/* Collapsible Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-80"
        } transition-all duration-300 ease-in-out bg-gray-900/60 backdrop-blur-xl border-r border-gray-700/30 shadow-2xl flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700/30">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-100">CodeGen AI</h1>
                  <p className="text-xs text-gray-400">Mathematical Animations</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-gray-700/50 text-gray-400 hover:text-gray-200"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* New Conversation Button */}
        <div className="p-4">
          <Button
            onClick={createNewConversation}
            className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 shadow-lg border border-gray-600/30 hover:border-emerald-500/30"
            size={sidebarCollapsed ? "sm" : "default"}
          >
            <Plus className="w-4 h-4" />
            {!sidebarCollapsed && <span className="ml-2">New Chat</span>}
          </Button>
        </div>

        {/* Conversations List */}
        {!sidebarCollapsed && (
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Layers className="w-3 h-3" />
                Recent Sessions
              </div>
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className={`cursor-pointer transition-all duration-200 bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/40 hover:shadow-lg ${
                    activeConversation === conversation.id
                      ? "ring-1 ring-emerald-500/40 bg-emerald-950/20 border-emerald-500/20"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation.id)
                    setSelectedMessageId(null)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate mb-1 text-gray-200">{conversation.title}</h3>
                        <p className="text-xs text-gray-400 truncate mb-2">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-700/50 text-gray-400 border-gray-600/50"
                          >
                            {conversation.messageCount} msgs
                          </Badge>
                        </div>
                      </div>
                      <MessageSquare className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-700/30">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Chat Interface */}
        <div
          className={`${
            hasResponses ? "w-1/2" : "w-full"
          } transition-all duration-500 ease-in-out flex flex-col bg-gray-900/30 backdrop-blur-sm`}
        >
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-700/30 bg-gray-900/50 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-100">
                  {conversations.find((c) => c.id === activeConversation)?.title || "New Conversation"}
                </h2>
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Generate mathematical animations with AI assistance
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  Online
                </Badge>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-600/50">
                    <Code className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-100 mb-3">Welcome to CodeGen AI</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Create beautiful mathematical animations with AI. Describe your concept and let our AI generate the
                    perfect Manim code.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <Button
                      variant="outline"
                      className="text-left justify-start h-auto p-6 bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/40 hover:border-emerald-500/30 transition-all duration-200"
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm text-gray-200 mb-1">Sine Wave Animation</div>
                        <div className="text-xs text-gray-400">Create flowing mathematical waves</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-left justify-start h-auto p-6 bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/40 hover:border-emerald-500/30 transition-all duration-200"
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm text-gray-200 mb-1">Matrix Transformation</div>
                        <div className="text-xs text-gray-400">Visualize linear algebra concepts</div>
                      </div>
                    </Button>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-600/50">
                      <Bot className="w-6 h-6 text-emerald-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-slate-700 to-slate-800 text-gray-100 shadow-xl border border-slate-600/50"
                        : `bg-gray-800/40 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/40 hover:border-gray-600/50 ${
                            selectedMessageId === message.id
                              ? "ring-1 ring-emerald-500/40 bg-emerald-950/20 border-emerald-500/20"
                              : ""
                          }`
                    }`}
                    onClick={() => handleMessageClick(message.id, message.role)}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-100">{message.content}</div>

                    {message.role === "assistant" && extractCodeFromMessage(message.content).length > 0 && (
                      <div className="mt-4 flex items-center gap-3">
                        <Badge className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          <Code className="w-3 h-3 mr-1" />
                          Python Code
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowFeedback(!showFeedback)}
                            className="text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                          >
                            <Share className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-12 h-12 rounded-2xl bg-gray-700/50 flex items-center justify-center flex-shrink-0 border border-gray-600/50">
                      <User className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-600/50">
                    <Bot className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/40">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300">Generating code...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Feedback Section */}
          {showFeedback && (
            <div className="p-4 bg-slate-800/30 border-t border-slate-600/30 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto">
                <h4 className="text-sm font-medium mb-3 text-slate-300 flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Improve the generated code:
                </h4>
                <div className="flex gap-3">
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="e.g., Make the animation slower, add more colors, include explanatory text..."
                    className="flex-1 bg-gray-800/50 border-gray-700/50 text-gray-100 placeholder-gray-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    rows={2}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={handleFeedbackSubmit}
                      size="sm"
                      className="bg-emerald-600/80 hover:bg-emerald-600 text-white"
                    >
                      Send Feedback
                    </Button>
                    <Button
                      onClick={() => setShowFeedback(false)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="p-6 bg-gray-900/50 border-t border-gray-700/30 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Describe the mathematical animation you want to create..."
                    className="pr-12 h-14 text-sm bg-gray-800/50 border-gray-700/50 text-gray-100 placeholder-gray-400 focus:border-emerald-500/50 focus:ring-emerald-500/20 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-14 px-8 bg-emerald-600/80 hover:bg-emerald-600 shadow-xl border-0 text-white font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      Generate
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Output Panel - Only visible when there are responses */}
        {hasResponses && (
          <div className="w-1/2 bg-gray-900/30 backdrop-blur-sm border-l border-gray-700/30 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-6 border-b border-gray-700/30 bg-gray-900/50 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                    <Code className="w-5 h-5 text-emerald-400" />
                    Generated Output
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {displayMessage ? "Your Manim code and video preview" : "No output selected"}
                  </p>
                </div>
                {displayCodeBlocks.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700/50 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {displayCodeBlocks.length > 0 ? (
              <div className="flex-1 p-6">
                <Tabs defaultValue="code" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800/50 border border-gray-700/50">
                    <TabsTrigger
                      value="code"
                      className="flex items-center gap-2 data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30"
                    >
                      <Code className="w-4 h-4" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className="flex items-center gap-2 data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30"
                    >
                      <Play className="w-4 h-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger
                      value="editor"
                      className="flex items-center gap-2 data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editor
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="code" className="flex-1">
                    <Card className="h-full bg-gray-800/30 border-gray-700/50 shadow-2xl backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-gray-100 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            Manim Animation Code
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Python</Badge>
                            <Badge className="bg-gray-600/30 text-gray-400 border-gray-600/50">Manim 0.18.0</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 h-full">
                        <ScrollArea className="h-[calc(100vh-350px)]">
                          <pre className="text-sm bg-gray-950/80 text-gray-100 p-6 rounded-xl overflow-x-auto font-mono leading-relaxed shadow-inner border border-gray-700/30">
                            <code className="text-emerald-300">{displayCodeBlocks[0]?.code}</code>
                          </pre>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="video" className="flex-1">
                    <Card className="h-full bg-gray-800/30 border-gray-700/50 shadow-2xl backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-gray-100 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            Animation Preview
                          </CardTitle>
                          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">HD Quality</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="aspect-video bg-gradient-to-br from-gray-950 to-gray-900 rounded-xl border border-gray-700/50 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                          <img
                            src={simulateVideoGeneration(displayCodeBlocks[0]?.code || "")}
                            alt="Generated Animation Preview"
                            className="max-w-full max-h-full rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm">
                                <Play className="w-3 h-3" />
                              </Button>
                              <Button size="sm" className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm">
                                <Pause className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm">
                                <Volume2 className="w-3 h-3" />
                              </Button>
                              <Button size="sm" className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm">
                                <Maximize className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-200 flex items-center gap-2">
                              <Gauge className="w-4 h-4 text-emerald-400" />
                              Video Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Duration:</span>
                                <span className="font-medium text-gray-200">8.5 seconds</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Resolution:</span>
                                <span className="font-medium text-gray-200">1920×1080</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Frame Rate:</span>
                                <span className="font-medium text-gray-200">60 FPS</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">File Size:</span>
                                <span className="font-medium text-gray-200">8.2 MB</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-200">Quick Actions</h4>
                            <div className="space-y-2">
                              <Button className="w-full bg-emerald-600/80 hover:bg-emerald-600 shadow-lg">
                                <Play className="w-4 h-4 mr-2" />
                                Play Animation
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 bg-transparent"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download MP4
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 bg-transparent"
                                onClick={() => setShowVideoEditor(true)}
                              >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Video
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="editor" className="flex-1">
                    <Card className="h-full bg-gray-800/30 border-gray-700/50 shadow-2xl backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-gray-100 flex items-center gap-2">
                          <Edit3 className="w-5 h-5 text-slate-400" />
                          Video Editor
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-6">
                        {/* Trim Controls */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Scissors className="w-4 h-4 text-slate-400" />
                            <h4 className="font-medium text-gray-200">Trim Video</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-400 w-16">Start:</span>
                              <Slider
                                value={[videoEditing.trimStart]}
                                onValueChange={(value) => setVideoEditing((prev) => ({ ...prev, trimStart: value[0] }))}
                                max={100}
                                step={1}
                                className="flex-1"
                              />
                              <span className="text-sm text-gray-300 w-12">{videoEditing.trimStart}%</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-400 w-16">End:</span>
                              <Slider
                                value={[videoEditing.trimEnd]}
                                onValueChange={(value) => setVideoEditing((prev) => ({ ...prev, trimEnd: value[0] }))}
                                max={100}
                                step={1}
                                className="flex-1"
                              />
                              <span className="text-sm text-gray-300 w-12">{videoEditing.trimEnd}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Speed Controls */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-emerald-400" />
                            <h4 className="font-medium text-gray-200">Playback Speed</h4>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400 w-16">Speed:</span>
                            <Slider
                              value={[videoEditing.speed]}
                              onValueChange={(value) => setVideoEditing((prev) => ({ ...prev, speed: value[0] }))}
                              min={0.25}
                              max={3}
                              step={0.25}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-300 w-12">{videoEditing.speed}x</span>
                          </div>
                        </div>

                        {/* Text Overlays */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Type className="w-4 h-4 text-gray-400" />
                            <h4 className="font-medium text-gray-200">Text Overlays</h4>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newOverlayText}
                              onChange={(e) => setNewOverlayText(e.target.value)}
                              placeholder="Enter overlay text..."
                              className="flex-1 bg-gray-800/50 border-gray-700/50 text-gray-100 placeholder-gray-400"
                            />
                            <Button onClick={addTextOverlay} size="sm" className="bg-gray-600 hover:bg-gray-500">
                              Add
                            </Button>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {videoEditing.textOverlays.map((overlay) => (
                              <div
                                key={overlay.id}
                                className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-700/50"
                              >
                                <span className="text-sm text-gray-300 truncate">{overlay.text}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeTextOverlay(overlay.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Volume Control */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-gray-400" />
                            <h4 className="font-medium text-gray-200">Audio</h4>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400 w-16">Volume:</span>
                            <Slider
                              value={[videoEditing.volume]}
                              onValueChange={(value) => setVideoEditing((prev) => ({ ...prev, volume: value[0] }))}
                              max={100}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-300 w-12">{videoEditing.volume}%</span>
                          </div>
                        </div>

                        {/* Apply Changes */}
                        <div className="pt-4 border-t border-gray-700/30">
                          <Button className="w-full bg-emerald-600/80 hover:bg-emerald-600 shadow-lg">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Apply Changes & Render
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-gray-500 max-w-sm">
                  <div className="w-20 h-20 bg-gray-800/30 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-700/30">
                    <Code className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-gray-400">No Output Yet</h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Start a conversation to see the generated Manim code and video preview appear here with advanced
                    editing capabilities.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
