import ChevronLeft from '@mui/icons-material/ChevronLeft'
import React from 'react'
import { NextRouter } from 'next/router'

interface Props {
  children: React.ReactNode
  router: NextRouter
  name: string
}

function BackHeaderWithBtn({ children, router, name }: Props) {
  return (
    <header className='relative py-2 flex items-center justify-center text-gray-900 bg-white shadow'>
      <button
        className='absolute left-4 flex items-center justify-center'
        onClick={() => router.back()}
      >
        <ChevronLeft className='text-2xl' />
      </button>
      <h1 className='text-base'>{name}</h1>
      {children}
    </header>
  )
}

export default BackHeaderWithBtn