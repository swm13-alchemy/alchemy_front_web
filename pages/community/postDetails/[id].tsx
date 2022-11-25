import ContainerWithBottomNav from '../../../components/layout/ContainerWithBottomNav'
import BackHeaderWithBtn from '../../../components/layout/BackHeaderWithBtn'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import AuthorInfoAtTheTopOfThePost from '../../../components/common/community/AuthorInfoAtTheTopOfThePost'
import { getAgeRange } from '../../../utils/functions/getAgeRange'
import dayjs from 'dayjs'
import PostETCTag from '../../../components/tag/PostETCTag'
import PostTopicTag from '../../../components/tag/PostTopicTag'
import PillListAttachedToThePost from '../../../components/common/community/PillListAttachedToThePost'
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import Comment from '../../../components/common/community/Comment'
import MoreVert from '@mui/icons-material/MoreVert'
import Reply from '../../../components/common/community/Reply'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import useUserId from '../../../hooks/useUserId'
import { postApi } from '../../../utils/api'
import { PostType } from '../../../utils/types'
import LoadingCircular from '../../../components/layout/LoadingCircular'
import TopCenterSnackBar from '../../../components/common/TopCenterSnackBar'

interface Props {
  postDetails: PostType
}

const 임시태그목록 = [
  "💧멀티미네랄",
  "🍎콜레스테롤 합성 조절",
  "💧멀티미네랄",
  "🌊콜레스테롤 합성 조절 "
]

export const 임시영양제목록 = [
  {
    pillId: 1,
    pillName: "PillTest1",
    startIntakeDate: dayjs('2022-09-12')
  },
  {
    pillId: 2,
    pillName: "PillTest2",
    startIntakeDate: dayjs('2012-09-12')
  },
  {
    pillId: 3,
    pillName: "PillTest3",
    startIntakeDate: dayjs('2022-07-12')
  },
  {
    pillId: 3,
    pillName: "PillTest3"
  },
  {
    pillId: 3,
    pillName: "PillTest3",
    startIntakeDate: dayjs('2021-09-12')
  },
]

const PostDetails = ({ postDetails }: Props) => {
  const { id, title, content, likeCnt, tags, createdAt, topics, user }: PostType = postDetails
  const router = useRouter()
  const userId = useUserId()
  const authorId: string = user.id
  const authorNickname: string = user.nickname
  const authorIsMale: boolean = user.isMale
  const authorBirth: string = user.birth
  const [isThreeDotMenuOpen, setIsThreeDotMenuOpen] = useState<boolean>(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false)
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLike, setIsLike] = useState<boolean>(false)

  /** 글 삭제 함수 (글 작성자인 경우만 호출 가능) */
  const deleteMyPost = () => {
    if (userId === authorId && id) {
      setIsLoading(true)
      ;(async () => {
        await postApi.deletePost(id)
          .then(() => {
            setIsLoading(false)
            setIsDeleteSuccess(true)
            setTimeout(() => router.back(), 1500)
          })
          .catch(() => {
            setIsLoading(false)
            setIsDeleteError(true)
          })
      })()
    }
  }

  const likeThisPost = (isLike: boolean) => {
    setIsLike(!isLike)
  }
  
  // 로딩 처리
  if (isLoading) return <LoadingCircular />

  return (
    <ContainerWithBottomNav>
      <BackHeaderWithBtn router={router} name='건강 고민 라운지'>
        <button
          className='absolute right-1.5 flex items-center justify-center'
          onClick={() => setIsThreeDotMenuOpen(true)}
        >
          <MoreVert className='text-2xl text-gray-900' />
        </button>
        <Menu
          open={isThreeDotMenuOpen}
          onClose={() => setIsThreeDotMenuOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {userId === authorId &&
            <MenuItem onClick={deleteMyPost}>글 삭제하기</MenuItem>
          }
        </Menu>
      </BackHeaderWithBtn>

      {/* 글 상세 부분 */}
      <main className='bg-white px-6 pt-4 pb-6 flex flex-col items-center space-y-6'>
        <div className='space-y-4'>
          {/* 작성자 정보 부분 */}
          <AuthorInfoAtTheTopOfThePost
            userId={authorId}
            userNickname={authorNickname}
            ageRange={getAgeRange(dayjs(authorBirth).format('YYYY-MM-DD'))}
            isMale={authorIsMale}
            userThumbs={1329}
            createdAt={dayjs(createdAt)}
          />
          {/* 글 태그 목록 부분 */}
          <div className='w-full flex flex-wrap items-center gap-2'>
            {/* TODO: 추후 수정 */}
            {임시태그목록.map((tagName, idx) =>
              <PostETCTag key={idx} tagName={tagName} />
            )}
          </div>
          {/* 글 제목 */}
          <h1 className='text-lg font-bold text-gray-900'>{title}</h1>
          {/* 글 본문 */}
          <p className='text-base text-gray-700'>{content}</p>
        </div>
        {/* 포트폴리오 첨부 위치 */}
        {/* 글 좋아요 버튼 */}
        {isLike ? (
          <button
            className='bg-primary px-10 py-4 rounded-[0.625rem] shadow flex items-center space-x-3'
            onClick={() => likeThisPost(isLike)}
          >
            <ThumbUpOutlined className='text-2xl text-white' />
            <p className='text-base font-bold text-white'>도움이 됐어요 {likeCnt}</p>
          </button>
        ) : (
          <button
            className='bg-surface px-10 py-4 rounded-[0.625rem] shadow flex items-center space-x-3'
            onClick={() => likeThisPost(isLike)}
          >
            <ThumbUpOutlined className='text-2xl text-gray-400' />
            <p className='text-base font-bold text-gray-400'>도움이 됐어요 {likeCnt}</p>
          </button>
        )}

        {/* 글이 속한 건강 고민 토픽들 표시 부분 */}
        <div className='w-full flex flex-wrap items-center gap-2'>
          {topics.map((topic) =>
            <PostTopicTag key={topic.id} tagName={topic.name} />
          )}
        </div>
      </main>
      {/* 글에 태그된 영양제 목록들 */}
      <div className='mt-2 bg-white p-6'>
        <PillListAttachedToThePost mentionedPillList={임시영양제목록} />
      </div>
      {/* 댓글 작성 부분 */}
      <div className='px-6 py-4 space-y-4'>
        <p className='text-base text-gray-600'>댓글 35개</p>
        <button className='w-full bg-white rounded-lg px-4 py-3.5 shadow'>
          <p className='text-sm text-gray-400 text-left'>게시글에 댓글을 남겨주세요.</p>
        </button>
      </div>
      {/* 댓글 목록 */}
      <div className='space-y-1'>
        <Comment
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
        <Reply
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
        <Reply
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
        <Comment
          userId={1}
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
      </div>

      {/* 글 삭제 성공 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isDeleteSuccess}
        setIsSnackBarOpen={setIsDeleteSuccess}
        severity='success'
        content='글이 삭제되었습니다!'
      />
      {/* 글 삭제 실패 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isDeleteError}
        setIsSnackBarOpen={setIsDeleteError}
        severity='error'
        content='삭제에 실패했습니다 😥 같은 상황이 반복되면 문의해주세요.'
      />
   </ContainerWithBottomNav>
  )
}

export default PostDetails

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: response } = await postApi.getPostDetails(parseInt(context.query.id as string))
  const postDetails: PostType = response.data

  return {
    props: {
      postDetails
    }
  }
}