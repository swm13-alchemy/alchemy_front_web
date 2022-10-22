import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import { Dayjs } from 'dayjs'

interface Props {
  userNickname: string
  ageRange: string
  isMale: boolean
  userThumbs: number
  createdAt: Dayjs
}

function AuthorInfoAtTheTopOfThePost({ userNickname, ageRange, isMale, userThumbs, createdAt }: Props) {
  return (
    <div className='flex justify-between'>
      {/* 유저 프로필 부분 */}
      <div className='flex items-center space-x-2.5'>
        {/* 프로필 사진 */}
        {/*<ProfileImgView imgUrl='/' />*/}
        {/* 프로필 정보 */}
        <div className='space-y-1'>
          <p className='text-sm font-bold'>{userNickname}</p>
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
  )
}

export default AuthorInfoAtTheTopOfThePost