import { useEffect, useState } from 'react'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import DateBox from './DateBox'
import dayjs, { Dayjs } from 'dayjs'
import { TimeTableByDateType } from '../../../utils/types'
import { getTodayDate } from '../../../utils/functions/getTodayDate'

export type CalendarModeType = 'Month' | 'Week'
interface Props {
  intakeTimeTableByDate: TimeTableByDateType
  setSelectedDate: (selectedDate: string) => void
}

function IntakeCalendar({ intakeTimeTableByDate, setSelectedDate }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [today, setToday] = useState<Dayjs>(dayjs())
  const [datesOfThisWeek, setDatesOfThisWeek] = useState<string[]>([])

  // 일주일의 날짜를 string 형태의 배열로 만들어서 state에 저장
  useEffect(() => {
    setToday(dayjs())
    let firstDateOfTheWeek = dayjs().day(0)
    const tempDates: string[] = []
    for (let i = 0; i < 7; i++) {
      tempDates.push(firstDateOfTheWeek.format('YYYY-MM-DD'))
      firstDateOfTheWeek = firstDateOfTheWeek.add(1, 'day')
    }
    setDatesOfThisWeek(tempDates)
  }, [])

  return (
    <div className='bg-white px-6 pt-4 pb-6 space-y-2'>
      <button
        className='w-full flex items-center justify-between'
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <p className='text-sm font-bold text-gray-900 flex items-center'>
          {today.format('YYYY년 M월')} {isCalendarOpen ? <ExpandLess className='text2xl ml-1' /> : <ExpandMore className='text-2xl ml-1' />}
        </p>
        <p className='text-xs text-gray-500'>
          {today.format('YYYY년 M월 D일 ') + getTodayDate().day}
        </p>
      </button>
      {isCalendarOpen ? (
        <MonthDateBoxContainer
          intakeTimeTableByDate={intakeTimeTableByDate}
          setSelectedDate={setSelectedDate}
        />
      ): (
        <WeekDateBoxContainer
          datesOfThisWeek={datesOfThisWeek}
          intakeTimeTableByDate={intakeTimeTableByDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  )
}

interface WeekDateBoxContainerProps {
  datesOfThisWeek: string[]
  intakeTimeTableByDate: TimeTableByDateType
  setSelectedDate: (selectedDate: string) => void
}
function WeekDateBoxContainer({ datesOfThisWeek, intakeTimeTableByDate, setSelectedDate }: WeekDateBoxContainerProps) {
  return (
    <div className='flex items-center justify-between'>
      {datesOfThisWeek.map((date) =>
        <DateBox
          key={date}
          calendarMode='Week'
          date={date}
          remainNum={intakeTimeTableByDate[date].remainIntakePillCnt}
          totalNum={intakeTimeTableByDate[date].totalIntakePillCnt}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  )
}

interface MonthDateBoxContainerProps {
  intakeTimeTableByDate: TimeTableByDateType
  setSelectedDate: (selectedDate: string) => void
}
function MonthDateBoxContainer({ intakeTimeTableByDate, setSelectedDate }: MonthDateBoxContainerProps) {
  return (
    <div className='grid grid-cols-7 grid-rows-5'>
      {Object.keys(intakeTimeTableByDate).map((date) =>
        <DateBox
          key={date}
          calendarMode='Month'
          date={date}
          remainNum={intakeTimeTableByDate[date].remainIntakePillCnt}
          totalNum={intakeTimeTableByDate[date].totalIntakePillCnt}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  )
}

export default IntakeCalendar