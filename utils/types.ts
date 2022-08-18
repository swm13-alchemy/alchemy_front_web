export interface SearchResultsItemType {
  id: number
  name: string
  imageUrl: string | null
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
  imageUrl: string | null
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

export interface MergedNutrientDataType {
  name: string
  intakeContent: number | null
  newContent: number
  reqMin: number | null
  reqAvg: number | null
  reqLimit: number | null
  unit: string
}