import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BackHeader from '../../components/layout/BackHeader'

const PillLense: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <BackHeader router={router} name='카메라' />

      {/* 카메라 모듈 */}

      {/* 하단에, Logic과 연결된 캡쳐부분 + hook */}

      <div className='fixed bottom-0 w-full max-w-2xl h-12 bg-[#1C65D1] flex items-center justify-center'>
        <Link href='/pillLense/result'>
          <div className='w-8 h-8 bg-white rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center'>
            {/* TODO :: 삼항연산자로, Loading 창 묶기. + next Link에 Props를 묶는 작업도 해야함. */}

            {/* TODO :: 하단 임시 Icon 제거 */}
            <FontAwesomeIcon className=' text-xl text-[rgba(28,101,209,1)]' icon={faCamera} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default PillLense
