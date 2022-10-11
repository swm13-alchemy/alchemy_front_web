import First from '../../components/login/First'
import Second from '../../components/login/Second'
import Third from '../../components/login/Third'
import { SupplementDetailsType } from '../../utils/types'
import { useState } from 'react'
import Finish from '../../components/login/Finish'
import { Dayjs } from 'dayjs'

const Sequence = () => {
  const [pageNum, setPageNum] = useState<number>(1) // 페이지 컴포넌트 변경 시키는 값
  const [nickName, setNickName] = useState<string>('')
  const [birth, setBirth] = useState<Dayjs | null>(null)
  const [isMale, setIsMale] = useState<boolean | undefined>(undefined)
  // const [interestTopics, setInterestTopics] = useState<number[]>([])
  const [userPillList, setUserPillList] = useState<SupplementDetailsType[]>([])

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
    // TODO: 추후 구현
    // case 2:
    //   return (
    //     <Second
    //
    //     />
    //   )
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
          // interestTopics={interestTopics}
          userPillList={userPillList}
        />
      )
  }
}

export default Sequence