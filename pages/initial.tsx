import Image from 'next/image'
import bigLogo from '../public/asset/image/bigLogo.png'
import React from 'react'
import { signIn } from 'next-auth/react'

const Initial = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center space-y-12 px-4'>
      <div className='relative w-[15.625rem] h-[3.83254rem]'>
        <Image src={bigLogo} className='object-cover' layout='fill' />
      </div>
      <button
        className='bg-primary text-gray-50 shadow-md w-full p-3.5 rounded-[0.625rem]'
        onClick={() => signIn()}
      >
        로그인 or 회원가입 하기
      </button>
    </div>
  )
}

export default Initial