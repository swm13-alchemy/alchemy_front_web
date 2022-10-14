import ContainerWithBottomNav from '../../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import EditScheduleBox from '../../../components/common/intake/EditScheduleBox'
import Add from '@mui/icons-material/Add'
import Link from 'next/link'
import { useIntakeTimeTableByDate } from '../../../stores/nonLocalStorageStore'
import dayjs from 'dayjs'
import LoadingCircular from '../../../components/layout/LoadingCircular'
import { useUserIntakeManagementStore } from '../../../stores/store'
import PillListItem from '../../../components/common/PillListItem'

const EditSchedule = () => {
  const router = useRouter()
  // const todayDate: string = dayjs().format('YYYY-MM-DD')
  // const intakeTimeTableByDate = useIntakeTimeTableByDate(state => state.intakeTimeTableByDate)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)

  if (!intakePillList) return <LoadingCircular />

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 시간표 편집' />

      {/* 상단 + 새로운 복용 관리 영양제 추가 버튼 */}
      <div className='w-full flex items-center justify-between text-gray-900 px-6 py-4'>
        <h1 className='text-base'>복용 관리 영양제 목록</h1>
        <Link href={`/intake/edit-schedule/add`}>
          <a className='flex items-center justify-center'>
            <Add className='text-2xl' />
          </a>
        </Link>
      </div>

      {/* 복용 관리 영양제 목록 */}
      <div className='px-6 pb-5 flex flex-col space-y-2'>
        {intakePillList.map((intakePill) =>
          <PillListItem
            key={intakePill.pillId}
            id={intakePill.pillId}
            name={intakePill.pillNickName}
            maker={intakePill.pillMaker}
            prefixDomain='/intake/edit-schedule/edit'
          />
        )}

        {/*{intakeTimeTableByDate[todayDate] &&*/}
        {/*  Object.keys(intakeTimeTableByDate[todayDate].intakeHistory).sort().map((intakeTime) =>*/}
        {/*    <EditScheduleBox*/}
        {/*      key={intakeTime}*/}
        {/*      intakeTime={intakeTime}*/}
        {/*      timeTableDataList={intakeTimeTableByDate[todayDate].intakeHistory[intakeTime]}*/}
        {/*    />*/}
        {/*  )*/}
        {/*}*/}

        {/*<button*/}
        {/*  className='bg-white w-full py-4'*/}
        {/*  onClick={addNewSchedule}*/}
        {/*>*/}
        {/*  <div className='flex items-center space-x-2 text-primary justify-center'>*/}
        {/*    <Add className='text-2xl' />*/}
        {/*    <p className='text-base'>새로운 시간 추가하기</p>*/}
        {/*  </div>*/}
        {/*</button>*/}
      </div>
    </ContainerWithBottomNav>
  )
}

export default EditSchedule