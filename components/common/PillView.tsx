import Image from 'next/image'
import { requestURLs } from '../../utils/api'

interface Props {
  pillId: number
  name: string
}

function PillView({ pillId, name }: Props) {
  return (
    <div className='flex flex-col items-center justify-center space-y-1'>
      <div className='relative w-[4.25rem] h-[4.25rem] rounded-full border border-gray-200 overflow-hidden'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(pillId.toString())}
          className='object-cover'
          layout='fill'
        />
      </div>
      <p className='text-xs text-gray-900 truncate w-[4.25rem] text-center'>{name}</p>
    </div>
  )
}

export default PillView
