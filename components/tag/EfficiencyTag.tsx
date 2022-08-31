interface Props {
  tagName: string
}

function EfficiencyTag({ tagName }: Props) {
  return (
    // 나중에 버튼으로 바뀔 예정
    <span className='rounded-[0.625rem] px-3 py-1.5 bg-gray-50 shadow-sm text-gray-900 text-sm text-center'>
      #{tagName}
    </span>
  )
}

export default EfficiencyTag
