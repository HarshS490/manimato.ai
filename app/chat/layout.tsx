import { Sidebar } from '@/components/layout/side-bar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function layout({children}: Props) {
  return (
    <div className='h-svh flex'>
      <Sidebar/>
      <div className='h-full'>
        {
          children
        }
      </div>
    </div>
  )
}

export default layout