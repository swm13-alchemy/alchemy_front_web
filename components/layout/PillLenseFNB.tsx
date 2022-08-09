import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

type Props = {}

const PillLenseFNB = (props: Props) => {
  return (
    <div className='absolute bottom-28 right-12 flex items-center justify-center bg-[#333] h-20 w-20 rounded-full cursor-pointer'>
      <Link href='/pillLense'>
        <FontAwesomeIcon className=' text-4xl text-white' icon={faCamera} />
      </Link>
    </div>
  )
}

export default PillLenseFNB
