import { useUserPillListStore } from '../stores/store'
import { useEffect, useState } from 'react'
import { SupplementDetailsType } from '../utils/types'

/** 유저가 등록한 '내 영양제' 목록을 불러오는 훅 (server-side에서 렌더링 안되는 문제를 해결하기 위해 만든 커스텀 훅) */
const useUserPillList = (): SupplementDetailsType[] => {
  const userTakingPillList = useUserPillListStore(state => state.userTakingPillList)
  const [pillList, setPillList] = useState<SupplementDetailsType[]>([])

  useEffect(() => setPillList(userTakingPillList), [])

  return pillList
}

export default useUserPillList



/**
 * ************* 폐기 예정인 훅 ↓ *************
 * **/


// const useGetLocalPillList = (): SupplementDetailsType[] => {
//   const [userTakingPillList, setUserTakingPillList] = useState<SupplementDetailsType[]>([])
//
//   useEffect(() => {
//     // localStorage에서 'userTakingPillList'라는 key이름으로 데이터를 꺼내봄.
//     const jsonLocalTakingPillList = localStorage.getItem('userTakingPillList')
//     // 만약 있다면 (null이 아니라면) if문 안의 내용 실행
//     if (jsonLocalTakingPillList !== null) {
//       // localStorage에 넣을 때 Json으로 바꿔줬으므로 다시 되돌리기 위해 파싱
//       const localTakingPillList = JSON.parse(jsonLocalTakingPillList)
//       if (localTakingPillList.state.userTakingPillList.length !== 0) {
//         setUserTakingPillList(localTakingPillList.state.userTakingPillList)
//       }
//     }
//   }, [])
//
//   return userTakingPillList
// }
//
// export default useGetLocalPillList