import { NextPage } from 'next'
import { useState } from 'react'

const RegisterPage: NextPage = (props) => {
  const GOOGLE_LOGO_URL =
    'https://media.discordapp.net/attachments/802076592825827332/1026366379273760828/Google_logo.png'
  const APPLE_LOGO_URL =
    'https://media.discordapp.net/attachments/802076592825827332/1026366378413924423/Apple_logo.png'
  const EMAIL_LOGO_URL =
    'https://media.discordapp.net/attachments/802076592825827332/1026366378908844082/Email.png'

  return (
    <div className='bg-[#F9FAFB] h-screen mx-8'>
      <div className='pt-28'>
        <span className='text-3xl leading-9 font-normal'>어서오세요!</span>
        <br />
        <span className='text-[#1C65D1] font-bold'>비힐러</span>입니다.
      </div>

      <div className='mt-4 tracking-tighter text-gray-500 text-lg leading-7 font-normal'>
        비힐러는 편리한 영양제 정보 검색부터, 복용 및 섭취관리 그리고 건강고민 해결까지 할 수 있는
        신뢰도 기반 커뮤니티 서비스도 제공하고 있어요. 😊
      </div>

      {/* TODO ::  Link 추가 */}
      <div className='mt-12'>
        <span className='text-xs leading-4 font-normal text-gray-900'>처음이신가요?</span>
        <div className='mt-2 w-100 h-12 flex  justify-center items-center bg-[#1C65D1] rounded-xl shadow-md'>
          <span className='block text-gray-50 text-sm leading-5 font-bold'>가입하기</span>
        </div>
      </div>

      <div className='mt-10'>
        <span className='text-xs leading-4 font-normal text-gray-900'>
          기존에 사용하신 분인가요?
        </span>

        {/* TODO :: 로직별 Link 추가 */}
        <div className='relative mt-2 w-100 h-12 flex  justify-center items-center bg-white rounded-xl shadow-md border border-gray-500'>
          <img className='absolute left-6' src={GOOGLE_LOGO_URL} alt='google logo' />
          <span className='block text-gray-900 text-sm leading-5 font-normal'>Google로 로그인</span>
        </div>

        <div className='relative mt-2 w-100 h-12 flex  justify-center items-center bg-white rounded-xl shadow-md border border-gray-500'>
          <img className='absolute left-6' src={APPLE_LOGO_URL} alt='google logo' />
          <span className='block text-gray-900 text-sm leading-5 font-normal'>
            Apple ID로 로그인
          </span>
        </div>

        <div className='relative mt-2 w-100 h-12 flex  justify-center items-center bg-white rounded-xl shadow-md border border-gray-500'>
          <img className='absolute left-6' src={EMAIL_LOGO_URL} alt='google logo' />
          <span className='block text-gray-900 text-sm leading-5 font-normal'>Email로 로그인</span>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
