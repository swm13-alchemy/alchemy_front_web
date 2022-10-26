import Image from 'next/image'
import bigLogo from '../public/asset/image/bigLogo.png'
import React, { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useUserInformationStore } from '../stores/store'
import ChevronLeft from '@mui/icons-material/ChevronLeft'

const Initial = () => {
  const router = useRouter()
  const { userId, oauthId } = useUserInformationStore()

  // 이미 로그인을 한 사람의 경우 Redirect
  useEffect(() => {
    if (userId && oauthId) {
      router.push('/')
    }
  }, [userId, oauthId])

  return (
    <div className='h-screen relative'>
      {/* 뒤로가기 헤더 */}
      <header className='absolute left-0 right-0 top-0 h-8 p-2 flex items-center'>
        <button
          className='flex items-center justify-center'
          onClick={() => router.back()}
        >
          <ChevronLeft className='text-2xl text-gray-900' />
        </button>
      </header>

      {/* 회원 가입 로고, 버튼 부분 */}
      <div className='h-full flex flex-col items-center justify-center space-y-12 px-4'>
        <div className='relative w-[15.625rem] h-[3.83254rem]'>
          <Image src={bigLogo} className='object-cover' layout='fill' />
        </div>
        <button
          className='bg-primary text-gray-50 shadow-md w-full p-3.5 rounded-[0.625rem]'
          onClick={() => signIn()}
        >
          로그인 하기
        </button>
      </div>
    </div>
  )
}

export default Initial