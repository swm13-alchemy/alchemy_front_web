import { NextRouter } from 'next/router'
import { ChevronLeft } from '@mui/icons-material'
import React from 'react'

interface Props {
  router: NextRouter
  name: string
}

function HeadNav({ router, name }: Props) {
  return (
    <header className='relative w-full py-2 flex items-center justify-center text-gray-900 bg-white shadow'>
      <button
        className='absolute left-4 flex items-center justify-center'
        onClick={() => router.back()}
      >
        <ChevronLeft className='text-2xl' />
      </button>
      <h1 className='text-base'>{name}</h1>
    </header>
  )
}

export default HeadNav