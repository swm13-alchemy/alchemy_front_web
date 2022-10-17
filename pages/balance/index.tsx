import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useUserInformationStore, useUserPillListStore } from '../../stores/store'
import { UserIntakeNutrientType } from '../../utils/types'
import { Essential14Nutrients, ESSENTIAL_NUTRIENTS_LIST, EssentialNutrientsTakeCheckType } from '../../utils/constants'
import BalanceSummary from '../../components/common/balance/BalanceSummary'
import IntakeReport from '../../components/common/balance/IntakeReport'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import Image from 'next/image'
import balanceIcon from '../../public/asset/image/balanceIcon.png'
import balanceIllust from '../../public/asset/image/balanceIllust.png'
import MuiCarousel from '../../components/common/MuiCarousel'
import MainHeader from '../../components/layout/MainHeader'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { convertEnDayToKoDay } from '../../utils/functions/timeFormatFunc/convertEnDayToKoDay'
import useUserNutrientsBalanceData from '../../hooks/useUserNutrientsBalanceData'

const Balance: NextPage = () => {
  const router = useRouter()
  const userId = useUserInformationStore(state => state.userId)
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  // const pillListVersion = useUserPillListStore(state => state.pillListVersion)
  // const addPillListVersion = useUserPillListStore(state => state.addPillListVersion)
  const [isTakeEssentialNutrients, setIsTakeEssentialNutrients] = useState<EssentialNutrientsTakeCheckType>({
    '비타민C': false,
    '비타민D': false,
    '비타민B1': false,
    '비타민B2': false,
    '나이아신(B3)': false,
    '판토텐산(B5)': false,
    '비타민B6': false,
    '비오틴': false,
    '엽산': false,
    '비타민B12': false,
    '오메가3(EPA+DHA)': false,
    '마그네슘': false,
    '칼슘': false,
    '프로바이오틱스(유산균)': false,
  })

  // 섭취중인 영양분 데이터 가져오기 (커스텀 훅)
  const { totalIntakeNutrients, excessNutrients, properNutrients, minimumNutrients, lackNutrients, wellIntakePercent } = useUserNutrientsBalanceData()

  // 필수 영양분 14가지 잘 먹고 있는지 보여주는 부분
  useEffect(() => {
    if (arrayIsNotEmpty(properNutrients) || arrayIsNotEmpty(minimumNutrients)) {
      ESSENTIAL_NUTRIENTS_LIST.forEach((essentialNutrient) => {
        // 해당 필수 영양분의 이름과 같은 이름의 영양분을 섭취하고 있는지 find 함수로 확인
        const essentialNutrientIntakeByUser: UserIntakeNutrientType | undefined = totalIntakeNutrients.find(x => x.name === essentialNutrient.name)
        // 필수 영양분에 해당하는 영양제를 섭취중이고 (not undefined)
        if (essentialNutrientIntakeByUser !== undefined &&  // 적정 또는 최소 기준량에 맞춰 섭취중이라면,
          (properNutrients.includes(essentialNutrientIntakeByUser) || minimumNutrients.includes(essentialNutrientIntakeByUser))) {
          // 해당 영양분 알약을 채우기 위해 true로 바꿈
          const tempIsTakeEssentialNutrients = {...isTakeEssentialNutrients}
          tempIsTakeEssentialNutrients[essentialNutrientIntakeByUser.name as Essential14Nutrients] = true
          setIsTakeEssentialNutrients(tempIsTakeEssentialNutrients)
        }
      })
    }
  }, [properNutrients, minimumNutrients])

  // 로그인이 안되어 있는 경우 redirect
  useEffect(() => {
    if (!userId) {
      router.push('/initial')
    }
  }, [userId])

  if (!arrayIsNotEmpty(userTakingPillList)) { // 등록된 영양제가 없는 경우 보여지는 화면
    return (
      <ContainerWithBottomNav>
        <MainHeader />

        <div className='bg-white w-full h-full flex flex-col items-center'>
          <div className='mt-[6.25rem] relative w-[18.75rem] h-[12.5rem]'>
            <Image
              src={balanceIllust}
              className='object-cover'
              layout='fill'
            />
          </div>
          <h1 className='mt-[1.5625rem] text-xl'>영양제 밸런스 분석 시작하기</h1>
          <p className='mt-[1.25rem] text-base'>섭취중인 영양제를 먼저 등록해주세요</p>
          <Link
            href='/search'
          >
            <a className='mt-[2.1875rem] w-11/12 h-10 bg-primary rounded-[0.625rem] text-base text-white flex items-center justify-center'>
              섭취중인 영양제 등록하러 가기
            </a>
          </Link>
        </div>
      </ContainerWithBottomNav>
    )
  }

  // 등록된 영양제가 있는 경우 보여지는 화면
  return (
    <ContainerWithBottomNav>
      {/*<BackHeader router={router} name='영양제 분석 리포트' />*/}
      <MainHeader />

      <div className='flex flex-col space-y-4'>
        {/* 머리 부분 */}
        <div className='w-full bg-white px-6 py-4 flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-sm text-gray-500'>{dayjs().format('YY.MM.DD')} ({convertEnDayToKoDay(dayjs().format('ddd'))})</p>
            <h1 className='text-lg font-bold text-gray-900'>영양제 분석 리포트 📋</h1>
          </div>
          {/* 원형 그래프 */}
          <div
            className='inline-block relative w-[3.25rem] h-[3.25rem] rounded-full flex items-center justify-center'
            style={{ background: `conic-gradient(#3B82F6 0% ${wellIntakePercent}%, #BFDBFE ${wellIntakePercent}% 100%)` }}
          >
            <span className='w-[2.375rem] h-[2.375rem] bg-white rounded-full flex items-center justify-center'>
              <p className='text-xs font-bold'>{wellIntakePercent}%</p>
            </span>
          </div>
          {/*<div className='relative w-[3.25rem] h-[3.25rem]'>*/}
          {/*  <Image*/}
          {/*    src={balanceIcon}*/}
          {/*    className='object-cover'*/}
          {/*    layout='fill'*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        {/* 요약 리포트 부분 */}
        <BalanceSummary
          intakeSupplementsCnt={arrayIsNotEmpty(userTakingPillList) ? userTakingPillList.length : 0}
          isTakeEssentialNutrients={isTakeEssentialNutrients}
        />

        {/* 배너 부분 */}
        <MuiCarousel whereToUse='balanceBanner' />

        {/* 필수 영양분 리포트 부분 */}
        {arrayIsNotEmpty(totalIntakeNutrients) &&
          <IntakeReport
            intakeNutrientData={totalIntakeNutrients}
            excessNutrients={excessNutrients}
            properNutrients={properNutrients}
            minimumNutrients={minimumNutrients}
            lackNutrients={lackNutrients}
          />
        }
      </div>
    </ContainerWithBottomNav>
  )
}

export default Balance

// SSR
// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await axios.get(requestURLs.fetchTotalBalance + `?age=`)
//   const details = res.data.pill[0]
//
//   return {
//     props: {
//       details,
//     },
//   }
// }