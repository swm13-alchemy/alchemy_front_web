import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import BottomNavBar from '../components/layout/BottomNavBar'
import { useUserHealthDataStore, useUserPillListStore } from '../stores/store'
import { pillApi } from '../utils/api'
import { UserIntakeNutrientType } from '../utils/types'
import { ESSENTIAL_NUTRIENTS_LIST } from '../utils/constants'

const Balance: NextPage = () => {
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
    <div>
      <BottomNavBar />
    </div>
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