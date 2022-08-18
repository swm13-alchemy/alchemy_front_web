import React, { FormEvent } from 'react'
import { Search } from '@mui/icons-material'

interface Props {
  submitSearch: (e: FormEvent<HTMLFormElement>) => void
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchTerm: string
}

function SearchBar({ submitSearch, handleInputs, searchTerm }: Props) {
  return (
    <form className='w-11/12 h-12 mx-auto pl-4 pr-3 flex items-center justify-between border border-gray-200 rounded-2xl bg-white text-gray-900
                      focus-within:bg-surface duration-500 focus-within:rounded-t-lg focus-within:rounded-b-none'
          onSubmit={submitSearch}
    >
      <input
        className='w-full h-full text-base bg-transparent focus: outline-none'
        name='searchTerm'
        placeholder='영양제를 검색해 보세요.'
        value={searchTerm}
        type='text'
        onChange={handleInputs}
        required
      />
      <button className='pl-5'>
        <Search className='text-2xl' />
      </button>
    </form>
  )
}

export default SearchBar


// <div className='relative left-0 top-0 w-full h-14 px-3 flex items-center justify-between border-b-[#BABABA] border-b'>
//   <FontAwesomeIcon
// icon={faAngleLeft}
// className='text-2xl cursor-pointer'
// onClick={() => router.back()}
// />
// <input
//   className='appearance-none w-10 h-full text-xl'
//   onChange={onChange}
//   placeholder='영양제를 검색해 보세요.'
//   value={searchText}
// />
// <FontAwesomeIcon icon={faSearch} className='text-2xl cursor-pointer' onClick={searchData} />
// </div>