import Image from 'next/image'
import { useEffect, useState } from 'react'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { intakeApi, PutIntakeHistoryType, requestURLs } from '../../../utils/api'
import { useUserInformation, useUserIntakeManagementStore } from '../../../stores/store'
import { useIntakeTimeTableByDate } from '../../../stores/nonLocalStorageStore'
import dayjs, { Dayjs } from 'dayjs'
import { TimeTableByDateType } from '../../../utils/types'

interface Props {
  pillId: number
  intakeTime: string
  isPillIntake: boolean
}

function PillIntakeBtn({ pillId, intakeTime, isPillIntake }: Props) {
  const userId = useUserInformation(state => state.userId)
  const [isIntake, setIsIntake] = useState<boolean>(isPillIntake)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const intakeTimeTableByDate = useIntakeTimeTableByDate(state => state.intakeTimeTableByDate)
  const setIntakeTimeTableByDate = useIntakeTimeTableByDate(state => state.setIntakeTimeTableByDate)
  const [pillNickName, setPillNickName] = useState<string>('')

  // 닉네임 가져오는 부분
  useEffect(() => {
    intakePillList.forEach((pill) => {
      if (pill.pillId === pillId) {
        setPillNickName(pill.pillNickName)
      }
    })
  }, [])

  // intake 표시 변경하는 부분
  useEffect(() => {
    setIsIntake(isPillIntake)
  }, [isPillIntake])

  /** 섭취 체크 버튼을 눌렀을 때 함수 */
  const clickIntakeBtn = () => {
    const todayDateStr: string = dayjs().format('YYYY-MM-DD')
    // TODO: 추후 테스트하기
    // intakeTimeTableByDate가 null이 아닐 때 (가공이 끝났을 때 눌려짐)
    if (intakeTimeTableByDate && userId) {
      const todayIntakeHistory = intakeTimeTableByDate[todayDateStr]
      // 아직 안먹은 경우
      if (!isIntake) {
        const tempPutHistoryJSONList: PutIntakeHistoryType[] = [{ // put api로 보낼 json 배열 초기화
          userId: userId,
          pillId: pillId,
          intakeDate: todayDateStr,
          intakeTime: intakeTime,
          isTake: true
        }]
        // 만약 오늘 복용 기록 체크를 한 번도 안했었다면 영양제 시간표에 있는 전체 스케쥴에 대한 복용 관리 기록을 서버에 보냄
        // (복용 체크 안한 것은 isTake = false로)
        if (todayIntakeHistory.remainIntakePillCnt === todayIntakeHistory.totalIntakePillCnt) {
          // 오늘 시간표에 해당하는 영양제들의 모든 정보를 불러와 isTake = false로 넣음
          Object.keys(todayIntakeHistory.intakeHistory).forEach((curIntakeTime) => {
            todayIntakeHistory.intakeHistory[curIntakeTime].forEach((timeTablePillData) => {
              // (중복되면 안되므로) 버튼을 클릭한 영양제와 다른 오늘 시간표에 해당하는 모든 영양제들의 복용 기록을 isTake = false로 서버에 넣음
              if (curIntakeTime !== intakeTime || timeTablePillData.pillId !== pillId) {
                tempPutHistoryJSONList.push({
                  userId: userId,
                  pillId: timeTablePillData.pillId,
                  intakeDate: todayDateStr,
                  intakeTime: curIntakeTime,
                  isTake: false
                })
              }
            })
          })
        } // 만약 오늘 복용 기록 체크한 다른 영양제가 있었다면 새롭게 체크하는 영양제 하나만 put으로 보내짐

        console.log("tempPutHistoryJSONList : ", tempPutHistoryJSONList)

        // 완료된 기록을 서버에 보냄
        putIntakeHistoryFunc(tempPutHistoryJSONList)
          .then(() => {
            changeLocalStorageIntakeData(intakeTimeTableByDate, todayDateStr, true)
            // setIsIntake(true)
          })
      } else { // 이미 먹었던 경우
        const tempPutHistoryJSONList: PutIntakeHistoryType[] = [{ // put api로 보낼 json 배열 초기화
          userId: userId,
          pillId: pillId,
          intakeDate: todayDateStr,
          intakeTime: intakeTime,
          isTake: false
        }]
        putIntakeHistoryFunc(tempPutHistoryJSONList)
          .then(() => {
            changeLocalStorageIntakeData(intakeTimeTableByDate, todayDateStr, false)
            // setIsIntake(false)
          })
      }
    }
  }

  // TODO: 서버에 기록이 안남겨짐 이거 오류 해결
  /** 서버에 섭취기록을 넣는 함수 (clickIntakeBtn 함수에서 호출) */
  const putIntakeHistoryFunc = async (intakeHistoryJSONList: PutIntakeHistoryType[]) => {
    await intakeApi.putIntakeHistory(intakeHistoryJSONList)
  }

  /** 복용 체크 버튼을 누름에 따라 로컬 스토리지 데이터도 수정하는 함수 (clickIntakeBtn 함수에서 호출) */
  const changeLocalStorageIntakeData = (intakeTimeTableByDate: TimeTableByDateType, todayDateStr: string, isIntakeCheck: boolean) => {
    const tempIntakeTimeTableByDate: TimeTableByDateType = JSON.parse(JSON.stringify(intakeTimeTableByDate)) // 객체 깊은 복사

    // 현재의 '영양제 시간표 틀 데이터'의 오늘 복용 기록, Props로 들어온 intakeTime에서, isTake의 값을 변경함 (복용 체크면 true로, 복용 체크 해제면 false로)
    tempIntakeTimeTableByDate[todayDateStr].intakeHistory[intakeTime].forEach((pillIntakeData, idx) => {
      if (pillIntakeData.pillId === pillId) {
        tempIntakeTimeTableByDate[todayDateStr].intakeHistory[intakeTime][idx].isTake = isIntakeCheck
      }
    })

    // 복용 체크 했으면 남은 영양제 개수를 하나 줄이고, 복용 체크를 해제 했으면 남은 영양제 개수를 하나 늘림
    if (isIntakeCheck) {
      tempIntakeTimeTableByDate[todayDateStr].remainIntakePillCnt -= 1
    } else {
      tempIntakeTimeTableByDate[todayDateStr].remainIntakePillCnt += 1
    }

    // 다 만들어진 데이터를 로컬 스토리지에 다시 넣음
    setIntakeTimeTableByDate(tempIntakeTimeTableByDate)
  }

  return (
    <button
      className='w-full flex flex-col items-center space-y-1'
      onClick={clickIntakeBtn}
    >
      <div className='relative w-16 h-16 rounded-full overflow-hidden'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(pillId.toString())}
          className='object-cover'
          layout='fill'
        />
        {isIntake &&
          <div className='absolute bg-[rgba(0,0,0,0.6)] left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
            <CheckCircle className='text-white text-2xl' />
          </div>
        }
      </div>
      <p className='w-full text-xs text-gray-900 truncate'>{pillNickName}</p>
    </button>
  )
}

export default PillIntakeBtn