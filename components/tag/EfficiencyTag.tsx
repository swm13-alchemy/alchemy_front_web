interface Props {
  tagName: string
}

function EfficiencyTag({ tagName }: Props) {
  return (
    <div className='border rounded-3xl border-[#BABABA] px-1 py-0.5 text-base flex items-center justify-center'>
      {tagName}
    </div>
  )
}

export default EfficiencyTag
