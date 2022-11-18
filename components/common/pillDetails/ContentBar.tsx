import { MergedNutrientDataType } from '../../../utils/types'
import { CompareContent } from '../../../utils/functions/CompareContent'
import { useEffect, useState } from 'react'

// const STATE_COLOR = ['amber-500', 'emerald-500', 'emerald-500', 'red-500']
const STATE_COLOR = ['#F59E0B', '#10B981', '#10B981', '#EF4444']
const STATE_TEXT = ['부족', '최소', '최적', '과다']

function ContentBar({ name, intakeContent, newContent, unit, reqMin, reqAvg, reqMax }: MergedNutrientDataType) {
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

    // reqMin, reqAvg, reqMax 기준과 비교하는 클래스
    // 해당 클래스에 값을 넣고 클래스의 메서드를 사용해서 비교하면 됨.
    const newCompare = new CompareContent(sumContent, reqMin, reqAvg, reqMax)
    if (newCompare.compareWithMax()) {
      setNewState(3) // 과다
      setExcessOrLackContent(sumContent - reqMax)
    } else if (newCompare.compareWithAvgAndMax()) {
      setNewState(2) // 최적
    } else if (newCompare.compareWithMinAndAvg()) {
      setNewState(1) // 최소
    } else {
      setNewState(0) // 부족
      setExcessOrLackContent(reqMin - sumContent)
    }
  }, [])

  // reqMax을 90%라고 할 때 intakeContent와 newContent가 각각 몇 프로인지 구하기
  useEffect(() => {
    // reqMax가 없는 경우 (상한량이 없는 경우) reqAvg를 80%로 기준잡고 계산
    if (reqMax === 0 || reqMax === null) {
      setIntakeContentPercent(Math.round(intakeContent / reqAvg * 80))
      setNewContentPercent(Math.round(newContent / reqAvg * 80))
      setReqMinPercent(Math.round(reqMin / reqAvg * 80))
      setReqAvgPercent(Math.round(reqAvg / reqAvg * 80))
    } else {  // reqMax가 있는 경우 (상한량이 있는 경우)
      setIntakeContentPercent(Math.round(intakeContent / reqMax * 90))
      setNewContentPercent(Math.round(newContent / reqMax * 90))
      setReqMinPercent(Math.round(reqMin / reqMax * 90))
      setReqAvgPercent(Math.round(reqAvg / reqMax * 90))
    }
  }, [])

  return (
    <article className='relative flex items-center'>
      {/* 영양분 이름 부분 */}
      <p className={`w-[42.5%] mr-2.5 text-xs text-gray-900 font-medium` + (newState === 3 ? ' text-red-500' : '')}>{name}</p>

      {/* 그래프 부분 */}
      <div className='relative w-full h-2 rounded-2xl bg-surface flex items-center'>
        {/* 기존 섭취량 부분 */}
        <div
          className='h-full rounded-l-2xl bg-gray-300 z-10'
          style={{width: `${intakeContentPercent}%`, maxWidth: '100%'}}
        ></div>

        {/* 추가 섭취량 부분 */}
        <div
          className='h-full rounded-r-2xl z-10'
          style={{width: `${newContentPercent}%`, maxWidth: `${100-intakeContentPercent}%`, backgroundColor: `${STATE_COLOR[newState]}`}}
        ></div>

        {/* 최소량 기준 표시 부분 */}
        <div
          className='absolute left-0 top-0 bottom-0 bg-transparent border-r-2 border-r-amber-400 z-30'
          style={{width: `${reqMinPercent}%`}}
        ></div>

        {/* 충분량 기준 표시 부분 */}
        <div
          className='absolute left-0 top-0 bottom-0 bg-transparent border-r-2 border-r-emerald-400 z-30'
          style={{width: `${reqAvgPercent}%`}}
        ></div>

        {/* 상한량 기준 표시 부분 */}
        {reqMax !== 0 &&
          <div
            className='absolute left-0 top-0 bottom-0 bg-transparent border-r-2 border-r-red-400 z-30'
            style={{width: '90%'}}
          ></div>
        }
      </div>

      {/* 수치값 표시 부분 (부족, 최소, 최적, 과다) */}
      <p
        className='w-[47.5%] ml-3.5 text-xs font-bold text-right'
        style={{color: `${STATE_COLOR[newState]}`}}
      >
        {excessOrLackContent !== null ? `${excessOrLackContent}${unit} ${STATE_TEXT[newState]}` : STATE_TEXT[newState]}
      </p>
    </article>
  )
}

export default ContentBar
