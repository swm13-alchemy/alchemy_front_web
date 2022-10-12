import { TimeTableByDateType } from '../types'
import { intakeApi } from '../api'
import { arrayIsNotEmpty } from './arrayIsNotEmpty'
import dayjs, { Dayjs } from 'dayjs'

export async function processPastIntakeHistory(temporaryIntakeTimeTableByDate: TimeTableByDateType, userId: string, intakeServiceStartDate: Dayjs): Promise<TimeTableByDateType> {
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

  console.log("intakeHistoryByDate : ", intakeHistoryByDate)

  // 서버에서 받아온 복용 기록 객체가 비어있지 않다면,
  if (!!intakeHistoryByDate && arrayIsNotEmpty(Object.keys(intakeHistoryByDate))) {
    // 복용 기록 객체의 key값을 순회
    Object.keys(intakeHistoryByDate).forEach((date: string) => {
      // 서버에서 받은 복용 기록을 같은 날짜에 넣음
      temporaryIntakeTimeTableByDate[date] = intakeHistoryByDate[date]
    })
  }

  // temporaryIntakeTimeTableByDate에서 복용 관리 서비스를 시작한 날짜보다 이전 날짜가 있다면 영양제 시간표 틀 값들 삭제(초기화)
  Object.keys(temporaryIntakeTimeTableByDate).forEach((date: string) => {
    if (intakeHistoryByDate && dayjs(date).isBefore(intakeServiceStartDate.subtract(1, 'day'))) {
      temporaryIntakeTimeTableByDate[date].remainIntakePillCnt = 0
      temporaryIntakeTimeTableByDate[date].totalIntakePillCnt = 0
      temporaryIntakeTimeTableByDate[date].intakeHistory = {}
    }
  })

  // else {  // 서버에서 받아온 복용 기록이 없다면
  //   // 기존에 만든 '영양제 시간표 틀 데이터'의 key값을 순회
  //   Object.keys(temporaryIntakeTimeTableByDate).forEach((date: string) => {
  //     // 오늘보다 이전 날짜의 데이터들 데이터 없음으로 처리
  //     // TODO: 이거 나중에 더 직관적으로 수정 (아마 UI 수정도 필요)
  //     console.log("여기")
  //     if (!dayjs(date).isToday() && dayjs(date).isBefore(today)) {
  //       temporaryIntakeTimeTableByDate[date].remainIntakePillCnt = 0
  //       temporaryIntakeTimeTableByDate[date].totalIntakePillCnt = 0
  //       temporaryIntakeTimeTableByDate[date].intakeHistory = {}
  //     }
  //   })
  // }

  return temporaryIntakeTimeTableByDate
}