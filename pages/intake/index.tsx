import { NextPage } from 'next'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import IntakeCalendar from '../../components/common/intakeCalendar/IntakeCalendar'
import MainHeader from '../../components/layout/MainHeader'
import ScheduleBox from '../../components/common/intake/ScheduleBox'
import Link from 'next/link'
import { useUserInformation, useUserIntakeManagementStore } from '../../stores/store'
import { useEffect, useState } from 'react'
import {
  IntakeManagementType,
  TimeTableByDateType,
  TimeTableByDayType,
} from '../../utils/types'
import { makeIntakeTimeTableByDay } from '../../utils/functions/makeIntakeTimeTableByDay'
import { makeIntakeTimeTableByDate } from '../../utils/functions/makeIntakeTimeTableByDate'
import LoadingCircular from '../../components/layout/LoadingCircular'
import dayjs from 'dayjs'
import { useIntakeTimeTableByDate } from '../../stores/nonLocalStorageStore'
import { processPastIntakeHistory } from '../../utils/functions/processPastIntakeHistory'
import { useRouter } from 'next/router'



const Intake: NextPage = () => {
  const userId = useUserInformation(state => state.userId)
  const intakeServiceStartDate = useUserIntakeManagementStore(state => state.intakeServiceStartDate)
  const setIntakeServiceStartDate = useUserIntakeManagementStore(state => state.setIntakeServiceStartDate)
  const intakePillList: IntakeManagementType[] = useUserIntakeManagementStore(state => state.intakePillList)
  const setIntakePillList = useUserIntakeManagementStore(state => state.setIntakePillList)
  const { intakeTimeTableByDate, setIntakeTimeTableByDate } = useIntakeTimeTableByDate()
  // const [intakeTimeTableByDate, setIntakeTimeTableByDate] = useState<TimeTableByDateType | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'))  // 오늘 날짜로 초기 설정

  useEffect(() => {
    // 복용 관리 중인 영양제들 리스트를 활용해 '요일' 기준으로 요일 기준 영양제 시간표 데이터를 만듦
    const timeTableByDay: TimeTableByDayType = makeIntakeTimeTableByDay(intakePillList)

    // 위에서 만든 요일 기준 영양제 시간표 데이터를 활용하여 '영양제 시간표 틀 데이터'를 만듦
    const temporaryIntakeTimeTableByDate: TimeTableByDateType = makeIntakeTimeTableByDate(timeTableByDay)

    console.log(temporaryIntakeTimeTableByDate)
    setIntakeTimeTableByDate(temporaryIntakeTimeTableByDate)

    // // 과거 복용 기록을 서버에서 가져와 '영양제 시간표 틀 데이터'에 넣음
    // processPastIntakeHistory(temporaryIntakeTimeTableByDate, "userId")
    //   .then((finalIntakeTimeTableByDate) =>
    //     setIntakeTimeTableByDate(finalIntakeTimeTableByDate)
    //   )
  }, [])

  if (!userId) {  // 로그인이 안되어 있는 경우 redirect
    const router = useRouter()
    router.push('/initial')
  }

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
