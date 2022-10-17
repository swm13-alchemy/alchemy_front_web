import create from 'zustand'
import { TimeTableByDateType, UserIntakeNutrientType } from '../utils/types'

interface NutrientsBalanceDataState {
  totalIntakeNutrients: UserIntakeNutrientType[]
  setTotalIntakeNutrients: (totalIntakeNutrients: UserIntakeNutrientType[]) => void
  excessNutrients: UserIntakeNutrientType[]
  setExcessNutrients: (excessNutrients: UserIntakeNutrientType[]) => void
  properNutrients: UserIntakeNutrientType[]
  setProperNutrients: (properNutrients: UserIntakeNutrientType[]) => void
  minimumNutrients: UserIntakeNutrientType[]
  setMinimumNutrients: (minimumNutrients: UserIntakeNutrientType[]) => void
  lackNutrients: UserIntakeNutrientType[]
  setLackNutrients: (lackNutrients: UserIntakeNutrientType[]) => void
  wellIntakePercent: number | null
  setWellIntakePercent: (wellIntakePercent: number) => void
}
/** 밸런스 분석 데이터 전역 상태 관리 */
export const useNutrientsBalanceData = create<NutrientsBalanceDataState>((set) => ({
  totalIntakeNutrients: [],
  setTotalIntakeNutrients: (data: UserIntakeNutrientType[]) => {
    set((state) => ({ ...state, totalIntakeNutrients: data }))
  },
  excessNutrients: [],
  setExcessNutrients: (data: UserIntakeNutrientType[]) => {
    set((state) => ({ ...state, excessNutrients: data }))
  },
  properNutrients: [],
  setProperNutrients: (data: UserIntakeNutrientType[]) => {
    set((state) => ({ ...state, properNutrients: data }))
  },
  minimumNutrients: [],
  setMinimumNutrients: (data: UserIntakeNutrientType[]) => {
    set((state) => ({ ...state, minimumNutrients: data }))
  },
  lackNutrients: [],
  setLackNutrients: (data: UserIntakeNutrientType[]) => {
    set((state) => ({ ...state, lackNutrients: data }))
  },
  wellIntakePercent: null,
  setWellIntakePercent: (percent: number) => {
    set((state) => ({ ...state, wellIntakePercent: percent }))
  },
}))


interface IntakeTimeTableByDateState {
  intakeTimeTableByDate: TimeTableByDateType | null
  setIntakeTimeTableByDate: (intakeTimeTableByDate: TimeTableByDateType) => void
}
/** 복용 관리 데이터 전역 상태 관리 */
export const useIntakeTimeTableByDate = create<IntakeTimeTableByDateState>((set) => ({
  intakeTimeTableByDate: null,
  setIntakeTimeTableByDate: (data: TimeTableByDateType) => {
    set((state) => ({ ...state, intakeTimeTableByDate: data }))
  }
}))