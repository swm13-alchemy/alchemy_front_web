import First from '../../components/login/First'
import Second from '../../components/login/Second'
import Third from '../../components/login/Third'
import { SupplementDetailsType, UserInformationType } from '../../utils/types'
import { useEffect, useState } from 'react'
import Finish from '../../components/login/Finish'
import dayjs, { Dayjs } from 'dayjs'
import { useUserHealthDataStore, useUserInformationStore } from '../../stores/store'
import { useSession } from 'next-auth/react'
import { userApi } from '../../utils/api'
import LoadingCircular from '../../components/layout/LoadingCircular'
import TermsAndConditions from '../../components/login/TermsAndConditions'

const Step = () => {
  const { userId, setUserId, oauthId, setOauthId } = useUserInformationStore()
  const { setAge, setIsMale } = useUserHealthDataStore()
  const { data: session } = useSession()
  const [pageNum, setPageNum] = useState<number>(0) // 페이지 컴포넌트 변경 시키는 값
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)  // 서비스 이용약관 동의여부
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState<boolean>(false)  // 개인정보처리방침 동의여부
  const [nickName, setNickName] = useState<string>('')
  const [birth, setBirth] = useState<Dayjs | null>(null)
  const [isMaleDataInStepPage, setIsMaleDataInStepPage] = useState<boolean | undefined>(undefined)
  const [interestTopicIds, setInterestTopicIds] = useState<number[]>([])
  const [userPillList, setUserPillList] = useState<SupplementDetailsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 이미 로그인을 한 사람의 경우 Redirect
  useEffect(() => {
    if (userId && oauthId) {
      window.location.replace('/')
    }
  }, [userId, oauthId])

  // 기존에 가입했던 유저인 경우 로그인 처리 후 Home 페이지로 보냄
  useEffect(() => {
    if (session?.user.oauthId) {
      setIsLoading(true)
      ;(async () => {
        const { data: response } = await userApi.getUserInformationByOauthId(session.user.oauthId)
        const userInfo: UserInformationType = response.data
        if (userInfo && userInfo.id && userInfo.oauthId && userInfo.birth && userInfo.isMale) {
          setUserId(userInfo.id)
          setOauthId(userInfo.oauthId)
          setAge(dayjs().get('year') - dayjs(userInfo.birth).get('year') + 1)  // 나이 계산
          setIsMale(userInfo.isMale)
          window.location.replace('/')
        } else {
          setIsLoading(false)
        }
      })()
    }
  }, [session])

  if (isLoading) return <LoadingCircular />

  switch (pageNum) {
    case 0:
      return (
        <TermsAndConditions
          setPageNum={setPageNum}
          agreeTerms={agreeTerms}
          setAgreeTerms={setAgreeTerms}
          agreePrivacyPolicy={agreePrivacyPolicy}
          setAgreePrivacyPolicy={setAgreePrivacyPolicy}
        />
      )
    case 1:
      return (
        <First
          setPageNum={setPageNum}
          nickName={nickName}
          setNickName={setNickName}
          birth={birth}
          setBirth={setBirth}
          isMale={isMaleDataInStepPage}
          setIsMale={setIsMaleDataInStepPage}
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
    // case 3:
    //   return (
    //     <Third
    //       setPageNum={setPageNum}
    //       userPillList={userPillList}
    //       setUserPillList={setUserPillList}
    //     />
    //   )
    case 4:
      return (
        <Finish
          nickName={nickName}
          birth={birth}
          isMale={isMaleDataInStepPage}
          interestTopicIds={interestTopicIds}
          userPillList={userPillList}
        />
      )
  }
}

export default Step