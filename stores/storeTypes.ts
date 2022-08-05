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