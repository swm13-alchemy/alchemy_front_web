import { useEffect, useState } from 'react'
import {
  Essential14Nutrients,
  ESSENTIAL_NUTRIENTS_LIST,
  EssentialNutrientsTakeCheckType,
} from '../utils/constant/constants'
import { arrayIsNotEmpty } from '../utils/functions/arrayIsNotEmpty'
import { UserIntakeNutrientType } from '../utils/types'
import { useNutrientsBalanceData } from '../stores/nonLocalStorageStore'

const useUserIsTakeEssentialNutrients = () => {
  const { totalIntakeNutrients,
    properNutrients,
    minimumNutrients
  } = useNutrientsBalanceData()
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

  // 필수 영양분 14가지 잘 먹고 있는지 보여주는 부분
  useEffect(() => {
    if (arrayIsNotEmpty(properNutrients) || arrayIsNotEmpty(minimumNutrients)) {
      const tempIsTakeEssentialNutrients = {...isTakeEssentialNutrients}

      ESSENTIAL_NUTRIENTS_LIST.forEach((essentialNutrient) => {
        // 해당 필수 영양분의 이름과 같은 이름의 영양분을 섭취하고 있는지 find 함수로 확인
        const essentialNutrientIntakeByUser: UserIntakeNutrientType | undefined = totalIntakeNutrients.find(x => x.name === essentialNutrient.name)
        // 필수 영양분에 해당하는 영양제를 섭취중이고 (not undefined)
        if (essentialNutrientIntakeByUser !== undefined &&  // 적정 또는 최소 기준량에 맞춰 섭취중이라면,
          (properNutrients.includes(essentialNutrientIntakeByUser) || minimumNutrients.includes(essentialNutrientIntakeByUser))) {
          // 해당 영양분 알약을 채우기 위해 true로 바꿈
          tempIsTakeEssentialNutrients[essentialNutrientIntakeByUser.name as Essential14Nutrients] = true
        }
      })

      setIsTakeEssentialNutrients(tempIsTakeEssentialNutrients)
    }
  }, [properNutrients, minimumNutrients])

  return { isTakeEssentialNutrients }
}

export default useUserIsTakeEssentialNutrients