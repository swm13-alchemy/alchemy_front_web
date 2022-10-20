import ProfileImgView from '../ProfileImgView'
import { Dayjs } from 'dayjs'
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import ThumbUp from '@mui/icons-material/ThumbUp'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'
import ShareOutlined from '@mui/icons-material/ShareOutlined'
import BookmarkOutlined from '@mui/icons-material/BookmarkOutlined'
import Bookmark from '@mui/icons-material/Bookmark'

interface Props {
  userName: string
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

function CommunityPreviewPost({ userName, ageRange, isMale, userThumbs, createdAt, postTitle, postBody, postTopics, postTags, postLikeCnt, commentCnt, isLike, isBookmark }: Props) {
  return (
    <div className='bg-white'>
      <div className='px-6 pt-6 pb-4 text-gray-900 space-y-4'>
        {/* 상단 부분 */}
        <div className='flex justify-between'>
          {/* 유저 프로필 부분 */}
          <div className='flex items-center space-x-2.5'>
            {/* 프로필 사진 */}
            {/*<ProfileImgView imgUrl='/' />*/}
            {/* 프로필 정보 */}
            <div className='space-y-1'>
              <p className='text-sm font-bold'>{userName}</p>
              <div className='text-xs text-gray-400 flex items-center space-x-1'>
                <p>{ageRange} /</p>
                <p>{isMale ? '남성' : '여성'} ·</p>
                <ThumbUpOutlined className='w-4 h-4' />
                <p>{userThumbs}</p>
              </div>
            </div>
          </div>
          {/* 글 작성 시간 TODO: 이거수정 */}
          <p className='text-xs'>{createdAt.format('h')}시간 전</p>
        </div>
        {/* 글 내용 부분 */}
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
          {isBookmark ? <Bookmark className='text-2xl text-primary' /> : <BookmarkOutlined className='text-2xl text-gray-300' />}
        </button>
      </section>
    </div>
  )
}

export default CommunityPreviewPost