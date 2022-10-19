import logo from '../../public/asset/image/logo.png'
import Image from 'next/image'
import { CheckCircleOutline } from '@mui/icons-material'
import { PRIVACY_POLICY, TERMS } from '../../utils/termsConstants'
import React from 'react'

interface Props {
  setPageNum: (pageNum: number) => void
  agreeTerms: boolean
  setAgreeTerms: (agreeTerms: boolean) => void
  agreePrivacyPolicy: boolean
  setAgreePrivacyPolicy: (agreePrivacyPolicy: boolean) => void
}

function TermsAndConditions({ setPageNum, agreeTerms, setAgreeTerms, agreePrivacyPolicy, setAgreePrivacyPolicy }: Props) {

  const agreeAll = () => {
    if (agreeTerms && agreePrivacyPolicy) {
      setAgreeTerms(false)
      setAgreePrivacyPolicy(false)
    } else {
      setAgreeTerms(true)
      setAgreePrivacyPolicy(true)
    }
  }

  return (
    <div className='bg-gray-50 h-screen px-6 py-8 relative'>
      <header className='space-y-2.5'>
        {/* 로고 이미지 */}
        <div className='relative w-[6.9375rem] h-6'>
          <Image
            src={logo}
            className='object-cover'
            layout='fill'
          />
        </div>
        <h1 className='text-lg font-bold text-gray-900'>약관동의</h1>
        <h2 className='text-sm text-gray-400'>비힐러 서비스 이용을 위해 약관 동의가 필요합니다.</h2>
      </header>

      <main className='mt-8 space-y-5'>
        {/* 서비스이용약관 부분 */}
        <button
          className='w-full flex items-center justify-between'
          onClick={() => setAgreeTerms(!agreeTerms)}
        >
          <p className='text-xs text-gray-900'><strong className='text-primary'>(필수)</strong> BeeHealer서비스이용약관</p>
          <CheckCircleOutline className={'text-base' + (agreeTerms ? ' text-primary' : ' text-gray-300')} />
        </button>
        <div className='bg-gray-200 p-3 h-32'>
          <p className='h-full text-sm text-gray-900 overflow-y-scroll overflow-x-hidden'>
            {TERMS}
          </p>
        </div>
        {/* 개인정보처리방침 부분 */}
        <button
          className='w-full flex items-center justify-between'
          onClick={() => setAgreePrivacyPolicy(!agreePrivacyPolicy)}
        >
          <p className='text-xs text-gray-900'><strong className='text-primary'>(필수)</strong> 개인정보처리방침</p>
          <CheckCircleOutline className={'text-base' + (agreePrivacyPolicy ? ' text-primary' : ' text-gray-300')} />
        </button>
        <div className='bg-gray-200 p-3 h-32'>
          <p className='h-full text-sm text-gray-900 overflow-y-scroll overflow-x-hidden'>
            {PRIVACY_POLICY}
          </p>
        </div>
      </main>
      {/* 전체 동의 버튼 */}
      <button
        className={'mt-7 w-full h-12 border border-primary rounded text-sm' +
          (agreeTerms && agreePrivacyPolicy ? ' bg-primary text-white' : ' bg-transparent text-primary')}
        onClick={agreeAll}
      >
        네, 모두 동의합니다.
      </button>

      {/* 다음 버튼 */}
      {agreeTerms && agreePrivacyPolicy &&
        <button
          className='absolute bottom-8 left-6 right-6 py-3.5 bg-primary rounded-[0.625rem] text-gray-50 shadow-md'
          onClick={() => setPageNum(1)}
        >
          다음
        </button>
      }
    </div>
  )
}

export default TermsAndConditions