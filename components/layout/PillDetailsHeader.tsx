import Share from '@mui/icons-material/Share'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import React from 'react'
import { NextRouter } from 'next/router'
import { copyURL } from '../../utils/functions/copyURL'

interface Props {
  router: NextRouter
  pillName: string
}

function PillDetailsHeader({ router, pillName }: Props) {
  return (
    <header className='fixed left-0 top-0 right-0 pl-4 pr-2 py-2 flex items-center justify-between text-gray-900 bg-white z-10'>
      <button
        className='flex items-center justify-center'
        onClick={() => router.back()}
      >
        <ChevronLeft className='text-2xl' />
      </button>
      <h1 className='text-base'>{pillName}</h1>
      <button
        className='flex items-center justify-center'
        onClick={copyURL}
      >
        <Share className='text-2xl' />
      </button>
    </header>
  )
}

export default PillDetailsHeader