// 기존 섭취 영양분 대비 현재 페이지 영양제 영양분 확인을 위한 데이터 가공 함수
import { IngredientWithIntakesType, MergedNutrientDataType, UserIntakeNutrientType } from '../types'

export const mergeNutrientsData = (intakeNutrients: UserIntakeNutrientType[], newIngredients: IngredientWithIntakesType[]): MergedNutrientDataType[] => {
  const mergedData: MergedNutrientDataType[] = []

  // 등록한 내 영양제 목록이 없는 경우
  if (!intakeNutrients) {
    newIngredients.forEach((newNutrient) => {
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
        reqMax: newNutrient.nutrient.intakes[0].reqMax,
        unit: newNutrient.unit
      })
    })
  } else {  // 이미 등록해 둔 내 영양제 목록이 있는 경우
    newIngredients.forEach((newNutrient) => {
      // console.log("intakeNutrients : ", intakeNutrients, typeof intakeNutrients)
      let isIntake: boolean = false // 들어온 newNutrient이 기존에 섭취중이던 영양분인지 확인하기 위한 변수
      // 이를 확인하기 위해 기존에 섭취중이던 영양분들을 돌면서 확인하기
      for (const intakeNutrient of intakeNutrients) {
        // console.log("newNutrient : ", newNutrient)
        // 새로 섭취하게 된 영양분과 같은 기존 섭취 영양분이 있는지를 확인하고, 있다면 이에 대한 데이터를 모아 mergedData 배열에 넣고 for문 탈출
        if (newNutrient.nutrient.name === intakeNutrient.name) {
          mergedData.push({
            name: intakeNutrient.name,
            intakeContent: intakeNutrient.content,
            newContent: newNutrient.content,
            reqMin: intakeNutrient.reqMin,
            reqAvg: intakeNutrient.reqAvg,
            reqMax: intakeNutrient.reqMax,
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
          reqMax: newNutrient.nutrient.intakes[0].reqMax,
          unit: newNutrient.unit
        })
      }
    })
  }

  // console.log("mergedData : ", mergedData)
  return mergedData
}