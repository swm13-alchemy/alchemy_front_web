import dayjs, { Dayjs } from 'dayjs'
import { Days, TimeTableByDateType, TimeTableByDayType, TimeTableByTimeType } from '../types'
import { arrayIsNotEmpty } from './arrayIsNotEmpty'
import weekday from 'dayjs/plugin/weekday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(weekday)
dayjs.extend(isSameOrBefore)

export function makeIntakeTimeTableByDate(timeTableByDay: TimeTableByDayType): TimeTableByDateType {
  const INITIAL_YEAR: number = parseInt(dayjs().format('YYYY'))
  const INITIAL_MONTH: number = parseInt(dayjs().format('M'))

  let currentMonthDays: TimeTableByDateType
  let previousMonthDays: TimeTableByDateType
  let nextMonthDays: TimeTableByDateType

  return createCalendar()



  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    previousMonthDays = createDaysForPreviousMonth(year, month)

    currentMonthDays = createDaysForCurrentMonth(year, month)

    nextMonthDays = createDaysForNextMonth(year, month)

    return {...previousMonthDays, ...currentMonthDays, ...nextMonthDays}
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

  function createDaysForCurrentMonth(year: number, month: number): TimeTableByDateType {
    const timeTableByDate: TimeTableByDateType = {};
    [...Array(getNumberOfDaysInMonth(year, month))].forEach((day, index) => {
      makeTimeTableByDate(timeTableByDate, `${year}-${month}-${index + 1}`)
    })
    return timeTableByDate
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

  function getWeekday(date: string) {
    return dayjs(date).weekday()
  }

  function makeTimeTableByDate(timeTableByDate: TimeTableByDateType, date: string) {
    const curDate = dayjs(date)
    const curDayOfDate: Days = curDate.format('ddd') as 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

    const totalNum: number = countTotalIntakePillNum(timeTableByDay[curDayOfDate])  // 이 날 먹어야 하는 총 개수
    // const processedData = validateStartIntakeDate(timeTableByDay[curDayOfDate], curDate)

    timeTableByDate[curDate.format('YYYY-MM-DD')] = {
      remainIntakePillCnt: totalNum,
      totalIntakePillCnt: totalNum,
      intakeHistory: timeTableByDay[curDayOfDate],
    }
  }

  // function validateStartIntakeDate(dataBeforeProcessing: TimeTableByTimeType, curDate: Dayjs): TimeTableByTimeType {
  //   const processedData = structuredClone(dataBeforeProcessing) // 객체 깊은 복사
  //   if (!!processedData && arrayIsNotEmpty(Object.keys(processedData))) {
  //     for (const time of Object.keys(processedData)) {
  //       // 현재 다루고 있는 날짜가 해당 영양제 복용 시작 시점보다 이전이면 복용 기록 데이터에서 제외
  //       processedData[time] = processedData[time].filter((timeTableData) => dayjs(timeTableData.startIntakeDate).isSameOrBefore(curDate))
  //       // 만약 제거했는데 해당 시간 key값의 value가 빈 배열이 된다면 해당 key를 삭제
  //       if (!arrayIsNotEmpty(processedData[time])) {
  //         delete processedData[time]
  //       }
  //     }
  //   }
  //   return processedData
  // }

  function countTotalIntakePillNum(timeTableBySpecificDay: TimeTableByTimeType): number {
    let cnt: number = 0
    if (!!timeTableBySpecificDay && arrayIsNotEmpty(Object.values(timeTableBySpecificDay))) {
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