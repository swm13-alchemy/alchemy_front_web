import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

function SearchBar() {
  const router = useRouter()
  const [searchText, setSearchText] = useState<string>('')

  const searchData = () => {
    console.log(searchText)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <div className='relative left-0 top-0 w-full h-14 px-3 flex items-center justify-between border-b-[#BABABA] border-b'>
      <FontAwesomeIcon icon={faAngleLeft} className='text-2xl cursor-pointer' onClick={() => router.back()} />
      <input
        className='appearance-none w-10 h-full text-xl'
        onChange={onChange}
        placeholder='영양제를 검색해 보세요.'
        value={searchText}
      />
      <FontAwesomeIcon icon={faSearch} className='text-2xl cursor-pointer' onClick={searchData} />
    </div>
  )
}

export default SearchBar
