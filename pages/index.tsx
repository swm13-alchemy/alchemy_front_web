import type { NextPage } from 'next'
import SearchBtn from '../components/common/search/SearchBtn'
import SEO from '../components/layout/SEO'
import MyPillList from '../components/common/MyPillList'
import ContainerWithBottomNav from '../components/layout/ContainerWithBottomNav'
import Image from 'next/image'
import bigLogo from '../public/asset/image/bigLogo.png'
import React from 'react'
import PillLenseFNB from '../components/layout/PillLenseFNB'

const Home: NextPage = () => {
  return (
    <ContainerWithBottomNav>
      <SEO title='BeeHealer' />

      <div className='bg-white h-screen flex flex-col'>
        <div className='relative w-[15.625rem] h-[3.83254rem] mx-auto mt-32 mb-10'>
          <Image src={bigLogo} className='object-cover' layout='fill' />
        </div>
        <SearchBtn />

        <div className='mt-28'>
          <MyPillList />
        </div>
      </div>

      <PillLenseFNB />
    </ContainerWithBottomNav>
  )
}

export default Home
