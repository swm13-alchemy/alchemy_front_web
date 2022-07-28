import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface Props {
  btnWidth: string
}

function SearchBtn({ btnWidth }: Props) {
  return (
    <Link href='/search'>
      <div
        className={
          `${btnWidth}` +
          ' h-10 flex items-center justify-between px-5 mx-auto border border-black rounded-2xl cursor-pointer bg-white'
        }
      >
        <p className='text-gray-500'>어떤 영양제를 찾으시나요?</p>
        <FontAwesomeIcon icon={faSearch} className='fa-x' />
      </div>
    </Link>
  )
}

export default SearchBtn
