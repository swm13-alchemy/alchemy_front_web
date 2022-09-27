import Switch from '@mui/material/Switch'
import { useState } from 'react'
import PillIntakeBtn from './PillIntakeBtn'
import { TimeTableDataType } from '../../../utils/types'
import { convert12hourTo24hour } from '../../../utils/functions/timeFormatFunc/convert12hourTo24hour'
import LoadingCircular from '../../layout/LoadingCircular'

interface Props {
  intakeTime: string
  timeTableDataList: TimeTableDataType[]
}

function ScheduleBox({ intakeTime, timeTableDataList }: Props) {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true)

  const checkAll = () => {

  }

  if (!timeTableDataList) return (
    <LoadingCircular />
  )

  return (
    <div className='bg-white px-6 py-4'>
      {/* 영양제 시간표 박스 상단 부분 */}
      <div className='flex items-center justify-between'>
        {/* 알림 시간 */}
        <div className='flex items-center space-x-0.5'>
          <p
            className={'text-2xl font-bold' +
              (isSwitchOn ? ' text-primary' : ' text-gray-300')}
          >
            {convert12hourTo24hour(intakeTime).split(' ')[0]}
          </p>
          <p
            className={'text-xs' + (isSwitchOn ? ' text-primary' : ' text-gray-300')}
          >
            {convert12hourTo24hour(intakeTime).split(' ')[1]}
          </p>
        </div>
        <div className='flex items-center space-x-6'>
          {/* 전체 복용 버튼 */}
          {isSwitchOn &&
            <button
              className='px-2 py-1 text-xs text-primary rounded bg-gray-100'
              onClick={checkAll}
            >
              전체 복용
            </button>
          }
          {/* 알림 전체 ON/OFF 토글 */}
          <Switch
            checked={isSwitchOn}
            onChange={(e) => setIsSwitchOn(e.target.checked)}
          />
        </div>
      </div>
      {/* 영양제 목록 부분 */}
      {isSwitchOn &&
        <div className='mt-4 grid grid-cols-4 gap-x-5 gap-y-4 justify-center'>
          {timeTableDataList.map((timeTableData) =>
            <PillIntakeBtn
              key={timeTableData.pillId}
              pillId={timeTableData.pillId}
              isPillIntake={timeTableData.isTake}
            />
          )}
        </div>
      }
    </div>
  )
}

export default ScheduleBox