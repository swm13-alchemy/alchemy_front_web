import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import { Dayjs } from 'dayjs'
import Link from 'next/link'
import { getTimeDiff } from '../../../utils/functions/getTimeDiff'

interface Props {
  userId: string
  userNickname: string
  ageRange: string
  isMale: boolean
  userThumbs: number
  createdAt: Dayjs
}

function AuthorInfoAtTheTopOfThePost({ userId, userNickname, ageRange, isMale, userThumbs, createdAt }: Props) {
  return (
    <div className='flex justify-between'>
      {/* 작성자 정보 부분 */}
      <Link href={`/community/userProfile/${userId}`}>
        <a>
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
        </a>
      </Link>
      {/* 글 작성 시간 */}
      <p className='text-xs'>{getTimeDiff(createdAt)}</p>
    </div>
  )
}

export default AuthorInfoAtTheTopOfThePost