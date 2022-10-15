import { IntakeManagementType, SupplementDetailsType } from '../utils/types'
import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'
import { Dayjs } from 'dayjs'

// export const dummyStorageApi = {
//   getItem: () => null,
//   setItem: () => undefined,
// }

export type userInformationState = {
  userId: string | null
  setUserId: (userId: string | null) => void
  oauthId: string | null
  setOauthId: (oauthId: string | null) => void
  // wellIntakePercent: number | null
  // setWellIntakePercent: (wellIntakePercent: number) => void
}
export type userInformationPersist = (
  config: StateCreator<userInformationState>,
  options: PersistOptions<userInformationState>
) => StateCreator<userInformationState>

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
  intakeServiceStartDate: Dayjs | null,
  setIntakeServiceStartDate: (date: Dayjs) => void
  intakePillList: IntakeManagementType[]
  setIntakePillList: (pillList: IntakeManagementType[]) => void
}
export type intakeManagementPersist = (
  config: StateCreator<intakeManagementState>,
  options: PersistOptions<intakeManagementState>
) => StateCreator<intakeManagementState>