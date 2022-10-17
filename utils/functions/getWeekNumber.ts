import { Dayjs } from 'dayjs'

export function getWeekNumber(date: Dayjs): number {
  const currentDate = date.get('date')

  // 이번 달 1일로 지정
  const startOfMonth = date.startOf('month')

  // 이번 달 1일이 무슨 요일인지 확인
  const weekDay = startOfMonth.get('day')

  return parseInt(((((weekDay - 1) + currentDate) / 7) + 1).toString())
}