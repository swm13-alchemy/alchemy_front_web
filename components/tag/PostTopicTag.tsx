interface Props {
  tagName: string
}

function PostTopicTag({ tagName }: Props) {
  return (
    <span className='rounded-[0.625rem] px-2 py-1 bg-surface shadow-sm text-xs text-gray-900 text-center'>
      #{tagName}
    </span>
  )
}

export default PostTopicTag