import create from 'zustand'
import { TimeTableByDateType } from '../utils/types'

interface IntakeTimeTableByDateState {
  intakeTimeTableByDate: TimeTableByDateType | null
  setIntakeTimeTableByDate: (intakeTimeTableByDate: TimeTableByDateType) => void
}

export const useIntakeTimeTableByDate = create<IntakeTimeTableByDateState>((set) => ({
  intakeTimeTableByDate: null,
  setIntakeTimeTableByDate: (data: TimeTableByDateType) => {
    set((state) => ({ ...state, intakeTimeTableByDate: data }))
  }
}))