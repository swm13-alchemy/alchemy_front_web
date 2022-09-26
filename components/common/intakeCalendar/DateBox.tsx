import CheckCircle from '@mui/icons-material/CheckCircle'
import { useEffect, useState } from 'react'
import { todayDataType } from '../../../utils/functions/getTodayDate'

interface Props {
  year: number
  month: number
  date: number
  day: string
  todayDate: todayDataType
  remainNum: number
  totalNum: number
}

const DATE_STATE = {  // enum
  PAST_DAY: 0,
  TODAY: 1,
  FUTURE_DAY: 2
} as const

function DateBox({year, month, date, day, todayDate, remainNum, totalNum}: Props) {
  const [dateState, setDateState] = useState<number | null>(null)

  // 오늘인지 과거인지 미래날짜인지 파악
  useEffect(() => {
    if (date === todayDate.date) {
      setDateState(DATE_STATE.TODAY)
    } else if (date < todayDate.date) {
      setDateState(DATE_STATE.PAST_DAY)
    } else if (month < todayDate.month) {
      setDateState(DATE_STATE.PAST_DAY)
    } else if (year < todayDate.year) {
      setDateState(DATE_STATE.PAST_DAY)
    } else {
      setDateState(DATE_STATE.FUTURE_DAY)
    }
  }, [])

  return (
    <div className='flex flex-col items-center'>
      {dateState !== null &&
        <div
          className={'p-2 rounded-3xl flex flex-col items-center space-y-2' +
            (dateState === DATE_STATE.TODAY ? ' bg-white border-2 border-primary' : ' bg-blue-50')}
        >
          <p
            className={'text-center text-xs' +
              (dateState === DATE_STATE.PAST_DAY && remainNum > 0 ? ' text-blue-100' : ' text-primary')}
          >
            {day}
          </p>
          {remainNum <= 0 ? (
            <CheckCircle className='text-2xl text-primary' />
          ) : (
            <div
              className={'w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-primary' +
                (dateState === DATE_STATE.PAST_DAY && remainNum > 0 ? ' text-blue-100' : ' text-primary')}
            >
              {remainNum}
            </div>
          )}
        </div>
      }
      <p className='text-xs text-primary'>{date}</p>
    </div>
  )
}

export default DateBox
