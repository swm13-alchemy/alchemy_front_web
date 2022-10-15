import type { NextPage } from 'next'
import SearchBtn from '../components/common/search/SearchBtn'
import SEO from '../components/layout/SEO'
import MyPillList from '../components/common/MyPillList'
import ContainerWithBottomNav from '../components/layout/ContainerWithBottomNav'
import Image from 'next/image'
import bigLogo from '../public/asset/image/bigLogo.png'
import PillLenseFNB from '../components/layout/PillLenseFNB'
import MainHeader from '../components/layout/MainHeader'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Link from 'next/link'
import useUserNutrientsBalanceData from '../hooks/useUserNutrientsBalanceData'
import useUserIntakeTimeTableByDate from '../hooks/useUserIntakeTimeTableByDate'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { TimeTableByDateType } from '../utils/types'
import { getWeekNumber } from '../utils/functions/getWeekNumber'
import homeIntakeIllust from '../public/asset/image/homeIntakeIllust.png'
import { WeekDateBoxContainer } from '../components/common/intakeCalendar/IntakeCalendar'

const Home: NextPage = () => {
  const [todayStr, setTodayStr] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [todayDayjs, setTodayDayjs] = useState<Dayjs>(dayjs())
  const [datesOfThisWeek, setDatesOfThisWeek] = useState<string[]>([])

  // 섭취중인 영양분 데이터 가져오기 (커스텀 훅)
  const { wellIntakePercent } = useUserNutrientsBalanceData()

  // 복용 관리 기록 데이터 가져오기 (커스텀 훅)
  const intakeTimeTableByDate: TimeTableByDateType | null = useUserIntakeTimeTableByDate(todayDayjs)

  // 오늘 날짜에 해당하는 일주일의 날짜를 string 형태의 배열로 만들어서 state에 저장
  useEffect(() => {
    let firstDateOfTheWeek = dayjs().day(0)
    const tempDates: string[] = []
    for (let i = 0; i < 7; i++) {
      tempDates.push(firstDateOfTheWeek.format('YYYY-MM-DD'))
      firstDateOfTheWeek = firstDateOfTheWeek.add(1, 'day')
    }
    setDatesOfThisWeek(tempDates)
  }, [])

  return (
    <ContainerWithBottomNav>
      <SEO title='BeeHealer' />

      <MainHeader />

      <div className='space-y-4'>
        {/* 검색 버튼 부분 */}
        <section className='bg-white p-4'>
          <SearchBtn />
        </section>

        {/* 밸런스 요약 부분 */}
        <Link href='/balance'>
          <a className='bg-white px-6 py-5 flex items-center justify-between text-gray-900'>
            <div className='flex items-center space-x-4'>
              {/* 원형 그래프 */}
              <div
                className='inline-block relative w-20 h-20 rounded-full flex items-center justify-center'
                style={{ background: `conic-gradient(#3B82F6 0% ${wellIntakePercent}%, #BFDBFE ${wellIntakePercent}% 100%)` }}
              >
              <span className='w-14 h-14 bg-white rounded-full flex items-center justify-center'>
                <p className='text-base font-bold'>{wellIntakePercent}%</p>
              </span>
              </div>
              {/* 요약 텍스트 */}
              <div className='space-y-0.5'>
                <p className='text-lg leading-6 font-bold'>섭취 영양분의 {wellIntakePercent}%를<br/>잘 먹고 있어요!</p>
                <p className='text-sm text-gray-400'>분석 리포트 보러가기</p>
              </div>
            </div>
            <ChevronRight className='text-2xl' />
          </a>
        </Link>

        {/* Link끼리 띄우기용 */}
        <div></div> 

        {/* 복용 관리 요약 부분 */}
        {intakeTimeTableByDate &&
          <Link href='/intake'>
            <a>
              <div className='bg-white p-6 relative'>
                {/* 일러스트 */}
                <div className='absolute w-[9.25rem] h-[7.75rem] top-0 right-0'>
                  <Image
                    src={homeIntakeIllust}
                    className='object-cover'
                    layout='fill'
                  />
                </div>
                {/* 텍스트 부분 */}
                <div className='space-y-2 text-gray-900'>
                  <p className='text-xl font-bold'>{dayjs().get('M')}월 {getWeekNumber(dayjs())}주차 복용 관리</p>
                  <p className='text-sm'>꾸준함이 좋은 건강을 만들어요!<br/>비힐러가 함께 도와드릴게요.</p>
                </div>
                {/* 일주일 복용 현황 부분 */}
                <div className='mt-8 pointer-events-none'>
                  <WeekDateBoxContainer
                    datesOfThisWeek={datesOfThisWeek}
                    intakeTimeTableByDate={intakeTimeTableByDate}
                    selectedDate={todayStr}
                    setSelectedDate={setTodayStr}
                  />
                </div>
              </div>
            </a>
          </Link>
        }
      </div>

      {/*<div className='bg-white h-screen flex flex-col'>*/}
      {/*  <div className='relative w-[15.625rem] h-[3.83254rem] mx-auto mt-32 mb-10'>*/}
      {/*    <Image src={bigLogo} className='object-cover' layout='fill' />*/}
      {/*  </div>*/}
      {/*  <SearchBtn />*/}

      {/*  <div className='mt-28'>*/}
      {/*    <MyPillList />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <PillLenseFNB />
    </ContainerWithBottomNav>
  )
}

export default Home
