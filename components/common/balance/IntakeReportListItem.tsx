import IntakeAdequateTag from '../../tag/IntakeAdequateTag'
import { ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { UserIntakeNutrientType } from '../../../utils/types'

function IntakeReportListItem({ name, content, reqMin, reqAvg, reqLimit, unit, tips, efficacy }: UserIntakeNutrientType) {
  let state: number = -1
  if (content > reqLimit) {
    state = 3 // 과다
  } else if (reqAvg <= content && content <= reqLimit) {
    state = 2 // 최적
  } else if (reqMin <= content && content < reqAvg) {
    state = 1 // 최소
  } else {
    state = 0 // 부족
  }

  let excessOrLackContent: number | null = null
  switch (state) {
    case 3:
      excessOrLackContent = content - reqLimit
      break
    case 0:
      excessOrLackContent = reqMin - content
      break
  }

  return (
    <Link
      href={{
        pathname: `/balance/report/${name}`,
        query: {
          state: state,
          content: content,
          reqMin: reqMin,
          reqAvg: reqAvg,
          reqLimit: reqLimit,
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