import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import MoreVert from '@mui/icons-material/MoreVert'
import BackHeaderWithBtn from '../../../../components/layout/BackHeaderWithBtn'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ProfileImgView from '../../../../components/common/ProfileImgView'
import { requestURLs } from '../../../../utils/api'
import ThumbUp from '@mui/icons-material/ThumbUp'
import Link from 'next/link'
import ChevronRight from '@mui/icons-material/ChevronRight'
import EfficiencyTag from '../../../../components/tag/EfficiencyTag'
import PreviewPost from '../../../../components/common/community/PreviewPost'
import { getAgeRange } from '../../../../utils/functions/getAgeRange'
import dayjs from 'dayjs'

const UserProfile = () => {
  const router = useRouter()
  const userId: number = parseInt(router.query.userId as string)
  
  // TODO: userId로 필요한 정보 불러오는 api 처리하기
  useEffect(() => {
    
  }, [userId])

  return (
    <ContainerWithBottomNav>
      <BackHeaderWithBtn router={router} name={'OO님의 프로필'}>
        <button className='absolute right-1.5 flex items-center justify-center'>
          <MoreVert className='text-2xl text-gray-900' />
        </button>
      </BackHeaderWithBtn>

      <div className='space-y-4'>
        {/* 유저 기본 정보 부분 (닉네임, 나이, 성별, 프사, 따봉 수 등) */}
        <section className='relative bg-white px-6 py-4 flex items-center space-x-4'>
          {/* 프로필 사진 */}
          <ProfileImgView
            width='w-20'
            height='h-20'
            imgUrl={requestURLs.getSupplementThumbnailURL('1')}
            typesOfTrustedUser='pharmacist'
          />
          {/* 개인 정보 부분 */}
          <div className='flex flex-col justify-center space-y-1.5'>
            <p className='text-lg font-bold text-gray-900'>홍길동전주인공</p>
            <p className='text-xs text-gray-400'>20대 / 남성</p>
          </div>
          {/* 따봉 수 */}
          <div className='absolute right-0 bg-surface rounded-l-[2.5rem] px-6 py-5 flex flex-col items-center'>
            <ThumbUp className='text-base text-primary' />
            <p className='text-base font-bold text-primary'>1,329</p>
          </div>
        </section>
        {/* 포트폴리오 링크 */}
        <section className='bg-white px-6 py-4'>
          <Link href={`/community/userProfile/${1}/portfolio`}>
            <a className='text-gray-900 flex items-center justify-between'>
              <p className='text-base font-bold'>포트폴리오</p>
              <ChevronRight className='text-2xl' />
            </a>
          </Link>
        </section>
        {/* 보유 뱃지 목록 */}
        <section className='bg-white px-6 pt-4 pb-6 space-y-2'>
          <Link href='/'>
            <a className='text-gray-900 flex items-center justify-between'>
              <p className='text-base font-bold'>보유 뱃지 09/35</p>
              <ChevronRight className='text-2xl' />
            </a>
          </Link>
          <div className='flex space-x-2 overflow-x-scroll scrollbar-hide'>
            {['초보 건강러', '비타민 A 복용 초보', '초보 건강러', '비타민 B2 복용 초보', '비타민 B3 복용 초보'].map((badge) =>
              <BadgeView key={badge} badgeName={badge} />
            )}
          </div>
        </section>
        {/* 구독한 건강 고민 토픽 */}
        <section className='bg-white px-6 py-4 space-y-2'>
          <p className='text-base font-bold text-gray-900'>구독한 건강 고민 태그</p>
          <div className='flex items-center flex-wrap gap-2'>
            {["간건강", "눈건강", "혈액순환", "피로감", "치아건강"].map((efficacy) =>
              <EfficiencyTag key={efficacy} tagName={efficacy} />
            )}
          </div>
        </section>
        {/* 작성한 글 목록 */}
        <section className='space-y-1'>
          <p className='bg-white px-6 py-4 text-base font-bold text-gray-900'>작성한 포스트</p>
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
        </section>
      </div>

    </ContainerWithBottomNav>
  )
}

export default UserProfile

interface BadgeViewProps {
  badgeName: string
}
function BadgeView({ badgeName }: BadgeViewProps) {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <div className='w-[4.5rem] h-[4.5rem] bg-white rounded-2xl shadow-md border flex items-center justify-center'>
        Beginner
      </div>
      <p className='w-[4.5rem] text-xs text-gray-900'>{badgeName}</p>
    </div>
  )
}