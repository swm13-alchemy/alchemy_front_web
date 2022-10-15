import BackHeader from '../../../../components/layout/BackHeader'
import PillListItem from '../../../../components/common/PillListItem'
import IntakeDaysBtns from '../../../../components/common/intake/IntakeDaysBtns'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import ChevronRight from '@mui/icons-material/ChevronRight'
import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Days, IntakeManagementType } from '../../../../utils/types'
import { useUserInformationStore, useUserIntakeManagementStore } from '../../../../stores/store'
import { replaceValueInArray } from '../../../../utils/functions/replaceValueInArray'
import dayjs, { Dayjs } from 'dayjs'
import TimePickerModal from '../../../../components/common/intake/TimePickerModal'
import { arrayIsNotEmpty } from '../../../../utils/functions/arrayIsNotEmpty'
import { isMobile } from '../../../../utils/functions/isMobile'
import {
  deleteWeeklyNotification,
  editWeeklyNotification,
} from '../../../../utils/functions/flutterBridgeFunc/intakeNotification'
import { intakeApi, PutIntakeHistoryType } from '../../../../utils/api'

const EditingPillNotification = () => {
  const router = useRouter()
  const userId = useUserInformationStore(state => state.userId)
  const pillId: number = parseInt(router.query.id as string)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const setIntakePillList = useUserIntakeManagementStore(state => state.setIntakePillList)
  const [pillName, setPillName] = useState<string>('')
  const [pillMaker, setPillMaker] = useState<string>('')
  const [pillNickName, setPillNickName] = useState<string>('')
  const [intakeDays, setIntakeDays] = useState<Days[]>([])
  const [intakeNum, setIntakeNum] = useState<number>(1)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean[]>([false, false, false, false, false])
  const [intakeTimesDayjs, setIntakeTimesDayjs] = useState<Dayjs[]>([dayjs().set('h', 9).set('m', 0)])
  const [intakeAmount, setIntakeAmount] = useState<number>(1)
  const [editingPillManagementData, setEditingPillManagementData] = useState<IntakeManagementType | null>(null) // 수정 전, 기존 값들

  // 해당 영양제 복용 관리 저장된 정보들을 가져옴 (사용자 설정 값들로 초기 설정)
  useEffect(() => {
    // 영양제 복용 관리 저장 값을 가져오기 위해 id로 검색
    const matchOne: IntakeManagementType | undefined = intakePillList.find(x => x.pillId === pillId)
    if (matchOne !== undefined) {
      setPillName(matchOne.pillName)
      setPillMaker(matchOne.pillMaker)
      setPillNickName(matchOne.pillNickName)
      setIntakeDays(matchOne.intakeDays)
      setIntakeNum(matchOne.intakeNumber)
      setIntakeTimesDayjs(matchOne.intakeTimesDayjs.map((dayjsStr) => dayjs(dayjsStr)))
      setIntakeAmount(matchOne.intakeAmount)
      setEditingPillManagementData(matchOne)
    } else {
      alert("Error: 복용 관리중인 영양제가 아닙니다.")
    }
  }, [])

  /** 섭취 횟수 수정 함수 */
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

  /** 섭취 시간 모달 on, off 조작하는 함수 */
  const onOffModal = (isTurnOnModal: boolean, index: number) => {
    if (isTurnOnModal) {
      setIsTimePickerOpen(replaceValueInArray(isTimePickerOpen, index, true))
    } else {
      setIsTimePickerOpen(replaceValueInArray(isTimePickerOpen, index, false))
    }
  }

  /** 섭취량 수정 함수 */
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

  /** 변경사항 저장 함수 */
  const saveNotification = () => {
    const tempIntakePillList = intakePillList.filter((pill) => pill.pillId !== pillId)
    if (pillNickName !== '' && arrayIsNotEmpty(intakeDays) && editingPillManagementData && userId) {
      // local storage에 저장
      setIntakePillList(tempIntakePillList.concat({
        pillId: pillId,
        pillMaker: pillMaker,
        pillName: pillName,
        pillNickName: pillNickName,
        intakeDays: intakeDays,
        intakeNumber: intakeNum,
        intakeTimesDayjs: intakeTimesDayjs,
        intakeAmount: intakeAmount,
        startIntakeDate: editingPillManagementData.startIntakeDate
      }))

      // TODO: 현재 오늘 날짜 시간표에 대한 시간표 편집만 가능함 (나중에 아예 UI 변경 자체가 필요함 -> 수정 누르면 오늘 시간표 편집이 아니라 그냥 전체 시간표 등록 영양제들 목록이 나오도록)
      // 서버에 저장된 기존 복용 기록 삭제
      if (!intakeDays.includes(dayjs().format('ddd') as Days)) {  // 수정한 복용 요일에 오늘 요일이 제거됐다면,
        // 오늘 저장된 해당 영양제의 모든 복용 기록들을 삭제함
        (async () => {
          await intakeApi.deleteIntakeHistory(userId, pillId)
        })()
      } else {  // 수정한 복용 요일에 오늘 요일이 포함되는 경우
        (async () => {
          // 오늘 저장된 해당 영양제의 모든 복용 기록을 삭제함
          await intakeApi.deleteIntakeHistory(userId, pillId)
            .then(() => { // 삭제가 완료되면 변경된 사항들을 바탕으로 복용 기록을 새로 채워넣음
              const tempPutHistoryJSONList: PutIntakeHistoryType[] = []

              intakeTimesDayjs.forEach((intakeTimeDayjs) => {
                tempPutHistoryJSONList.push({
                  userId: userId,
                  pillId: pillId,
                  intakeDate: dayjs().format('YYYY-MM-DD'),
                  intakeTime: intakeTimeDayjs.format('HH:mm'),
                  isTake: false
                })
              })

              intakeApi.putIntakeHistory(tempPutHistoryJSONList)
            })
        })()
      }


      // flutter_local_notification 기존 알림 수정
      if (isMobile()) {
        editWeeklyNotification(pillId, intakeDays, intakeTimesDayjs, `${pillNickName} 드실 시간이에요😉 비힐러가 늘 곁에서 챙겨드릴게요!`)
      }

      router.back()
    } else {
      if (pillNickName === '') {
        alert('영양제 별명을 입력해주세요')
      } else {
        alert('섭취 요일을 선택해주세요')
      }
    }
  }

  /** 복용 관리 목록에서 제거 함수 */
  const deleteNotification = async () => {
    if (userId) {
      // 오늘 저장된 서버에 있는 해당 영양제의 모든 복용 기록들을 삭제함
      await intakeApi.deleteIntakeHistory(userId, pillId)
        .then(() => {
          // local storage에서 해당 영양제 제거
          setIntakePillList(intakePillList.filter((pill) => pill.pillId !== pillId))

          // flutter_local_notification 기존 알림 삭제
          if (isMobile()) {
            deleteWeeklyNotification(pillId)
          }

          alert('복용 관리 목록에서 해당 영양제가 제거되었습니다.')

          router.back()
        })
    }
  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 알림 시간 추가' />

      <div className='space-y-2 pb-5'>
        {/* 영양제 정보 부분 */}
        <div className='m-6'>
          <PillListItem
            id={pillId}
            name={pillName}
            maker={pillMaker}
            prefixDomain='/pill-details'
          />
        </div>

        {/* 별명 설정 */}
        <div className='bg-white p-6 space-y-3'>
          <p className='text-base font-bold text-primary'>영양제 별명</p>
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
        <div className='px-8 space-y-2 text-sm'>
          <button
            className='py-3.5 w-full rounded-[0.625rem] bg-primary font-bold text-gray-50 shadow-md'
            onClick={saveNotification}
          >
            변경사항 저장
          </button>
          <button
            className='py-3.5 w-full bg-transparent text-red-400'
            onClick={deleteNotification}
          >
            복용 관리 목록에서 제거
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
    </ContainerWithBottomNav>
  )
}

export default EditingPillNotification