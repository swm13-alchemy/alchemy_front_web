import { MergedNutrientDataType } from '../../../utils/types'
import { CompareContent } from '../../../utils/functions/CompareContent'
import { useEffect, useState } from 'react'

// const STATE_COLOR = ['amber-500', 'emerald-500', 'emerald-500', 'red-500']
const STATE_COLOR = ['#F59E0B', '#10B981', '#10B981', '#EF4444']
const STATE_TEXT = ['부족', '괜찮아요!', '아주 좋아요👍', '과다']

function ContentBar({ name, intakeContent, newContent, unit, reqMin, reqAvg, reqLimit }: MergedNutrientDataType) {
  // const [intakeState, setIntakeState] = useState<number>(-1)
  const [newState, setNewState] = useState<number>(-1)  // 이 영양제를 먹음으로써 바뀌게 되는 상태 값
  const [excessOrLackContent, setExcessOrLackContent] = useState<number | null>(null)
  const [intakeContentPercent, setIntakeContentPercent] = useState<number>(0)
  const [newContentPercent, setNewContentPercent] = useState<number>(0)
  const [reqMinPercent, setReqMinPercent] = useState<number>(0)
  const [reqAvgPercent, setReqAvgPercent] = useState<number>(0)

  // 해당 ContentBar의 state를 판단
  useEffect(() => {
    const sumContent = intakeContent + newContent

    // reqMin, reqAvg, reqLimit 기준과 비교하는 클래스
    // 해당 클래스에 값을 넣고 클래스의 메서드를 사용해서 비교하면 됨.
    const newCompare = new CompareContent(sumContent, reqMin, reqAvg, reqLimit)
    if (newCompare.compareWithLimit()) {
      setNewState(3) // 과다
      setExcessOrLackContent(sumContent - reqLimit)
    } else if (newCompare.compareWithAvgAndLimit()) {
      setNewState(2) // 최적
    } else if (newCompare.compareWithMinAndAvg()) {
      setNewState(1) // 최소
    } else {
      setNewState(0) // 부족
      setExcessOrLackContent(reqMin - sumContent)
    }
  }, [])

  // reqLimit을 100%라고 할 때 intakeContent와 newContent가 각각 몇 프로인지 구하기
  useEffect(() => {
    // console.log("intakeContentPercent : ", intakeContent / 800 * 100)
    console.log("intakeContentPercent : ", Math.round(intakeContent / reqLimit * 100))
    console.log("newContentPercent : ", Math.round(newContent / reqLimit * 100))
    setIntakeContentPercent(Math.round(intakeContent / reqLimit * 100))
    setNewContentPercent(Math.round(newContent / reqLimit * 100))
    // setIntakeContentPercent(intakeContent / 800 * 100)
    // setNewContentPercent(newContent / 800 * 100)
    setReqMinPercent(Math.round(reqMin / reqLimit * 100))
    setReqAvgPercent(Math.round(reqAvg / reqLimit * 100))
  }, [])

  return (
    <article className='relative flex items-center'>
      {/* 영양분 이름 부분 */}
      <p className={`w-[42.5%] mr-2.5 text-xs text-gray-900 font-medium` + (newState === 3 ? ' text-red-500' : '')}>{name}</p>

      {/* 그래프 부분 */}
      <div className='relative w-full h-2 rounded-2xl bg-surface flex items-center'>
        {/* 기존 섭취량 부분 */}
        <div
          className='h-full rounded-l-2xl bg-gray-300 z-20'
          style={{width: `${intakeContentPercent}%`, maxWidth: '100%'}}
        ></div>

        {/* 추가 섭취량 부분 */}
        <div
          className='h-full rounded-r-2xl z-20'
          style={{width: `${newContentPercent}%`, maxWidth: `${100-intakeContentPercent}%`, backgroundColor: `${STATE_COLOR[newState]}`}}
        ></div>

        {/* 최소량 기준 표시 부분 */}
        <div
          className='absolute left-0 top-0 bottom-0 bg-transparent border-r-2 border-r-gray-500'
          style={{width: `${reqMinPercent}%`}}
        ></div>

        {/* 충분량 기준 표시 부분 */}
        <div
          className='absolute left-0 top-0 bottom-0 bg-transparent border-r-2 border-r-emerald-500'
          style={{width: `${reqAvgPercent}%`}}
        ></div>
      </div>

      {/* 수치값 표시 부분 (부족, 괜찮아요, 아주 좋아요, 과다) */}
      <p
        className='w-[47.5%] ml-3.5 text-xs font-bold text-right'
        style={{color: `${STATE_COLOR[newState]}`}}
      >
        {excessOrLackContent !== null ? `${excessOrLackContent}${unit} ${STATE_TEXT[newState]}` : STATE_TEXT[newState]}
      </p>
    </article>
    // <div className='w-full flex items-center justify-between'>
    //   <div className='flex items-center w-[54%]'>
    //     <p className='text-base font-bold w-[55%]'>{name}</p>
    //
    //     <figure className='w-[45%] bg-[#D9D9D9] h-3 relative border-r border-[#AE0303]'>
    //       <div className='absolute left-0 top-0 bottom-0 bg-[#D9D9D9] w-4/5 border-r border-[#00B137]'></div>
    //       <div className={'absolute left-0 top-0 bottom-0 bg-[#2FAD56] w-3/5'}></div>
    //     </figure>
    //   </div>
    //   <p className={'text-base' + ' text-[#8F8F8F]'}>{content + unit}</p>
    //
    //   <div
    //     className={
    //       'w-[18%] bg-[#D5E3B1] h-full flex items-center justify-center' + ' text-[#8F8F8F]'
    //     }
    //   >
    //     -150
    //   </div>
    // </div>
  )
}

interface ValueDescriptionProps {
  state: number
}
function ValueDescription({ state }: ValueDescriptionProps) {
  switch (state) {
    case 3:
      return (
        <p className={'inline-block w-[23.17%] pl-3.5 text-xs font-bold text-right'}></p>
      )
  }
}

export default ContentBar
