import { arrayIsNotEmpty } from './arrayIsNotEmpty'
import { Days, IntakeManagementType, TimeTableByDayType, TimeTableDataType } from '../types'
import dayjs from 'dayjs'

export function makeIntakeTimeTableByDay(intakePillList: IntakeManagementType[]): TimeTableByDayType {
  const tempIntakeTimeTableData: TimeTableByDayType = { // return을 위한 임시 데이터 생성
    'Sun': {},
    'Mon': {},
    'Tue': {},
    'Wed': {},
    'Thu': {},
    'Fri': {},
    'Sat': {}
  }
  // 복용 관리 중인 영양제 리스트가 비어있지 않은지 확인
  if (arrayIsNotEmpty(intakePillList)) {
    // 비어있지 않다면 하나씩 꺼냄
    for (const intakePill of intakePillList) {
      // 꺼내서 영양제 시간표 양식에 맞게(복용 기록용) 데이터를 가공해 만듦
      const timeTableData: TimeTableDataType = {
        pillId: intakePill.pillId,
        pillNickName: intakePill.pillNickName,
        isTake: false
      }

      // 아래 switch문에서 사용되는 함수
      const addDataToTimeKey = function (day: Days) {
        for (const intakeTimeDayjs of intakePill.intakeTimesDayjs) {
          // 시간 값을 '0:0' 형태로 변환
          const intakeTimeStr: string = dayjs(intakeTimeDayjs).format('HH:mm')

          // 해당 시간 값(intakeTimeStr)을 key로 가지고 있는 경우,
          if (Object.prototype.hasOwnProperty.call(tempIntakeTimeTableData[day], intakeTimeStr)) { // !intakeTimeTableData.Sun.hasOwnProperty(intakeTimeStr) / es-lint로 인해 수정
            // 해당 시간 값 key에 들어있는 value (배열)에 현재 영양제 시간표 데이터를 추가해서 저장함
            tempIntakeTimeTableData[day][intakeTimeStr] = tempIntakeTimeTableData[day][intakeTimeStr].concat(timeTableData)
          } else {  // 해당 시간 값(intakeTimeStr)을 key로 가지고 있지 않다면,
            // 해당 요일의 해당 시간 값을 key로 데이터를 넣음
            tempIntakeTimeTableData[day][intakeTimeStr] = [timeTableData]
          }
        }
      }
      // setIntakeTimeTableData({...intakeTimeTableData, [day]: {[intakeTimeStr]: [timeTableData]}})
      // const curScheduleData: TimeTableType[] = tempIntakeTimeTableData[day][intakeTimeStr]
      // setIntakeTimeTableData({...intakeTimeTableData, [day]: {[intakeTimeStr]: curScheduleData.concat(timeTableData)}})

      // 해당 영양제를 먹는 요일들을 for문으로 돌려 하나씩 받음 (이 때, 변수 day는 Days 타입으로 string literal임)
      for (const day of intakePill.intakeDays) {
        // 적힌 요일에 맞춰 영양제 시간표 해당 요일에 섭취 시간을 key로 데이터를 추가함
        switch (day) {
          case 'Sun':
            addDataToTimeKey(day)
            break
          case 'Mon':
            addDataToTimeKey(day)
            break
          case 'Tue':
            addDataToTimeKey(day)
            break
          case 'Wed':
            addDataToTimeKey(day)
            break
          case 'Thu':
            addDataToTimeKey(day)
            break
          case 'Fri':
            addDataToTimeKey(day)
            break
          case 'Sat':
            addDataToTimeKey(day)
            break
        }
      }
    }
  }
  return tempIntakeTimeTableData
}

