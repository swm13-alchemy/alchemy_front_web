import PlaylistAdd from '@mui/icons-material/PlaylistAdd'
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'

interface Props {
  topicName: string
  subscribersNum: number
  isSubscribe: boolean
}

function TopicSubscribeBtn({ topicName, subscribersNum, isSubscribe }: Props) {

  return (
    <div
      className={'w-full py-4 pl-4 pr-6 flex items-center justify-between rounded-lg' +
        (isSubscribe ? ' bg-surface' : ' bg-gray-50')}
    >
      <div className='flex flex-col space-y-1 text-gray-900'>
        <p className='text-sm font-bold'>#{topicName}</p>
        <p className='text-xs'>{subscribersNum}명이 구독하고 있습니다.</p>
      </div>
      {isSubscribe ? (
        <button className='flex items-center justify-center h-min'>
          <PlaylistAddCheck className='text-2xl text-primary' />
        </button>
      ) : (
        <button className='flex items-center justify-center h-min'>
          <PlaylistAdd className='text-2xl text-gray-900' />
        </button>
      )}

    </div>
  )
}

export default TopicSubscribeBtn