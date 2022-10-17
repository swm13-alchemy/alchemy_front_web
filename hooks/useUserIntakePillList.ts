import { useUserIntakeManagementStore } from '../stores/store'
import { useEffect, useState } from 'react'
import { IntakeManagementType } from '../utils/types'

const useUserIntakePillList = () => {
  const intakePillList = useUserIntakeManagementStore(state => state.intakePillList)
  const [returnIntakePillList, setIntakePillList] = useState<IntakeManagementType[]>([])

  useEffect(() => setIntakePillList(intakePillList), [])

  return returnIntakePillList
}

export default useUserIntakePillList