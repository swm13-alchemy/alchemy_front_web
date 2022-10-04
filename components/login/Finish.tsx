import Image from 'next/image'
import signUpIllust from '../../public/asset/image/signUpIllust.png'
import { useRouter } from 'next/router'
import { SupplementDetailsType } from '../../utils/types'
import { useSession } from 'next-auth/react'
import LoadingCircular from '../layout/LoadingCircular'
import { useUserHealthDataStore, useUserInformation } from '../../stores/store'
import dayjs from 'dayjs'
import { userApi } from '../../utils/api'

interface Props {
  nickName: string
  birth: string
  isMale: boolean | undefined
  // interestTopics: number[]
  userPillList: SupplementDetailsType[]
}

function Finish({ nickName, birth, isMale, userPillList }: Props) {
  const router = useRouter()
  const {data: session} = useSession()
  const { setUserId, setOauthId } = useUserInformation()
  const { setAge, setIsMale } = useUserHealthDataStore()

  const completeSignUp = () => {
    // TODO: 되는지 Test 필요
    if (nickName && birth && isMale !== undefined && session) {
      ;(async () => {
        await userApi.postUserInformation(session.user.oauthId, nickName, birth, isMale, session.refreshToken)
          .then((response) => {
            setUserId(response.data.data)
            setOauthId(session.user.oauthId)
            setAge(dayjs().get('year') - dayjs(birth).get('year') + 1)  // 나이 계산
            setIsMale(isMale)
            router.push('/')
          })
          .catch((error) => {
            console.log(error.response)
            alert('오류가 발생했습니다')
            router.push('/initial')
          })
      })()

    } else {  // 만약 필수로 받아야 하는 정보를 받지 않았다면
      alert('오류 : 필수 입력 정보를 모두 입력해주세요')
      router.push('/initial')
    }

  }

  if (!session) return <LoadingCircular />

  return (
    <div className='h-screen px-8 py-[6.25rem] flex flex-col items-center justify-between'>
      <article className='flex flex-col items-center'>
        <div className='relative w-[12.5rem] h-[12.5rem]'>
          <Image
            src={signUpIllust}
            className='object-cover'
            layout='fill'
          />
        </div>
        <h1 className='mt-4 text-3xl text-primary font-bold'>가입을 환영합니다!</h1>
        <p className='mt-4 text-lg text-gray-900'>비힐러가 당신의 건강을 지켜줄게요!</p>
      </article>

      <button
        className='w-full py-3.5 bg-primary rounded-[0.625rem] text-gray-50 shadow-md'
        onClick={completeSignUp}
      >
        완료
      </button>
    </div>
  )
}

export default Finish