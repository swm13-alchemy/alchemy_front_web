import create from 'zustand'
import { persist } from 'zustand/middleware'
import { SupplementDetailsType } from '../utils/types'
import { pillListPersist, pillListState, userHealthPersist, userHealthState } from './storeTypes'

export const useUserPillListStore = create<pillListState>(
  // @ts-ignore
  (persist as pillListPersist)(
    (set) => ({
      userTakingPillList: [],
      setUserTakingPillList: (data: SupplementDetailsType[]) => {
        set((state) => ({...state, userTakingPillList: data}))
      },
      pillListVersion: null,
      addPillListVersion: () => {
        // version 값이 null이 아니면 기존 version 값에 +1
        set((state) => ({...state, pillListVersion: (state.pillListVersion !== null ? state.pillListVersion + 1 : null)}))
      }
    }),
    {
      name: 'userTakingPillList'
    }
  )
)

export const useUserHealthDataStore = create<userHealthState>(
  // @ts-ignore
  (persist as userHealthPersist)(
    (set) => ({
      age: null,
      setAge: (age: number) => {
        set((state) => ({...state, age: age}))
      },
      isMale: null,
      setIsMale: (isMale: boolean) => {
        set((state) => ({...state, isMale: isMale}))
      }
    }),
    {
      name: 'userHealthData'
    }
  )
)