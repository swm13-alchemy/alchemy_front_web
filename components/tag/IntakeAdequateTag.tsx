interface Props {
  state: number // 부족 : 0, 최소 : 1, 최적 : 2, 과다 : 3
  excessOrLackContent: number | null  // 과다 or 부족한 영양분 양
  unit: string | null // 단위
}

function IntakeAdequateTag({ state, excessOrLackContent, unit }: Props) {
  switch (state) {
    case 0:
      return (
        <span className='h-8 rounded-lg bg-amber-100 px-2 py-1.5 text-sm text-amber-500 text-center'>
          {excessOrLackContent}{unit} 부족
        </span>
      )
    case 1:
      return (
        <span className='h-8 rounded-lg bg-gray-100 px-2 py-1.5 text-sm text-gray-500 text-center'>
          최소
        </span>
      )
    case 2:
      return (
        <span className='h-8 rounded-lg bg-emerald-100 px-2 py-1.5 text-sm text-emerald-500 text-center'>
          최적
        </span>
      )
    case 3:
      return (
        <span className='h-8 rounded-lg bg-red-100 px-2 py-1.5 text-sm text-red-500 text-center'>
          {excessOrLackContent}{unit} 과다
        </span>
      )
    default:
      return (
        <div className='w-10 h-8 rounded-lg bg-gray-100'></div>
      )
  }
}

export default IntakeAdequateTag