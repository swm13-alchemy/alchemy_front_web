import { TOPICS } from '../../utils/constants'
import { arrayIsNotEmpty } from '../../utils/functions/arrayIsNotEmpty'
import SelectableTopicBox from '../../components/common/SelectableTopicBox'
import { useRouter } from 'next/router'
import BackHeader from '../../components/layout/BackHeader'
import { useEffect, useState } from 'react'
import { useUserInformationStore } from '../../stores/store'
import { topicApi } from '../../utils/api'

const EditInterestTopic = () => {
  const router = useRouter()
  const userId = useUserInformationStore(state => state.userId)
  const queryInterestTopicIds: string[] = router.query.interestTopicIds as string[]
  const [interestTopicIds, setInterestTopicIds] = useState<number[]>([])

  useEffect(() => {
    setInterestTopicIds(queryInterestTopicIds.map(x => parseInt(x)))
  }, [queryInterestTopicIds])

  if (!userId) { // 로그인 안했으면 Redirect
    router.back()
  }

  /** 완료 버튼 눌렀을 때 함수 */
  const completingTheEdit = async () => {
    if (userId) {
      await topicApi.patchUserInterestTopics(userId, interestTopicIds)
        .then(() => router.back())
    }
  }

  return (
    <div className='bg-gray-50 h-screen'>
      <BackHeader router={router} name='관심 건강 고민 편집' />

      <div className='px-8 pt-10 pb-16 text-gray-900'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>건강고민이 있나요? 🤔</h1>
          <h2 className='text-lg'>관심있는 건강 고민 토픽을 선택해주세요.</h2>
        </div>

        <div className='mt-12 w-full grid grid-cols-3 gap-6 pb-12'>
          {TOPICS.map((topic) =>
            <SelectableTopicBox
              key={topic.id}
              topicId={topic.id}
              topicName={topic.name}
              interestTopicIds={interestTopicIds}
              setInterestTopicIds={setInterestTopicIds}
            />
          )}
        </div>

        {/* 완료 버튼 */}
        {arrayIsNotEmpty(interestTopicIds) &&
          <button
            className='fixed bottom-10 left-10 right-10 py-3.5 bg-primary rounded-[0.625rem] text-gray-50 shadow-md'
            onClick={completingTheEdit}
          >
            완료
          </button>
        }
      </div>
    </div>
  )
}

export default EditInterestTopic