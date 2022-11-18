import IntakeAdequateTag from '../../tag/IntakeAdequateTag'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Link from 'next/link'
import { UserIntakeNutrientType } from '../../../utils/types'
import { CompareContent } from '../../../utils/functions/CompareContent'
import { useEffect, useState } from 'react'

function IntakeReportListItem({ name, content, reqMin, reqAvg, reqMax, unit, tips, efficacy }: UserIntakeNutrientType) {
  const [state, setState] = useState<number>(-1)
  const [excessOrLackContent, setExcessOrLackContent] = useState<number | null>(null)

  useEffect(() => {
    // reqMin, reqAvg, reqMax 기준과 비교하는 클래스
    // 해당 클래스에 값을 넣고 클래스의 메서드를 사용해서 비교하면 됨.
    const compare = new CompareContent(content, reqMin, reqAvg, reqMax)
    // console.log('reqMin : ', reqMin)
    // console.log('reqAvg : ', reqAvg)
    // console.log('reqMax : ', reqMax)
    if (compare.compareWithMax()) {
      setState(3) // 과다
      setExcessOrLackContent(content - reqMax)
    } else if (compare.compareWithAvgAndMax()) {
      setState(2) // 최적
    } else if (compare.compareWithMinAndAvg()) {
      setState(1) // 최소
    } else {
      setState(0) // 부족
      // console.log('name : ', name, ' / reqMin : ', reqMin, ' / content : ', content)
      setExcessOrLackContent(reqMin - content)
    }
  }, [])

  return (
    <Link
      href={{
        pathname: `/balance/report/${name}`,
        query: {
          state: state,
          content: content,
          reqMin: reqMin,
          reqAvg: reqAvg,
          reqMax: reqMax,
          unit: unit,
          tips: tips,
          efficacy: efficacy,
          excessOrLackContent: excessOrLackContent
        }
      }}
      as={`/balance/report/${name}`}
    >
      <a>
        <div className='w-full py-4 pl-6 pr-5 rounded-2xl bg-gray-50 shadow-sm flex items-center justify-between'>
          <p className='text-base text-gray-900'>{name}</p>
          <div className='flex items-center space-x-2'>
            <IntakeAdequateTag state={state} excessOrLackContent={excessOrLackContent} unit={excessOrLackContent === null ? null : unit} />
            <ChevronRight />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default IntakeReportListItem