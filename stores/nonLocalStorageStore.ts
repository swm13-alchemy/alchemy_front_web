import create from 'zustand'
import { SearchResultsItemType, TimeTableByDateType, UserIntakeNutrientType } from '../utils/types'

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

interface TempSearchResultsState {
  prevSearchTerm: string | null
  setPrevSearchTerm: (prevSearchTerm: string) => void
  tempSearchResults: SearchResultsItemType[]
  setTempSearchResults: (tempSearchResults: SearchResultsItemType[]) => void
}
/** 영양제 검색 결과 임시 보관소 */
export const useTempSearchResults = create<TempSearchResultsState>((set) => ({
  prevSearchTerm: null,
  setPrevSearchTerm: (searchTerm: string) => {
    set((state) => ({ ...state, prevSearchTerm: searchTerm }))
  },
  tempSearchResults: [],
  setTempSearchResults: (results: SearchResultsItemType[]) => {
    set((state) => ({ ...state, tempSearchResults: results }))
  }
}))