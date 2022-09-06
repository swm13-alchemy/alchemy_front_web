import PillView from './PillView'
import Link from 'next/link'
import useUserPillList from '../../hooks/useUserPillList'
import { requestURLs } from '../../utils/api'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'

function MyPillList() {
  // // 랜더링 문제로 Zustand 훅 안쓰고 커스텀 훅 사용 (노션 참고)
  const userTakingPillList = useUserPillList()

  return (
    <Link href='/pillList-management'>
      <a>
        <div className='w-full px-5'>
          <h1 className='text-xl font-bold'>내 영양제 {'>'}</h1>
          <div className='flex space-x-1.5 mt-5 overflow-x-scroll scrollbar-hide'>
            {arrayIsNotEmpty(userTakingPillList) ?
              userTakingPillList.map((pill) => {
                return(
                  <PillView key={pill.id} imageUrl={requestURLs.getSupplementThumbnailURL(pill.id.toString())} name={pill.name} />
                )
              }) : (
                <p className='text-sm'>등록된 영양제가 없어요! 영양제를 등록해보세요.</p>
              )
            }
          </div>
        </div>
      </a>
    </Link>
  )
}

export default MyPillList
