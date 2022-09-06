import type { NextPage } from 'next'
import SearchBtn from '../components/common/search/SearchBtn'
import SEO from '../components/layout/SEO'
import DateBox from '../components/common/DateBox'
import MyPillList from '../components/common/MyPillList'
import ContainerWithBottomNav from '../components/layout/ContainerWithBottomNav'
import MainHeader from '../components/layout/MainHeader'
import Image from 'next/image'
import bigLogo from '../public/asset/image/bigLogo.png'
import React from 'react'

const Home: NextPage = () => {
  return (
    <ContainerWithBottomNav>
      <SEO title='BeeHealer' />

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

      <div className='bg-white h-screen flex flex-col'>
        <div className='relative w-[15.625rem] h-[3.83254rem] mx-auto mt-32 mb-10'>
          <Image
            src={bigLogo}
            className='object-cover'
            layout='fill'
          />
        </div>
        <SearchBtn />

        <div className='mt-28'>
          <MyPillList />
        </div>
      </div>


    </ContainerWithBottomNav>
  )
}

export default Home
