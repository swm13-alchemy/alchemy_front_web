import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

const _3: NextPage = (props) => {
  return (
    <div className='bg-[#F9FAFB] h-screen mx-8 relative'>
      <div className=' pt-16'>
        <span className='text-3xl leading-9 font-bold text-gray-900'>마지막이에요! 👍</span> <br />
        <span className=' mt-2 text-lg leading-7 font-normal text-gray-900'>
          현재 섭취중인 영양제를 알려주세요.
        </span>{' '}
        <br />
        <span className='mt-2 text-xs font-normal text-gray-400'>
          섭취중인 영양제가 없다면, 아래에 건너뛰기를 눌러주세요!
        </span>
        <span className='block text-xs font-normal text-gray-400'>나중에도 추가할 수 있어요!</span>
      </div>

      {/* TODO :: 영양제 탐색 팝업 + 등록시 State에 추가 후 하단 추가된 영양제 부분에 등록해야함. (22-09-28 수정)*/}
      <div className='mt-12'>
        <Link href='/search'>
          <a>
            <div className='h-12 bg-white shadow rounded-2xl flex items-center px-[1em]'>
              <p className='text-gray-500 text-sm'>제품명이나 브랜드 명으로 검색</p>
            </div>
          </a>
        </Link>
      </div>

      {/* 영양제 추가시, State에 등록 => 여기에 등록된 영양제 Container 존재해야함 */}

      {/* TODO :: Link + State 전달 + 마지막 요소에는 Padding 값을 넣어야함. (버튼이 fixed Content이므로 화면 가림 방지)*/}
      <div className='fixed mt-2 bottom-28 left-8 right-8 h-12 flex justify-center items-center bg-[#1C65D1] rounded-xl shadow-md'>
        <span className='block text-white text-sm leading-5 font-bold'>다음</span>
      </div>
      <div className='fixed mt-2 bottom-16 left-8 right-8 h-12 flex justify-center items-center'>
        <span className='block text-gray-900 text-sm leading-5 font-normal'>건너뛰기</span>
      </div>
    </div>
  )
}

export default _3
