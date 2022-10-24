import { NextPage } from 'next'
import { useUserInformationStore, useUserPillListStore } from '../../stores/store'
import BalanceSummary from '../../components/common/balance/BalanceSummary'
import IntakeReport from '../../components/common/balance/IntakeReport'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import Image from 'next/image'
import balanceIllust from '../../public/asset/image/balanceIllust.png'
import MuiCarousel from '../../components/common/MuiCarousel'
import MainHeader from '../../components/layout/MainHeader'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import Link from 'next/link'
import dayjs from 'dayjs'
import { convertEnDayToKoDay } from '../../utils/functions/timeFormatFunc/convertEnDayToKoDay'
import useUserNutrientsBalanceData from '../../hooks/useUserNutrientsBalanceData'
import { signIn } from 'next-auth/react'
import useUserIsTakeEssentialNutrients from '../../hooks/useUserIsTakeEssentialNutrients'
// import { BOTTOM_NAV_BAR_PADDING_TAILWINDCSS_VALUE } from '../../utils/constant/systemConstants'

const Balance: NextPage = () => {
  const userId = useUserInformationStore(state => state.userId)
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  // const pillListVersion = useUserPillListStore(state => state.pillListVersion)
  // const addPillListVersion = useUserPillListStore(state => state.addPillListVersion)

  // 섭취중인 영양분 데이터 가져오기 (커스텀 훅)
  const { totalIntakeNutrients, excessNutrients, properNutrients, minimumNutrients, lackNutrients, wellIntakePercent } = useUserNutrientsBalanceData()

  // 필수 영양분 14가지 잘 먹고 있는지 가져오기 (커스텀 훅)
  const { isTakeEssentialNutrients } = useUserIsTakeEssentialNutrients()

  // 로그인이 안되어 있는 경우 redirect
  if (!userId) {
    return (
      <ContainerWithBottomNav>
        <MainHeader />

        <div className={`absolute top-10 left-0 right-0 bottom-14 bg-white flex flex-col items-center justify-center space-y-4`}>
          <p className='text-lg text-gray-900 text-center'>3초만에 가입해서,<br/><strong className='text-primary'>권장량에 맞춰 잘 먹고 있는지 분석</strong>받기!</p>
          <button
            className='w-11/12 bg-primary text-gray-50 shadow-md py-3 rounded-[0.625rem]'
            onClick={() => signIn()}
          >
            로그인 or 회원가입 하기
          </button>
        </div>
      </ContainerWithBottomNav>
    )
  }

  // 등록된 영양제가 없는 경우 보여지는 화면
  if (!arrayIsNotEmpty(userTakingPillList)) {
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