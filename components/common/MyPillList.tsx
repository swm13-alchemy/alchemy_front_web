import PillView from './PillView'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SupplementDetailsType } from '../../utils/types'
import requests from '../../utils/requests'

function MyPillList() {
  const [userTakingPillList, setUserTakingPillList] = useState<SupplementDetailsType[]>([])

  useEffect(() => {
    // localStorage에서 'userTakingPillList'라는 key이름으로 데이터를 꺼내봄.
    const jsonLocalTakingPillList = localStorage.getItem('userTakingPillList')
    // 만약 있다면 (null이 아니라면) if문 안의 내용 실행
    if (jsonLocalTakingPillList !== null) {
      // localStorage에 넣을 때 Json으로 바꿔주므로 다시 되돌리기 위해 파싱
      const localTakingPillList: SupplementDetailsType[] = JSON.parse(jsonLocalTakingPillList)
      setUserTakingPillList(localTakingPillList)
    }
  }, [])

  return (
    <Link href='/'>
      <a>
        <div className='w-full px-2'>
          <h1 className='text-xl font-bold px-3'>내 영양제 {'>'}</h1>
          <div className='flex space-x-1.5 mt-5 overflow-x-scroll scrollbar-hide'>
            {userTakingPillList?.length !== 0 &&
              userTakingPillList.map((pill) => {
                return(
                  <PillView key={pill.id} imageUrl={requests.fetchSupplementThumbnail(pill.id.toString())} name={pill.name} />
                )
              })
            }
          </div>
        </div>
      </a>
    </Link>
  )
}

export default MyPillList
