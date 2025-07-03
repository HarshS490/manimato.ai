import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `You are an expert Manim (Mathematical Animation Engine) code generator. 
    
    When users ask for animations, respond with:
    1. A brief explanation of what the animation will do
    2. Complete, runnable Manim code wrapped in \`\`\`python code blocks
    3. Any important notes about the animation
    
    Always include proper imports and class structure. Make sure the code is production-ready.
    
    Example response format:
    I'll create a [description of animation].
    
    \`\`\`python
    from manim import *
    
    class YourAnimation(Scene):
        def construct(self):
            # Your animation code here
            pass
    \`\`\`
    
    This animation will [explain what happens].`,
    messages,
  })

  return result.toDataStreamResponse()
}
