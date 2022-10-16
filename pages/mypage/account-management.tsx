import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import ChevronRight from '@mui/icons-material/ChevronRight'
import {
  useUserHealthDataStore,
  useUserInformationStore,
  useUserIntakeManagementStore,
  useUserPillListStore,
} from '../../stores/store'
import TopCenterSnackBar from '../../components/common/TopCenterSnackBar'
import { useState } from 'react'
import { userApi } from '../../utils/api'
import { MuiDialog } from '../../components/common/MuiDialog'

const AccountManagement = () => {
  const router = useRouter()
  const { userId, setUserId, setOauthId } = useUserInformationStore()
  const { setAge, setIsMale } = useUserHealthDataStore()
  const { setUserTakingPillList } = useUserPillListStore()
  const { setIntakePillList, setIntakeServiceStartDate } = useUserIntakeManagementStore()

  const [isLogOutDialogOpen, setIsLogOutDialogOpen] = useState<boolean>(false)
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState<boolean>(false)
  const [isLogOutSuccess, setIsLogOutSuccess] = useState<boolean>(false)
  const [isDeleteAccountSuccess, setIsDeleteAccountSuccess] = useState<boolean>(false)


  const logOut = () => {
    setUserId(null)
    setOauthId(null)
    setUserTakingPillList([])
    setAge(null)
    setIsMale(null)
    setIntakePillList([])
    setIntakeServiceStartDate(null)

    setIsLogOutSuccess(true)
    setTimeout(() => window.location.replace('/initial'), 1500)
  }

  const deleteAccount = async () => {
    if (userId) {
      await userApi.deleteUserAccount(userId)
        .then(() => {
          setUserId(null)
          setOauthId(null)
          setUserTakingPillList([])
          setAge(null)
          setIsMale(null)
          setIntakePillList([])
          setIntakeServiceStartDate(null)

          setIsDeleteAccountSuccess(true)
          setTimeout(() => window.location.replace('/initial'), 1500)
        })
        .catch((error) => alert(`오류 : ${error}. 개발자에게 문의해주세요`))
    }
  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='계정 관리' />
      
      <div className='bg-white px-6 py-4 space-y-4'>
        <button
          className='w-full py-3 flex items-center justify-between text-gray-900'
          onClick={() => setIsLogOutDialogOpen(true)}
        >
          <p className='text-sm'>로그아웃</p>
          <ChevronRight className='text-2xl' />
        </button>
        <button
          className='w-full py-3 flex items-center justify-between text-gray-900'
          onClick={() => setIsDeleteAccountDialogOpen(true)}
        >
          <p className='text-sm'>계정 탈퇴</p>
          <ChevronRight className='text-2xl' />
        </button>
      </div>

      {/* 로그아웃 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isLogOutDialogOpen}
        setIsDialogOpen={setIsLogOutDialogOpen}
        dialogTitle='로그아웃'
        dialogContent='로그아웃 시 내 영양제 목록 및 복용 관리 목록이 초기화됩니다.(복용 기록은 유지됩니다) 로그아웃하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={logOut}
      />

      {/* 탈퇴 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDeleteAccountDialogOpen}
        setIsDialogOpen={setIsDeleteAccountDialogOpen}
        dialogTitle='회원 탈퇴'
        dialogContent='회원 탈퇴 시 회원 정보 및 복용 기록이 모두 삭제됩니다. 탈퇴하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deleteAccount}
      />

      {/* 로그아웃 성공 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isLogOutSuccess}
        setIsSnackBarOpen={setIsLogOutSuccess}
        severity='success'
        content='로그아웃이 완료되었습니다!'
      />

      {/* 탈퇴 성공 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isDeleteAccountSuccess}
        setIsSnackBarOpen={setIsDeleteAccountSuccess}
        severity='success'
        content='탈퇴가 완료되었습니다. 더 노력하는 비힐러가 되겠습니다 😥'
      />
    </ContainerWithBottomNav>
  )
}

export default AccountManagement