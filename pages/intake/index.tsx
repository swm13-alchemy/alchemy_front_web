import { NextPage } from 'next'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import IntakeCalendar from '../../components/common/intakeCalendar/IntakeCalendar'
import MainHeader from '../../components/layout/MainHeader'
import ScheduleBox from '../../components/common/intake/ScheduleBox'
import Link from 'next/link'
import { useUserInformation, useUserIntakeManagementStore, useUserPillListStore } from '../../stores/store'
import React, { useEffect, useState } from 'react'
import {
  IntakeManagementType,
  TimeTableByDateType,
  TimeTableByDayType,
} from '../../utils/types'
import { makeIntakeTimeTableByDay } from '../../utils/functions/makeIntakeTimeTableByDay'
import { makeIntakeTimeTableByDate } from '../../utils/functions/makeIntakeTimeTableByDate'
import LoadingCircular from '../../components/layout/LoadingCircular'
import dayjs from 'dayjs'
import { useIntakeTimeTableByDate } from '../../stores/nonLocalStorageStore'
import { processPastIntakeHistory } from '../../utils/functions/processPastIntakeHistory'
import { useRouter } from 'next/router'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import Image from 'next/image'
import balanceIllust from '../../public/asset/image/balanceIllust.png'
import intakeIllust from '../../public/asset/image/intakeIllust.png'



const Intake: NextPage = () => {
  const router = useRouter()
  const userId = useUserInformation(state => state.userId)
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  const intakeServiceStartDate = useUserIntakeManagementStore(state => state.intakeServiceStartDate)
  const setIntakeServiceStartDate = useUserIntakeManagementStore(state => state.setIntakeServiceStartDate)
  const intakePillList: IntakeManagementType[] = useUserIntakeManagementStore(state => state.intakePillList)
  const setIntakePillList = useUserIntakeManagementStore(state => state.setIntakePillList)
  const { intakeTimeTableByDate, setIntakeTimeTableByDate } = useIntakeTimeTableByDate()
  // const [intakeTimeTableByDate, setIntakeTimeTableByDate] = useState<TimeTableByDateType | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'))  // 오늘 날짜로 초기 설정

  useEffect(() => {
    // 복용 관리 중인 영양제들 리스트를 활용해 '요일' 기준으로 요일 기준 영양제 시간표 데이터를 만듦
    const timeTableByDay: TimeTableByDayType = makeIntakeTimeTableByDay(intakePillList)

    // 위에서 만든 요일 기준 영양제 시간표 데이터를 활용하여 '영양제 시간표 틀 데이터'를 만듦
    const temporaryIntakeTimeTableByDate: TimeTableByDateType = makeIntakeTimeTableByDate(timeTableByDay)
    
    setIntakeTimeTableByDate(temporaryIntakeTimeTableByDate)

    // 과거 복용 기록을 서버에서 가져와 '영양제 시간표 틀 데이터'에 넣음
    if (userId) {
      processPastIntakeHistory(temporaryIntakeTimeTableByDate, userId)
        .then((finalIntakeTimeTableByDate) =>
          setIntakeTimeTableByDate(finalIntakeTimeTableByDate)
        )
    } else {  // 오류 처리
      alert('오류 : 유저 아이디 없음!')
      router.push('/initial')
    }
    
  }, [])

  if (!userId) {  // 로그인이 안되어 있는 경우 redirect
    router.push('/initial')
  }

  if (!arrayIsNotEmpty(userTakingPillList)) { // 등록된 영양제가 없는 경우 보여지는 화면
    return (
      <ContainerWithBottomNav>
        <MainHeader />

        <div className='bg-white w-full h-full flex flex-col items-center'>
          <div className='mt-[6.25rem] relative w-[18.75rem] h-[12.5rem]'>
            <Image
              src={balanceIllust}
              className='object-cover'
              layout='fill'
            />
          </div>
          <h1 className='mt-[1.5625rem] text-xl'>영양제 복용 관리 시작하기</h1>
          <p className='mt-[1.25rem] text-base'>섭취중인 영양제를 먼저 등록해주세요</p>
          <Link
            href='/search'
          >
            <a className='mt-[2.1875rem] w-11/12 h-10 bg-primary rounded-[0.625rem] text-base text-white flex items-center justify-center'>
              섭취중인 영양제 등록하러 가기
            </a>
          </Link>
        </div>
      </ContainerWithBottomNav>
    )
  }

  if (!arrayIsNotEmpty(intakePillList)) { // 등록된 영양제들은 있지만 영양제 시간표를 생성하지 않은 경우
    return (
      <ContainerWithBottomNav>
        <MainHeader />

        <div className='bg-white w-full h-full flex flex-col items-center'>
          <div className='mt-[6.25rem] relative w-[12.5rem] h-[12.5rem]'>
            <Image
              src={intakeIllust}
              className='object-cover'
              layout='fill'
            />
          </div>
          <h1 className='mt-[1.5625rem] text-xl'>영양제 복용 관리 시작하기</h1>
          <p className='mt-[1.25rem] text-base'>섭취중인 영양제를 먼저 등록해주세요</p>
          <Link
            href='/search'
          >
            <a className='mt-[2.1875rem] w-11/12 h-10 bg-primary rounded-[0.625rem] text-base text-white flex items-center justify-center'>
              섭취중인 영양제 등록하러 가기
            </a>
          </Link>
        </div>
      </ContainerWithBottomNav>
    )
  }

  if (!intakeTimeTableByDate) return <LoadingCircular />  // 로딩

  return (
    <ContainerWithBottomNav>
      <MainHeader />
      <div className='mt-2 space-y-2'>
        {/* 복용 기록 캘린더 */}
        <IntakeCalendar
          calendarMode='Week'
          intakeTimeTableByDate={intakeTimeTableByDate}
          setSelectedDate={setSelectedDate}
        />

        {/* 연속 섭취중 일수 + 편집 버튼 */}
        <div className='bg-surface px-6 py-4 text-xs flex items-center justify-between'>
          <p className='text-gray-900'>🔥 <strong className='font-bold text-red-500'>1일째</strong> 연속 섭취중</p>
          <Link href='/intake/edit-schedule'>
            <a className='text-primary'>
              시간표 편집
            </a>
          </Link>
        </div>

        {/* 영양제 시간표 부분 */}
        {
          intakeTimeTableByDate[selectedDate] &&
          Object.keys(intakeTimeTableByDate[selectedDate].intakeHistory).sort().map((intakeTime) =>
            <ScheduleBox
              key={intakeTime}
              intakeTime={intakeTime}
              timeTableDataList={intakeTimeTableByDate[selectedDate].intakeHistory[intakeTime]}
            />
          )
        }
      </div>
    </ContainerWithBottomNav>
  )
}

export default Intake
