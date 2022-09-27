import PillEditBtn from './PillEditBtn'
import { TimeTableDataType } from '../../../utils/types'
import { convert12hourTo24hour } from '../../../utils/functions/timeFormatFunc/convert12hourTo24hour'

interface Props {
  intakeTime: string
  timeTableDataList: TimeTableDataType[]
}

function EditScheduleBox({ intakeTime, timeTableDataList }: Props) {
  return (
    <div className='bg-white px-6 py-4'>
      {/* 알림 시간 */}
      <div className='flex items-center space-x-0.5'>
        <p className='text-2xl font-bold text-primary'>
          {convert12hourTo24hour(intakeTime).split(' ')[0]}
        </p>
        <p className='text-xs text-primary'>
          {convert12hourTo24hour(intakeTime).split(' ')[1]}
        </p>
      </div>
      {/* 영양제 목록 부분 */}
      <div className='mt-4 grid grid-cols-4 gap-x-5 gap-y-4 justify-center'>
        {timeTableDataList.map((timeTableData) =>
          <PillEditBtn
            key={timeTableData.pillId}
            pillId={timeTableData.pillId}
          />
        )}
        {/*<Link href={`/intake/edit-schedule/add/${time}`}>*/}
        {/*  <a className='bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center'>*/}
        {/*    <Add className='text-2xl text-white' />*/}
        {/*  </a>*/}
        {/*</Link>*/}
      </div>
    </div>
  )
}

export default EditScheduleBox