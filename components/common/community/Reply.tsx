import { Dayjs } from 'dayjs'
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import SubdirectoryArrowRight from '@mui/icons-material/SubdirectoryArrowRight'
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

function Reply({ userId, userNickname, ageRange, isMale, userThumbs, createdAt, commentBody }: Props) {
  return (
    <div className='bg-white pl-4 pr-6 py-4 flex space-x-4'>
      <SubdirectoryArrowRight className='text-base text-gray-400' />
      <div className='space-y-4'>
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
          {/*/!* 답글달기 버튼 *!/*/}
          {/*<button className='text-xs'>*/}
          {/*  답글달기*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  )
}

export default Reply