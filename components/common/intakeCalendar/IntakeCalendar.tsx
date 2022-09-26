import { useEffect, useState } from 'react'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import DateBox from './DateBox'
import { getTodayDate, todayDataType } from '../../../utils/functions/getTodayDate'

const 임시 = [
  {
    year: 2022,
    month: 8,
    date: 30,
    day: 'Sun',
    intakeDate: new Date,
    remainNum: 0,
    totalNum: 5
  },
  {
    year: 2022,
    month: 8,
    date: 31,
    day: 'Mon',
    remainNum: 0,
    totalNum: 5
  },
  {
    year: 2022,
    month: 9,
    date: 1,
    day: 'Tue',
    remainNum: 1,
    totalNum: 5
  },
  {
    year: 2022,
    month: 9,
    date: 2,
    day: 'Wed',
    remainNum: 4,
    totalNum: 5
  },
  {
    year: 2022,
    month: 9,
    date: 3,
    day: 'Thu',
    remainNum: 5,
    totalNum: 5
  },
  {
    year: 2022,
    month: 9,
    date: 4,
    day: 'Fri',
    remainNum: 5,
    totalNum: 5
  },
  {
    year: 2022,
    month: 9,
    date: 5,
    day: 'Sat',
    remainNum: 5,
    totalNum: 5
  },
]

function IntakeCalendar() {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [todayDate, setTodayDate] = useState<todayDataType | null>(null)

  useEffect(() => {
    // setTodayData(getTodayDate('en'))
    setTodayDate({
      year: 2022,
      month: 9,
      date: 2,
      day: '(수)',
      todayDateObject: new Date
    })
  }, [])

  return (
    <div className='bg-white px-6 pt-4 pb-6 space-y-2'>
      <button
        className='w-full flex items-center justify-between'
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <p className='text-sm font-bold text-gray-900 flex items-center'>
          2022년 9월 {isCalendarOpen ? <ExpandLess className='text2xl ml-1' /> : <ExpandMore className='text-2xl ml-1' />}
        </p>
        {todayDate !== null &&
          <p className='text-xs text-gray-500'>
            {todayDate.year}년 {todayDate.month}월 {todayDate.date}일 {todayDate.day}
          </p>
        }
      </button>
      <div className='flex items-center justify-between'>
        {todayDate && 임시.map((days) =>
          <DateBox
            key={days.day}
            year={days.year}
            month={days.month}
            day={days.day}
            date={days.date}
            todayDate={todayDate}
            remainNum={days.remainNum}
            totalNum={days.totalNum}
          />
        )}
      </div>
    </div>
  )
}

export default IntakeCalendar