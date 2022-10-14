import Image from 'next/image'
import { useEffect, useState } from 'react'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { intakeApi, PutIntakeHistoryType, requestURLs } from '../../../utils/api'
import { useUserInformation, useUserIntakeManagementStore } from '../../../stores/store'
import { useIntakeTimeTableByDate } from '../../../stores/nonLocalStorageStore'
import dayjs from 'dayjs'
import { changeLocalStorageIntakeData } from '../../../utils/functions/changeLocalStorageIntakeData'
import TopCenterSnackBar from '../TopCenterSnackBar'

interface Props {
  pillId: number
  selectedDate: string
  intakeTime: string
  isPillIntake: boolean
}

function PillIntakeBtn({ pillId, selectedDate, intakeTime, isPillIntake }: Props) {
  const userId = useUserInformation(state => state.userId)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const { intakeTimeTableByDate, setIntakeTimeTableByDate } = useIntakeTimeTableByDate()
  const [pillNickName, setPillNickName] = useState<string>('')
  const [isErrorSnackBarOpen, setIsErrorSnackBarOpen] = useState<boolean>(false)

  // 닉네임 가져오는 부분
  useEffect(() => {
    intakePillList.forEach((pill) => {
      if (pill.pillId === pillId) {
        setPillNickName(pill.pillNickName)
      }
    })
  }, [])

  /** 섭취 체크 버튼을 눌렀을 때 함수 */
  const clickIntakeBtn = () => {
    const todayDateStr: string = dayjs().format('YYYY-MM-DD')
    // 선택한 날짜가 오늘일 때만 복용 체크를 할 수 있으므로 체크
    if (selectedDate === todayDateStr) {
      // TODO: 추후 테스트하기 -> 일단 완료 정상 작동!
      // intakeTimeTableByDate가 null이 아닐 때 (가공이 끝났을 때 눌려짐)
      if (intakeTimeTableByDate && userId) {
        const todayIntakeHistory = intakeTimeTableByDate[todayDateStr]
        // 아직 안먹은 경우
        if (!isPillIntake) {
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

          // 완료된 기록을 서버에 보냄
          putIntakeHistoryFunc(tempPutHistoryJSONList)
            .then(() => {
              changeLocalStorageIntakeData(
                false,
                todayDateStr,
                intakeTime,
                intakeTimeTableByDate,
                setIntakeTimeTableByDate,
                pillId,
                true
              )
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
              changeLocalStorageIntakeData(
                false,
                todayDateStr,
                intakeTime,
                intakeTimeTableByDate,
                setIntakeTimeTableByDate,
                pillId,
                false
              )
            })
        }
      }
    } else {
      setIsErrorSnackBarOpen(true)
    }
  }

  // TODO: 서버에 기록이 안남겨짐 이거 오류 해결
  /** 서버에 섭취기록을 넣는 함수 (clickIntakeBtn 함수에서 호출) */
  const putIntakeHistoryFunc = async (intakeHistoryJSONList: PutIntakeHistoryType[]) => {
    await intakeApi.putIntakeHistory(intakeHistoryJSONList)
  }

  return (
    <>
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
          {isPillIntake &&
            <div className='absolute bg-[rgba(0,0,0,0.6)] left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
              <CheckCircle className='text-white text-2xl' />
            </div>
          }
        </div>
        <p className='w-full text-xs text-gray-900 truncate'>{pillNickName}</p>
      </button>

      <TopCenterSnackBar
        isSnackBarOpen={isErrorSnackBarOpen}
        setIsSnackBarOpen={setIsErrorSnackBarOpen}
        severity='error'
        content='오늘 날짜에 해당하는 복용 기록만 체크할 수 있습니다!'
      />
    </>
  )
}

export default PillIntakeBtn