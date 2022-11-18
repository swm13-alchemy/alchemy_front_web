import { Dayjs } from 'dayjs'

export interface SearchResultsItemType {
  id: number
  name: string
  // imageUrl: string | null
  maker: string
}

export interface NutrientType {
  name: string
  tips: string
  efficacy: string[]
}

export interface IngredientType {
  content: number
  unit: string
  nutrient: NutrientType  // {name: string
                          //  tips: string
                          //  efficacy: string}
}

export interface SupplementDetailsType {
  id: number
  name: string
  dailyDose: string
  // imageUrl: string | null
  information: string
  intakeCount: string
  intakeTimings: string[]
  maker: string
  ingredients: IngredientType[]
}

export interface UserIntakeNutrientType {
  name: string
  content: number
  reqMin: number
  reqAvg: number
  reqMax: number
  unit: string
  tips: string[]
  efficacy: string[]
}

export interface IntakeType {
  reqMin: number
  reqAvg: number
  reqMax: number
}

export interface MergedNutrientDataType extends IntakeType {
  // reqMin: number
  // reqAvg: number
  // reqMax: number
  name: string
  intakeContent: number
  newContent: number
  unit: string
}

export interface NutrientWithIntakesType extends NutrientType {
  // name: string
  // tips: string
  // efficacy: string
  intakes: IntakeType // {reqMin: number
                      //  reqAvg: number
                      //  reqMax: number}
}

export interface IngredientWithIntakesType extends IngredientType {
  // content: number
  // unit: string
  nutrients: NutrientWithIntakesType  // name: string
                                      // tips: string
                                      // efficacy: string
                                      // intakes: IntakeType // {reqMin: number
                                      //                     //  reqAvg: number
                                      //                     //  reqMax: number}
}

export type Days = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
export interface IntakeManagementType {
  pillId: number
  pillMaker: string
  pillName: string
  pillNickName: string
  intakeDays: Days[]
  intakeNumber: number
  intakeTimesDayjs: Dayjs[]
  intakeAmount: number
  startIntakeDate: Dayjs
}

export interface TimeTableDataType {
  pillId: number
  isIntake: boolean
}

export interface TimeTableByTimeType {
  [time: string]: TimeTableDataType[]
}

export type TimeTableByDayType = {
  [day in Days]: TimeTableByTimeType
}

export interface FinalTimeTableDataType {
  remainIntakePillCnt: number
  totalIntakePillCnt: number
  intakeHistory: TimeTableByTimeType
}

export interface TimeTableByDateType {
  [date: string]: FinalTimeTableDataType
}

// interface ServerSideIntakeHistoryDataType {
//   pillId: number
//   isIntake: boolean
//   intakeTime: string
// }
//
// export interface ServerSideIntakeHistoryByDateType {
//   [date: string]: ServerSideIntakeHistoryDataType[]
// }

export interface TopicType {
  id: number
  name: string
}
export interface UserInformationTypes { // TODO: 추후 수정사항 있으면 변경
  id: string
  oauthId: string
  nickname: string
  birth: string
  isMale: boolean
  email: string | null | undefined
  // refreshToken: string | null
  oauthRefreshToken: string | null
  topics: TopicType[]
}