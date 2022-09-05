export interface SearchResultsItemType {
  id: number
  name: string
  // imageUrl: string | null
  information: string
  maker: string
}

export interface NutrientType {
  name: string
  tips: string
  efficacy: string
}

export interface IngredientType {
  content: number
  unit: string
  nutrient: NutrientType
}

export interface SupplementDetailsType {
  id: number
  name: string
  dailyDose: number
  // imageUrl: string | null
  information: string
  intakeCount: number
  intakeTiming: string
  maker: string
  ingredients: IngredientType[]
}

export interface UserIntakeNutrientType {
  name: string
  content: number
  reqMin: number
  reqAvg: number
  reqLimit: number
  unit: string
  tips: string[]
  efficacy: string[]
}

export interface IntakeType {
  reqMin: number
  reqAvg: number
  reqLimit: number
}

export interface MergedNutrientDataType extends IntakeType {
  name: string
  intakeContent: number
  newContent: number
  unit: string
}

export interface NutrientWithIntakesType extends NutrientType {
  intakes: IntakeType
}

export interface IngredientWithIntakesType extends IngredientType {
  nutrients: NutrientWithIntakesType
}