import { useEffect } from 'react'
import { pillApi } from '../utils/api'
import { UserIntakeNutrientType } from '../utils/types'
import { CompareContent } from '../utils/functions/CompareContent'
import { useUserHealthDataStore, useUserPillListStore } from '../stores/store'
import { useNutrientsBalanceData } from '../stores/nonLocalStorageStore'

/** 섭취중인 영양분 데이터 가져오기 (커스텀 훅) */
const useUserNutrientsBalanceData = () => {
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  const { age, isMale } = useUserHealthDataStore()
  const { totalIntakeNutrients,
    setTotalIntakeNutrients,
    excessNutrients,
    setExcessNutrients,
    properNutrients,
    setProperNutrients,
    minimumNutrients,
    setMinimumNutrients,
    lackNutrients,
    setLackNutrients,
    wellIntakePercent,
    setWellIntakePercent
  } = useNutrientsBalanceData()

  // 섭취중인 영양분 데이터 가져오기
  useEffect(() => {
    if (age !== null && isMale !== null) {
      (async () => {
        // 현재 섭취중인 영양제들 바탕으로 섭취중인 전체 영양분 데이터 불러와 저장하기
        const { data: { data: totalNutrients } } = await pillApi.getTotalBalance(age, isMale, userTakingPillList.map(x => x.id))
        setTotalIntakeNutrients(totalNutrients)

        // 초과, 최적, 최소, 부족 영양분 분류하여 저장하기
        const excessNutrientsList: UserIntakeNutrientType[] = []
        const properNutrientsList: UserIntakeNutrientType[] = []
        const minimumNutrientsList: UserIntakeNutrientType[] = []
        const lackNutrientsList: UserIntakeNutrientType[] = []
        for (const nutrient of totalNutrients) {
          // reqMin, reqAvg, reqMax 기준과 비교하는 클래스
          // 해당 클래스에 값을 넣고 클래스의 메서드를 사용해서 비교하면 됨.
          const compare = new CompareContent(nutrient.content, nutrient.reqMin, nutrient.reqAvg, nutrient.reqMax)
          if (compare.compareWithMax()) {
            excessNutrientsList.push(nutrient)
          } else if (compare.compareWithAvgAndMax()) {
            properNutrientsList.push(nutrient)
          } else if (compare.compareWithMinAndAvg()) {
            minimumNutrientsList.push(nutrient)
          } else {
            lackNutrientsList.push(nutrient)
          }
        }
        setExcessNutrients(excessNutrientsList)
        setProperNutrients(properNutrientsList)
        setMinimumNutrients(minimumNutrientsList)
        setLackNutrients(lackNutrientsList)

        setWellIntakePercent(parseInt(((minimumNutrientsList.length + properNutrientsList.length) / totalNutrients.length * 100).toString()))
      })()
    }
  }, [userTakingPillList, age, isMale])

  return { totalIntakeNutrients, excessNutrients, properNutrients, minimumNutrients, lackNutrients, wellIntakePercent }
}

export default useUserNutrientsBalanceData