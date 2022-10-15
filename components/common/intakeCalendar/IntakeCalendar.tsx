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
  selectedYearANDMonth: Dayjs
  setSelectedYearANDMonth: (selectedYearANDMonth: Dayjs) => void
  intakeServiceStartDate: Dayjs
}

function IntakeCalendar({ intakeTimeTableByDate, selectedDate, setSelectedDate, selectedYearANDMonth, setSelectedYearANDMonth, intakeServiceStartDate }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [datesOfThisWeek, setDatesOfThisWeek] = useState<string[]>([])
  const [isTheMonthIncludedToday, setIsTheMonthIncludedToday] = useState<boolean>(true)
  const [isTheMonthIncludedIntakeServiceStartDate, setIsTheMonthIncludedIntakeServiceStartDate] = useState<boolean>(false)

  // 선택한 날짜에 해당하는 일주일의 날짜를 string 형태의 배열로 만들어서 state에 저장
  useEffect(() => {
    let firstDateOfTheWeek = dayjs(selectedDate).day(0)
    const tempDates: string[] = []
    for (let i = 0; i < 7; i++) {
      tempDates.push(firstDateOfTheWeek.format('YYYY-MM-DD'))
      firstDateOfTheWeek = firstDateOfTheWeek.add(1, 'day')
    }
    setDatesOfThisWeek(tempDates)
  }, [selectedDate])

  // 선택한 달이 오늘이 포함된 달인지, 또는 복용 관리 서비스를 시작한 달이 포함된 달인지 확인 하는 부분
  useEffect(() => {
    if (Object.keys(intakeTimeTableByDate).includes(dayjs().format('YYYY-MM-DD'))) {
      setIsTheMonthIncludedToday(true)
    } else {
      setIsTheMonthIncludedToday(false)
    }

    if (Object.keys(intakeTimeTableByDate).includes(intakeServiceStartDate.format('YYYY-MM-DD'))) {
      setIsTheMonthIncludedIntakeServiceStartDate(true)
    } else {
      setIsTheMonthIncludedIntakeServiceStartDate(false)
    }
  }, [intakeTimeTableByDate])

  const goToPreviousMonth = () => {
    // 현재 보고 있는 달이 복용 관리 서비스를 시작한 날이 포함된 달이 아닐 때만 이전 달로 넘길 수 있음
    if (!isTheMonthIncludedIntakeServiceStartDate) {
      setSelectedDate(dayjs(selectedDate).subtract(1, 'month').format('YYYY-MM-DD'))
      setSelectedYearANDMonth(selectedYearANDMonth.subtract(1, 'month'))
    }
  }

  const goToNextMonth = () => {
    // 현재 보고 있는 달이 오늘을 포함된 달이 아닐 때만 이후 달로 넘길 수 있음
    if (!isTheMonthIncludedToday) {
      setSelectedDate(dayjs(selectedDate).add(1, 'month').format('YYYY-MM-DD'))
      setSelectedYearANDMonth(selectedYearANDMonth.add(1, 'month'))
    }
  }

  return (
    <div className='bg-white px-6 pt-4 pb-6 space-y-4'>
      <div className='w-full flex items-center justify-between'>
        <button
          className='text-sm font-bold text-gray-900 flex items-center grow'
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          {selectedYearANDMonth.format('YYYY년 M월')} {isCalendarOpen ? <ExpandLess className='text2xl ml-1' /> : <ExpandMore className='text-2xl ml-1' />}
        </button>
        {isCalendarOpen ? (
          <div className='flex items-center text-gray-900 text-2xl space-x-2'>
            <button
              className={'p-0.5 rounded bg-gray-100 flex items-center justify-center' +
                (isTheMonthIncludedIntakeServiceStartDate ? ' text-gray-300' : ' text-gray-900')}
              onClick={goToPreviousMonth}
            >
              <ChevronLeft />
            </button>
            <button
              className={'p-0.5 rounded bg-gray-100 flex items-center justify-center' +
                (isTheMonthIncludedToday ? ' text-gray-300' : ' text-gray-900')}
              onClick={goToNextMonth}
            >
              <ChevronRight />
            </button>
          </div>
        ) : (
          <p className='text-xs text-gray-500'>
            {dayjs().format('YYYY년 M월 D일 ') + getTodayDate().day}
          </p>
        )}
      </div>
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
export function WeekDateBoxContainer({ datesOfThisWeek, intakeTimeTableByDate, selectedDate, setSelectedDate }: WeekDateBoxContainerProps) {
  return (
    <div className='flex items-center justify-between'>
      {datesOfThisWeek.map((date) => {
        if (!intakeTimeTableByDate[date]) return <div></div>  // setState의 비동기 처리로 데이터 값이 아직 변하지 않았을 때를 처리하기 위함
        return (
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
      {Object.keys(intakeTimeTableByDate).map((date) => {
        if (!intakeTimeTableByDate[date]) return <div></div>  // setState의 비동기 처리로 데이터 값이 아직 변하지 않았을 때를 처리하기 위함
        return (
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
      )}
    </div>
  )
}

export default IntakeCalendar