import ContainerWithBottomNav from '../../../../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../../../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import PillListItem from '../../../../../components/common/PillListItem'

const AddablePillList = () => {
  const router = useRouter()
  const time: string = router.query.time as string
  
  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='영양제 시간표 편집' />

      <div className='px-6 my-6 flex flex-col space-y-4'>
        <p className='text-base text-gray-900'><strong>{time}</strong> 알림에 추가되지 않은 영양제</p>
        <PillListItem
          id={1}
          name='Alpha GPS 300mg 60 Veg Capsule (Cognigination)'
          maker='now'
          prefixDomain={`/intake/edit-schedule/add/${time}`}
        />
        <PillListItem
          id={2}
          name='Alpha GPS 300mg 60 Veg Capsule (Cognigination)'
          maker='now'
          prefixDomain={`/intake/edit-schedule/add/${time}`}
        />
      </div>
    </ContainerWithBottomNav>
  )
}

export default AddablePillList