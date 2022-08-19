// 기존 섭취 영양분 대비 현재 페이지 영양제 영양분 확인을 위한 데이터 가공 함수
import { IngredientWithIntakesType, MergedNutrientDataType, UserIntakeNutrientType } from '../types'

export const mergeNutrientsData = (intakeNutrients: UserIntakeNutrientType[], newIngredients: IngredientWithIntakesType[]): MergedNutrientDataType[] => {
  const mergedData: MergedNutrientDataType[] = []
  for (const newNutrient of newIngredients) {
    console.log("intakeNutrients : ", intakeNutrients, typeof intakeNutrients)
    let isIntake: boolean = false
    for (const intakeNutrient of intakeNutrients) {
      console.log("newNutrient : ", newNutrient.nutrient.name, typeof newNutrient.nutrient.name)
      console.log("intakeNutrient : ", intakeNutrient.name, typeof intakeNutrient.name)
      if (newNutrient.nutrient.name === intakeNutrient.name) {
        mergedData.push({
          name: intakeNutrient.name,
          intakeContent: intakeNutrient.content,
          newContent: newNutrient.content,
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
      mergedData.push({
        name: newNutrient.nutrient.name,
        intakeContent: 0,
        newContent: newNutrient.content,
        // TODO: 민준형한테 말해서 이거 intakes 배열형태로 안받아와지게 하기 (현재는 임시로 [0]사용)
        // @ts-ignore
        reqMin: newNutrient.nutrient.intakes[0].reqMin,
        // @ts-ignore
        reqAvg: newNutrient.nutrient.intakes[0].reqAvg,
        // @ts-ignore
        reqLimit: newNutrient.nutrient.intakes[0].reqLimit,
        unit: newNutrient.unit
      })
    }
  }

  console.log("mergedData : ", mergedData)
  return mergedData
}