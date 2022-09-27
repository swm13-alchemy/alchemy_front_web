import { NextPage } from 'next'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import IntakeCalendar from '../../components/common/intakeCalendar/IntakeCalendar'
import MainHeader from '../../components/layout/MainHeader'
import ScheduleBox from '../../components/common/intake/ScheduleBox'
import Link from 'next/link'
import { useUserIntakeManagementStore } from '../../stores/store'
import { useEffect, useState } from 'react'
import {
  IntakeManagementType, ServerSideIntakeHistoryByDateType,
  TimeTableByDateType,
  TimeTableByDayType,
} from '../../utils/types'
import { makeIntakeTimeTableByDay } from '../../utils/functions/makeIntakeTimeTableByDay'
import { makeIntakeTimeTableByDate } from '../../utils/functions/makeIntakeTimeTableByDate'
import { intakeApi } from '../../utils/api'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import LoadingCircular from '../../components/layout/LoadingCircular'
import dayjs from 'dayjs'



const Intake: NextPage = () => {
  const intakeServiceStartDate = useUserIntakeManagementStore(state => state.intakeServiceStartDate)
  const setIntakeServiceStartDate = useUserIntakeManagementStore(state => state.setIntakeServiceStartDate)
  const intakePillList: IntakeManagementType[] = useUserIntakeManagementStore(state => state.intakePillList)
  const setIntakePillList = useUserIntakeManagementStore(state => state.setIntakePillList)
  const [intakeTimeTableByDate, setIntakeTimeTableByDate] = useState<TimeTableByDateType | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'))  // 오늘 날짜로 초기 설정

  useEffect(() => {
    // 복용 관리 중인 영양제들 리스트를 활용해 '요일' 기준으로 요일 기준 영양제 시간표 데이터를 만듦
    const timeTableByDay: TimeTableByDayType = makeIntakeTimeTableByDay(intakePillList)

    // 위에서 만든 요일 기준 영양제 시간표 데이터를 활용하여 '영양제 시간표 틀 데이터'를 만듦
    const temporaryIntakeTimeTableByDate: TimeTableByDateType = makeIntakeTimeTableByDate(timeTableByDay)

    console.log(temporaryIntakeTimeTableByDate)
    setIntakeTimeTableByDate(temporaryIntakeTimeTableByDate)

    async function checkIntake(temporaryIntakeTimeTableByDate: TimeTableByDateType, setIntakeTimeTableByDate: (data: TimeTableByDateType) => void) {
      const { data: { intake: result } } = await intakeApi.getIntakeHistory('kbw1018', 2022, 9)
      const intakeHistoryByDate: TimeTableByDateType = result[0]

      // 서버에서 받아온 복용 기록 객체가 비어있지 않다면,
      if (!!intakeHistoryByDate && arrayIsNotEmpty(Object.keys(intakeHistoryByDate))) {
        // 복용 기록 객체의 key값을 순회
        Object.keys(intakeHistoryByDate).forEach((date: string) => {
          // 서버에서 받은 복용 기록을 같은 날짜에 넣음
          temporaryIntakeTimeTableByDate[date] = intakeHistoryByDate[date]
          // // 서버에서 받아온 복용 기록 객체 중 한 날짜 key값 안에 있는 복용 기록들을 순회
          // intakeHistoryByDate[date].forEach((intakeHistory) => {
          //   // 만약 해당 복용 기록이 '섭취했다'(isIntake === true)라면
          //   if (intakeHistory.isIntake) {
          //     // 영양제 시간표 틀 데이터에서 해당 기록에 해당되는 기록을 찾아내 isTake를 true로 바꿔줌
          //     temporaryIntakeTimeTableByDate[date].intakeHistory[intakeHistory.intakeTime].forEach((timeTableData) => {
          //       if (timeTableData.pillId === intakeHistory.pillId) {
          //         timeTableData.isTake = true
          //       }
          //     })
          //   }
          // })
        })
      }
    }
  }, [])

  if (!intakeTimeTableByDate) return <LoadingCircular />

  return (
    <ContainerWithBottomNav>
      <MainHeader />
      <div className='mt-2 space-y-2'>
        {/* 복용 기록 캘린더 */}
        <IntakeCalendar
          calendarMode='Week'
          intakeTimeTableByDate={intakeTimeTableByDate}
          setSelectedDate={setSelectedDate}
        />

        {/* 연속 섭취중 일수 + 편집 버튼 */}
        <div className='bg-surface px-6 py-4 text-xs flex items-center justify-between'>
          <p className='text-gray-900'>🔥 <strong className='font-bold text-red-500'>1일째</strong> 연속 섭취중</p>
          <Link href='/intake/edit-schedule'>
            <a className='text-primary'>
              시간표 편집
            </a>
          </Link>
        </div>

        {/* 영양제 시간표 부분 */}
        {
          intakeTimeTableByDate[selectedDate] &&
          Object.keys(intakeTimeTableByDate[selectedDate].intakeHistory).sort().map((intakeTime) =>
            <ScheduleBox
              key={intakeTime}
              intakeTime={intakeTime}
              timeTableDataList={intakeTimeTableByDate[selectedDate].intakeHistory[intakeTime]}
            />
          )
        }
      </div>
    </ContainerWithBottomNav>
  )
}

export default Intake
