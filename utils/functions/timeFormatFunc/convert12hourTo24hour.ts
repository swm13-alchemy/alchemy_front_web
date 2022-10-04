import { convertStringToTimeArray } from './convertStringToTimeArray'
import { convertTimeArrayToStringArray } from './convertTimeArrayToStringArray'

export function convert12hourTo24hour(timeStr: string): string {
  const timeArray: number[] = convertStringToTimeArray(timeStr, 24) // ex. '09:00' -> [9,0]
  return convertTimeArrayToStringArray([timeArray])[0]
}