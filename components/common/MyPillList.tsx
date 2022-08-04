import PillView from './PillView'
import Link from 'next/link'
import requests from '../../utils/requests'
import useGetLocalPillList from '../../hooks/useGetLocalPillList'

function MyPillList() {
  // 랜더링 문제로 Zustand 훅 안쓰고 localStorage에서 직접 가져오는 커스텀 훅 사용
  const userTakingPillList = useGetLocalPillList()

  return (
    <Link href='/'>
      <a>
        <div className='w-full px-5'>
          <h1 className='text-xl font-bold'>내 영양제 {'>'}</h1>
          <div className='flex space-x-1.5 mt-5 overflow-x-scroll scrollbar-hide'>
            {userTakingPillList?.length !== 0 ?
              userTakingPillList.map((pill) => {
                return(
                  <PillView key={pill.id} imageUrl={requests.fetchSupplementThumbnail(pill.id.toString())} name={pill.name} />
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
