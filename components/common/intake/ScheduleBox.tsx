import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react'
import PillIntakeBtn from './PillIntakeBtn'
import { TimeTableDataType } from '../../../utils/types'
import { convert12hourTo24hour } from '../../../utils/functions/timeFormatFunc/convert12hourTo24hour'
import LoadingCircular from '../../layout/LoadingCircular'
import { useUserInformationStore } from '../../../stores/store'
import dayjs from 'dayjs'
import { intakeApi, PutIntakeHistoryType } from '../../../utils/api'
import { changeLocalStorageIntakeData } from '../../../utils/functions/changeLocalStorageIntakeData'
import { useIntakeTimeTableByDate } from '../../../stores/nonLocalStorageStore'

interface Props {
  selectedDate: string
  intakeTime: string
  timeTableDataList: TimeTableDataType[]
}

function ScheduleBox({ selectedDate, intakeTime, timeTableDataList }: Props) {
  const userId = useUserInformationStore(state => state.userId)
  const [isAllCheckBtnOn, setIsAllCheckBtnOn] = useState<boolean>(false)
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true)
  const { intakeTimeTableByDate, setIntakeTimeTableByDate } = useIntakeTimeTableByDate()

  // 전체 복용 버튼을 보여줄건지 안보여줄건지 결정하는 부분 (하나라도 체크했으면 안보여줌)
  useEffect(() => {
    const findResult: number = timeTableDataList.findIndex(x => x.isIntake === true)
    if (findResult === -1) {
      setIsAllCheckBtnOn(true)
    } else {
      setIsAllCheckBtnOn(false)
    }
  }, [timeTableDataList])

  /** 전체 복용 기록 남기는 함수 */
  const checkAll = () => {
    if (userId && intakeTimeTableByDate) {
      const todayDateStr = dayjs().format('YYYY-MM-DD')
      const tempPutHistoryJSONList: PutIntakeHistoryType[] = []
      timeTableDataList.forEach((timeTableData) => {
        tempPutHistoryJSONList.push({
          userId: userId,
          pillId: timeTableData.pillId,
          intakeDate: todayDateStr,
          intakeTime: intakeTime,
          isTake: true
        })
      })

      ;(async () => {
        await intakeApi.putIntakeHistory(tempPutHistoryJSONList)
          .then(() =>
            changeLocalStorageIntakeData( // 로컬 스토리지 값 수정
              true,
              todayDateStr,
              intakeTime,
              intakeTimeTableByDate,
              setIntakeTimeTableByDate
            )
          )
      })()
    }
  }

  if (!timeTableDataList) return <LoadingCircular />

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
            className={'text-xs' +
              (isSwitchOn ? ' text-primary' : ' text-gray-300')}
          >
            {convert12hourTo24hour(intakeTime).split(' ')[1]}
          </p>
        </div>
        <div className='flex items-center space-x-6'>
          {/* 전체 복용 버튼 */}
          {isAllCheckBtnOn && isSwitchOn &&
            <button
              className='px-2 py-1 text-xs text-primary rounded bg-gray-100'
              onClick={checkAll}
            >
              전체 복용
            </button>
          }
          {/* TODO: 나중에 알림 ON/OFF 토글도 구현 */}
          {/*/!* 알림 전체 ON/OFF 토글 *!/*/}
          {/*<Switch*/}
          {/*  checked={isSwitchOn}*/}
          {/*  onChange={(e) => setIsSwitchOn(e.target.checked)}*/}
          {/*/>*/}
        </div>
      </div>
      {/* 영양제 목록 부분 */}
      {isSwitchOn &&
        <div className='mt-4 grid grid-cols-4 gap-x-5 gap-y-4 justify-center'>
          {timeTableDataList.map((timeTableData) =>
            <PillIntakeBtn
              key={timeTableData.pillId}
              pillId={timeTableData.pillId}
              selectedDate={selectedDate}
              intakeTime={intakeTime}
              isPillIntake={timeTableData.isIntake}
            />
          )}
        </div>
      }
    </div>
  )
}

export default ScheduleBox