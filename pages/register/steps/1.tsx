import { NextPage } from 'next'
import { useState } from 'react'

const _1: NextPage = (props) => {
  return (
    <div className='bg-[#F9FAFB] h-screen mx-8 relative'>
      <div className=' pt-16'>
        <span className='text-3xl leading-9 font-bold text-gray-900'>환영합니다 👋</span> <br />
        <span className=' mt-2 text-lg leading-7 font-normal text-gray-900'>
          가입을 위해 간단한 정보가 필요합니다.
        </span>
      </div>

      <div className='mt-12'>
        <span className='text-sm leading-5 font-normal text-black'>생년월일</span>

        {/* TODO :: React-Datepicker 로직 관련 처리해야함 */}
        <div className='relative mt-2 w-100 h-12 flex  items-center pl-4 bg-white rounded-xl shadow-md'>
          <span className='block text-gray-400 text-sm leading-5 font-normal'>1900/00/00</span>
        </div>
      </div>

      <div className='mt-8'>
        <span className='text-sm leading-5 font-normal text-black'>성별</span>

        <div className='flex flex-row space-x-4'>
          <div className='relative mt-2 flex-1 h-12 flex justify-center items-center bg-white rounded-xl shadow-md'>
            <span className='block text-gray-900 text-sm leading-5 font-normal'>남자</span>
          </div>

          <div className='relative mt-2 flex-1 h-12 flex justify-center items-center bg-white rounded-xl shadow-md '>
            <span className='block text-gray-900 text-sm leading-5 font-normal'>여자</span>
          </div>
        </div>
      </div>

      {/* TODO :: Link + State 전달 */}
      <div className='absolute mt-2 bottom-16 w-[100%] h-12 flex justify-center items-center bg-[#1C65D1] rounded-xl shadow-md'>
        <span className='block text-white text-sm leading-5 font-bold'>다음</span>
      </div>
    </div>
  )
}

export default _1
