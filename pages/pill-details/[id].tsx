import { GetServerSideProps } from 'next'
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
import {
  PlaylistAdd,
  DeleteForever,
  Star,
  StarBorder,
  ExpandMore,
  ExpandLess,
  InfoOutlined,
  Today, LocalDining, Filter1,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import PillDetailsHeader from '../../components/layout/PillDetailsHeader'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import { mergeNutrientsData } from '../../utils/functions/mergeNutrientsData'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'

interface Props {
  details: SupplementDetailsType
}

const 임시: MergedNutrientDataType[] = [
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminD',
    intakeContent: 100,
    newContent: 300,
    unit: 'mg',
    reqMin: 200,
    reqAvg: 500,
    reqLimit: 700
  },
  {
    name: 'Magnesium',
    intakeContent: 1200,
    newContent: 2800,
    unit: 'mg',
    reqMin: 200,
    reqAvg: 600,
    reqLimit: 1000
  },
  {
    name: 'Probiotics',
    intakeContent: 500,
    newContent: 500,
    unit: 'mg',
    reqMin: 400,
    reqAvg: 900,
    reqLimit: 1200
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  },
  {
    name: 'VitaminC',
    intakeContent: 0,
    newContent: 200,
    unit: 'mg',
    reqMin: 1500,
    reqAvg: 3000,
    reqLimit: 4000
  }
]

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
    if (arrayIsNotEmpty(userTakingPillList)) {
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
    if (age !== null && isMale !== null && arrayIsNotEmpty(userTakingPillList)) {
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
          const { data: { data: thisPillBalanceResult } } = await pillApi.getSupplementDetailsWithBalance(age, isMale, id)
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
          const { data: { data: thisPillBalanceResult } } = await pillApi.getSupplementDetailsWithBalance(age, isMale, id)
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
          priority={true}
        />
      </div>

      {/* 메인 부분(제조사, 영양제 이름, 추가 버튼 등) */}
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

      {/* 상세 정보 부분 */}
      <section className='mt-2 space-y-4'>
        {/* 효능 부분 */}
        <article className='bg-white p-6 text-gray-900'>
          {/* 주요 효능 부분 */}
          <p className='text-base font-bold'>주요 효능</p>
          <div className='mt-2 flex items-center flex-wrap gap-2'>
            <EfficiencyTag tagName='노화&항산화' />
            <EfficiencyTag tagName='면역 기능' />
            <EfficiencyTag tagName='혈액 생성' />
            <EfficiencyTag tagName='멀티미네랄' />
            <EfficiencyTag tagName='콜레스테롤 합성 조절' />
          </div>

          {/* 보조 효능 부분 */}
          <button
            className='mt-6 w-full flex items-center justify-between'
            onClick={() => setIsOpenEfficiency(!isOpenEfficiency)}
          >
            <p className='text-base font-bold'>보조 효능</p>
            {isOpenEfficiency ? (
              <ExpandLess className='text-2xl' />
            ) : (
              <ExpandMore className='text-2xl' />
            )}
          </button>
          <div className={'mt-2 flex items-center flex-wrap gap-2' + (isOpenEfficiency ? ' visible' : ' hidden')}>
            <EfficiencyTag tagName='노화&항산화' />
            <EfficiencyTag tagName='면역 기능' />
            <EfficiencyTag tagName='혈액 생성' />
            <EfficiencyTag tagName='멀티미네랄' />
            <EfficiencyTag tagName='콜레스테롤 합성 조절' />
          </div>
        </article>

        {/*/!* 변화량 그래프 부분 *!/*/}
        {/*{arrayIsNotEmpty(mergedNutrientData) &&*/}
        {/*  <article className='bg-white p-6 text-gray-900'>*/}
        {/*    <span className='text-xs text-gray-500'>현재 영양분 섭취량 기준</span>*/}
        {/*    <InfoOutlined className='text-base text-gray-400 ml-1' />*/}
        {/*    <p className='text-base font-bold mb-6'>한눈에 보는 <strong className='text-primary'>예상 변화량 그래프</strong></p>*/}

        {/*    /!* 그래프 부분 *!/*/}
        {/*    <ContentGraph mergedNutrientData={mergedNutrientData} />*/}
        {/*  </article>*/}
        {/*}*/}
        {/* 변화량 그래프 부분 */}
        {arrayIsNotEmpty(임시) &&
          <article className='bg-white p-6 text-gray-900'>
            <span className='text-xs text-gray-500'>현재 영양분 섭취량 기준</span>
            <InfoOutlined className='text-base text-gray-400 ml-1' />
            <p className='text-base font-bold mb-6'>한눈에 보는 <strong className='text-primary'>예상 변화량 그래프</strong></p>

            {/* 그래프 부분 */}
            <ContentGraph mergedNutrientData={임시} />
          </article>
        }

        {/* 추천 섭취 방법 부분 */}
        <article className='bg-white p-6'>
          <p className='text-base font-bold text-gray-900'>추천 섭취 방법</p>
          <div className='mt-2 grid grid-cols-2 gap-y-2'>
            {/* 일일 복용 횟수 */}
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-[1.25rem] bg-surface flex items-center justify-center'>
                <Today className='text-2xl text-primary' />
              </div>
              <p className='ml-2 text-sm font-bold text-primary'>1일 {dailyDose}회</p>
            </div>
            {/* 1회 복용량 */}
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-[1.25rem] bg-surface flex items-center justify-center'>
                <Filter1 className='text-2xl text-primary' />
              </div>
              <p className='ml-2 text-sm font-bold text-primary'>1회 {intakeCount}정</p>
            </div>
            {/* 먹는 시간 */}
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-[1.25rem] bg-surface flex items-center justify-center'>
                <LocalDining className='text-2xl text-primary' />
              </div>
              <p className='ml-2 text-sm font-bold text-primary'>{intakeTiming}</p>
            </div>
          </div>
        </article>
      </section>
    </ContainerWithBottomNav>
  )
}

export default Details

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: { data: res } } = await pillApi.getSupplementDetails(context.query.id)
  const details = res[0]

  return {
    props: {
      details,
    },
  }
}
