import SearchResultListItem from '../components/common/SearchResultListItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import requests from '../utils/requests'
import { SearchResultsItemType } from '../utils/types'
import axios from 'axios'

const Search = () => {
  const router = useRouter()
  const [formInputs, setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultsItemType[]>([])

  useEffect(() => {
    if (router.query.name && !searchResults.length) {
      (async function reloadingSearch() {
        const res = await axios.get(requests.fetchSearchResults + `?name=%${router.query.name}%`)
        const result: SearchResultsItemType[] = res.data.pill
        setSearchResults(result)
      })()
    }
  })

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormInputs({ ...formInputs, [name]: value })
    setSearchTerm(e.target.value)
  }

  const search = async (e: any) => {
    e.preventDefault()
    // @ts-ignore
    const res = await axios.get(requests.fetchSearchResults + `?name=%${formInputs.searchTerm}%`)
    const result: SearchResultsItemType[] = res.data.pill
    setSearchResults(result)
    // @ts-ignore
    await router.replace({ query: { name: formInputs.searchTerm } })
  }

  return (
    <div>
      <div className='relative left-0 top-0 w-full h-14 px-3 flex items-center justify-between border-b-[#BABABA] border-b'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className='text-2xl cursor-pointer pr-5'
          onClick={() => router.back()}
        />
        <form className='w-full h-full text-xl flex items-center justify-between' onSubmit={search}>
          <input
            className='appearance-none w-full bg-transparent h-full'
            name='searchTerm'
            placeholder='영양제를 검색해 보세요.'
            value={searchTerm}
            type='text'
            onChange={handleInputs}
            required
          />
          <button className='pl-5'>
            <FontAwesomeIcon icon={faSearch} className='text-2xl' />
          </button>
        </form>
      </div>
      {searchResults.length !== 0 && (
        <div className='px-3 py-5'>
          <p className='text-gray-500 text-base'>검색 결과 {searchResults.length}개</p>
          <div className='flex flex-col w-full mt-3 space-y-2'>
            {searchResults.map((supplement) => {
              return (
                <SearchResultListItem
                  key={supplement.name}
                  id={supplement.id}
                  name={supplement.name}
                  maker={supplement.maker}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
