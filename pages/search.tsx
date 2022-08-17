import SearchResultListItem from '../components/common/search/SearchResultListItem'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchResultsItemType } from '../utils/types'
import { pillApi } from '../utils/api'
import SearchBar from '../components/layout/SearchBar'
import HeadNav from '../components/layout/HeadNav'
import { NextPage } from 'next'

const Search: NextPage = () => {
  const router = useRouter()
  // const [formInputs, setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResultsItemType[]>([])

  useEffect(() => {
    if (router.query.name && !searchResults.length) {
      (async function reloadingSearch() {
        const { data: { pills: result } } = await pillApi.getSearchResults(router.query.name)
        setSearchResults(result)
      })()
    }
  }, [router.query.name])

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target
    // setFormInputs({ ...formInputs, [name]: value })
    setSearchTerm(e.target.value)
  }

  const submitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data: { pills: result } } = await pillApi.getSearchResults(searchTerm)
    setSearchResults(result)
    // 주소 쿼리스트링 추가해서 상세페이지 들어갔다 나올 때 그대로 검색되게 유지
    await router.replace({ query: { name: searchTerm } })
  }

  return (
    <div className='space-y-4'>
      <HeadNav router={router} name='Search' />

      <SearchBar
        submitSearch={submitSearch}
        handleInputs={handleInputs}
        searchTerm={searchTerm}
      />

      {searchResults.length !== 0 && (
        <div className='px-6 my-6'>
          <p className='text-gray-900 text-base'>검색된 영양제 {searchResults.length}개</p>
          <div className='flex flex-col w-full mt-4 space-y-4'>
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
