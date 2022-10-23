import { Dayjs } from 'dayjs'
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import ThumbUp from '@mui/icons-material/ThumbUp'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'
import ShareOutlined from '@mui/icons-material/ShareOutlined'
import Bookmark from '@mui/icons-material/Bookmark'
import Link from 'next/link'
import BookmarkBorder from '@mui/icons-material/BookmarkBorder'
import AuthorInfoAtTheTopOfThePost from './AuthorInfoAtTheTopOfThePost'

interface Props {
  postId: number
  userId: number
  userNickname: string
  ageRange: string
  isMale: boolean
  userThumbs: number
  createdAt: Dayjs
  postTitle: string
  postBody: string
  postTopics: string[]
  postTags: string[]
  postLikeCnt: number
  commentCnt: number
  isLike: boolean
  isBookmark: boolean
}

function PreviewPost({ postId, userId, userNickname, ageRange, isMale, userThumbs, createdAt, postTitle, postBody, postTopics, postTags, postLikeCnt, commentCnt, isLike, isBookmark }: Props) {
  return (
    <div className='bg-white'>
      <div className='px-6 pt-6 pb-4 text-gray-900'>
        {/* 작성자 정보 부분 */}
        <AuthorInfoAtTheTopOfThePost
          userId={userId}
          userNickname={userNickname}
          ageRange={ageRange}
          isMale={isMale}
          userThumbs={userThumbs}
          createdAt={createdAt}
        />
        {/* 글 내용 부분 */}
        <Link href={`/community/postDetails/${postId}`}>
          <a>
            <div className='mt-4 space-y-4'>
              <main className='space-y-2'>
                {/* 글 제목 */}
                <h1 className='text-base font-bold truncate'>{postTitle}</h1>
                {/* 글 본문 */}
                <p className='text-sm ellipsisThreeLine'>{postBody}</p>
                {/* 글 태그들 */}
                <div className='flex items-center space-x-1 flex-wrap'>
                  {postTags.map((tag, idx) =>
                    <p key={idx} className='text-sm text-gray-400'>#{tag}</p>
                  )}
                </div>
              </main>
              <p className='text-xs text-primary'>더보기</p>
            </div>
          </a>
        </Link>
      </div>
      {/* 인터랙션 버튼들 */}
      <section className='px-6 py-4 border-t border-t-gray-100 text-gray-300 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          {/* 따봉 버튼 */}
          <button className='flex items-center space-x-1'>
            {isLike ? <ThumbUp className='text-2xl text-primary' /> : <ThumbUpOutlined className='text-2xl text-gray-300' />}
            <p className={'text-sm' + (isLike ? ' text-primary' : ' text-gray-300')}>도움이 됐어요 {postLikeCnt}</p>
          </button>
          {/* 댓글 버튼 */}
          <div className='flex items-center space-x-1'>
            <ChatBubbleOutline className='text-2xl' />
            <p className='text-sm'>{commentCnt}</p>
          </div>
          {/* 공유 버튼 */}
          <button className='flex items-center justify-center'>
            <ShareOutlined className='text-2xl' />
          </button>
        </div>
        {/* 북마크 버튼 */}
        <button className='flex items-center justify-center'>
          {isBookmark ? <Bookmark className='text-2xl text-primary' /> : <BookmarkBorder className='text-2xl text-gray-300' />}
        </button>
      </section>
    </div>
  )
}

export default PreviewPost