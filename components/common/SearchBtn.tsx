import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function SearchBtn() {
  return (
    <Link href='/search'>
      <a>
        <div className='w-11/12 h-12 bg-gray-50 drop-shadow rounded-2xl mx-auto flex items-center px-[1em]'>
          <p className='text-gray-500 text-sm'>제품명이나 브랜드 명으로 검색</p>
        </div>
      </a>
    </Link>
  )
}

export default SearchBtn
