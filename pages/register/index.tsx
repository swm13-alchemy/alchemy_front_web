import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

const RegisterPage = ({ providers }: Props) => {
  return (
    <div className='bg-[#F9FAFB] h-screen mx-8'>
      <div className='pt-28'>
        <span className='text-3xl leading-9 font-normal'>어서오세요!</span>
        <br />
        <span className='text-[#1C65D1] font-bold'>비힐러</span>입니다.
      </div>

      <div className='mt-4 tracking-tighter text-gray-500 text-lg leading-7 font-normal'>
        비힐러는 편리한 영양제 정보 검색부터, 복용 및 섭취관리 그리고 건강고민 해결까지 할 수 있는
        신뢰도 기반 커뮤니티 서비스도 제공하고 있어요. 😊
      </div>

      {/* TODO ::  Link 추가 */}
      {/*<div className='mt-12'>*/}
      {/*  <span className='text-xs leading-4 font-normal text-gray-900'>처음이신가요?</span>*/}
      {/*  <div className='mt-2 w-100 h-12 flex  justify-center items-center bg-[#1C65D1] rounded-xl shadow-md'>*/}
      {/*    <span className='block text-gray-50 text-sm leading-5 font-bold'>가입하기</span>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className='mt-10 flex flex-col space-y-4 items-center'>
        {/*<span className='text-xs leading-4 font-normal text-gray-900'>*/}
        {/*  기존에 사용하신 분인가요?*/}
        {/*</span>*/}

        {providers &&
          Object.values(providers).map((provider) => {
            switch (provider.name) {
              case 'Google':
                return (
                  <button
                    key={provider.name}
                    className="bg-google bg-no-repeat bg-cover bg-center w-72 basis-[4.5rem]"
                    onClick={() => signIn(provider.id, {callbackUrl: 'http://localhost:1234/register/step'})}
                  />
                )
              case 'Kakao':
                return (
                  <button
                    key={provider.name}
                    className="bg-kakao bg-no-repeat bg-cover bg-center w-72 basis-[4.5rem]"
                    onClick={() => signIn(provider.id, {callbackUrl: 'http://localhost:1234/register/step'})}
                  />
                )
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