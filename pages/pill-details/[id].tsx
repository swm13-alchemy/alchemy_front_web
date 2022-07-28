import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faStar, faShareNodes, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'

const Details: NextPage = () => {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isTaking, setIsTaking] = useState<boolean>(false)

  return (
    <div>
      <header className='relative left-0 top-0 w-full h-14 px-3 flex items-center border-b-[#BABABA] border-b'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className='text-2xl cursor-pointer'
          onClick={() => router.back()}
        />
        <p className='text-2xl pl-12 font-bold'>오메가800 피쉬 오일</p>
      </header>
      <main className='flex flex-col items-center w-full bg-white px-8 py-8'>
        <div className='relative w-52 h-52 rounded-3xl border-[#BABABA] border overflow-hidden'>
          <Image
            src={'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'}
            className='object-cover'
            layout='fill'
          />
        </div>
        <p className='text-lg w-full mt-7 text-[#7A7A7A]'>NOW Foods</p>
        <p className='text-xl w-full'>오메가800 피쉬 오일</p>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-1'>
            <FontAwesomeIcon
              icon={faStar}
              className='text-base text-yellow-400'
            />
            <p className='text-base'>0.00(0)</p>
          </div>
          <div className='flex items-center space-x-3'>
            <FontAwesomeIcon
              icon={isLiked ? faStar : faStarRegular}
              className='text-xl'
              onClick={() => setIsLiked(!isLiked)}
            />
            <FontAwesomeIcon
              icon={faShareNodes}
              className='text-xl'
            />
          </div>
        </div>
        <button
          className={'w-full h-11 rounded-xl mt-5 text-white text-lg' + (isTaking ? ' bg-[#00C23C]' : ' bg-[#BABABA]')}
          onClick={() => setIsTaking(!isTaking)}
        >
          <FontAwesomeIcon
            icon={isTaking ? faCheck : faPlus}
            className='relative right-12'
          />
          {isTaking ? '등록된 영양제' : '내 영양제 등록'}
        </button>
      </main>
      <section className='mt-3 flex flex-col items-center w-full bg-white px-8 py-8'>
        <p className='w-full font-bold text-xl'>주요 효능</p>
      </section>
    </div>
  )
}

export default Details