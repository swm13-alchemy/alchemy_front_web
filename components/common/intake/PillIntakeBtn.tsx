import Image from 'next/image'
import { useEffect, useState } from 'react'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { intakeApi, requestURLs } from '../../../utils/api'
import { useUserIntakeManagementStore } from '../../../stores/store'
import { useIntakeTimeTableByDate } from '../../../stores/nonLocalStorageStore'
import dayjs, { Dayjs } from 'dayjs'

interface Props {
  pillId: number
  intakeTime: string
  isPillIntake: boolean
}

function PillIntakeBtn({ pillId, intakeTime, isPillIntake }: Props) {
  const [isIntake, setIsIntake] = useState<boolean | null>(isPillIntake)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const intakeTimeTableByDate = useIntakeTimeTableByDate(state => state.intakeTimeTableByDate)
  const [pillNickName, setPillNickName] = useState<string>('')

  useEffect(() => {
    intakePillList.forEach((pill) => {
      if (pill.pillId === pillId) {
        setPillNickName(pill.pillNickName)
      }
    })
  }, [])

  const clickIntakeBtn = () => {
    // TODO: put api 개발이 끝나면 주석 지우고 테스트하기
    // // intakeTimeTableByDate가 null이 아닐 때 (가공이 끝날을 때 눌려짐)
    // if (intakeTimeTableByDate !== null) {
    //   const todayIntakeHistory = intakeTimeTableByDate[dayjs().format('YYYY-MM-DD')]
    //   // 만약 오늘 복용 기록 체크를 한 번도 안했었다면 영양제 시간표에 있는 전체 스케쥴에 대한 복용 관리 기록을 서버에 보냄
    //   // (복용 체크 안한 것은 isTake = false로)
    //   if (todayIntakeHistory.remainIntakePillCnt === todayIntakeHistory.totalIntakePillCnt) {
    //     Object.keys(todayIntakeHistory.intakeHistory).forEach((curIntakeTime) => {
    //       todayIntakeHistory.intakeHistory[intakeTime].forEach((timeTablePillData) => {
    //         putIntakeHistoryFunc('유저아이디', timeTablePillData.pillId, dayjs(), curIntakeTime, false)
    //       })
    //     })
    //     // 전체 복용 기록 false로 넣는게 끝난 후, 클릭한 영양제만 true로 보내기
    //     putIntakeHistoryFunc('유저아이디', pillId, dayjs(), intakeTime, true)
    //       .then(() => setIsIntake(!isIntake))
    //   } else {
    //     // 만약 오늘 복용 기록 체크한 다른 영양제가 있었다면 새롭게 체크하는 영양제만 put으로 보내기
    //     putIntakeHistoryFunc('유저아이디', pillId, dayjs(), intakeTime, !isIntake)
    //       .then(() => setIsIntake(!isIntake))
    //   }
    // }
    setIsIntake(!isIntake)
  }

  const putIntakeHistoryFunc = async (userId: string, pillId: number, intakeDate: Dayjs, intakeTime: string, isTake: boolean) => {
    await intakeApi.putIntakeHistory(userId, pillId, intakeDate, intakeTime, !isTake)
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