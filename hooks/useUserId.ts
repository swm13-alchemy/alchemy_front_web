import { useUserInformationStore } from '../stores/store'
import { useEffect, useState } from 'react'

const useUserId = (): string | null => {
  const userId = useUserInformationStore(state => state.userId)
  const [returnUserId, setReturnUserId] = useState<string | null>(null)

  useEffect(() => setReturnUserId(userId), [])

  return returnUserId
}

export default useUserId