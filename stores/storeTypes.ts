import { IntakeManagementType, SupplementDetailsType } from '../utils/types'
import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'

// export const dummyStorageApi = {
//   getItem: () => null,
//   setItem: () => undefined,
// }

export type pillListState = {
  userTakingPillList: SupplementDetailsType[]
  setUserTakingPillList: (data: SupplementDetailsType[]) => void
  pillListVersion: number | null
  addPillListVersion: () => void
}
export type pillListPersist = (
  config: StateCreator<pillListState>,
  options: PersistOptions<pillListState>
) => StateCreator<pillListState>

export type userHealthState = {
  age: number | null
  setAge: (age: number) => void
  isMale: boolean | null
  setIsMale: (isMale: boolean) => void
}
export type userHealthPersist = (
  config: StateCreator<userHealthState>,
  options: PersistOptions<userHealthState>
) => StateCreator<userHealthState>

export type intakeManagementState = {
  intakeServiceStartDate: Date | null,
  setIntakeServiceStartDate: (date: Date) => void
  intakePillList: IntakeManagementType[]
  setIntakePillList: (pillList: IntakeManagementType[]) => void
}
export type intakeManagementPersist = (
  config: StateCreator<intakeManagementState>,
  options: PersistOptions<intakeManagementState>
) => StateCreator<intakeManagementState>