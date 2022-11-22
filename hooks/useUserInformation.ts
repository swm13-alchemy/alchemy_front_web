import { useUserInformationStore } from '../stores/store'
import { useEffect, useState } from 'react'

const useUserInformation = () => {
  const userId = useUserInformationStore(state => state.userId)
  const oauthId = useUserInformationStore(state => state.oauthId)
  const [returnUserId, setReturnUserId] = useState<string | null>(null)
  const [returnOauthId, setReturnOauthId] = useState<string | null>(null)

  useEffect(() => {
    setReturnUserId(userId)
    setReturnOauthId(oauthId)
  }, [])

  return { userId: returnUserId, oauthId: returnOauthId }
}

export default useUserInformation