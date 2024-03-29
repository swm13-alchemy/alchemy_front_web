import PillListItem from '../components/common/PillListItem'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchResultsItemType } from '../utils/types'
import { pillApi } from '../utils/api'
import SearchBar from '../components/common/search/SearchBar'
import BackHeader from '../components/layout/BackHeader'
import { NextPage } from 'next'
import { arrayIsNotEmpty } from '../utils/functions/arrayIsNotEmpty'
import Image from 'next/image'
import noSearchResult from '../public/asset/image/noSearchResult.png'
import PillLenseFNB from '../components/layout/PillLenseFNB'
import LoadingCircular from '../components/layout/LoadingCircular'
import { useTempSearchResults } from '../stores/nonLocalStorageStore'

const Search: NextPage = () => {
  const router = useRouter()
  // const [formInputs, setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { prevSearchTerm, setPrevSearchTerm, tempSearchResults, setTempSearchResults } = useTempSearchResults() // 검색 결과 유지를 위해 사용
  const [searchResults, setSearchResults] = useState<SearchResultsItemType[]>([])
  const [isNoResult, setIsNoResult] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // router의 query를 보고 query에 name에 따라 검색을 하는 부분
  useEffect(() => {
    if (router.query.name) {
      setIsLoading(true)
      // 이전에 검색을 했었다면 검색 결과 유지
      if (router.query.name === prevSearchTerm && arrayIsNotEmpty(tempSearchResults)) {
        setSearchResults(tempSearchResults)
        setIsLoading(false)
      } else {  // 처음 검색하는거면 그냥 검색
        ;(async function reloadingSearch() {  // 쿼리 스트링 보고 검색하는 함수
          const {
            data: { data: result },
          } = await pillApi.getSearchResults(router.query.name)
          if (arrayIsNotEmpty(result)) {
            setIsNoResult(false)
            setSearchResults(result)
            // 검색 결과 유지를 위해 전역 상태에도 검색 결과를 저장
            setPrevSearchTerm(searchTerm)
            setTempSearchResults(result)
          } else {
            // 받아온 data의 배열이 비어있는 경우 isNoResult를 true로 바꿈
            setIsNoResult(true)
          }
        })().finally(() => {
          setIsLoading(false)
        })
      }

      // QueryString으로 /search에 name을 넘겨주는 경우, 검색어 State 변경
      setSearchTerm(router.query.name as string)
    }
  }, [router.query.name])

  /** 검색창 입력 핸들러 */
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  /** 검색 실행 함수 */
  const submitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 주소 쿼리스트링 추가해서 상세페이지 들어갔다 나올 때 그대로 검색되게 유지
    await router.replace({ query: { name: searchTerm } })
  }

  return (
    <div className='min-h-screen bg-white space-y-4'>
      <BackHeader router={router} name='Search' />

      <SearchBar submitSearch={submitSearch} handleInputs={handleInputs} searchTerm={searchTerm} />

      {!isLoading ? (
        (!isNoResult ? (  // 검색 결과가 있는 경우
          arrayIsNotEmpty(searchResults) && (
            <div className='px-6 pt-2'>
              <p className='text-gray-900 text-base'>검색된 영양제 {searchResults?.length}개</p>
              <div className='flex flex-col w-full mt-4 space-y-4'>
                {searchResults.map((supplement) => {
                  return (
                    <PillListItem
                      key={supplement.id}
                      id={supplement.id}
                      name={supplement.name}
                      maker={supplement.maker}
                      prefixDomain='/pill-details'
                    />
                  )
                })}
              </div>
            </div>
          )
        ) : (
          // 검색 결과가 없는 경우
          <div className='!mt-60 mx-auto relative w-[10.3125rem] h-[4.625rem]'>
            <Image src={noSearchResult} className='object-cover' layout='fill' />
          </div>
        ))
      ) : ( // 로딩
        <LoadingCircular />
      )}

      <PillLenseFNB bottomMargin='bottom-8' />
    </div>
  )
}

export default Search
