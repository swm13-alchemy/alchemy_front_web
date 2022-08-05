import { useUserPillListStore } from '../stores/store'
import { useEffect, useState } from 'react'
import { SupplementDetailsType } from '../utils/types'

const useUserPillList = (): SupplementDetailsType[] => {
  const { userTakingPillList } = useUserPillListStore()
  const [pillList, setPillList] = useState<SupplementDetailsType[]>([])

  useEffect(() => setPillList(userTakingPillList), [])

  return pillList
}

export default useUserPillList