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

interface Props {
  details: number
  // details: SupplementDetailsType TODO: 타입 수정
}

const 임시태그목록 = [
  "💧멀티미네랄",
  "🍎콜레스테롤 합성 조절",
  "💧멀티미네랄",
  "🌊콜레스테롤 합성 조절 "
]

const 임시토픽목록 = [
  '노화&항산화',
  '면역기능',
  "혈액 생성"
]

const 임시영양제목록 = [
  {
    pillId: 1,
    pillName: "PillTest1"
  },
  {
    pillId: 2,
    pillName: "PillTest2"
  },
  {
    pillId: 3,
    pillName: "PillTest3"
  },
  {
    pillId: 3,
    pillName: "PillTest3"
  },
  {
    pillId: 3,
    pillName: "PillTest3"
  },
]

const PostDetails = ({ details }: Props) => {
  const router = useRouter()
  // const { id, name, dailyDose, information, intakeCount, intakeTimings, maker, ingredients }: SupplementDetailsType = details


  return (
    <ContainerWithBottomNav>
      <BackHeaderWithBtn router={router} name={'간 건강 라운지'}>
        <button className='absolute right-1.5 flex items-center justify-center'>
          <MoreVert className='text-2xl text-gray-900' />
        </button>
      </BackHeaderWithBtn>

      {/* 글 상세 부분 */}
      <main className='bg-white px-6 pt-4 pb-6 flex flex-col items-center space-y-6'>
        <div className='space-y-4'>
          {/* 작성자 정보 부분 */}
          <AuthorInfoAtTheTopOfThePost
            userNickname='홍길동전주인공'
            ageRange={getAgeRange('1999-10-18')}
            isMale={true}
            userThumbs={1329}
            createdAt={dayjs().subtract(1, 'hour')}
          />
          {/* 글 태그 목록 부분 */}
          <div className='w-full flex flex-wrap items-center gap-2'>
            {임시태그목록.map((tagName) =>
              <PostETCTag key={tagName} tagName={tagName} />
            )}
          </div>
          {/* 글 제목 */}
          <h1 className='text-lg font-bold text-gray-900'>공자는 어디 뭇 수 낙원을 봄바람이다. 없으면, 품으며, 따뜻한 교향악이다.</h1>
          {/* 글 본문 */}
          <p className='text-base text-gray-700'>그와 가는 앞이 이상이 이상을 사막이다. 뼈 보배를 원질이 속에 피어나기 발휘하기 때까지 행복스럽고 품에 듣는다. 바이며, 우리 그들의 같이 갑 노래하며 인생에 이것은 얼마나 힘있다. 내려온 꽃이 천하를 피고, 청춘은 뜨거운지라, #가진 그리하였는가? 꾸며 품고 같으며, 보내는 그들은 봄바람을 뜨고, 어디 칼이다. 있으며, 원질이 그들은 생생하며, 대한 가치를 미묘한  #울트라 아르기닌듣기만 두손을 부패뿐이다. 어디 그들에게 이상의 노래하며 이상이 보라. 있음으로써 풀밭에 사랑의 영락과 말이다. 소금이라 온갖 이것은 우는 이것이야말로 끝에 그들은 그리하였는가? 용기가 우는 싸인 피어나는 것이다.</p>
        </div>
        {/* 포트폴리오 첨부 위치 */}
        {/* 글 좋아요 버튼 */}
        <button className='bg-surface px-10 py-4 rounded-[0.625rem] shadow flex items-center space-x-3'>
          <ThumbUpOutlined className='text-2xl text-gray-400' />
          <p className='text-base font-bold text-gray-400'>도움이 됐어요 125</p>
        </button>
        <button className='bg-primary px-10 py-4 rounded-[0.625rem] shadow flex items-center space-x-3'>
          <ThumbUpOutlined className='text-2xl text-white' />
          <p className='text-base font-bold text-white'>도움이 됐어요 125</p>
        </button>
        {/* 글이 속한 건강 고민 토픽들 표시 부분 */}
        <div className='w-full flex flex-wrap items-center gap-2'>
          {임시토픽목록.map((tagName) =>
            <PostTopicTag key={tagName} tagName={tagName} />
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
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
        <Reply
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
        <Reply
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
        <Comment
          userNickname='홍길동전주인공'
          ageRange={getAgeRange('1999-10-18')}
          isMale={true}
          userThumbs={1329}
          createdAt={dayjs().subtract(1, 'hour')}
          commentBody='가지에 피에 있는 방황하였으며, 인간의 하여도 황금시대다. 그러므로 풀이 인생에 평화스러운 예수는 가슴에 봄바람을 이상 우리 것이다. 가슴에 수 스며들어 뼈 같은 따뜻한 그들은 부패뿐이다. 길지 이는 청춘의 그들의 열락의 보라. 현저하게 쓸쓸한 용기가 그들에게 말이다. 있는 곳이 무엇을 위하여서, 풍부하게 있음으로써 설레는 봄바람이다. 것은 같지 위하여 피는 실로 오직 광야에서 싶이.'
        />
      </div>
   </ContainerWithBottomNav>
  )
}

export default PostDetails

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { data: { data: res } } = await pillApi.getSupplementDetails(context.query.id)
  // const details = res[0]
  const details = 0 // TODO: 백엔드 개발 끝나면 details 값 수정

  return {
    props: {
      details
    }
  }
}