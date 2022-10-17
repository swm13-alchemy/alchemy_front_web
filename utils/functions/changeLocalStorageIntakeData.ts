import { TimeTableByDateType } from '../types'

/** 복용 체크 버튼을 누름에 따라 로컬 스토리지 데이터도 수정하는 함수 */
export const changeLocalStorageIntakeData = (isAllCheckMode: boolean, todayDateStr: string, intakeTime: string, intakeTimeTableByDate: TimeTableByDateType, setIntakeTimeTableByDate: (intakeTimeTableByDate: TimeTableByDateType) => void, pillId: number | null = null, isIntakeCheck: boolean | null = null) => {
  const tempIntakeTimeTableByDate: TimeTableByDateType = JSON.parse(JSON.stringify(intakeTimeTableByDate)) // 객체 깊은 복사

  // 전체 복용 버튼을 누른 것이 아니고 (그냥 영양제 복용 체크 하나만 한 것인 경우) 누른 pillId 값이 들어왔을 때,
  if (!isAllCheckMode && pillId && isIntakeCheck !== null) {
    // 현재의 '영양제 시간표 틀 데이터'의 오늘 복용 기록, Props로 들어온 intakeTime에서, isTake의 값을 변경함 (복용 체크면 true로, 복용 체크 해제면 false로)
    tempIntakeTimeTableByDate[todayDateStr].intakeHistory[intakeTime].forEach((pillIntakeData, idx) => {
      if (pillIntakeData.pillId === pillId) {
        tempIntakeTimeTableByDate[todayDateStr].intakeHistory[intakeTime][idx].isIntake = isIntakeCheck
      }
    })

    // 복용 체크 했으면 남은 영양제 개수를 하나 줄이고, 복용 체크를 해제 했으면 남은 영양제 개수를 하나 늘림
    if (isIntakeCheck) {
      tempIntakeTimeTableByDate[todayDateStr].remainIntakePillCnt -= 1
    } else {
      tempIntakeTimeTableByDate[todayDateStr].remainIntakePillCnt += 1
    }
  } else {  // 전체 복용 버튼을 눌렀을 때 로직
    let intakePillCnt: number = 0
    // 해당 intakeTime의 영양제들 다 true로 변경
    tempIntakeTimeTableByDate[todayDateStr].intakeHistory[intakeTime].forEach((pillIntakeData, idx) => {
      tempIntakeTimeTableByDate[todayDateStr].intakeHistory[intakeTime][idx].isIntake = true
      intakePillCnt += 1
    })

    // 체크한 개수에 맞게 남은 영양제 수를 변경
    tempIntakeTimeTableByDate[todayDateStr].remainIntakePillCnt -= intakePillCnt
  }

  // 다 만들어진 데이터를 로컬 스토리지에 다시 넣음
  setIntakeTimeTableByDate(tempIntakeTimeTableByDate)
}