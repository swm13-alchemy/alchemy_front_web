import First from '../../components/login/First'
import Second from '../../components/login/Second'
import Third from '../../components/login/Third'
import { SupplementDetailsType, UserInformationTypes } from '../../utils/types'
import { useState } from 'react'
import Finish from '../../components/login/Finish'
import { Dayjs } from 'dayjs'
import { useUserInformationStore } from '../../stores/store'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { userApi } from '../../utils/api'

const Step = () => {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useUserInformationStore()
  const { data: session } = useSession()
  const [pageNum, setPageNum] = useState<number>(1) // 페이지 컴포넌트 변경 시키는 값
  const [nickName, setNickName] = useState<string>('')
  const [birth, setBirth] = useState<Dayjs | null>(null)
  const [isMale, setIsMale] = useState<boolean | undefined>(undefined)
  const [interestTopicIds, setInterestTopicIds] = useState<number[]>([])
  const [userPillList, setUserPillList] = useState<SupplementDetailsType[]>([])

  // 이미 로그인을 한 사람의 경우 Redirect
  if (userId || oauthId) {
    router.push('/')
  }

  // 기존에 가입했던 유저인 경우 로그인 처리
  if (session?.user.oauthId) {
    (async () => {
      const { data: response } = await userApi.getUserInformationByOauthId(session.user.oauthId)
      const userInfo: UserInformationTypes = response.data
      if (userInfo?.id) {
        setUserId(userInfo.id)
        setOauthId(userInfo.oauthId)
        window.location.replace('/')
      }
    })()
  }

  switch (pageNum) {
    case 1:
      return (
        <First
          setPageNum={setPageNum}
          nickName={nickName}
          setNickName={setNickName}
          birth={birth}
          setBirth={setBirth}
          isMale={isMale}
          setIsMale={setIsMale}
        />
      )
    case 2:
      return (
        <Second
          setPageNum={setPageNum}
          interestTopicIds={interestTopicIds}
          setInterestTopicIds={setInterestTopicIds}
        />
      )
    case 3:
      return (
        <Third
          setPageNum={setPageNum}
          userPillList={userPillList}
          setUserPillList={setUserPillList}
        />
      )
    case 4:
      return (
        <Finish
          nickName={nickName}
          birth={birth}
          isMale={isMale}
          interestTopicIds={interestTopicIds}
          userPillList={userPillList}
        />
      )
  }
}

export default Step