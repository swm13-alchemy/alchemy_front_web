import { Dayjs } from 'dayjs'
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import MoreVert from '@mui/icons-material/MoreVert'
import SubdirectoryArrowRight from '@mui/icons-material/SubdirectoryArrowRight'

interface Props {
  userNickname: string
  ageRange: string
  isMale: boolean
  userThumbs: number
  createdAt: Dayjs
  commentBody: string
}

function Reply({ userNickname, ageRange, isMale, userThumbs, createdAt, commentBody }: Props) {
  return (
    <div className='bg-white pl-4 pr-6 py-4 flex space-x-4'>
      <SubdirectoryArrowRight className='text-base text-gray-400' />
      <div className='space-y-4'>
        {/* 작성자 정보 부분 */}
        <div className='flex justify-between'>
          {/* 유저 프로필 부분 */}
          <div className='flex items-center space-x-2.5'>
            {/* 프로필 사진 */}
            {/*<ProfileImgView imgUrl='/' />*/}
            {/* 프로필 정보 */}
            <div className='space-y-1'>
              <div className='flex items-center space-x-1'>
                <p className='text-sm font-bold'>{userNickname}</p>
                <p className='text-xs'>· {createdAt.format('h')}시간 전</p>
              </div>
              <div className='text-xs text-gray-400 flex items-center space-x-1'>
                <p>{ageRange} /</p>
                <p>{isMale ? '남성' : '여성'} ·</p>
                <ThumbUpOutlined className='text-base' />
                <p>{userThumbs}</p>
              </div>
            </div>
          </div>
          {/* 신고버튼 */}
          <button className='h-min flex items-center justify-center'>
            <MoreVert className='text-xl' />
          </button>
        </div>
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