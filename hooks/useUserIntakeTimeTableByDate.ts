import { useEffect } from 'react'
import { IntakeManagementType, TimeTableByDateType, TimeTableByDayType } from '../utils/types'
import { makeIntakeTimeTableByDay } from '../utils/functions/makeIntakeTimeTableByDay'
import { makeIntakeTimeTableByDate } from '../utils/functions/makeIntakeTimeTableByDate'
import { processPastIntakeHistory } from '../utils/functions/processPastIntakeHistory'
import { Dayjs } from 'dayjs'
import { useUserInformationStore, useUserIntakeManagementStore } from '../stores/store'
import { useIntakeTimeTableByDate } from '../stores/nonLocalStorageStore'
import { arrayIsNotEmpty } from '../utils/functions/arrayIsNotEmpty'

/** 복용 관리 기록 데이터 가져오기 (커스텀 훅) */
const useUserIntakeTimeTableByDate = (selectedYearANDMonth: Dayjs): TimeTableByDateType | null => {
  const userId = useUserInformationStore(state => state.userId)
  const intakePillList: IntakeManagementType[] = useUserIntakeManagementStore(state => state.intakePillList)
  const { intakeTimeTableByDate, setIntakeTimeTableByDate } = useIntakeTimeTableByDate()

  useEffect(() => {
    // 복용 관리 등록한 영양제 목록이 있을 때 복용 기록 불러오기
    if (arrayIsNotEmpty(intakePillList)) {
      // 복용 관리 중인 영양제들 리스트를 활용해 '요일' 기준으로 요일 기준 영양제 시간표 데이터를 만듦
      const timeTableByDay: TimeTableByDayType = makeIntakeTimeTableByDay(intakePillList)

      // 위에서 만든 요일 기준 영양제 시간표 데이터를 활용하여 '영양제 시간표 틀 데이터'를 만듦
      const temporaryIntakeTimeTableByDate: TimeTableByDateType = makeIntakeTimeTableByDate(timeTableByDay, selectedYearANDMonth)

      console.log("temporaryIntakeTimeTableByDate : ", temporaryIntakeTimeTableByDate)

      // 과거 복용 기록을 서버에서 가져와 '영양제 시간표 틀 데이터'에 넣음
      if (userId) {
        processPastIntakeHistory(temporaryIntakeTimeTableByDate, userId)
          .then((finalIntakeTimeTableByDate) => {
            console.log("finalIntakeTimeTableByDate : ", finalIntakeTimeTableByDate)
            setIntakeTimeTableByDate(finalIntakeTimeTableByDate)
          })
          .catch((error) => {
            setIntakeTimeTableByDate(temporaryIntakeTimeTableByDate)  // 안정성을 위해 추가
            alert(`ERROR : ${error}. 복용 기록 불러오기 오류!`)
          })
      }
    }
  }, [selectedYearANDMonth, intakePillList])

  return intakeTimeTableByDate
}

export default useUserIntakeTimeTableByDate