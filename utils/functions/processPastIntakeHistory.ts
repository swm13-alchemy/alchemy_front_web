import { TimeTableByDateType } from '../types'
import { intakeApi } from '../api'
import { arrayIsNotEmpty } from './arrayIsNotEmpty'
import dayjs, { Dayjs } from 'dayjs'

export async function processPastIntakeHistory(temporaryIntakeTimeTableByDate: TimeTableByDateType, userId: string, setIntakeServiceStartDate : (date: Dayjs | null) => void): Promise<TimeTableByDateType> {
  const today: Dayjs = dayjs()
  const dateList: string[] = Object.keys(temporaryIntakeTimeTableByDate).sort() // 영양제 시간표 틀 데이터에서 날짜(key)들을 순서대로 나열함

  const startDate: string = dateList[0]
  // intakeServiceStartDate를 구하기 위해 캘린더 시작 날짜보다 하루 이전의 복용 기록까지 가져옴
  const startDateToGetIntakeServiceStartDate: string = dayjs(dateList[0]).subtract(1, 'day').format('YYYY-MM-DD')
  let endDate: string = dateList[dateList.length - 1] // 해당 달 맨 끝 날짜로 초기 설정

  // 현재 보고 있는 달이 오늘이 포함된 달이라면 endDate를 오늘 날짜로 바꿈 (오늘 날짜까지 포함해서 가져오는 것)
  if (Object.prototype.hasOwnProperty.call(temporaryIntakeTimeTableByDate, today.format('YYYY-MM-DD'))) {
    endDate = today.format('YYYY-MM-DD')
  }

  // 서버에서 복용 기록을 받아옴
  const { data: result } = await intakeApi.getIntakeHistory(userId, startDateToGetIntakeServiceStartDate, endDate)
  const intakeHistoryByDate: TimeTableByDateType = result.data

  let intakeServiceStartDate: Dayjs | null = null // intakeServiceStartDate값 초기화

  // 서버에서 받아온 복용 기록 객체가 비어있지 않다면,
  if (!!intakeHistoryByDate && arrayIsNotEmpty(Object.keys(intakeHistoryByDate))) {
    // 복용 기록 객체의 key값을 순회
    Object.keys(intakeHistoryByDate).forEach((date: string) => {
      // temporaryIntakeTimeTableByDate에서 위 date값을 key로 가지고 있는 경우에만
      // TODO: 속도가 느리다면 이 부분 개선 (단순히 startDate에 해당하는 날짜만 제외해주는 방법으로 할 수도 있음)
      if (Object.prototype.hasOwnProperty.call(temporaryIntakeTimeTableByDate, date)) {
        // 서버에서 받은 복용 기록을 같은 날짜에 넣음
        temporaryIntakeTimeTableByDate[date] = intakeHistoryByDate[date]
      }
    })

    // TODO: intakeServiceStartDate 구하는 로직 잘 작동하는 지 테스트 해보기!
    // 서버에서 받아온 복용 기록을 오름차순으로 정렬했을 때 맨 앞에서 두 번째 있는 날짜(맨 앞은 캘린더에 포함된 날짜가 아니므로 / *위에 코드 참고)가 위에서 api를 호출할 때 사용한 startDate와 같지 않다면
    // 서버에서 불러온 복용 기록 날짜 중 복용 관리 서비스를 시작한 날짜가 있다는 말이고 그 날짜는 복용 기록 중 가장 오래된
    const firstDateIntakeHistoryByDate = Object.keys(intakeHistoryByDate).sort()[0]
    // 서버에서 받아온 복용 기록의 첫 번째 날짜가 (캘린더 첫번째 날짜 - 1일)이라면 해당 달에 intakeServiceStartDate가 없는 것이므로 null처리
    if (firstDateIntakeHistoryByDate === startDateToGetIntakeServiceStartDate) {
      intakeServiceStartDate = null
    }
    // 서버에서 받아온 복용 기록의 첫 번째 날짜가 캘린더 첫번째 날짜 ~ 마지막 날짜 사이라면 서버에서 받아온 복용 기록의 첫 번째 날짜가 intakeServiceStartDate인 것이므로 해당 날짜를 intakeServiceStartDate로
    else if (firstDateIntakeHistoryByDate >= startDate && firstDateIntakeHistoryByDate <= endDate) {
      intakeServiceStartDate = dayjs(firstDateIntakeHistoryByDate)

      // temporaryIntakeTimeTableByDate에서 복용 관리 서비스를 시작한 날짜보다 이전 날짜가 있다면 영양제 시간표 틀 값들 삭제(초기화)
      Object.keys(temporaryIntakeTimeTableByDate).forEach((date: string) => {
        if (intakeHistoryByDate && intakeServiceStartDate && dayjs(date).isSameOrBefore(intakeServiceStartDate.subtract(1, 'day'))) {
          temporaryIntakeTimeTableByDate[date].remainIntakePillCnt = 0
          temporaryIntakeTimeTableByDate[date].totalIntakePillCnt = 0
          temporaryIntakeTimeTableByDate[date].intakeHistory = {}
        }
      })

      // localStorage에도 구한 intakeServiceStartDate 넣기
      setIntakeServiceStartDate(intakeServiceStartDate)
    }
  }

  return temporaryIntakeTimeTableByDate
}