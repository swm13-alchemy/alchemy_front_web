import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../components/layout/BackHeader'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { postAirTable } from '../../utils/airtable'
import TopCenterSnackBar from '../../components/common/TopCenterSnackBar'
import LoadingCircular from '../../components/layout/LoadingCircular'

const CustomerService = () => {
  const router = useRouter()
  const [customerText, setCustomerText] = useState<string>('')
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submitCustomerText = () => {
    setIsLoading(true)
    postAirTable('test', customerText)  // TODO: 실제 유저 아이디를 넣어야함
    setIsSnackBarOpen(true)
    setTimeout(() => {
      setIsLoading(false)
      router.back()
    }, 1500)
  }

  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='문의/건의하기' />

      {!isLoading ? (
        <div className='bg-white p-4 flex flex-col items-center space-y-6'>
          <TextField
            className='w-full'
            label="문의/건의사항 입력하기"
            multiline
            rows={20}
            value={customerText}
            onChange={(e) => setCustomerText(e.target.value)}
            placeholder="비힐러의 더 나은 서비스를 위해 문의/건의 사항을 적어주세요"
          />

          <button
            className='w-full bg-primary py-2 rounded-[0.625rem] text-base text-white'
            onClick={submitCustomerText}
          >
            완료
          </button>
        </div>
      ) : (
        <LoadingCircular />
      )}

      <TopCenterSnackBar
        isSnackBarOpen={isSnackBarOpen}
        setIsSnackBarOpen={setIsSnackBarOpen}
        severity='success'
        content='전송이 완료되었습니다!'
      />
    </ContainerWithBottomNav>
  )
}

export default CustomerService