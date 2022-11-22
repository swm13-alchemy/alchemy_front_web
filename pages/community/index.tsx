import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import MainHeader from '../../components/layout/MainHeader'
import SearchBtn from '../../components/common/search/SearchBtn'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { postApi, userApi } from '../../utils/api'
import { PostType, TopicType, UserInformationType } from '../../utils/types'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import ListAlt from '@mui/icons-material/ListAlt'
import Link from 'next/link'
import PreviewPost from '../../components/common/community/PreviewPost'
import { getAgeRange } from '../../utils/functions/getAgeRange'
import dayjs from 'dayjs'
import Create from '@mui/icons-material/Create'
import useUserInformation from '../../hooks/useUserInformation'

const Community: NextPage = () => {
  const { userId, oauthId } = useUserInformation()
  const [interestTopics, setInterestTopics] = useState<TopicType[]>([])
  const [activeTopic, setActiveTopic] = useState<TopicType>({ id: -1, name: '전체' })
  const [postList, setPostList] = useState<PostType[]>([])

  // 유저 정보를 서버에서 가져옴
  useEffect(() => {
    if (oauthId) {
      (async () => {
        const { data: response } = await userApi.getUserInformationByOauthId(oauthId)
        const userInfo: UserInformationType = response.data
        if (userInfo) {
          setInterestTopics(userInfo.topics)
        }
      })()
    }
  }, [oauthId])

  // active된 토픽에 해당하는 글들을 불러오는 부분
  useEffect(() => {
    if (activeTopic.name === '전체') {
      ;(async () => {
        const { data: response } = await postApi.getAllPost()
        const allPostData: PostType[] = response.data
        if (arrayIsNotEmpty(allPostData)) {
          // 시간순으로 정렬
          const sortedPostList = allPostData.sort((a, b) => (dayjs(a.createdAt).isAfter(b.createdAt) ? -1 : 1))
          setPostList(sortedPostList)
        } else {  // 불러온 데이터가 없는 경우
          setPostList([])
        }
      })()
    } else {
      ;(async () => {
        const { data: response } = await postApi.getPostWithTopicIds([activeTopic.id])
        const activeTopicPostData: PostType[] = response.data
        if (arrayIsNotEmpty(activeTopicPostData)) {
          // 시간순으로 정렬
          const sortedPostList = activeTopicPostData.sort((a, b) => (dayjs(a.createdAt).isAfter(b.createdAt) ? -1 : 1))
          setPostList(sortedPostList)
        } else {  // 불러온 데이터가 없는 경우
          setPostList([])
        }
      })()
    }
  }, [activeTopic])

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
            topic={{ id: -1, name: '전체' }}
            isActive={activeTopic.name === '전체'}
            setActiveTopic={setActiveTopic}
          />
          {/* 사용자 관심 건강 고민 토픽 버튼들 */}
          {userId && arrayIsNotEmpty(interestTopics) &&
            interestTopics.map((topic) =>
              <TopicTap
                key={topic.id}
                topic={topic}
                isActive={activeTopic.name === topic.name}
                setActiveTopic={setActiveTopic}
              />
            )
          }
        </div>

        {/* 글 목록 표시 부분 */}
        {arrayIsNotEmpty(postList) ? (  // 글 목록이 있는 경우
          postList.map((post) =>
            <PreviewPost
              key={post.id}
              postId={post.id}
              userId={post.user.id}
              userNickname={post.user.nickname}
              ageRange={getAgeRange(post.user.birth)}
              isMale={true} // TODO: 추후 백엔드 변경되면 수정
              userThumbs={1329}
              createdAt={dayjs(post.createdAt)}
              postTitle={post.title}
              postBody={post.content}
              postTags={post.topics.map(x => x.name)}  // TODO : 일단 건강고민토픽으로 진행
              postLikeCnt={post.likeCnt}
              commentCnt={35} // TODO : 일단 댓글은 구현 X
              isLike={false} // TODO : 추후 추가
              isBookmark={false}  // TODO : 추후 추가
            />
          )
        ) : ( // 조건에 맞는 글이 없는 경우
          <p className='pt-32 text-center text-lg text-gray-900'>작성된 글이 없습니다!<br/><strong className='text-primary'>가장 먼저 글을 작성해보세요 🤗</strong></p>
        )}
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
  topic: TopicType
  isActive: boolean
  setActiveTopic: (activeTopic: TopicType) => void
}
function TopicTap({ topic, isActive, setActiveTopic }: TopicTapProps) {
  return (
    <button
      className={'px-4 py-1.5 rounded-2xl text-sm whitespace-nowrap' +
        (isActive ? ' bg-primary outline-none text-white font-bold' : ' bg-white outline outline-1 outline-gray-400 text-gray-400 font-normal')}
      onClick={() => setActiveTopic(topic)}
    >
      {topic.name === '전체' ? '전체' : `#${topic.name}`}
    </button>
  )
}