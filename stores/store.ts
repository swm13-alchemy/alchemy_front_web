import create from 'zustand'
import { persist } from 'zustand/middleware'
import { SupplementDetailsType } from '../utils/types'
import { pillListPersist, pillListState } from './storeTypes'

export const useUserPillListStore = create<pillListState>(
  // @ts-ignore
  (persist as pillListPersist)(
    (set) => ({
      userTakingPillList: [],
      setUserTakingPillList: (data: SupplementDetailsType[]) => {
        set((state) => ({...state, userTakingPillList: data}))
      }
    }),
    {
      name: 'userTakingPillList'
    }
  )
)