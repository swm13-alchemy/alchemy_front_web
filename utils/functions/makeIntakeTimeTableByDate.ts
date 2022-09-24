import dayjs from 'dayjs'
import { Days, TimeTableByDateType, TimeTableByDayType, TimeTableByTimeType } from '../types'
import { arrayIsNotEmpty } from './arrayIsNotEmpty'
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

export function makeIntakeTimeTableByDate(timeTableByDay: TimeTableByDayType): TimeTableByDateType {
  const INITIAL_YEAR: number = parseInt(dayjs().format('YYYY'))
  const INITIAL_MONTH: number = parseInt(dayjs().format('M'))

  let currentMonthDays: TimeTableByDateType
  let previousMonthDays: TimeTableByDateType
  let nextMonthDays: TimeTableByDateType

  console.log(createCalendar())
  return createCalendar()



  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    currentMonthDays = createDaysForCurrentMonth(year, month)

    previousMonthDays = createDaysForPreviousMonth(year, month)

    nextMonthDays = createDaysForNextMonth(year, month)

    return {...previousMonthDays, ...currentMonthDays, ...nextMonthDays}
  }

  function createDaysForNextMonth(year: number, month: number): TimeTableByDateType {
    const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${Object.keys(currentMonthDays).length}`)

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month")

    const visibleNumberOfDaysFromNextMonth: number = (lastDayOfTheMonthWeekday === 6) ? 0 : 6 - lastDayOfTheMonthWeekday

    const timeTableByDate: TimeTableByDateType = {}
    if (visibleNumberOfDaysFromNextMonth) {
      [...Array(visibleNumberOfDaysFromNextMonth)].forEach((day, index) => {
        makeTimeTableByDate(timeTableByDate, `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`)
      })
    }
    return timeTableByDate
  }

  function createDaysForPreviousMonth(year: number, month: number): TimeTableByDateType {
    const firstDayOfTheMonthWeekday = getWeekday(`${year}-${month}-01`)

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month")

    const visibleNumberOfDaysFromPreviousMonth: number = firstDayOfTheMonthWeekday

    const previousMonthLastSundayDayOfMonth = dayjs(`${year}-${month}-01`)
      .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
      .date()

    const timeTableByDate: TimeTableByDateType = {}
    if (visibleNumberOfDaysFromPreviousMonth) {
      [...Array(visibleNumberOfDaysFromPreviousMonth)].forEach((day, index) => {
        makeTimeTableByDate(timeTableByDate, `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastSundayDayOfMonth + index}`)
      })
    }
    return timeTableByDate
  }

  function getWeekday(date: string) {
    return dayjs(date).weekday()
  }

  function createDaysForCurrentMonth(year: number, month: number): TimeTableByDateType {
    const timeTableByDate: TimeTableByDateType = {};
    [...Array(getNumberOfDaysInMonth(year, month))].forEach((day, index) => {
      makeTimeTableByDate(timeTableByDate, `${year}-${month}-${index + 1}`)
    })
    return timeTableByDate
  }

  function makeTimeTableByDate(timeTableByDate: TimeTableByDateType, date: string) {
    const curDate = dayjs(date)
    const curDayOfDate: Days = curDate.format('ddd') as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

    timeTableByDate[curDate.format('YYYY-MM-DD')] = {
      remainIntakePillCnt: null,
      totalIntakePillCnt: countTotalIntakePillNum(timeTableByDay[curDayOfDate]),
      intakeHistory: timeTableByDay[curDayOfDate],
    }
  }

  function countTotalIntakePillNum(timeTableBySpecificDay: TimeTableByTimeType): number {
    let cnt: number = 0
    if (timeTableBySpecificDay !== null && timeTableBySpecificDay !== undefined && arrayIsNotEmpty(Object.values(timeTableBySpecificDay))) {
      for (const li of Object.values(timeTableBySpecificDay)) {
        cnt += li.length
      }
    }
    return cnt
  }

  function getNumberOfDaysInMonth(year: number, month: number) {
    return dayjs(`${year}-${month}-01`).daysInMonth()
  }
}