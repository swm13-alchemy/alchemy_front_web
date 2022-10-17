import React, { useEffect, useState } from 'react'

interface Props {
  topicId: number
  topicName: string
  interestTopicIds: number[]
  setInterestTopicIds: (interestTopicIds: number[]) => void
}

function SelectableTopicBox({ topicId, topicName, interestTopicIds, setInterestTopicIds }: Props) {
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

export default SelectableTopicBox