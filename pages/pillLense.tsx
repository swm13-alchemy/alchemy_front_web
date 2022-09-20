import { NextPage } from 'next'
import { useRouter } from 'next/router'
import BackHeader from '../components/layout/BackHeader'

const PillLense: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <BackHeader router={router} name='카메라' />

      {/* 카메라 모듈 */}

      {/* 가이드라인 표시가 Z-index를 달리해서 존재해야함. */}

      {/* 하단에, Logic과 연결된 캡쳐부분 + hook */}

      <div className='fixed bottom-0 w-full max-w-2xl h-20 bg-[#1C65D1] flex items-center justify-center'>
        <div className='w-12 h-12 bg-white rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer'>
          {/* 카메라 버튼 - TODO :: 로직 연결해야함! */}
        </div>
      </div>
    </div>
  )
}

export default PillLense
