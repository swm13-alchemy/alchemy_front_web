import IntakeAdequateTag from '../../tag/IntakeAdequateTag'
import { ChevronRight } from '@mui/icons-material'

interface Props {
  nutrientName: string  // 영양분 이름
  state: number // 부족 : 0, 최소 : 1, 최적 : 2, 과다 : 3
  content: number | null  // 과다 or 부족한 영양분 양
  unit: string | null // 단위
}

function IntakeReportListItem({ nutrientName, state, content, unit }: Props) {
  return (
    <div className='w-full py-4 pl-6 pr-5 rounded-2xl bg-gray-50 shadow-sm flex items-center justify-between'>
      <p className='text-base text-gray-900'>{nutrientName}</p>
      <div className='flex items-center space-x-2'>
        <IntakeAdequateTag state={state} content={content} unit={unit} />
        <ChevronRight />
      </div>
    </div>
  )
}

export default IntakeReportListItem