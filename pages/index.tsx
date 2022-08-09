import type { NextPage } from 'next'
import BottomNavBar from '../components/layout/BottomNavBar'
import SearchBtn from '../components/common/SearchBtn'
import Seo from '../components/layout/Seo'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import DateBox from '../components/common/DateBox'
import MyPillList from '../components/common/MyPillList'
import PillLenseFNB from '../components/layout/PillLenseFNB'

const MY: NextPage = () => {
  return (
    <div>
      <Seo title='PillUp: 스마트하게 건강 지키기' />
      <header className='w-full h-12 flex items-center justify-between px-2'>
        <Link href='/'>
          <a className='text-2xl'>Pillup</a>
        </Link>
        <FontAwesomeIcon icon={faGear} className='text-2xl' />
      </header>

      <main className='mx-auto mt-5 flex flex-col space-y-8'>
        <h1 className='text-5xl text-center'>
          How is your
          <br />
          health today?
        </h1>
        <SearchBtn btnWidth='w-11/12' />
      </main>

      <div className='flex flex-col items-center space-y-12 my-6'>
        <section className='flex flex-col space-y-5 w-full'>
          <h2 className='text-xl font-bold px-3'>123일째 잘 먹고 있어요!😉</h2>
          <div className='flex w-full items-center justify-evenly'>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((name) => (
              <DateBox key={name} name={name} />
            ))}
          </div>
        </section>
      </div>

      <MyPillList />

      <PillLenseFNB />

      <BottomNavBar />
    </div>
  )
}

export default MY
