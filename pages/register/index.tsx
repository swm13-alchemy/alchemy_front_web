import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { useUserInformationStore } from '../../stores/store'
import Image from 'next/image'
import googleLogo from '../../public/asset/loginBtn/googleLogo.png'
import kakaoLogo from '../../public/asset/loginBtn/kakaoLogo.png'
import { useEffect, useState } from 'react'
import LoadingCircular from '../../components/layout/LoadingCircular'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

const RegisterPage = ({ providers }: Props) => {
  const { userId, oauthId } = useUserInformationStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 이미 로그인을 한 사람의 경우 Redirect
  useEffect(() => {
    if (userId && oauthId) {
      window.location.replace('/')
    }
  }, [userId, oauthId])

  /** 소셜 로그인 함수 */
  const goToLogin = (providerId: LiteralUnion<BuiltInProviderType, string>) => {
    setIsLoading(true)
    signIn(providerId, {callbackUrl: 'https://www.beehealer.com/register/step'})  // TODO: 출시할 때는 링크 변경 (로컬 : http://localhost:1234/register/step / 출시 : https://www.beehealer.com/register/step)
  }

  // 로그인 누르면 로딩 처리
  if (isLoading) return <LoadingCircular />

  return (
    <div className='bg-gray-50 h-screen px-8 py-28 text-gray-900'>
      <h1 className='text-3xl'>어서오세요!<br/><strong className='text-primary'>비힐러</strong>입니다.</h1>
      <p className='mt-4 text-lg text-gray-500'>비힐러는 영양제 섭취 관리 기능과<br/>경험 기반 신뢰도 있는 <strong>건강 고민<br/>커뮤니티</strong><span className='text-xs'>(준비중)</span>를 운영하고 있어요. 😊</p>

      <div className='mt-12 w-full flex flex-col space-y-4'>
        <p className='text-xs'>소셜 아이디로 로그인 하기</p>
        {providers &&
          Object.values(providers).map((provider) => {
            switch (provider.name) {
              case 'Google':
                return (
                  <button
                    key={provider.name}
                    className='bg-white px-6 h-10 shadow-md rounded-xl flex items-center space-x-[4.5rem]'
                    onClick={() => goToLogin(provider.id)}
                  >
                    <div className='relative w-[1.125rem] h-[1.125rem]'>
                      <Image
                        src={googleLogo}
                        className='object-cover'
                        layout='fill'
                      />
                    </div>
                    <p className='text-[rgba(0, 0, 0, 0.54)] text-sm font-roboto font-medium'>Google로 로그인</p>
                  </button>
                  // <button
                  //   key={provider.name}
                  //   className="bg-google bg-no-repeat bg-cover bg-center w-72 basis-[4.5rem]"
                  //   onClick={() => signIn(provider.id, {callbackUrl: 'http://localhost:1234/register/step'})}
                  // />
                )
              case 'Kakao':
                return (
                  <button
                    key={provider.name}
                    className='bg-[#FEE500] px-6 h-10 shadow-md rounded-xl flex items-center space-x-[4.5rem]'
                    onClick={() => goToLogin(provider.id)}
                  >
                    <div className='relative w-[1.125rem] h-[1.125rem]'>
                      <Image
                        src={kakaoLogo}
                        className='object-cover'
                        layout='fill'
                      />
                    </div>
                    <p className='text-[rgba(0, 0, 0, 0.85)] text-sm font-medium'>Kakao로 로그인</p>
                  </button>
                  // <button
                  //   key={provider.name}
                  //   className="bg-kakao bg-no-repeat bg-cover bg-center w-72 basis-[4.5rem]"
                  //   onClick={() => signIn(provider.id, {callbackUrl: 'http://localhost:1234/register/step'})}
                  // />
                )
              default:
                return <></>
            }
          })
        }
      </div>
    </div>
  )
}

export default RegisterPage

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  return {
    props: {
      providers
    },
  }
}