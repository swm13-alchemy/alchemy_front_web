import type { NextPage } from 'next'
import SearchBtn from '../components/common/search/SearchBtn'
import SEO from '../components/layout/SEO'
import DateBox from '../components/common/DateBox'
import MyPillList from '../components/common/MyPillList'
import ContainerWithBottomNav from '../components/layout/ContainerWithBottomNav'
import MainHeader from '../components/layout/MainHeader'

const Home: NextPage = () => {
  return (
    <ContainerWithBottomNav>
      <SEO title='PillUp: 스마트하게 건강 지키기' />

      {/*<div className='flex flex-col space-y-4'>*/}
      {/*  <header className='flex flex-col space-y-4 bg-white pb-4'>*/}
      {/*    <MainHeader />*/}
      {/*    <SearchBtn />*/}
      {/*  </header>*/}

      {/*  /!*<div className='flex flex-col items-center space-y-12 py-6 bg-white'>*!/*/}
      {/*  /!*  <section className='flex flex-col space-y-5 w-full'>*!/*/}
      {/*  /!*    <h2 className='text-xl font-bold px-3'>123일째 잘 먹고 있어요!😉</h2>*!/*/}
      {/*  /!*    <div className='flex w-full items-center justify-evenly'>*!/*/}
      {/*  /!*      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((name) => (*!/*/}
      {/*  /!*        <DateBox key={name} name={name} />*!/*/}
      {/*  /!*      ))}*!/*/}
      {/*  /!*    </div>*!/*/}
      {/*  /!*  </section>*!/*/}
      {/*  /!*</div>*!/*/}

      {/*  <div className='bg-white'>*/}
      {/*    <MyPillList />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className='bg-white h-screen flex flex-col space-y-32'>
        <MainHeader />
        <SearchBtn />
      </div>


    </ContainerWithBottomNav>
  )
}

export default Home
