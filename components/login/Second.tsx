import { useRouter } from 'next/router'
import { useState } from 'react'

function Second() {
  const router = useRouter()

  console.log(router.state)

  // Dummy Constant
  // TODO :: 영양제 더미 제거해야함. (22-09-27 수정)
  const topics = [
    {
      id: 1,
      name: '혈관, 혈액순환',
    },
    {
      id: 2,
      name: '혈관, 혈액순환',
    },
    {
      id: 3,
      name: '혈관, 혈액순환',
    },
    {
      id: 4,
      name: '혈관, 혈액순환',
    },
    {
      id: 5,
      name: '혈관, 혈액순환',
    },
    {
      id: 6,
      name: '혈관, 혈액순환',
    },
    {
      id: 7,
      name: '혈관, 혈액순환',
    },
    {
      id: 8,
      name: '혈관, 혈액순환',
    },
  ]

  // State

  const [selectedTopics, setSelectedTopics] = useState([])

  const topicBoxes = topics.map((tp) => {
    const { id, name } = tp

    const nowIdx = selectedTopics.findIndex((e) => e.id === id)
    const isSelected = nowIdx > -1

    const handleClick = (e) => {
      e.preventDefault()

      const selectList = [...selectedTopics]

      if (isSelected) selectList.splice(nowIdx, 1)
      else {
        if (selectList.length < 8)
          selectList.push({
            id: id,
            name: name,
          })
      }

      setSelectedTopics(selectList)
    }

    // 길어져서 Style을 분리했음.

    const divContainerStyle = `relative w-[88px] h-[88px] flex  items-center px-4 bg-white rounded-xl shadow-md ${
      isSelected && 'border-4 border-[#1C65D1]'
    }`

    const innerTextStyle = `block text-${
      isSelected ? '[#1C65D1]' : 'gray-900'
    } text-sm leading-5 font-${isSelected ? 'bold' : 'normal'}`

    return (
      <div className={divContainerStyle} id={id} key={id} onClick={handleClick}>
        <span className={innerTextStyle}>{name}</span>
      </div>
    )
  })

  const subTextStyle = `mt-2 text-xs leading-4 font-${
    selectedTopics.length >= 8 ? 'bold' : 'normal'
  } text-${selectedTopics.length >= 8 ? '[#FF0000]' : 'gray-400'}`

  const nextButtonStyle = `absolute mt-2 bottom-16 w-[100%] h-12 flex justify-center items-center rounded-xl shadow-md bg-[#1C65D1] ${
    selectedTopics.length ? '' : 'hidden'
  }`

  const handleNextButtonClick = (e) => {
    e.preventDefault()

    if (!selectedTopics.length) return

    // TODO :: Push Logic => Zustand로 변경해서 관리해야함
    router.push({
      pathname: '/register/step/3',
    })
  }

  return (
    <div className='bg-[#F9FAFB] h-screen mx-8 relative'>
      <div className=' pt-16'>
        <span className='text-3xl leading-9 font-bold text-gray-900'>건강고민이 있나요? 🤔</span>{' '}
        <br />
        <span className=' mt-2 text-lg leading-7 font-normal text-gray-900'>
          관심있는 건강 고민을 선택해주세요.
        </span>{' '}
        <br />
        <span className={subTextStyle}>최대 8개까지 선택 가능합니다</span>
      </div>

      <div className='mt-12 pb-36 grid grid-cols-3 gap-y-6 gap-x-6 justify-items-center'>
        {topicBoxes}
      </div>

      {/* TODO :: Link + State 전달 */}
      <div className={nextButtonStyle} onClick={handleNextButtonClick}>
        <span className='block text-white text-sm leading-5 font-bold'>다음</span>
      </div>
    </div>
  )
}

export default Second