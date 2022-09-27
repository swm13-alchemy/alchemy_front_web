import Image from 'next/image'
import { useEffect, useState } from 'react'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { requestURLs } from '../../../utils/api'
import { useUserIntakeManagementStore } from '../../../stores/store'

interface Props {
  pillId: number
  isPillIntake: boolean
}

function PillIntakeBtn({ pillId, isPillIntake }: Props) {
  const [isIntake, setIsIntake] = useState<boolean | null>(isPillIntake)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const [pillNickName, setPillNickName] = useState<string>('')

  useEffect(() => {
    intakePillList.forEach((pill) => {
      if (pill.pillId === pillId) {
        setPillNickName(pill.pillNickName)
      }
    })
  }, [])

  return (
    <button
      className='w-full flex flex-col items-center space-y-1'
      onClick={() => setIsIntake(!isIntake)}
    >
      <div className='relative w-16 h-16 rounded-full overflow-hidden'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(pillId.toString())}
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