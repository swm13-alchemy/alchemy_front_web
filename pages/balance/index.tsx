import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useUserHealthDataStore, useUserPillListStore } from '../../stores/store'
import { pillApi } from '../../utils/api'
import { UserIntakeNutrientType } from '../../utils/types'
import { ESSENTIAL_NUTRIENTS_LIST } from '../../utils/constants'
import HeadNav from '../../components/layout/HeadNav'
import { useRouter } from 'next/router'
import BalanceSummary from '../../components/common/balance/BalanceSummary'
import IntakeReport from '../../components/common/balance/IntakeReport'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import Image from 'next/image'
import balanceIcon from '../../public/asset/image/balanceIcon.png'
import MuiCarousel from '../../components/common/MuiCarousel'

const Index: NextPage = () => {
  const router = useRouter()
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  const { age, isMale } = useUserHealthDataStore()
  const [intakeNutrientData, setIntakeNutrientData] = useState<UserIntakeNutrientType[]>([])
  const [excessNutrients, setExcessNutrients] = useState<UserIntakeNutrientType[]>([])
  const [properNutrients, setProperNutrients] = useState<UserIntakeNutrientType[]>([])
  const [minimumNutrients, setMinimumNutrients] = useState<UserIntakeNutrientType[]>([])
  const [lackNutrients, setLackNutrients] = useState<UserIntakeNutrientType[]>([])
  const [essentialNutrients, setEssentialNutrients] = useState()

  // 섭취중인 영양분 데이터 가져오기
  useEffect(() => {
    if (age !== null && isMale !== null) {
      (async () => {
        // 현재 섭취중인 영양분 데이터 불러와 저장하기
        const { data: { data: result } } = await pillApi.getTotalBalance(age, isMale, userTakingPillList.map(x => x.id))
        setIntakeNutrientData(result)

        // 초과, 최적, 최소, 부족 영양분 분류하여 저장하기
        const excessNutrientsList: UserIntakeNutrientType[] = []
        const properNutrientsList: UserIntakeNutrientType[] = []
        const minimumNutrientsList: UserIntakeNutrientType[] = []
        const lackNutrientsList: UserIntakeNutrientType[] = []
        for (const nutrient of result) {
          if (nutrient.content > nutrient.reqLimit) {
            excessNutrientsList.push(nutrient)
          } else if (nutrient.reqAvg <= nutrient.content && nutrient.content <= nutrient.reqLimit) {
            properNutrientsList.push(nutrient)
          } else if (nutrient.reqMin <= nutrient.content && nutrient.content < nutrient.reqAvg) {
            minimumNutrientsList.push(nutrient)
          } else {
            lackNutrientsList.push(nutrient)
          }
        }
        setExcessNutrients(excessNutrientsList)
        setProperNutrients(properNutrientsList)
        setMinimumNutrients(minimumNutrientsList)
        setLackNutrients(lackNutrientsList)
      })()
    }
  }, [userTakingPillList])

  //
  useEffect(() => {
    ESSENTIAL_NUTRIENTS_LIST.map((essentialNutrient) => {

    })
  })

  return (
    <ContainerWithBottomNav>
      <HeadNav router={router} name='영양제 분석 리포트' />

      <div className='flex flex-col space-y-4'>
        {/* 머리 부분 */}
        <div className='w-full bg-white px-6 py-4 flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-sm text-gray-500'>22.08.10 (수)</p>
            <h1 className='text-lg font-bold text-gray-900'>영양제 분석 리포트 💊</h1>
          </div>
          <div className='relative w-[3.25rem] h-[3.25rem]'>
            <Image
              src={balanceIcon}
              className='object-cover'
              layout='fill'
            />
          </div>
        </div>

        <MuiCarousel whereToUse='balanceBanner' />

        {/* 요약 리포트 부분 */}
        <BalanceSummary />

        {/* 필수 영양분 리포트 부분 */}
        <IntakeReport />
      </div>
    </ContainerWithBottomNav>
  )
}

export default Index

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