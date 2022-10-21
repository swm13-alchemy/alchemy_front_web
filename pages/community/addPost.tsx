import { useRouter } from 'next/router'
import BackHeader from '../../components/layout/BackHeader'
import MuiAutoCompleteTopicInput from '../../components/common/community/MuiAutoCompleteTopicInput'
import React, { useState } from 'react'
import { TopicType } from '../../utils/types'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import InsertChartOutlined from '@mui/icons-material/InsertChartOutlined'
import Tag from '@mui/icons-material/Tag'

const AddPost = () => {
  const router = useRouter()
  const [selectedTopics, setSelectedTopics] = useState<TopicType[]>([])
  const [inputTags, setInputTags] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

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
        <button className='w-11/12 py-3.5 bg-primary rounded-[0.625rem] text-sm font-bold text-gray-50'>
          글 등록하기
        </button>
      </div>
    </div>
  )
}

export default AddPost