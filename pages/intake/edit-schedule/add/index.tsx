import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import PillListItem from '../../../../components/common/PillListItem'
import { useUserIntakeManagementStore, useUserPillListStore } from '../../../../stores/store'
import { useEffect, useState } from 'react'
import { arrayIsNotEmpty } from '../../../../utils/functions/arrayIsNotEmpty'
import { IntakeManagementType } from '../../../../utils/types'

type PillListItemType = {
  id: number
  name: string
  maker: string
}

const AddablePillList = () => {
  const router = useRouter()
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const setIntakePillList = useUserIntakeManagementStore(state => state.setIntakePillList)
  const [notYetIntakeManagementPillList, setNotYetIntakeManagementPillList] = useState<PillListItemType[]>([])

  useEffect(() => {
    if (arrayIsNotEmpty(userTakingPillList)) {
      const pillListToShow:PillListItemType[] = []  // 아직 복용 관리 중이지 않은 영양제들로, 화면에 보여줄 것들
      for (const takingPill of userTakingPillList) {
        // 객체 배열인 intakePillList에서 takingPill과 id가 같은 객체 값이 있는지 find함수로 확인
        // 있다면 객체가 반환되고 없으면 undefined가 반환
        const matchOne: IntakeManagementType | undefined = intakePillList.find(x => x.pillId === takingPill.id)
        // intakePillList(영양제 시간표 관리되는 영양제 리스트)에 takingPill(복용중인 영양제 중 하나)과 id 값이 같은 영양제가 없다면,
        if (matchOne === undefined) {
          // 아직 복용 관리를 시작하지 않은 영양제이므로 표시해야 함
          pillListToShow.push({
            id: takingPill.id,
            name: takingPill.name,
            maker: takingPill.maker
          })
        }
      }
      setNotYetIntakeManagementPillList(pillListToShow)
    }
  }, [])
  
  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 시간표 편집' />

      <div className='px-6 my-6 flex flex-col space-y-4'>
        <p className='text-base text-gray-900'>알림에 추가되지 않은 영양제</p>
        {arrayIsNotEmpty(notYetIntakeManagementPillList) ? (
          notYetIntakeManagementPillList.map((pill) =>
            <PillListItem
              key={pill.id}
              id={pill.id}
              name={pill.name}
              maker={pill.maker}
              prefixDomain='/intake/edit-schedule/add'
            />
          )
        ) : (
          <p className='text-sm text-gray-900'>추가할 영양제가 없습니다! 새로운 영양제를 내 영양제에 추가해보세요</p>
        )}
      </div>
    </ContainerWithBottomNav>
  )
}

export default AddablePillList