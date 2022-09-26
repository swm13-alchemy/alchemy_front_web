import ContainerWithBottomNav from '../../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import EditScheduleBox from '../../../components/common/intake/EditScheduleBox'
import Add from '@mui/icons-material/Add'

const EditSchedule = () => {
  const router = useRouter()

  const addNewSchedule = () => {

  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 시간표 편집' />

      <div className='space-y-2 pb-5'>
        <EditScheduleBox time='09:00' />
        <EditScheduleBox time='09:00' />
        <EditScheduleBox time='09:00' />

        <button
          className='bg-white w-full py-4'
          onClick={addNewSchedule}
        >
          <div className='flex items-center space-x-2 text-primary justify-center'>
            <Add className='text-2xl' />
            <p className='text-base'>새로운 시간 추가하기</p>
          </div>
        </button>
      </div>
    </ContainerWithBottomNav>
  )
}

export default EditSchedule