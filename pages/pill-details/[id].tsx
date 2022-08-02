import { GetServerSideProps } from 'next'
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
import { useEffect, useState } from 'react'
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
  const { id, name, dailyDose, intakeTiming, maker, ingredients } = details
  const [userTakingPillList, setUserTakingPillList] = useState<SupplementDetailsType[]>([])

  console.log(details)
  console.log(id, dailyDose, intakeTiming, name)

  useEffect(() => {
    // localStorage에서 'userTakingPillList'라는 key이름으로 데이터를 꺼내봄.
    const jsonLocalTakingPillList = localStorage.getItem('userTakingPillList')
    // 만약 있다면 (null이 아니라면) if문 안의 내용 실행
    if (jsonLocalTakingPillList !== null) {
      // localStorage에 넣을 때 Json으로 바꿔주므로 다시 되돌리기 위해 파싱
      const localTakingPillList: SupplementDetailsType[] = JSON.parse(jsonLocalTakingPillList)
      // 객체 배열인 localTakingPillList에서 현재 페이지의 영양제의 id와 같은 객체 값이 있는지 find함수로 확인
      // 있다면 객체가 반환되고 없으면 undefined가 반환
      const matchOne: SupplementDetailsType | undefined = localTakingPillList.find(x => x.id === id)
      if (matchOne !== undefined) {
        setIsTaking(true)
      } else {  // 사실 굳이 필요없는 else이긴 함. 안정성을 위해 일단 추가
        setIsTaking(false)
      }
      setUserTakingPillList(localTakingPillList)
    }
  }, [])

  const takingSubmit = (curIsTaking: boolean) => {
    // 현재 섭취중이 아니라면
    if (!curIsTaking) {
      console.log(userTakingPillList)
      console.log(userTakingPillList.concat(details))
      // 기존 유저 섭취 영양제 리스트 배열에 현재 영양제 페이지의 영양제 객체 값 추가 (이게 필요한지는 조금 더 생각해봐야 할 듯)
      setUserTakingPillList(userTakingPillList.concat(details))
      // localStorage에도 추가해서 저장
      localStorage.setItem('userTakingPillList', JSON.stringify(userTakingPillList.concat(details)))
      // 다 끝나면 섭취 체크
      setIsTaking(true)
    } else {  // 만약 섭취중이라면
      // userTakingPillList 배열에서 해당 값을 삭제하기
      const removedList: SupplementDetailsType[] = userTakingPillList.filter(x => x.id !== id)
      // state 값 수정
      setUserTakingPillList(removedList)
      // localStorage 값도 수정
      localStorage.setItem('userTakingPillList', JSON.stringify(removedList))
      // 다 끝나면 섭취 해제 체크
      setIsTaking(false)
    }
  }

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
            <FontAwesomeIcon icon={faStar} className='text-base text-yellow-400' />
            <p className='text-base'>0.00(0)</p>
          </div>
          <div className='flex items-center space-x-3'>
            <FontAwesomeIcon
              // @ts-ignore
              icon={isLiked ? faStar : faStarRegular}
              className='text-xl cursor-pointer'
              onClick={() => setIsLiked(!isLiked)}
            />
            <FontAwesomeIcon icon={faShareNodes} className='text-xl cursor-pointer' />
          </div>
        </div>
        <button
          className={
            'w-full h-11 rounded-xl mt-5 text-white text-lg' +
            (isTaking ? ' bg-[#00C23C]' : ' bg-[#BABABA]')
          }
          onClick={() => takingSubmit(isTaking)}
        >
          <FontAwesomeIcon icon={isTaking ? faCheck : faPlus} className='relative right-12' />
          {isTaking ? '등록된 영양제' : '내 영양제 등록'}
        </button>
      </main>

      <section className='mt-3 flex flex-col items-center w-full bg-white px-8 py-8'>
        <div
          className='flex w-full items-center justify-between cursor-pointer'
          onClick={() => setIsOpenEfficiency(!isOpenEfficiency)}
        >
          <p className='font-bold text-xl'>주요 효능</p>
          <FontAwesomeIcon icon={isOpenEfficiency ? faAngleUp : faAngleDown} className='text-xl' />
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(requests.fetchSupplementDetails + `?id=${context.query.id}`)
  const details = res.data.pill[0]

  return {
    props: {
      details,
    },
  }
}
