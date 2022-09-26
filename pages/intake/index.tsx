import { NextPage } from 'next'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import IntakeCalendar from '../../components/common/intakeCalendar/IntakeCalendar'
import MainHeader from '../../components/layout/MainHeader'
import ScheduleBox from '../../components/common/intake/ScheduleBox'
import Link from 'next/link'

const Intake: NextPage = () => {

  return (
    <ContainerWithBottomNav>
      <MainHeader/>
        {/*<div className='flex flex-col items-center space-y-12 py-6 bg-white'>*/}
        {/*  <section className='flex flex-col space-y-5 w-full'>*/}
        {/*    <h2 className='text-xl font-bold px-3'>123일째 잘 먹고 있어요!😉</h2>*/}
        {/*    <div className='flex w-full items-center justify-evenly'>*/}
        {/*      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((name) => (*/}
        {/*        <DateBox key={name} name={name} />*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </section>*/}
        {/*</div>*/}
      <div className='mt-2 space-y-2'>
        {/* 복용 기록 캘린더 */}
        <IntakeCalendar />

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
        <ScheduleBox />
        <ScheduleBox />
      </div>
    </ContainerWithBottomNav>
  )
}

export default Intake
