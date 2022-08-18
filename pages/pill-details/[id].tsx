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
import ContentGraph from '../../components/common/ContentGraph'
import EfficiencyTag from '../../components/tag/EfficiencyTag'
import {
  IngredientType,
  MergedNutrientDataType,
  SupplementDetailsType,
  UserIntakeNutrientType,
} from '../../utils/types'
import { useUserHealthDataStore, useUserPillListStore } from '../../stores/store'
import HeadNav from '../../components/layout/HeadNav'
import { pillApi, requestURLs } from '../../utils/api'
import { PlaylistAdd, DeleteForever } from '@mui/icons-material'
import { useRouter } from 'next/router'

interface Props {
  details: SupplementDetailsType
}

const Details = ({ details }: Props) => {
  const { id, name, dailyDose, intakeTiming, maker, ingredients } = details
  const router = useRouter()
  const { userTakingPillList, setUserTakingPillList } = useUserPillListStore()
  const { age, isMale } = useUserHealthDataStore()
  const [isLiked, setIsLiked] = useState<boolean>(false)
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
          const { data: { data: result} } = await pillApi.getTotalBalance(age, isMale, userTakingPillList.map(x => x.id))
          /**
           * TODO: 현재 백엔드 구현에서는 어쩔 수 없이 필요한 호출에 대한 코드
           * 추후 수정
           */
          setMergedNutrientData(mergeNutrientsData(result, ingredients))
        })()
      } else {  // 섭취중인 영양제인 경우
        (async () => {
          // 현재 페이지의 영양제 id를 제거하고 나머지 섭취중인 영양제들의 id 값들로 get 호출함.
          const { data: { data: result } } = await pillApi.getTotalBalance(age, isMale, userTakingPillList.filter(x => x.id !== id).map(x => x.id))
          setMergedNutrientData(mergeNutrientsData(result, ingredients))
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

  // 기존 섭취 영양분 대비 현재 페이지 영양제 영양분 확인을 위한 데이터 가공 함수
  const mergeNutrientsData = (intakeNutrients: UserIntakeNutrientType[], newNutrients: IngredientType[]): MergedNutrientDataType[] => {
    const mergedData: MergedNutrientDataType[] = []
    for (const ingredient of newNutrients) {
      let isIntake: boolean = false
      for (const intakeNutrient of intakeNutrients) {
        if (ingredient.nutrient.name === intakeNutrient.name) {
          mergedData.push({
            name: intakeNutrient.name,
            intakeContent: intakeNutrient.content,
            newContent: ingredient.content,
            reqMin: intakeNutrient.reqMin,
            reqAvg: intakeNutrient.reqAvg,
            reqLimit: intakeNutrient.reqLimit,
            unit: intakeNutrient.unit
          })
          isIntake = true
          break
        }
      }
      // 해당 영양분을 기존에 섭취하지 않고 있는 경우
      if (!isIntake) {
        /**
         * TODO: 이 부분 명세 나오는 거 봐서 처리해야 함.
         */
        // mergedData.push({
        //   name: ingredient.nutrient.name,
        //   intakeContent: null,
        //   newContent: ingredient.content,
        //   reqMin: null,
        //   reqAvg: null,
        //   reqLimit: null,
        //   unit: ingredient.unit
        // })
      }
    }

    return mergedData
  }

  return (
    <div>
      <HeadNav router={router} name={name} />
      <main className='flex flex-col items-center w-full bg-white px-8 py-8'>
        <div className='relative w-52 h-52 rounded-3xl border-[#BABABA] border overflow-hidden'>
          <Image
            src={requestURLs.getSupplementThumbnailURL(id.toString())}
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
            'w-full h-10 rounded-xl mt-5 text-white duration-500' +
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
  const { data: { pill: res } } = await pillApi.getSupplementDetails(context.query.id)
  const details = res[0]

  return {
    props: {
      details,
    },
  }
}
