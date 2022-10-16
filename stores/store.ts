import create from 'zustand'
import { persist } from 'zustand/middleware'
import { IntakeManagementType, SupplementDetailsType } from '../utils/types'
import {
  intakeManagementPersist,
  intakeManagementState,
  pillListPersist,
  pillListState,
  userHealthPersist,
  userHealthState, userInformationPersist, userInformationState,
} from './storeTypes'
import { Dayjs } from 'dayjs'

/** 유저아이디와 OAuth에서 받은 id를 저장하는 Store */
export const useUserInformationStore = create<userInformationState>(
  // @ts-ignore
  (persist as userInformationPersist)(
    (set) => ({
      userId: null,
      setUserId: (userId: string | null) => {
        set((state) => ({...state, userId: userId}))
      },
      oauthId: null,
      setOauthId: (oauthId: string | null) => {
        set((state) => ({...state, oauthId: oauthId}))
      },
      // wellIntakePercent: null,  // TODO: 메인 화면에 보여주기 위해 임시로 둔 값 추후 다른 방법 고민
      // setWellIntakePercent: (wellIntakePercent: number) => {
      //   set((state) => ({...state, wellIntakePercent: wellIntakePercent}))
      // }
    }),
    {
      name: 'userInformation'
    }
  )
)

/** 유저가 내 영양제로 등록한 리스트 Store */
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

// TODO: 나중엔 사라져야 할 것. 백엔드에서 처리해야 함
/** 유저의 나이와 성별을 관리하는 Store */
export const useUserHealthDataStore = create<userHealthState>(
  // @ts-ignore
  (persist as userHealthPersist)(
    (set) => ({
      age: null,
      setAge: (age: number | null) => {
        set((state) => ({...state, age: age}))
      },
      isMale: null,
      setIsMale: (isMale: boolean | null) => {
        set((state) => ({...state, isMale: isMale}))
      }
    }),
    {
      name: 'userHealthData'
    }
  )
)

/** 유저의 복용 관리 정보들을 담고 있는 Store */
export const useUserIntakeManagementStore = create<intakeManagementState>(
  // @ts-ignore
  (persist as intakeManagementPersist)(
    (set) => ({
      intakeServiceStartDate: null,
      setIntakeServiceStartDate: (intakeServiceDate: Dayjs | null) => {
        set((state) => ({...state, intakeServiceStartDate: intakeServiceDate}))
      },
      intakePillList: [],
      setIntakePillList: (intakePillList: IntakeManagementType[]) => {
        set((state) => ({...state, intakePillList: intakePillList}))
      }
    }),
    {
      name: 'userIntakeManagement'
    }
  )
)