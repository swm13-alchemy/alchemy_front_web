import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { useUserInformation } from '../../stores/store'

const AccountManagement = () => {
  const router = useRouter()
  const { setUserId, setOauthId } = useUserInformation()

  const logOut = () => {
    setUserId(null)
    setOauthId(null)
    window.location.replace('/initial')
  }

  const deleteAccount = () => {

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
    </ContainerWithBottomNav>
  )
}

export default AccountManagement