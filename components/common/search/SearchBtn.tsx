import Link from 'next/link'
import Search from '@mui/icons-material/Search';

function SearchBtn() {
  return (
    <Link href='/search'>
      <a>
        <div className='h-12 px-4 bg-gray-50 shadow rounded-2xl flex items-center justify-between'>
          <p className='text-gray-500 text-sm'>제품명이나 브랜드 명으로 검색</p>
          <Search className='text-2xl text-gray-900' />
        </div>
      </a>
    </Link>
  )
}

export default SearchBtn
