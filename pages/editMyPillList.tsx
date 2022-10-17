import { NextPage } from 'next'
import { useUserIntakeManagementStore, useUserPillListStore } from '../stores/store'
import EditMyPillListItem from '../components/common/EditMyPillListItem'
import { useRouter } from 'next/router'
import ContainerWithBottomNav from '../components/layout/ContainerWithBottomNav'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import React, { useState } from 'react'
import PillListItem from '../components/common/PillListItem'
import { arrayIsNotEmpty } from '../utils/functions/arrayIsNotEmpty'
import Link from 'next/link'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'

const EditMyPillList: NextPage = () => {
  const router = useRouter()
  const { userTakingPillList, setUserTakingPillList } = useUserPillListStore()
  const { intakePillList, setIntakePillList } = useUserIntakeManagementStore()
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false)

  const deletePill = (id: number) => {
    setUserTakingPillList(userTakingPillList.filter(x => x.id !== id))
    setIntakePillList(intakePillList.filter(x => x.pillId !== id))
  }

  return (
    <ContainerWithBottomNav>
      {/* 헤더 부분 */}
      <header className='relative py-2 flex items-center justify-center text-gray-900 bg-white shadow'>
        <button
          className='absolute left-4 flex items-center justify-center'
          onClick={() => router.back()}
        >
          <ChevronLeft className='text-2xl' />
        </button>
        <h1 className='text-base'>내 영양제 관리</h1>
        {arrayIsNotEmpty(userTakingPillList) && // 등록된 영양제가 있을 때만 편집 버튼이 보임
          <button
            className='absolute right-4 border rounded-xl px-2 py-1'
            onClick={() => setIsEditModeOn(!isEditModeOn)}
          >
            {isEditModeOn ? '완료' : '편집'}
          </button>
        }
      </header>

      {/* 안내 문구 부분 */}
      <div className='bg-white p-6 text-sm space-y-2'>
        <p className='font-bold text-gray-900'>섭취중인 영양제를 편집할 수 있습니다.</p>
        <p className='text-red-500'><strong>주의!</strong> 복용 관리 중인 영양제 삭제 시, 복용 관리 내용도 함께 삭제됩니다.</p>
      </div>

      {/* 섭취 중인 영양제 표시 부분 */}
      <div className='mt-5 px-4 flex flex-col space-y-6'>
        {userTakingPillList.map(pill =>
          isEditModeOn
            ? <EditMyPillListItem key={pill.id} id={pill.id} name={pill.name} maker={pill.maker} deletePillFunc={deletePill} />
            : <PillListItem key={pill.id} id={pill.id} name={pill.name} maker={pill.maker} prefixDomain='/pill-details' />
        )}

        {/* 새로운 영양제 추가하기 버튼 부분 (등록된 영양제가 없거나 편집 버튼을 눌렀을 때만 보임) */}
        {(!arrayIsNotEmpty(userTakingPillList) || isEditModeOn) &&
          <Link href='/search'>
            <a className='bg-white rounded-lg py-5 shadow-md flex flex-col items-center justify-center space-y-2 text-primary'>
              <AddCircleOutline className='text-2xl' />
              <p className='text-base'>새로운 영양제 추가하기</p>
            </a>
          </Link>
        }
      </div>
    </ContainerWithBottomNav>
  )
}

export default EditMyPillList