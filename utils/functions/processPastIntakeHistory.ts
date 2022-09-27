import { TimeTableByDateType } from '../types'
import { intakeApi } from '../api'
import { arrayIsNotEmpty } from './arrayIsNotEmpty'
import dayjs, { Dayjs } from 'dayjs'

export async function processPastIntakeHistory(temporaryIntakeTimeTableByDate: TimeTableByDateType, userId: string): Promise<TimeTableByDateType> {
  const today: Dayjs = dayjs()
  const dateList: string[] = Object.keys(temporaryIntakeTimeTableByDate).sort() // 영양제 시간표 틀 데이터에서 날짜(key)들을 순서대로 나열함

  const startDate: string = dateList[0]
  let endDate: string = dateList[dateList.length - 1] // 해당 달 맨 끝 날짜로 초기 설정

  // 현재 보고 있는 달이 오늘이 포함된 달이라면 endDate를 오늘 날짜로 바꿈 (오늘 날짜까지 포함해서 가져오는 것)
  if (Object.prototype.hasOwnProperty.call(temporaryIntakeTimeTableByDate, today.format('YYYY-MM-DD'))) {
    endDate = today.format('YYYY-MM-DD')
  }

  // 서버에서 복용 기록을 받아옴
  // TODO: 아직 테스트 안해봄! 서버에서 데이터 받고 테스트 해봐야 함
  const { data: result } = await intakeApi.getIntakeHistory(userId, startDate, endDate)
  const intakeHistoryByDate: TimeTableByDateType = result.data

  // 서버에서 받아온 복용 기록 객체가 비어있지 않다면,
  if (!!intakeHistoryByDate && arrayIsNotEmpty(Object.keys(intakeHistoryByDate))) {
    // 복용 기록 객체의 key값을 순회
    Object.keys(intakeHistoryByDate).forEach((date: string) => {
      // 서버에서 받은 복용 기록을 같은 날짜에 넣음
      temporaryIntakeTimeTableByDate[date] = intakeHistoryByDate[date]
    })
  }

  return temporaryIntakeTimeTableByDate
}