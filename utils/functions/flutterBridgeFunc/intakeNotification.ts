import { Days } from '../../types'
import { Dayjs } from 'dayjs'

function convertDaysForCommunication(day: Days): number {
  switch (day) {
    case 'Mon':
      return 1
    case 'Tue':
      return 2
    case 'Wed':
      return 3
    case 'Thu':
      return 4
    case 'Fri':
      return 5
    case 'Sat':
      return 6
    case 'Sun':
      return 7
  }
}

export function addWeeklyNotification(pillId: number, intakeDays: Days[], intakeTimes: Dayjs[], message: string) {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  AddWeeklyNotification.postMessage(JSON.stringify({
    pillId: pillId,
    intakeDays: intakeDays.map((day) => convertDaysForCommunication(day)),
    intakeTimes: intakeTimes.map((time) => [time.get('hour'), time.get('minute')]),
    message: message
  }))
}

export function editWeeklyNotification(pillId: number, intakeDays: Days[], intakeTimes: Dayjs[], message: string) {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  EditWeeklyNotification.postMessage(JSON.stringify({
    pillId: pillId,
    intakeDays: intakeDays.map((day) => convertDaysForCommunication(day)),
    intakeTimes: intakeTimes.map((time) => [time.get('hour'), time.get('minute')]),
    message: message
  }))
}