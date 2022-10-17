import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const PillLenseFNB = () => {
  return (
    <div className='fixed right-5 bottom-16 w-12 h-12 bg-[#1C65D1] z-60 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center'>
      <Link href='/pillLense'>
        <FontAwesomeIcon className=' text-2xl text-white' icon={faCamera} />
      </Link>
    </div>
  )
}

export default PillLenseFNB
