import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import MainHeader from '../../components/layout/MainHeader'
import SearchBtn from '../../components/common/search/SearchBtn'
import { NextPage } from 'next'
import { useUserInformationStore } from '../../stores/store'
import { useEffect, useState } from 'react'
import { userApi } from '../../utils/api'
import { TopicType, UserInformationTypes } from '../../utils/types'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import ListAlt from '@mui/icons-material/ListAlt'
import Link from 'next/link'
import PreviewPost from '../../components/common/community/PreviewPost'
import { getAgeRange } from '../../utils/functions/getAgeRange'
import dayjs from 'dayjs'
import Create from '@mui/icons-material/Create'

const Community: NextPage = () => {
  const { userId, oauthId } = useUserInformationStore()
  const [interestTopics, setInterestTopics] = useState<TopicType[]>([])
  const [activeTopicName, setActiveTopicName] = useState<string>('전체')

  // 유저 정보를 서버에서 가져옴
  useEffect(() => {
    if (oauthId) {
      (async () => {
        const { data: response } = await userApi.getUserInformationByOauthId(oauthId)
        const userInfo: UserInformationTypes = response.data
        if (userInfo) {
          setInterestTopics(userInfo.topics)
        }
      })()
    }
  }, [oauthId])

  return (
    <ContainerWithBottomNav>
      <MainHeader />

      <div className='space-y-2 pb-10'>
        {/* 커뮤니티 글 검색버튼 */}
        <div className='bg-white p-4'>
          <SearchBtn href='/' placeHolder='커뮤니티 글 검색' />
        </div>

        {/* 건강고민토픽 탭들 */}
        <div className='px-4 py-2 flex items-center space-x-2 overflow-x-scroll scrollbar-hide'>
          {userId &&
            <>
              {/* 건강고민토픽 검색 버튼 */}
              <Link href='/community/searchTopic'>
                <a className='bg-white rounded-lg p-1 shadow outline outline-1 outline-gray-200 flex items-center justify-center'>
                  <ListAlt className='text-2xl text-primary' />
                </a>
              </Link>
              {/* 구분선 */}
              <div className='h-6 border-r border-gray-200'></div>
            </>
          }
          {/* 전체, 포트폴리오 공유 버튼 */}
          <TopicTap
            topicName='전체'
            isActive={activeTopicName === '전체'}
            setActiveTopicName={setActiveTopicName}
          />
          {/* 사용자 관심 건강 고민 토픽 버튼들 */}
          {userId && arrayIsNotEmpty(interestTopics) &&
            interestTopics.map((topic) =>
              <TopicTap
                key={topic.id}
                topicName={topic.name}
                isActive={activeTopicName === topic.name}
                setActiveTopicName={setActiveTopicName}
              />
            )
          }
        </div>

        {/* 글 목록 표시 부분 */}
        <PreviewPost
          postId={1}
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          postTitle='2024년 6월 글제목 글 제목글 제목 글제목2022 글제목 글제목'
          postBody='Lorem ipsum dolor sit amet, consectetur adipiscing. Massa cras velit viverra duis odio consectetur nulla. Euismod sit eget ullamcorper integer pordafsdfasdfasd dsfasdfafsdafds'
          postTopics={['간건강', '치아건강']}
          postTags={['노화&항산화', '면역기능', '혈액생성', '멀티미네랄', '콜레스테롤 합성조절', '혈압호르몬조절', '혈당조절']}
          postLikeCnt={4}
          commentCnt={35}
          isLike={true}
          isBookmark={false}
        />
        <PreviewPost
          postId={1}
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          postTitle='2024년 6월 글제목 글 제목글 제목 글제목2022 글제목 글제목'
          postBody='Lorem ipsum dolor sit amet, consectetur adipiscing. Massa cras velit viverra duis odio consectetur nulla. Euismod sit eget ullamcorper integer pordafsdfasdfasd dsfasdfafsdafds'
          postTopics={['간건강', '치아건강']}
          postTags={['노화&항산화', '면역기능', '혈액생성', '멀티미네랄', '콜레스테롤 합성조절', '혈압호르몬조절', '혈당조절']}
          postLikeCnt={4}
          commentCnt={35}
          isLike={true}
          isBookmark={false}
        />
        <PreviewPost
          postId={1}
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          postTitle='2024년 6월 글제목 글 제목글 제목 글제목2022 글제목 글제목'
          postBody='Lorem ipsum dolor sit amet, consectetur adipiscing. Massa cras velit viverra duis odio consectetur nulla. Euismod sit eget ullamcorper integer pordafsdfasdfasd dsfasdfafsdafds'
          postTopics={['간건강', '치아건강']}
          postTags={['노화&항산화', '면역기능', '혈액생성', '멀티미네랄', '콜레스테롤 합성조절', '혈압호르몬조절', '혈당조절']}
          postLikeCnt={4}
          commentCnt={35}
          isLike={true}
          isBookmark={false}
        />
      </div>

      {/* 글쓰기 버튼 */}
      <div className='fixed right-4 bottom-[4.5rem] w-12 h-12 bg-primary z-60 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center'>
        <Link href='/community/addPost'>
          <a className='flex items-center justify-center'>
            <Create className='text-2xl text-white' />
          </a>
        </Link>
      </div>
    </ContainerWithBottomNav>
  )
}

export default Community

interface TopicTapProps {
  topicName: string
  isActive: boolean
  setActiveTopicName: (activeTopicName: string) => void
}
function TopicTap({ topicName, isActive, setActiveTopicName }: TopicTapProps) {
  return (
    <button
      className={'px-4 py-1.5 rounded-2xl text-sm whitespace-nowrap' +
        (isActive ? ' bg-primary outline-none text-white font-bold' : ' bg-white outline outline-1 outline-gray-400 text-gray-400 font-normal')}
      onClick={() => setActiveTopicName(topicName)}
    >
      {topicName === '전체' ? '전체' : `#${topicName}`}
    </button>
  )
}