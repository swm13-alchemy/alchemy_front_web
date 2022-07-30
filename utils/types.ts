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