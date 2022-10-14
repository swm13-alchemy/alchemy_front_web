import { useEffect, useState } from 'react'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import DateBox from './DateBox'
import dayjs, { Dayjs } from 'dayjs'
import { TimeTableByDateType } from '../../../utils/types'
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import { getTodayDate } from '../../../utils/functions/getTodayDate'

export type CalendarModeType = 'Month' | 'Week'
interface Props {
  intakeTimeTableByDate: TimeTableByDateType
  selectedDate: string
  setSelectedDate: (selectedDate: string) => void
}

function IntakeCalendar({ intakeTimeTableByDate, selectedDate, setSelectedDate }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [today, setToday] = useState<Dayjs>(dayjs())
  const [datesOfThisWeek, setDatesOfThisWeek] = useState<string[]>([])

  // 선택한 날짜에 해당하는 일주일의 날짜를 string 형태의 배열로 만들어서 state에 저장
  useEffect(() => {
    setToday(dayjs())
    let firstDateOfTheWeek = dayjs(selectedDate).day(0)
    const tempDates: string[] = []
    for (let i = 0; i < 7; i++) {
      tempDates.push(firstDateOfTheWeek.format('YYYY-MM-DD'))
      firstDateOfTheWeek = firstDateOfTheWeek.add(1, 'day')
    }
    setDatesOfThisWeek(tempDates)
  }, [selectedDate])

  return (
    <div className='bg-white px-6 pt-4 pb-6 space-y-4'>
      <button
        className='w-full flex items-center justify-between'
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <p className='text-sm font-bold text-gray-900 flex items-center'>
          {today.format('YYYY년 M월')} {isCalendarOpen ? <ExpandLess className='text2xl ml-1' /> : <ExpandMore className='text-2xl ml-1' />}
        </p>
        {isCalendarOpen ? (
          <div className='flex items-center text-gray-900 text-2xl space-x-2'>
            <button
              className='p-0.5 rounded bg-gray-100 flex items-center justify-center'
              // onClick={}
            >
              <ChevronLeft />
            </button>
            <button
              className='p-0.5 rounded bg-gray-100 flex items-center justify-center'
              // onClick={}
            >
              <ChevronRight />
            </button>
          </div>
        ) : (
          <p className='text-xs text-gray-500'>
            {today.format('YYYY년 M월 D일 ') + getTodayDate().day}
          </p>
        )}
      </button>
      {isCalendarOpen ? (
        <MonthDateBoxContainer
          intakeTimeTableByDate={intakeTimeTableByDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ): (
        <WeekDateBoxContainer
          datesOfThisWeek={datesOfThisWeek}
          intakeTimeTableByDate={intakeTimeTableByDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  )
}

interface WeekDateBoxContainerProps {
  datesOfThisWeek: string[]
  intakeTimeTableByDate: TimeTableByDateType
  selectedDate: string
  setSelectedDate: (selectedDate: string) => void
}
function WeekDateBoxContainer({ datesOfThisWeek, intakeTimeTableByDate, selectedDate, setSelectedDate }: WeekDateBoxContainerProps) {
  return (
    <div className='flex items-center justify-between'>
      {datesOfThisWeek.map((date) =>
        <DateBox
          key={date}
          calendarMode='Week'
          date={date}
          remainNum={intakeTimeTableByDate[date].remainIntakePillCnt}
          totalNum={intakeTimeTableByDate[date].totalIntakePillCnt}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  )
}

interface MonthDateBoxContainerProps {
  intakeTimeTableByDate: TimeTableByDateType
  selectedDate: string
  setSelectedDate: (selectedDate: string) => void
}
function MonthDateBoxContainer({ intakeTimeTableByDate, selectedDate, setSelectedDate }: MonthDateBoxContainerProps) {
  return (
    <div className='grid grid-cols-7 grid-rows-5'>
      {Object.keys(intakeTimeTableByDate).map((date) =>
        <DateBox
          key={date}
          calendarMode='Month'
          date={date}
          remainNum={intakeTimeTableByDate[date].remainIntakePillCnt}
          totalNum={intakeTimeTableByDate[date].totalIntakePillCnt}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  )
}

export default IntakeCalendar