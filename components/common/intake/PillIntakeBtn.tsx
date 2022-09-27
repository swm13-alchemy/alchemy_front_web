import Image from 'next/image'
import { useState } from 'react'
import CheckCircle from '@mui/icons-material/CheckCircle'

interface Props {
  imgUrl: string
  pillNickName: string
  isPillIntake: boolean
}

function PillIntakeBtn({ imgUrl, pillNickName, isPillIntake }: Props) {
  const [isIntake, setIsIntake] = useState<boolean | null>(isPillIntake)

  return (
    <button
      className='w-full flex flex-col items-center space-y-1'
      onClick={() => setIsIntake(!isIntake)}
    >
      <div className='relative w-16 h-16 rounded-full overflow-hidden'>
        <Image
          src={imgUrl}
          className='object-cover'
          layout='fill'
        />
        {isIntake &&
          <div className='absolute bg-[rgba(0,0,0,0.6)] left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
            <CheckCircle className='text-white text-2xl' />
          </div>
        }
      </div>
      <p className='w-full text-xs text-gray-900 truncate'>{pillNickName}</p>
    </button>
  )
}

export default PillIntakeBtn