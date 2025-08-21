import { ChatInterface } from '@/components/chat/chat-interface'
import React from 'react'


async function page({params}: {
  params: Promise<{ chatId: string }>
}) {
  const { chatId } = await params;
  return (
    <div>
      <ChatInterface chatId={chatId}/>
    </div>
  )
}

export default page