import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import { Dayjs } from 'dayjs'
import AuthorInfoAtTheTopOfTheComment from './AuthorInfoAtTheTopOfTheComment'

interface Props {
  userId: number
  userNickname: string
  ageRange: string
  isMale: boolean
  userThumbs: number
  createdAt: Dayjs
  commentBody: string
}

function Comment({ userId, userNickname, ageRange, isMale, userThumbs, createdAt, commentBody }: Props) {
  return (
    <div className='bg-white px-6 py-4 space-y-4'>
      {/* 작성자 정보 부분 */}
      <AuthorInfoAtTheTopOfTheComment
        userId={userId}
        userNickname={userNickname}
        ageRange={ageRange}
        isMale={isMale}
        userThumbs={userThumbs}
        createdAt={createdAt}
      />
      {/* 댓글 본문 */}
      <p className='text-sm text-gray-700'>{commentBody}</p>
      <div className='flex items-center justify-between text-gray-400'>
        {/* 도움이 됐어요 버튼 */}
        <button className='flex items-center space-x-1'>
          <ThumbUpOutlined className='text-base' />
          <p className='text-xs'>도움이 됐어요 0</p>
        </button>
        {/* 답글달기 버튼 */}
        <button className='text-xs'>
          답글달기
        </button>
      </div>
    </div>
  )
}

export default Comment