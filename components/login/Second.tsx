import React, { useEffect, useState } from 'react'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import { TOPICS } from '../../utils/constants'

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
          <TopicBox
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


interface TopicBoxType {
  topicId: number
  topicName: string
  interestTopicIds: number[]
  setInterestTopicIds: (interestTopicIds: number[]) => void
}
function TopicBox({ topicId, topicName, interestTopicIds, setInterestTopicIds }: TopicBoxType) {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  useEffect(() => {
    if (interestTopicIds.includes(topicId)) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [interestTopicIds])

  const clickTopicBtn = () => {
    if (isSelected) {
      setInterestTopicIds(interestTopicIds.filter(id => id !== topicId))
    } else {
      setInterestTopicIds(interestTopicIds.concat(topicId))
    }
  }

  return (
    <button
      className={'w-full h-14 p-2 bg-white shadow-md rounded-lg text-sm' +  // TODO: 나중에 아이콘이나 이미지 넣고 h-14 바꿔야함
        (isSelected ? ' border border-primary text-primary' : ' border-none text-gray-900')}
      onClick={clickTopicBtn}
    >
      {topicName}
    </button>
  )
}