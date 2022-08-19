import { GetServerSideProps } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faShareNodes,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ContentGraph from '../../components/common/pillDetails/ContentGraph'
import EfficiencyTag from '../../components/tag/EfficiencyTag'
import {
  IngredientWithIntakesType,
  MergedNutrientDataType,
  SupplementDetailsType
} from '../../utils/types'
import { useUserHealthDataStore, useUserPillListStore } from '../../stores/store'
import { pillApi, requestURLs } from '../../utils/api'
import { PlaylistAdd, DeleteForever, Star, StarBorder } from '@mui/icons-material'
import { useRouter } from 'next/router'
import PillDetailsHeader from '../../components/layout/PillDetailsHeader'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import { mergeNutrientsData } from '../../utils/functions/mergeNutrientsData'

interface Props {
  details: SupplementDetailsType
}

const Details = ({ details }: Props) => {
  const { id, name, dailyDose, information, intakeCount, intakeTiming, maker, ingredients } = details
  const router = useRouter()
  const { userTakingPillList, setUserTakingPillList } = useUserPillListStore()
  const { age, isMale } = useUserHealthDataStore()
  const [isWish, setIsWish] = useState<boolean>(false)
  const [isTaking, setIsTaking] = useState<boolean>(false)
  const [isOpenEfficiency, setIsOpenEfficiency] = useState<boolean>(false)
  const [mergedNutrientData, setMergedNutrientData] = useState<MergedNutrientDataType[]>([])

  // 최초 페이지 진입 시 한 번 실행 후 종료
  // 해당 페이지 영양제가 등록되어 있는지 확인하고 있으면 섭취중인 영양제로 표시
  useEffect(() => {
    // 만약 등록한 영양제가 있다면 if문 안의 내용 실행
    if (userTakingPillList.length !== 0) {
      // 객체 배열인 localTakingPillList에서 현재 페이지의 영양제의 id와 같은 객체 값이 있는지 find함수로 확인
      // 있다면 객체가 반환되고 없으면 undefined가 반환
      const matchOne: SupplementDetailsType | undefined = userTakingPillList.find(x => x.id === id)
      if (matchOne !== undefined) {
        setIsTaking(true)
      } else {  // 사실 굳이 필요없는 else이긴 함. 안정성을 위해 일단 추가
        setIsTaking(false)
      }
    }
  }, [])

  // 기존 섭취 영양분 대비 변화량 그래프 그리기 위한 데이터 처리 부분
  useEffect(() => {
    // 나이와 성별을 등록하고 섭취중인 영양제로 등록한 것이 있는 경우만 데이터를 받아옴
    if (age !== null && isMale !== null && userTakingPillList.length !== 0) {
      // 섭취중인 영양제가 아닌 경우
      if (!isTaking) {
        (async () => {
          // 섭취중인 영양제들의 id 값들로 get 호출함.
          const { data: { data: totalBalanceResult } } = await pillApi.getTotalBalance(age, isMale, userTakingPillList.map(x => x.id))
          /**
           * TODO: 현재 백엔드 구현에서는 어쩔 수 없이 필요한 호출에 대한 코드
           * 추후 수정
           */
          // 사용자의 나이와 성별을 가지고 권장량등의 기준을 포함한 영양제 상세 정보를 다시 불러옴
          const { data: { pill: thisPillBalanceResult } } = await pillApi.getSupplementDetailsWithBalance(age, isMale, id)
          const newIngredients: IngredientWithIntakesType[] = thisPillBalanceResult[0].ingredients
          setMergedNutrientData(mergeNutrientsData(totalBalanceResult, newIngredients))
        })()
      } else {  // 섭취중인 영양제인 경우
        (async () => {
          // 현재 페이지의 영양제 id를 제거하고 나머지 섭취중인 영양제들의 id 값들로 get 호출함.
          const { data: { data: result } } = await pillApi.getTotalBalance(age, isMale, userTakingPillList.filter(x => x.id !== id).map(x => x.id))
          /**
           * TODO: 현재 백엔드 구현에서는 어쩔 수 없이 필요한 호출에 대한 코드
           * 추후 수정
           */
          // 사용자의 나이와 성별을 가지고 권장량등의 기준을 포함한 영양제 상세 정보를 다시 불러옴
          const { data: { pill: thisPillBalanceResult } } = await pillApi.getSupplementDetailsWithBalance(age, isMale, id)
          const newIngredients: IngredientWithIntakesType[] = thisPillBalanceResult[0].ingredients
          setMergedNutrientData(mergeNutrientsData(result, newIngredients))
        })()
      }
    }
  }, [userTakingPillList])

  // 섭취중인 영양제 버튼 클릭 시
  const takingSubmit = (curIsTaking: boolean) => {
    // 현재 섭취중이 아니라면
    if (!curIsTaking) {
      // 기존 유저 섭취 영양제 리스트 배열에 현재 영양제 페이지의 영양제 객체 값 추가 (localStorage 에도 반영됨)
      setUserTakingPillList(userTakingPillList.concat(details))
      // 다 끝나면 섭취 체크
      setIsTaking(true)
    } else {  // 만약 섭취중이라면
      // userTakingPillList 배열에서 해당 값을 삭제하기
      const removedList: SupplementDetailsType[] = userTakingPillList.filter(x => x.id !== id)
      // 기존 유저 섭취 영양제 리스트 배열 업데이트하기 (localStorage 에도 반영됨)
      setUserTakingPillList(removedList)
      // 다 끝나면 섭취 해제 체크
      setIsTaking(false)
    }
  }

  return (
    <ContainerWithBottomNav headerHeight='pt-10'>
      <PillDetailsHeader router={router} pillName={name} />

      {/* 영양제 이미지 */}
      <div className='relative h-[13.25rem] bg-white'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(id.toString())}
          className='object-contain'
          layout='fill'
        />
      </div>

      {/* 메인 부분 */}
      <main className='p-6 bg-white space-y-4'>
        <div className='flex flex-col space-y-2'>
          <p className='text-xs text-gray-500'>{maker}</p>
          <p className='text-base text-gray-900'>{name}</p>
          {/* 리뷰 부분 (아직 개발 X) */}
          {/*<div className='flex items-center space-x-1'>*/}
          {/*  <Star className='text-base text-amber-400' />*/}
          {/*  <p className='text-xs font-bold text-gray-900'>4.7</p>*/}
          {/*  <p className='text-xs text-gray-900'>· 리뷰 152</p>*/}
          {/*</div>*/}
        </div>
        <div className='flex items-center space-x-2'>
          <button
            className={
              'py-2 rounded-[0.625rem] text-white duration-500 grow' +
              (isTaking ? ' bg-gray-300' : ' bg-primary')
            }
            onClick={() => takingSubmit(isTaking)}
          >
            {isTaking ? (
              <DeleteForever className='text-lg' />
            ) : (
              <PlaylistAdd className='text-lg' />
            )}
            <p className='text-center text-xs inline ml-2'>{isTaking ? '영양제 리스트 제거' : '영양제 리스트 추가'}</p>
          </button>
          <button
            className='p-3 rounded-[0.625rem] bg-surface flex items-center justify-center'
            onClick={() => setIsWish(!isWish)}
          >
            {isWish ? (
              <Star className='text-base text-primary' />
            ) : (
              <StarBorder className='text-base text-primary' />
            )}
          </button>
        </div>
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
    </ContainerWithBottomNav>
  )
}

export default Details

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: { pill: res } } = await pillApi.getSupplementDetails(context.query.id)
  const details = res[0]

  return {
    props: {
      details,
    },
  }
}
