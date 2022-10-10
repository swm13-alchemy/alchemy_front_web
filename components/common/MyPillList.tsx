import PillView from './PillView'
import Link from 'next/link'
import useUserPillList from '../../hooks/useUserPillList'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import ChevronRight from '@mui/icons-material/ChevronRight'

function MyPillList() {
  // // 랜더링 문제로 Zustand 훅 안쓰고 커스텀 훅 사용 (노션 참고)
  const userTakingPillList = useUserPillList()

  return (
    <Link href='/pillList-management'>
      <a className='w-full space-y-4'>
        <div className='flex items-center justify-between text-gray-900'>
          <h1 className='text-base font-bold'>내 영양제</h1>
          <ChevronRight className='text-2xl' />
        </div>
        <div className='flex items-center space-x-4 overflow-x-scroll scrollbar-hide'>
          {arrayIsNotEmpty(userTakingPillList) ?
            userTakingPillList.map((pill) => {
              return(
                <PillView key={pill.id} pillId={pill.id} name={pill.name} />
              )
            }) : (
              <p className='text-sm'>등록된 영양제가 없어요! 영양제를 등록해보세요.</p>
            )
          }
        </div>
      </a>
    </Link>
  )
}

export default MyPillList
