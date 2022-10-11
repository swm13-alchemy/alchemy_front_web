import First from '../../components/login/First'
import Second from '../../components/login/Second'
import Third from '../../components/login/Third'
import { SupplementDetailsType } from '../../utils/types'
import { useState } from 'react'
import Finish from '../../components/login/Finish'
import { Dayjs } from 'dayjs'
import { useUserInformation } from '../../stores/store'
import { useRouter } from 'next/router'

const Step = () => {
  const { userId, oauthId } = useUserInformation()
  const [pageNum, setPageNum] = useState<number>(1) // 페이지 컴포넌트 변경 시키는 값
  const [nickName, setNickName] = useState<string>('')
  const [birth, setBirth] = useState<Dayjs | null>(null)
  const [isMale, setIsMale] = useState<boolean | undefined>(undefined)
  const [interestTopicIds, setInterestTopicIds] = useState<number[]>([])
  const [userPillList, setUserPillList] = useState<SupplementDetailsType[]>([])

  // 이미 로그인을 한 사람의 경우 Redirect
  if (userId || oauthId) {
    const router = useRouter()
    router.push('/')
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