import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import ProfileImgView from '../../components/common/ProfileImgView'
import BookmarkBorder from '@mui/icons-material/BookmarkBorder'
import Edit from '@mui/icons-material/Edit'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'
import MyPillList from '../../components/common/MyPillList'
import EfficiencyTag from '../../components/tag/EfficiencyTag'
import React, { useEffect, useState } from 'react'
import ListAlt from '@mui/icons-material/ListAlt'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Link from 'next/link'
import Filter1 from '@mui/icons-material/Filter1'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import Lock from '@mui/icons-material/Lock'
import LiveHelpOutlined from '@mui/icons-material/LiveHelpOutlined'
import { useUserInformation } from '../../stores/store'
import { userApi } from '../../utils/api'
import { UserInformationTypes } from '../../utils/types'
import LoadingCircular from '../../components/layout/LoadingCircular'
import { getAgeRange } from '../../utils/functions/getAgeRange'
import PersonOutline from '@mui/icons-material/PersonOutline'

const MyPage = () => {
  const oauthId = useUserInformation(state => state.oauthId)
  const [nickname, setNickname] = useState<string>('')
  const [ageRange, setAgeRange] = useState<string>('')
  const [isMale, setIsMale] = useState<boolean | null>(null)

  // 유저 정보를 서버에서 가져옴
  useEffect(() => {
    if (oauthId) {
      (async () => {
        const { data: response } = await userApi.getUserInformationByOauthId(oauthId)
        const userInfo: UserInformationTypes = response.data
        if (userInfo) {
          setNickname(userInfo.nickname)
          setAgeRange(getAgeRange(userInfo.birth))
          setIsMale(userInfo.isMale)
        }
      })()
    }
  }, [oauthId])

  if (!(nickname && ageRange && isMale)) return <LoadingCircular />

  return (
    <ContainerWithBottomNav>
      {/* 헤더 부분 */}
      <header className='relative py-2 flex items-center justify-center text-gray-900 bg-white shadow'>
        <h1 className='text-base'>마이페이지</h1>
        {/*<button className='absolute right-4 flex items-center justify-center'>*/}
        {/*  <MoreHoriz className='text-2xl' />*/}
        {/*</button>*/}
      </header>

      {/* 프로필 정보 부분 */}
      <section className='bg-white px-6 py-4 flex items-center space-x-4'>
        {/*<ProfileImgView imgUrl={test} />*/}
        <div className='flex flex-col space-y-1'>
          <p className='text-lg font-bold text-gray-900'>{nickname}</p>
          <p className='text-xs text-gray-400'>{ageRange} / {isMale ? '남성' : '여성'}</p>
        </div>
      </section>

      {/* 커뮤니티 북마크, 쓴 글, 댓글 확인 부분 */}
      {/*<section className='p-4 flex items-center justify-between space-x-2.5'>*/}
      {/*  <CommunityManagementBtn btnName='북마크한 글'>*/}
      {/*    <BookmarkBorder className='text-2xl text-primary' />*/}
      {/*  </CommunityManagementBtn>*/}
      {/*  <CommunityManagementBtn btnName='내가 쓴 글'>*/}
      {/*    <Edit className='text-2xl text-primary' />*/}
      {/*  </CommunityManagementBtn>*/}
      {/*  <CommunityManagementBtn btnName='댓글 단 글'>*/}
      {/*    <ChatBubbleOutline className='text-2xl text-primary' />*/}
      {/*  </CommunityManagementBtn>*/}
      {/*</section>*/}

      <div className='space-y-2 mt-2'>
        {/* 내 영양제 목록 부분 */}
        <section className='bg-white p-6'>
          <MyPillList />
        </section>

        {/* 관심 건강 고민 부분 */}
        {/*<section className='bg-white px-6 py-4 space-y-4'>*/}
        {/*  <div className='flex items-center space-x-2'>*/}
        {/*    <p className='text-base font-bold text-gray-900'>관심 건강 고민</p>*/}
        {/*    <button className='bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-500'>관리</button>*/}
        {/*  </div>*/}
        {/*  <div className='flex items-center flex-wrap gap-2'>*/}
        {/*    {['간 건강', '눈 건강', '혈액순환', '피로감', '치아건강', '스트레스 & 수면', '혈중 중성지방', '체지방'].map((efficacy) =>*/}
        {/*    <EfficiencyTag key={efficacy} tagName={efficacy} />*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* 영양제 편의 부분 */}
        {/*<section className='bg-white px-6 py-4'>*/}
        {/*  <p className='text-base font-bold text-gray-900 mb-1'>영양제 편의</p>*/}
        {/*  <ListLinkBtn href='' btnName='관심 제품 목록'>*/}
        {/*    <ListAlt className='text-2xl text-gray-400' />*/}
        {/*  </ListLinkBtn>*/}
        {/*  <ListLinkBtn href='' btnName='리뷰 관리'>*/}
        {/*    <Filter1 className='text-2xl text-gray-400' />*/}
        {/*  </ListLinkBtn>*/}
        {/*</section>*/}
        
        {/* 고객 센터 부분 */}
        <section className='bg-white px-6 py-4'>
          <p className='text-base font-bold text-gray-900 mb-1'>고객 센터</p>
          <ListLinkBtn href='/mypage/customer-service' btnName='문의/건의하기'>
            <LiveHelpOutlined className='text-2xl text-gray-400' />
          </ListLinkBtn>
          <ListLinkBtn href='https://swm13-alchemists.notion.site/56d438e60baa4f8a86a88fbcb23e86d7' btnName='서비스 이용약관'>
            <CheckCircleOutline className='text-2xl text-gray-400' />
          </ListLinkBtn>
          <ListLinkBtn href='https://swm13-alchemists.notion.site/de276bcf42a74938a7d6bd1ee3353358' btnName='개인정보 처리 방침'>
            <Lock className='text-2xl text-gray-400' />
          </ListLinkBtn>
          <ListLinkBtn href='/mypage/account-management' btnName='계정 관리'>
            <PersonOutline className='text-2xl text-gray-400' />
          </ListLinkBtn>

          <p className='mt-4 text-xs text-gray-400'>앱 버전 0.1.0</p>
        </section>
      </div>
    </ContainerWithBottomNav>
  )
}

export default MyPage

interface CommunityManagementBtnProps {
  btnName: string
  children: React.ReactNode
}
function CommunityManagementBtn({ btnName, children }: CommunityManagementBtnProps) {
  return (
    <button className='grow bg-surface rounded-lg px-4 py-2.5 flex flex-col items-center space-y-1'>
      {children}
      <p className='text-xs text-gray-900'>{btnName}</p>
    </button>
  )
}

interface ListLinkBtnProps {
  href: string
  btnName: string
  children: React.ReactNode
}
function ListLinkBtn({ href, btnName, children }: ListLinkBtnProps) {
  return (
    <Link href={href}>
      <a className='w-full py-3 flex items-center justify-between text-gray-900'>
        <div className='flex items-center space-x-4'>
          {children}
          <p className='text-sm'>{btnName}</p>
        </div>
        <ChevronRight className='text-2xl' />
      </a>
    </Link>
  )
}