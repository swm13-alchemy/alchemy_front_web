interface Props {
  tagName: string
}

function SubscribedTopicTag({ tagName }: Props) {
  return (
    <span className='bg-primary px-4 py-1.5 rounded-2xl text-sm font-bold text-white text-center'>
      #{tagName}
    </span>
  )
}

export default SubscribedTopicTag