import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import Modal from '../../../components/layout/Modal'
import { pillApi, requestURLs } from '../../../utils/api'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const _3: NextPage = (props) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const [searchText, setText] = useState('')
  const [prev, setPrev] = useState(null)

  const [foundItem, setFountItem] = useState({})
  const [selectModalVisible, setSelectModalVisible] = useState(false)

  const [searchResult, setSearchResult] = useState([])

  const [myPillList, setMyPillList] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()

    if (searchText === prev) return

    setPrev(searchText)

    const { data: response } = await pillApi.getSearchResults(searchText)

    setSearchResult(response['data'])
  }

  const handlePillClick = (e) => {
    // e.preventDefault()

    setFountItem(e)
    setSelectModalVisible(true)
  }

  const handleSelectModalClose = () => {
    setFountItem({})
    setSelectModalVisible(false)
  }

  const handleSearchModalClose = (e) => {
    handleSelectModalClose()
    setText('')
    setPrev(null)
    setSearchResult([])
    setSearchModalVisible(false)
  }

  const addPillToList = (data) => {
    const { id } = data

    const isChecked = myPillList.findIndex((e) => e.id === data.id)

    if (isChecked === -1) setMyPillList([...myPillList, data])

    handleSelectModalClose()
  }

  const handleDelete = (id) => {
    const isChecked = myPillList.findIndex((e) => e.id === id)

    const new_list = [...myPillList]

    if (isChecked !== -1) {
      new_list.splice(isChecked, 1)
      setMyPillList([...new_list])
    }
  }

  return (
    <div className='bg-[#F9FAFB] h-screen mx-8 relative flex flex-col'>
      <div className=' pt-16'>
        <span className='text-3xl leading-9 font-bold text-gray-900'>마지막이에요! 👍</span> <br />
        <span className=' mt-2 text-lg leading-7 font-normal text-gray-900'>
          현재 섭취중인 영양제를 알려주세요.
        </span>{' '}
        <br />
        <span className='mt-2 text-xs font-normal text-gray-400'>
          섭취중인 영양제가 없다면, 아래에 건너뛰기를 눌러주세요!
        </span>
        <span className='block text-xs font-normal text-gray-400'>나중에도 추가할 수 있어요!</span>
      </div>

      {/* TODO :: 영양제 탐색 팝업 + 등록시 State에 추가 후 하단 추가된 영양제 부분에 등록해야함. (22-09-28 수정)*/}
      <div className='mt-12'>
        <div
          onClick={() => setSearchModalVisible(true)}
          className='h-12 bg-white shadow rounded-2xl flex items-center px-[1em]'
        >
          <p className='text-gray-500 text-sm'>제품명이나 브랜드 명으로 검색</p>
        </div>
      </div>

      <Modal onClose={handleSearchModalClose} closeOnOverlayClick visible={searchModalVisible}>
        <ModalInner tabIndex='-1'>
          <form
            className='h-12 bg-white shadow rounded-2xl flex items-center px-[1em]'
            onSubmit={handleSearch}
          >
            <input
              className='w-[100%] outline-none text-gray-500 text-sm'
              type='text'
              placeholder='제품이나 브랜드 명으로 검색'
              onChange={(e) => setText(e.target.value)}
              value={searchText}
            />
          </form>

          <div className='mt-4 flex flex-col flex-1'>
            <span>검색된 영양제 {searchResult.length ?? 0}개</span>

            <SearchResult result={searchResult} onClick={handlePillClick} />

            <Modal
              onClose={handleSelectModalClose}
              closeOnOverlayClick
              visible={selectModalVisible}
            >
              <SelectModalInner tabIndex='-1'>
                {foundItem && (
                  <ConfirmModalContent
                    data={foundItem}
                    onClick={addPillToList}
                    onClose={handleSelectModalClose}
                  />
                )}
              </SelectModalInner>
            </Modal>
          </div>
        </ModalInner>
      </Modal>

      <div className='mt-20 relative flex-1 overflow-auto overflow-y-scroll'>
        <span className='text-lg leading-7 font-bold text-gray-900'>추가된 영양제</span>
        <ul className='absolute top-7 bottom-44 left-0 right-0 mt-2 flex flex-col space-y-4 overflow-auto'>
          {myPillList.length ? (
            myPillList.map((data) => <MyPill data={data} handleDelete={handleDelete} />)
          ) : (
            <span className='text-base leading-6 font-normal text-gray-500'>
              아직 등록한 영양제가 없어요!
            </span>
          )}
        </ul>
      </div>

      {/* TODO :: Link + State 전달 + 마지막 요소에는 Padding 값을 넣어야함. (버튼이 fixed Content이므로 화면 가림 방지)*/}
      <div className='absolute mt-2 bottom-28 left-0 right-0  h-12 flex justify-center items-center bg-[#1C65D1] rounded-xl shadow-md'>
        <span className='block text-white text-sm leading-5 font-bold'>다음</span>
      </div>
      <div className='absolute mt-2 bottom-16 left-0 right-0  h-12 flex justify-center items-center'>
        <span className='block text-gray-900 text-sm leading-5 font-normal'>건너뛰기</span>
      </div>
    </div>
  )
}

const ModalInner = ({ tabIndex, children }) => {
  return (
    <div
      tabIndex={tabIndex}
      className='box-border absolute flex flex-col overflow-hidden shadow-sm bg-white rounded-xl top-20 bottom-20 left-8 right-8 p-5'
    >
      {children}
    </div>
  )
}

const SelectModalInner = ({ tabIndex, children }) => {
  return (
    <div
      tabIndex={tabIndex}
      className='box-border absolute flex flex-col overflow-hidden shadow-sm bg-white rounded-xl top-10 bottom-10 left-8 right-8'
    >
      {children}
    </div>
  )
}

const SearchResult = ({ result = [], onClick }) => {
  return (
    <div className='relative flex-1 overflow-auto overflow-y-scroll'>
      {result.length ? (
        <ul className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full  mt-4 space-y-4 '>
          {result.map((supplement) => (
            <Pill data={supplement} onClick={onClick} />
          ))}
        </ul>
      ) : null}
    </div>
  )
}

const Pill = ({ data: supplement, onClick }) => {
  const { key, id, name, maker } = supplement

  return (
    <li
      key={id}
      className='w-full flex bg-white shadow-04dp rounded-lg'
      onClick={() => onClick(supplement)}
    >
      <div className='relative basis-5/12 overflow-hidden'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(id.toString())}
          className='object-contain'
          layout='fill'
        />
      </div>
      <div className='basis-7/12 pt-2 pb-4 px-4 flex flex-col space-y-1'>
        <p className='text-xs text-gray-500 truncate'>{maker}</p>
        <p className='text-base text-gray-900 ellipsisThreeLine'>{name}</p>
      </div>
    </li>
  )
}

const ConfirmModalContent = ({ data: supplement, onClick, onClose }) => {
  const { key, id = '', name, maker } = supplement

  return (
    <div>
      <div className='relative h-[200px] bg-white'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(id.toString())}
          className='object-contain'
          layout='fill'
          priority={true}
        />
      </div>
      <div className='mx-6 flex flex-col justify-center'>
        <div className='mt-6'>
          <span className='block text-xs leading-4 font-normal  text-center text-gray-500'>
            {maker}
          </span>
          <span className='block text-base leading-6 font-normal  text-center text-gray-900'>
            {name}
          </span>
        </div>
        <span className='block mt-4 text-center text-base leading-6 font-bold text-gray-900'>
          이 영양제가 맞나요?
        </span>

        <div
          onClick={() => onClick(supplement)}
          className='absolute mt-2 bottom-28 bottom left-8 right-8  h-12 flex justify-center items-center bg-[#1C65D1] rounded-xl shadow-md'
        >
          <span className='block text-white text-sm leading-5 font-bold'>다음</span>
        </div>

        <div
          onClick={() => onClose()}
          className='absolute mt-2 pb bottom-10 left-8 right-8 h-12 flex justify-center items-center bg-gray-100 rounded-xl shadow-md'
        >
          <span className='block text-gray-900 text-sm leading-5 font-bold'>
            아니요! 다시 찾을게요
          </span>
        </div>
      </div>
    </div>
  )
}

const MyPill = ({ data: supplement, handleDelete }) => {
  const { key, id = '', name, maker } = supplement

  return (
    <li className='flex bg-white shadow-sm rounded-lg'>
      <div className='relative basis-5/12 overflow-hidden'>
        <Image
          src={requestURLs.getSupplementThumbnailURL(id.toString())}
          className='object-contain'
          layout='fill'
        />
      </div>
      <div className='basis-7/12 pt-2 pb-4 px-4 flex flex-col space-y-1'>
        <p className='text-xs text-gray-500 truncate'>{maker}</p>
        <p className='text-base text-gray-900 ellipsisThreeLine'>{name}</p>
      </div>

      <div className='border-l border-[#BABABA] w-1/5 flex items-center justify-center'>
        <FontAwesomeIcon
          icon={faTrashCan}
          className='text-2xl text-red-600 z-0'
          onClick={() => handleDelete(id)}
        />
      </div>
    </li>
  )
}

export default _3
