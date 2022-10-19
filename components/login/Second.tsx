import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import { TOPICS } from '../../utils/constant/constants'
import SelectableTopicBox from '../common/SelectableTopicBox'

interface Props {
  setPageNum: (pageNum: number) => void
  interestTopicIds: number[]
  setInterestTopicIds: (interestTopicIds: number[]) => void
}

function Second({ setPageNum, interestTopicIds, setInterestTopicIds }: Props) {

  return (
    <div className='bg-gray-50 h-screen px-8 py-16 text-gray-900'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>건강고민이 있나요? 🤔</h1>
        <h2 className='text-lg'>관심있는 건강 고민 토픽을 선택해주세요.</h2>
      </div>

      <div className='mt-12 w-full grid grid-cols-3 gap-6 pb-12'>
        {TOPICS.map((topic) =>
          <SelectableTopicBox
            key={topic.id}
            topicId={topic.id}
            topicName={topic.name}
            interestTopicIds={interestTopicIds}
            setInterestTopicIds={setInterestTopicIds}
          />
        )}
      </div>

      {/* 다음 버튼 */}
      {arrayIsNotEmpty(interestTopicIds) &&
        <button
          className='fixed bottom-10 left-10 right-10 py-3.5 bg-primary rounded-[0.625rem] text-gray-50 shadow-md'
          onClick={() => setPageNum(4)} // TODO: Third.tsx 리팩토링 후 3으로 수정
        >
          다음
        </button>
      }
    </div>
  )
}

export default Second