import { useRouter } from 'next/router'
import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import PillListItem from '../../../../components/common/PillListItem'
import BackHeader from '../../../../components/layout/BackHeader'
import React, { useEffect, useState } from 'react'
import IntakeDaysBtns from '../../../../components/common/intake/IntakeDaysBtns'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { useUserInformationStore, useUserIntakeManagementStore, useUserPillListStore } from '../../../../stores/store'
import { Days, SupplementDetailsType } from '../../../../utils/types'
import dayjs, { Dayjs } from 'dayjs'
import { replaceValueInArray } from '../../../../utils/functions/replaceValueInArray'
import TimePickerModal from '../../../../components/common/intake/TimePickerModal'
import { arrayIsNotEmpty } from '../../../../utils/functions/arrayIsNotEmpty'
import { addWeeklyNotification } from '../../../../utils/functions/flutterBridgeFunc/intakeNotification'
import { isMobile } from '../../../../utils/functions/isMobile'
import TopCenterSnackBar from '../../../../components/common/TopCenterSnackBar'
import { intakeApi, PutIntakeHistoryType } from '../../../../utils/api'

const AddingPillNotification = () => {
  const router = useRouter()
  const id: number = parseInt(router.query.id as string)
  const userId = useUserInformationStore(state => state.userId)
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  const { intakeServiceStartDate, setIntakeServiceStartDate, intakePillList, setIntakePillList } = useUserIntakeManagementStore()
  const [pillName, setPillName] = useState<string>('')
  const [pillMaker, setPillMaker] = useState<string>('')
  const [pillNickName, setPillNickName] = useState<string>('')
  const [intakeDays, setIntakeDays] = useState<Days[]>([])
  const [intakeNum, setIntakeNum] = useState<number>(1)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean[]>([false, false, false, false, false])
  const [intakeTimesDayjs, setIntakeTimesDayjs] = useState<Dayjs[]>([dayjs().set('h', 9).set('m', 0)])
  const [intakeAmount, setIntakeAmount] = useState<number>(1)

  // 스낵바 boolean들
  const [isSaveSuccess, setIsSaveSuccess] = useState<boolean>(false)
  const [isNicknameError, setIsNicknameError] = useState<boolean>(false)
  const [isDayError, setIsDayError] = useState<boolean>(false)

  // 영양제 name, maker를 가져옴
  useEffect(() => {
    // 영양제의 name과 maker 값을 가져오기 위해 id로 검색
    const matchOne: SupplementDetailsType | undefined = userTakingPillList.find(x => x.id === id)
    if (matchOne !== undefined) {
      setPillName(matchOne.name)
      setPillMaker(matchOne.maker)
      setPillNickName(matchOne.name)
    }
  }, [])

  // // 섭취 시간이 변경될 때 시간배열을 string으로 변경하여 관리
  // useEffect(() => {
  //   setIntakeTimesStr(convertTimeArrayToStringArray(intakeTimes))
  // }, [intakeTimes])

  // 섭취 횟수 수정 함수
  const adjustIntakeNum = (isUp: boolean) => {
    if (isUp) {
      if (intakeNum < 5) {
        setIntakeNum(intakeNum + 1)
        setIntakeTimesDayjs(intakeTimesDayjs.concat(dayjs().set('h', 9).set('m', 0)))
      }
    } else {
      if (intakeNum > 1) {
        setIntakeNum(intakeNum - 1)
        setIntakeTimesDayjs(intakeTimesDayjs.slice(0, -1))
      }
    }
  }

  // 섭취 시간 모달 on, off 조작하는 함수
  const onOffModal = (isTurnOnModal: boolean, index: number) => {
    if (isTurnOnModal) {
      setIsTimePickerOpen(replaceValueInArray(isTimePickerOpen, index, true))
    } else {
      setIsTimePickerOpen(replaceValueInArray(isTimePickerOpen, index, false))
    }
  }

  // 섭취량 수정 함수
  const adjustAmountIntake = (isUp: boolean) => {
    if (isUp) {
      if (intakeAmount < 10) {
        setIntakeAmount(intakeAmount + 1)
      }
    } else {
      if (intakeAmount > 1) {
        setIntakeAmount(intakeAmount - 1)
      }
    }
  }

  // 저장 함수
  const saveNotification = () => {
    // // 지금 등록하는 영양제가 최초로 등록하는 영양제인 경우 서비스 시작 날짜를 저장
    // if (intakeServiceStartDate === null) {
    //   setIntakeServiceStartDate(dayjs())
    // }

    if (pillNickName !== '' && arrayIsNotEmpty(intakeDays) && userId) {
      // local storage에 저장
      setIntakePillList(intakePillList.concat({
        pillId: id,
        pillMaker: pillMaker,
        pillName: pillName,
        pillNickName: pillNickName,
        intakeDays: intakeDays,
        intakeNumber: intakeNum,
        intakeTimesDayjs: intakeTimesDayjs,
        intakeAmount: intakeAmount,
        startIntakeDate: dayjs()
      }))

      // flutter_local_notification에 알림 만듦
      if (isMobile()) {
        addWeeklyNotification(id, intakeDays, intakeTimesDayjs, `${pillNickName} 드실 시간이에요😉 비힐러가 늘 곁에서 챙겨드릴게요!`)
      }
      
      // 서버에 해당 영양제 복용 기록 false로 남기기
      ;(async () => {
        const tempPutHistoryJSONList: PutIntakeHistoryType[] = []

        intakeTimesDayjs.forEach((intakeTimeDayjs) => {
          tempPutHistoryJSONList.push({
            userId: userId,
            pillId: id,
            intakeDate: dayjs().format('YYYY-MM-DD'),
            intakeTime: intakeTimeDayjs.format('HH:mm'),
            isTake: false
          })
        })
        
        await intakeApi.putIntakeHistory(tempPutHistoryJSONList)
      })()

      // 다 완료되었으면 스낵바에 success 알리기
      setIsSaveSuccess(true)
      setTimeout(() => router.back(), 1000)
    } else {
      if (pillNickName === '') {
        setIsNicknameError(true)
      } else if (!arrayIsNotEmpty(intakeDays)) {
        setIsDayError(true)
      } else if (!userId) {
        alert('Error : 유저 아이디 없음!')
        router.back()
      }
    }
  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 알림 시간 추가' />

      <div className='space-y-2 pb-5'>
        {/* 영양제 정보 부분 */}
        <div className='m-6'>
          <PillListItem
            id={id}
            name={pillName}
            maker={pillMaker}
            prefixDomain='/pill-details'
          />
        </div>

        {/* 별명 설정 */}
        <div className='bg-white p-6 space-y-3'>
          <p className='text-base font-bold text-primary'>영양제 별명 <span className='text-xs'>(기본값 : 영양제 이름)</span></p>
          <input
            className='w-full px-4 py-3.5 bg-white text-sm text-gray-500 border border-gray-500 rounded-lg focus: outline-none'
            value={pillNickName}
            onChange={(e) => setPillNickName(e.target.value)}
            placeholder='(선택) 사용자 지정 영양제 별명'
          />
        </div>

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
          intakeTimesDayjs.map((dayjs, index) =>
            <button
              key={index}
              className='bg-white w-full flex items-center justify-between p-6 text-base font-bold text-gray-900'
              onClick={() => onOffModal(true, index)}
            >
              <p className='text-primary'>{index + 1}차 섭취 시간</p>
              <div className='flex items-center space-x-4'>
                <p>{dayjs.format('hh:mm A')}</p>
                <ChevronRight className='text-2xl' />
              </div>
            </button>
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
            <p>{intakeAmount}</p>
            <AddCircleOutline
              className='text-2xl'
              onClick={() => adjustAmountIntake(true)}
            />
          </div>
        </div>

        {/* 저장하기 버튼 */}
        <div className='px-8'>
          <button
            className='py-3.5 w-full rounded-[0.625rem] bg-primary text-sm font-bold text-gray-50 shadow-md'
            onClick={saveNotification}
          >
            저장하기
          </button>
        </div>
      </div>

      {/* TimePicker 모달들 */}
      <TimePickerModal
        idx={0}
        isTimePickerOpen={isTimePickerOpen}
        onOffModal={onOffModal}
        intakeTimesDayjs={intakeTimesDayjs}
        setIntakeTimesDayjs={setIntakeTimesDayjs}
      />
      <TimePickerModal
        idx={1}
        isTimePickerOpen={isTimePickerOpen}
        onOffModal={onOffModal}
        intakeTimesDayjs={intakeTimesDayjs}
        setIntakeTimesDayjs={setIntakeTimesDayjs}
      />
      <TimePickerModal
        idx={2}
        isTimePickerOpen={isTimePickerOpen}
        onOffModal={onOffModal}
        intakeTimesDayjs={intakeTimesDayjs}
        setIntakeTimesDayjs={setIntakeTimesDayjs}
      />
      <TimePickerModal
        idx={3}
        isTimePickerOpen={isTimePickerOpen}
        onOffModal={onOffModal}
        intakeTimesDayjs={intakeTimesDayjs}
        setIntakeTimesDayjs={setIntakeTimesDayjs}
      />
      <TimePickerModal
        idx={4}
        isTimePickerOpen={isTimePickerOpen}
        onOffModal={onOffModal}
        intakeTimesDayjs={intakeTimesDayjs}
        setIntakeTimesDayjs={setIntakeTimesDayjs}
      />

      {/* 스낵바들 */}
      {/* 등록 완료 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isSaveSuccess}
        setIsSnackBarOpen={setIsSaveSuccess}
        severity='success'
        content='편집이 완료되었습니다!'
      />
      {/* 입력 오류 알림 스낵바 (닉네임) */}
      <TopCenterSnackBar
        isSnackBarOpen={isNicknameError}
        setIsSnackBarOpen={setIsNicknameError}
        severity='error'
        content='영양제 별명을 입력해주세요'
      />
      {/* 입력 오류 알림 스낵바 (요일) */}
      <TopCenterSnackBar
        isSnackBarOpen={isDayError}
        setIsSnackBarOpen={setIsDayError}
        severity='error'
        content='섭취 요일을 선택해주세요'
      />
    </ContainerWithBottomNav>
  )
};

export default AddingPillNotification;