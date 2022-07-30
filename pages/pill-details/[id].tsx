import { GetServerSideProps, NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faStar,
  faShareNodes,
  faPlus,
  faCheck,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import ContentGraph from '../../components/common/ContentGraph'
import EfficiencyTag from '../../components/tag/EfficiencyTag'
import requests from '../../utils/requests'
import { SupplementDetailsType } from '../../utils/types'
import axios from 'axios'

interface Props {
  details: SupplementDetailsType
}

const Details = ({ details }: Props) => {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isTaking, setIsTaking] = useState<boolean>(false)
  const [isOpenEfficiency, setIsOpenEfficiency] = useState<boolean>(false)
  const { id, name, dailyDose, imageUrl, intakeCount, intakeTiming, maker, ingredients } = details

  console.log(details)
  console.log(id, dailyDose, intakeTiming, name)

  return (
    <div>
      <header className='relative left-0 top-0 w-full h-14 px-3 flex items-center border-b-[#BABABA] border-b'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className='text-2xl cursor-pointer'
          onClick={() => router.back()}
        />
        <p className='text-2xl w-full font-bold text-center pr-5'>{name}</p>
      </header>

      <main className='flex flex-col items-center w-full bg-white px-8 py-8'>
        <div className='relative w-52 h-52 rounded-3xl border-[#BABABA] border overflow-hidden'>
          <Image
            src={requests.fetchSupplementThumbnail(id.toString())}
            className='object-cover'
            layout='fill'
          />
        </div>
        <p className='text-lg w-full mt-7 text-[#7A7A7A]'>{maker}</p>
        <p className='text-xl w-full'>{name}</p>
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
              className='text-xl cursor-pointer'
              onClick={() => setIsLiked(!isLiked)}
            />
            <FontAwesomeIcon
              icon={faShareNodes}
              className='text-xl cursor-pointer'
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
        <div className='flex w-full items-center justify-between cursor-pointer'
             onClick={() => setIsOpenEfficiency(!isOpenEfficiency)}>
          <p className='font-bold text-xl'>주요 효능</p>
          <FontAwesomeIcon
            icon={isOpenEfficiency ? faAngleUp : faAngleDown}
            className='text-xl'
          />
        </div>
        <div className='flex flex-wrap mt-4 w-full gap-3'>
          <EfficiencyTag tagName='면역 기능' />
          <EfficiencyTag tagName='혈액 생성' />
          <EfficiencyTag tagName='눈 건강' />
        </div>
        <div className={'w-full mt-7' + (isOpenEfficiency ? ' visible' : ' hidden')}>
          <p className='font-bold text-xl'>보조 효능</p>
          <div className='flex flex-wrap mt-4 w-full gap-3'>
            <EfficiencyTag tagName='노화 & 항산화' />
            <EfficiencyTag tagName='뼈 건강' />
            <EfficiencyTag tagName='치아 건강' />
            <EfficiencyTag tagName='멀티 비타민' />
            <EfficiencyTag tagName='간 건강' />
          </div>
        </div>

        <p className='font-bold text-xl mt-8 mb-2 w-full'>성분 함량</p>
        <ContentGraph ingredients={ingredients} />

        <p className='font-bold text-xl mt-8 mb-2 w-full'>추천 섭취 시간</p>
        <p className='text-lg w-full'>● 1일 {dailyDose}회</p>
        <p className='text-lg w-full'>● 먹는 시점: {intakeTiming}</p>
      </section>
    </div>
  )
}

export default Details


// SSR
export const getServerSideProps: GetServerSideProps = async ( context ) => {
  const res = await axios.get(requests.fetchSupplementDetails + `?id=${context.query.id}`)
  const details = res.data.pill[0]

  return {
    props: {
      details
    },
  }
}