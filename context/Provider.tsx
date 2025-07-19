import React from 'react'
import { ChatProvider } from './ChatProvider'
import { ThemeProvider } from '@/components/theme-provider'


function Provider({children}: {children: React.ReactNode}) {
  return (
    <ChatProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ChatProvider>
  )
}

export default Provider