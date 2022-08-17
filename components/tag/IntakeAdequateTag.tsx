interface Props {
  state: number // 부족 : 0, 최소 : 1, 최적 : 2, 과다 : 3
  content: number | null  // 과다 or 부족한 영양분 양
  unit: string | null // 단위
}

function IntakeAdequateTag({ state, content, unit }: Props) {
  switch (state) {
    case 0:
      return (
        <div className='h-8 rounded-lg bg-amber-100 flex items-center justify-center px-2 py-1.5'>
          <p className='text-sm text-amber-500 text-center'>{content}{unit} 부족</p>
        </div>
      )
    case 1:
      return (
        <div className='h-8 rounded-lg bg-gray-100 flex items-center justify-center px-2 py-1.5'>
          <p className='text-sm text-gray-500 text-center'>최소</p>
        </div>
      )
    case 2:
      return (
        <div className='h-8 rounded-lg bg-emerald-100 flex items-center justify-center px-2 py-1.5'>
          <p className='text-sm text-emerald-500 text-center'>최적</p>
        </div>
      )
    case 3:
      return (
        <div className='h-8 rounded-lg bg-red-100 flex items-center justify-center px-2 py-1.5'>
          <p className='text-sm text-red-500 text-center'>{content}{unit} 과다</p>
        </div>
      )
    default:
      return (
        <div className='w-10 h-8 rounded-lg bg-gray-100'></div>
      )
  }
}

export default IntakeAdequateTag