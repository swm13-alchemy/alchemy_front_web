import ContainerWithBottomNav from '../../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import SearchBtn from '../../../components/common/search/SearchBtn'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import React from 'react'
import SubscribedTopicTag from '../../../components/tag/SubscribedTopicTag'
import TopicSubscribeBtn from '../../../components/common/community/TopicSubscribeBtn'

const SearchTopic = () => {
  const router = useRouter()

  return (
    <ContainerWithBottomNav>
      <header className='relative py-2 flex items-center justify-center text-gray-900 bg-white'>
        <button
          className='absolute left-4 flex items-center justify-center'
          onClick={() => router.back()}
        >
          <ChevronLeft className='text-2xl' />
        </button>
        <h1 className='text-base'>건강 고민 토픽 검색</h1>
      </header>
      {/* 검색창 */}
      <div className='bg-white p-4'>
        <SearchBtn href='/' placeHolder='커뮤니티 글 검색' />
      </div>
      <div className='px-6 py-4 space-y-2'>
        <p className='text-lg font-bold text-gray-900'>관심있는 건강 고민을 선택해주세요.</p>
        <p className='text-xs text-gray-400'>최대 8개까지 선택 가능해요!</p>
      </div>
      <div className='space-y-4'>
        {/* 구독중인 건강 고민 토픽 보여주는 부분 */}
        <section className='bg-white p-6 space-y-4'>
          <p className='text-base text-gray-900'><strong>구독중인</strong> 건강 고민 토픽</p>
          <div className='flex flex-wrap items-center gap-2'>
            {['간건강', '혈액생성', '피부건강', '혈압호르몬조절', '면역기능', '피로감'].map((topic) =>
              <SubscribedTopicTag key={topic} tagName={topic} />
            )}
          </div>
        </section>
        {/* 최근 인기있는 건강 고민 토픽 부분 */}
        <section className='bg-white p-6 space-y-4'>
          <p className='text-base text-gray-900'><strong>최근 인기있는</strong> 건강 고민 토픽</p>
          <div className='space-y-2'>
            {[{topicName: '간건강', subscribersNum: 1000, isSubscribe: false}, {topicName: '피로감', subscribersNum: 653, isSubscribe: true}, {topicName: '피부건강', subscribersNum: 354, isSubscribe: true}, {topicName: '혈액순환', subscribersNum: 21, isSubscribe: false}].map((topic) =>
              <TopicSubscribeBtn
                key={topic.topicName}
                topicName={topic.topicName}
                subscribersNum={topic.subscribersNum}
                isSubscribe={topic.isSubscribe}
              />
            )}
          </div>
        </section>
      </div>
    </ContainerWithBottomNav>
  )
}

export default SearchTopic