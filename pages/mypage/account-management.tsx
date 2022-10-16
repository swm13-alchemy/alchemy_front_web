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
import MuiDialog from '../../components/common/MuiDialog'
import { userApi } from '../../utils/api'

const AccountManagement = () => {
  const router = useRouter()
  const { userId, setUserId, setOauthId } = useUserInformationStore()
  const { setAge, setIsMale } = useUserHealthDataStore()
  const { setUserTakingPillList } = useUserPillListStore()
  const { setIntakePillList, setIntakeServiceStartDate } = useUserIntakeManagementStore()
  const [isDeleteAccountSuccess, setIsDeleteAccountSuccess] = useState<boolean>(false)
  const [snackBarText, setSnackBarText] = useState<string>('')
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)


  const logOut = () => {
    setSnackBarText('로그아웃이 완료되었습니다!')

    setUserId(null)
    setOauthId(null)
    setUserTakingPillList([])
    setAge(null)
    setIsMale(null)
    setIntakePillList([])
    setIntakeServiceStartDate(null)

    setIsSnackBarOpen(true)
    setTimeout(() => window.location.replace('/initial'), 1500)
  }

  const deleteAccount = async () => {
    if (userId) {
      setSnackBarText('탈퇴가 완료되었습니다. 더 노력하는 비힐러가 되겠습니다 😥')
      await userApi.deleteUserAccount(userId)
        .then(() => {
          setUserId(null)
          setOauthId(null)
          setUserTakingPillList([])
          setAge(null)
          setIsMale(null)
          setIntakePillList([])
          setIntakeServiceStartDate(null)

          setIsSnackBarOpen(true)
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
          onClick={logOut}
        >
          <p className='text-sm'>로그아웃</p>
          <ChevronRight className='text-2xl' />
        </button>
        <button
          className='w-full py-3 flex items-center justify-between text-gray-900'
          onClick={deleteAccount}
        >
          <p className='text-sm'>계정 탈퇴</p>
          <ChevronRight className='text-2xl' />
        </button>
      </div>

      {/* 탈퇴 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        dialogTitle='회원 탈퇴'
        dialogContent='회원 탈퇴 시 회원 정보 및 복용 기록이 모두 삭제됩니다. 탈퇴하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deleteAccount}
        funcParameter={null}
      />

      <TopCenterSnackBar
        isSnackBarOpen={isSnackBarOpen}
        setIsSnackBarOpen={setIsSnackBarOpen}
        severity='success'
        content={snackBarText}
      />
    </ContainerWithBottomNav>
  )
}

export default AccountManagement