import { useRouter } from 'next/router'
import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import PillListItem from '../../../../components/common/PillListItem'
import BackHeader from '../../../../components/layout/BackHeader'
import { useEffect, useState } from 'react'
import IntakeDaysBtns, { IntakeDaysType } from '../../../../components/common/intake/IntakeDaysBtns'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import ChevronRight from '@mui/icons-material/ChevronRight'

const AddingPillNotification = () => {
  const router = useRouter()
  const time: string = router.query.time as string
  const id: number = parseInt(router.query.id as string)
  const [pillNickName, setPillNickName] = useState<string>()  // TODO: 추후 영양제 이름을 초기 값으로 넣기
  const [intakeDays, setIntakeDays] = useState<IntakeDaysType>({
    'Sun': false,
    'Mon': false,
    'Tue': false,
    'Wed': false,
    'Thu': false,
    'Fri': false,
    'Sat': false
  })
  const [intakeNum, setIntakeNum] = useState<number>(1)
  const [intakeTimes, setIntakeTimes] = useState<Array<Array<number>>>([[9,0]])
  const [amountIntake, setAmountIntake] = useState<number>(1)

  const adjustIntakeNum = (isUp: boolean) => {
    if (isUp) {
      if (intakeNum < 5) {
        setIntakeNum(intakeNum + 1)
        setIntakeTimes(intakeTimes.concat([[9,0]]))
      }
    } else {
      if (intakeNum > 1) {
        setIntakeNum(intakeNum - 1)
        setIntakeTimes(intakeTimes.slice(0, -1))
      }
    }
  }

  const adjustAmountIntake = (isUp: boolean) => {
    if (isUp) {
      if (amountIntake < 10) {
        setAmountIntake(amountIntake + 1)
      }
    } else {
      if (amountIntake > 1) {
        setAmountIntake(amountIntake - 1)
      }
    }
  }

  const saveNotification = () => {

  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 알림 시간 추가' />

      <div className='space-y-2 pb-5'>
        {/* 영양제 정보 부분 */}
        <div className='m-6'>
          <PillListItem
            id={1}
            name='Alpha GPS 300mg 60 Veg Capsule (Cognigination)'
            maker='now'
            prefixDomain='/pill-details'
          />
        </div>

        {/* 별명 설정 */}
        <input
          className='w-full px-4 py-3.5 bg-white text-sm text-gray-500 focus: outline-none'
          value={pillNickName}
          onChange={(e) => setPillNickName(e.target.value)}
          placeholder='(선택) 사용자 지정 영양제 별명'
        />

        {/* 섭취 요일 */}
        <IntakeDaysBtns intakeDays={intakeDays} setIntakeDays={setIntakeDays} />

        {/* 섭취 횟수 */}
        <div className='w-full p-6 bg-white text-base text-gray-900 flex items-center justify-between'>
          <p className='text-primary font-bold'>섭취 횟수</p>
          <div className='flex space-x-5'>
            <RemoveCircleOutline
              className='text-2xl'
              onClick={() => adjustIntakeNum(false)}
            />
            <p>{intakeNum}</p>
            <AddCircleOutline
              className='text-2xl'
              onClick={() => adjustIntakeNum(true)}
            />
          </div>
        </div>

        {/* 섭취 시간 */}
        {
          intakeTimes.map((time, index) =>
            <div key={index} className='bg-white w-full flex items-center justify-between p-6 text-base font-bold text-gray-900'>
              <p className='text-primary'>{index + 1}차 섭취 시간</p>
              <div className='flex items-center space-x-4'>
                <p>{time}</p>
                <ChevronRight className='text-2xl' />
              </div>
            </div>
          )
        }

        {/* 섭취량 */}
        <div className='w-full p-6 bg-white text-base text-gray-900 flex items-center justify-between'>
          <p className='text-primary font-bold'>1회 복용 시 섭취량</p>
          <div className='flex space-x-5'>
            <RemoveCircleOutline
              className='text-2xl'
              onClick={() => adjustAmountIntake(false)}
            />
            <p>{amountIntake}</p>
            <AddCircleOutline
              className='text-2xl'
              onClick={() => adjustAmountIntake(true)}
            />
          </div>
        </div>

        {/* 저장하기 버튼 */}
        <div className='px-8'>
          <button
            className='py-3.5 w-full rounded-[0.625rem] bg-primary text-gray-50 shadow-md'
            onClick={saveNotification}
          >
            저장하기
          </button>
        </div>
      </div>
    </ContainerWithBottomNav>
  )
};

export default AddingPillNotification;