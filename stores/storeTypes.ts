import { SupplementDetailsType } from '../utils/types'
import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware'

// export const dummyStorageApi = {
//   getItem: () => null,
//   setItem: () => undefined,
// }

export type pillListState = {
  userTakingPillList: SupplementDetailsType[]
  setUserTakingPillList: (data: SupplementDetailsType[]) => void
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