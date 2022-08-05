import { useEffect, useState } from 'react'
import { SupplementDetailsType } from '../utils/types'


/**
 * ************* 폐기 예정인 훅 *************
 * **/


const useGetLocalPillList = (): SupplementDetailsType[] => {
  const [userTakingPillList, setUserTakingPillList] = useState<SupplementDetailsType[]>([])

  useEffect(() => {
    // localStorage에서 'userTakingPillList'라는 key이름으로 데이터를 꺼내봄.
    const jsonLocalTakingPillList = localStorage.getItem('userTakingPillList')
    // 만약 있다면 (null이 아니라면) if문 안의 내용 실행
    if (jsonLocalTakingPillList !== null) {
      // localStorage에 넣을 때 Json으로 바꿔줬으므로 다시 되돌리기 위해 파싱
      const localTakingPillList = JSON.parse(jsonLocalTakingPillList)
      if (localTakingPillList.state.userTakingPillList.length !== 0) {
        setUserTakingPillList(localTakingPillList.state.userTakingPillList)
      }
    }
  }, [])

  return userTakingPillList
}

export default useGetLocalPillList