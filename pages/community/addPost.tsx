import { useRouter } from 'next/router'
import BackHeader from '../../components/layout/BackHeader'
import MuiAutoCompleteTopicInput from '../../components/common/community/MuiAutoCompleteTopicInput'
import React, { useEffect, useState } from 'react'
import { TopicType } from '../../utils/types'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import InsertChartOutlined from '@mui/icons-material/InsertChartOutlined'
import Tag from '@mui/icons-material/Tag'
import TopCenterSnackBar from '../../components/common/TopCenterSnackBar'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import { postApi } from '../../utils/api'
import { useUserInformationStore } from '../../stores/store'
import LoadingCircular from '../../components/layout/LoadingCircular'

const AddPost = () => {
  const router = useRouter()
  const userId = useUserInformationStore(state => state.userId)
  const [selectedTopics, setSelectedTopics] = useState<TopicType[]>([])
  const [inputTags, setInputTags] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [isTopicError, setIsTopicError] = useState<boolean>(false)
  const [isTitleError, setIsTitleError] = useState<boolean>(false)
  const [isBodyError, setIsBodyError] = useState<boolean>(false)
  const [isSuccessPost, setIsSuccessPost] = useState<boolean>(false)
  const [isFailPost, setIsFailPost] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /** 글 작성 함수 */
  const submitPost = () => {
    setIsLoading(true)
    if (!arrayIsNotEmpty(selectedTopics)) {
      setIsTopicError(true)
      setIsLoading(false)
    } else if (!title) {
      setIsTitleError(true)
      setIsLoading(false)
    } else if (!body) {
      setIsBodyError(true)
      setIsLoading(false)
    } else {
      if (userId) {
        ;(async () => {
          await postApi.postNewPost(userId, title, body, [], selectedTopics.map(x => x.id))
            .then(() => {
              setIsLoading(false)
              setIsSuccessPost(true)
              setTimeout(() => router.push('/community'), 1500)
            })
            .catch(() => {
              setIsLoading(false)
              setIsFailPost(true)
            })
        })()
      }
    }
  }

  // 로그인이 안되어있는 경우 Redirect
  useEffect(() => {
    if (!userId) {
      router.back()
    }
  }, [userId])
  
  // 로딩 처리
  if (isLoading) return <LoadingCircular />

  return (
    <div className='bg-gray-50'>
      <BackHeader router={router} name='글 작성' />

      <div className='py-4 space-y-4 flex flex-col items-center'>
        <div className='w-full px-4 space-y-4'>
          {/* 건강 고민 토픽 선택하는 부분 */}
          <div className='space-y-2'>
            <p className='text-sm text-gray-900'>건강 고민 토픽 선택하기</p>
            <MuiAutoCompleteTopicInput
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
          </div>
          {/* 추가 태그 선택하는 부분 */}
          {/*<div className='space-y-2'>*/}
          {/*  <p className='text-sm text-gray-900'>태그 입력하기</p>*/}
          {/*  <MuiAutoCompleteTopicInput*/}
          {/*    selectedTopics={inputTags}*/}
          {/*    setSelectedTopics={setInputTags}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        {/* 글 작성 부분 */}
        <div className='space-y-1.5'>
          {/* 글 제목 */}
          <input
            type='text'
            className='w-full px-4 py-3.5 text-sm text-gray-900 focus: outline-none'
            placeholder='글 제목 작성 (최대 100자)'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
          />
          {/* 글 본문 */}
          <textarea
            className='w-full h-[21.75rem] px-4 py-3.5 text-sm text-gray-900 focus: outline-none'
            placeholder='내용을 작성해주세요. (#을 누르면 영양제를 태그할 수 있어요)'
            value={body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
            required
          />
          {/* 글 첨부 기능 버튼들 */}
          {/*<div className='bg-white px-4 py-2 flex items-center justify-between'>*/}
          {/*  <div className='flex items-center space-x-4'>*/}
          {/*    <button className='flex items-center justify-center'>*/}
          {/*      <ImageOutlined className='text-2xl text-gray-500' />*/}
          {/*    </button>*/}
          {/*    <button className='flex items-center justify-center'>*/}
          {/*      <InsertChartOutlined className='text-2xl text-gray-500' />*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*  <button className='flex items-center justify-center'>*/}
          {/*    <Tag className='text-2xl text-gray-500' />*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
        {/* 글 등록 버튼 */}
        <button
          className='w-11/12 py-3.5 bg-primary rounded-[0.625rem] text-sm font-bold text-gray-50'
          onClick={submitPost}
        >
          글 등록하기
        </button>
      </div>

      {/* 건강고민토픽 에러 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isTopicError}
        setIsSnackBarOpen={setIsTopicError}
        severity='error'
        content='건강고민토픽을 최소 1개 이상 입력해주세요.'
      />
      {/* 제목 에러 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isTitleError}
        setIsSnackBarOpen={setIsTitleError}
        severity='error'
        content='제목을 입력해주세요.'
      />
      {/* 본문 에러 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isBodyError}
        setIsSnackBarOpen={setIsBodyError}
        severity='error'
        content='본문을 입력해주세요.'
      />
      {/* 글 작성 성공 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isSuccessPost}
        setIsSnackBarOpen={setIsSuccessPost}
        severity='success'
        content='글이 등록되었습니다! 😉'
      />
      {/* 글 작성 실패 스낵바 */}
      <TopCenterSnackBar
        isSnackBarOpen={isFailPost}
        setIsSnackBarOpen={setIsFailPost}
        severity='error'
        content='글 작성에 실패했습니다. 다시 시도해주세요! 문제가 반복되는 경우 문의 바랍니다 😥'
      />
    </div>
  )
}

export default AddPost