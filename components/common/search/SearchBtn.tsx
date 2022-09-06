import Link from 'next/link'

function SearchBtn() {
  return (
    <Link href='/search'>
      <a>
        <div className='h-12 bg-gray-50 shadow rounded-2xl mx-4 flex items-center px-[1em]'>
          <p className='text-gray-500 text-sm'>제품명이나 브랜드 명으로 검색</p>
        </div>
      </a>
    </Link>
  )
}

export default SearchBtn
