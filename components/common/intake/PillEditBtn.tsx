import Link from 'next/link'
import Image from 'next/image'
import Edit from '@mui/icons-material/Edit'
import { useUserIntakeManagementStore } from '../../../stores/store'
import { useEffect, useState } from 'react'
import { requestURLs } from '../../../utils/api'

interface Props {
  pillId: number
}

function PillEditBtn({ pillId }: Props) {
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
    <Link href={`/intake/edit-schedule/edit/${pillId}`}>
      <a>
        <div className='relative w-16 h-16 rounded-full overflow-hidden'>
          <Image
            src={requestURLs.getSupplementThumbnailURL(pillId.toString())}
            className='object-cover'
            layout='fill'
          />
          <div className='absolute bg-[rgba(0,0,0,0.4)] left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
            <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center'>
              <Edit className='text-xs text-white' />
            </div>
          </div>
        </div>
        <p className='w-full text-xs text-gray-900 truncate'>{pillNickName}</p>
      </a>
    </Link>
  )
}

export default PillEditBtn