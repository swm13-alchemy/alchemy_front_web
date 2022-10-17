import CheckCircle from '@mui/icons-material/CheckCircle'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { CalendarModeType } from './IntakeCalendar'
dayjs.extend(isToday)

interface Props {
  calendarMode: CalendarModeType
  date: string
  remainNum: number
  totalNum: number
  selectedDate: string
  setSelectedDate: (selectedDate: string) => void
}

const DATE_STATE = {  // enum
  PAST_DAY: 0,
  TODAY: 1,
  FUTURE_DAY: 2
} as const

function DateBox({ calendarMode, date, remainNum, totalNum, selectedDate, setSelectedDate }: Props) {
  const [dateState, setDateState] = useState<number>(0)

  // 오늘인지 과거인지 미래날짜인지 파악
  useEffect(() => {
    if (dayjs(date).isToday()) {
      setDateState(DATE_STATE.TODAY)
    } else if (dayjs(date).isBefore(dayjs())) {
      setDateState(DATE_STATE.PAST_DAY)
    } else {
      setDateState(DATE_STATE.FUTURE_DAY)
    }
  }, [])

  return (
    <button
      className='flex flex-col items-center'
      onClick={() => setSelectedDate(date)}
    >
      {calendarMode === 'Week' ? (
          <WeekDateBoxInner
            date={date}
            isSelectedDate={date === selectedDate}
            dateState={dateState}
            remainNum={remainNum}
            totalNum={totalNum}
          />
        ) : (
          <MonthDateBoxInner
            date={date}
            isSelectedDate={date === selectedDate}
            dateState={dateState}
            remainNum={remainNum}
            totalNum={totalNum}
          />
        )
      }
      <DateText date={date} dateState={dateState} />
    </button>
  )
}

export default DateBox

interface DateBoxInnerProps {
  date: string
  isSelectedDate: boolean
  dateState: number
  remainNum: number
  totalNum: number
}
function WeekDateBoxInner({ date, isSelectedDate, dateState, remainNum, totalNum }: DateBoxInnerProps) {
  // 해당 날짜를 선택한 경우
  if (isSelectedDate) {
    return (
      <div className='p-2 rounded-3xl flex flex-col items-center space-y-2 bg-white outline outline-2 outline-primary'>
        <p
          className={'text-center text-xs' +
            (totalNum === 0 ? ' text-blue-100' : ' text-primary')}
        >
          {dayjs(date).format('ddd')}
        </p>
        {totalNum === 0 ? ( // totalNum이 0인 경우 예외 처리
          <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center'>
            <p className='text-xs font-bold text-blue-100'>0</p>
          </div>
        ) : ( // totalNum이 0이 아닌 경우 remainNum이 0일 때와 아닐 때 나눠서 ui 처리
          remainNum === 0 ? (
            <CheckCircle className='text-2xl text-primary' />
          ) : (
            <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-primary'>
              {remainNum}
            </div>
          )
        )}
      </div>
    )
  }

  // 예외 처리 : 영양제를 먹지 않는 날 or 복용 관리를 시작하기 이전 시점 표시
  if (totalNum === 0) {
    if (dateState === DATE_STATE.PAST_DAY || dateState === DATE_STATE.FUTURE_DAY) {
      return (
        <div className='p-2 rounded-3xl flex flex-col items-center space-y-2 bg-blue-50'>
          <p className='text-center text-xs text-blue-100'>{dayjs(date).format('ddd')}</p>
          <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center'>
            <p className='text-xs font-bold text-blue-100'>0</p>
          </div>
        </div>
      )
    }
  }

  // 오늘인지, 과거인지, 미래인지에 따라 UI가 변경되고 남아있는 영양제가 몇 개냐에 따라 UI가 변경됨
  if (dateState === DATE_STATE.PAST_DAY) {
    return (
      <div className='p-2 rounded-3xl flex flex-col items-center space-y-2 bg-blue-50'>
        <p
          className={'text-center text-xs' +
            (remainNum > 0 ? ' text-blue-100' : ' text-primary')}
        >
          {dayjs(date).format('ddd')}
        </p>
        {remainNum === 0 ? (
          <CheckCircle className='text-2xl text-primary' />
        ) : (
          <div
            className={'w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold' +
              (remainNum > 0 ? ' text-blue-100' : ' text-primary')}
          >
            {remainNum}
          </div>
        )}
      </div>
    )
  } else if (dateState === DATE_STATE.TODAY || dateState === DATE_STATE.FUTURE_DAY) {
    return (
      <div className='p-2 rounded-3xl flex flex-col items-center space-y-2 bg-blue-50'>
        <p className='text-center text-xs text-primary'>
          {dayjs(date).format('ddd')}
        </p>
        {remainNum === 0 ? (
          <CheckCircle className='text-2xl text-primary' />
        ) : (
          <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-primary'>
            {remainNum}
          </div>
        )}
      </div>
    )
  } else {
    return(
      <p className='text-lg font-bold text-primary mt-4'>오류</p>
    )
  }
}

function MonthDateBoxInner({ date, isSelectedDate, dateState, remainNum, totalNum }: DateBoxInnerProps) {
  // 해당 날짜를 선택한 경우
  if (isSelectedDate) {
    return (
      <div className='p-2 rounded-full flex flex-col items-center space-y-2 bg-white outline outline-2 outline-primary'>
        {totalNum === 0 ? ( // totalNum이 0인 경우 예외 처리
          <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center'>
            <p className='text-xs font-bold text-blue-100'>0</p>
          </div>
        ) : ( // totalNum이 0이 아닌 경우 remainNum이 0일 때와 아닐 때 나눠서 ui 처리
          remainNum === 0 ? (
            <CheckCircle className='text-2xl text-primary' />
          ) : (
            <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-primary'>
              {remainNum}
            </div>
          )
        )}
      </div>
    )
  }

  // 예외 처리 : 영양제를 먹지 않는 날 or 복용 관리를 시작하기 이전 시점 표시
  if (totalNum === 0) {
    if (dateState === DATE_STATE.PAST_DAY || dateState === DATE_STATE.FUTURE_DAY) {
      return (
        <div className='p-2 rounded-full flex flex-col items-center bg-blue-50'>
          <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center'>
            <p className='text-xs font-bold text-blue-100'>0</p>
          </div>
        </div>
      )
    }
  }

  // 오늘인지, 과거인지, 미래인지에 따라 UI가 변경되고 남아있는 영양제가 몇 개냐에 따라 UI가 변경됨
  if (dateState === DATE_STATE.PAST_DAY) {
    return (
      <div className='p-2 rounded-full flex flex-col items-center bg-blue-50'>
        {remainNum === 0 ? (
          <CheckCircle className='text-2xl text-primary' />
        ) : (
          <div
            className={'w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold' +
              (remainNum > 0 ? ' text-blue-100' : ' text-primary')}
          >
            {remainNum}
          </div>
        )}
      </div>
    )
  } else if (dateState === DATE_STATE.TODAY || dateState === DATE_STATE.FUTURE_DAY) {
    return (
      <div className='p-2 rounded-full flex flex-col items-center space-y-2 bg-blue-50'>
        {remainNum === 0 ? (
          <CheckCircle className='text-2xl text-primary' />
        ) : (
          <div className='w-6 h-6 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-primary'>
            {remainNum}
          </div>
        )}
      </div>
    )
  } else {
    return(
      <p className='text-lg font-bold text-primary mt-4'>오류</p>
    )
  }
}

interface DateTextProps {
  date: string
  dateState: number
}
function DateText({ date, dateState }: DateTextProps) {
  return (
    <p className={'text-xs mt-0.5' +
      (dateState === DATE_STATE.TODAY ? ' text-primary font-bold': ' text-gray-900 font-normal')}
    >
      {dayjs(date).format('D')}
    </p>
  )
}