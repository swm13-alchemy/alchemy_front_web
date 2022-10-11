import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { userApi } from '../../utils/api'
import { UserInformationTypes } from '../../utils/types'
import { useUserInformation } from '../../stores/store'
import { useRouter } from 'next/router'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'
import { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface Props {
  setPageNum: (pageNum: number) => void
  nickName: string
  setNickName: (nickName: string) => void
  birth: Dayjs | null
  setBirth: (birth: Dayjs | null) => void
  isMale: boolean | undefined
  setIsMale: (isMale: boolean) => void
}

function First({ setPageNum, nickName, setNickName, birth, setBirth, isMale, setIsMale }: Props) {
  const { data: session } = useSession()
  const { setUserId, setOauthId } = useUserInformation()

  useEffect(() => {
    if (session) {
      ;(async () => {
        const { data: response } = await userApi.getUserInformationByOauthId(session.user.oauthId)
        const userInfo: UserInformationTypes = response.data
        // 만약 이전에 가입한 정보가 있다면 로컬 스토리지에 id들을 저장하고 메인페이지로 Redirect
        if (userInfo) {
          setUserId(userInfo.id)
          setOauthId(session.user.oauthId)

          const router = useRouter()
          router.push('/')
        }
      })()
    }
  }, [session])

  return (
    <div className='bg-gray-50 h-screen px-8 py-16 text-gray-900 flex flex-col items-center justify-between'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold text-gray-900'>환영합니다 👋</h1>
        <h2 className='text-lg text-gray-900'>
          가입을 위해 간단한 정보가 필요합니다.
        </h2>

        <main className='mt-12 space-y-8'>
          <section className='space-y-2'>
            <span className='text-sm text-black'>닉네임</span>
            <input
              required
              className='relative mt-2 w-full h-12 flex items-center pl-4 bg-white rounded-xl shadow'
              type='text'
              value={nickName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickName(e.target.value)}
              placeholder='닉네임을 입력해주세요.'
            />
          </section>

          <section className='space-y-2'>
            <span className='text-sm text-black'>생년월일</span>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                className={'w-full px-4 py-3.5 bg-white rounded-xl shadow text-sm' + (birth ? ' !text-black' : ' !text-gray-400')}
                inputFormat="YYYY-MM-DD"
                value={birth}
                onChange={(birth: Dayjs | null) => setBirth(birth)}
                disableFuture={true}
                renderInput={(params) => <TextField
                  variant='standard'
                  InputProps={{
                    disableUnderline: true  // TODO: 이거 안먹히는데 추후 다시 해보기
                  }}
                  {...params}
                />}
              />
            </LocalizationProvider>

            {/*<DatePicker*/}
            {/*  className={'w-full px-4 py-3.5 bg-white rounded-xl shadow text-sm' + (birth ? ' text-black' : 'text-gray-400')}*/}
            {/*  dateFormat='yyyy/MM/dd'*/}
            {/*  selected={birth}*/}
            {/*  placeholderText='1900/00/00'*/}
            {/*  onChange={(date: string) => setBirth(date)}*/}
            {/*/>*/}
          </section>

          <section className='space-y-2'>
            <span className='text-sm text-black'>성별</span>

            <div className='w-full flex space-x-4'>
              <button
                className={'w-full py-3.5 bg-white rounded-lg shadow' + (isMale === true ? ' border-2 border-primary' : ' border-none')}
                onClick={() => setIsMale(true)}
              >
                남자
              </button>
              <button
                className={'w-full py-3.5 bg-white rounded-lg shadow' + (isMale === false ? ' border-2 border-primary' : ' border-none')}
                onClick={() => setIsMale(false)}
              >
                여자
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* 다음 버튼 */}
      {nickName && birth && !!isMale &&
        <button
          className='relative bottom-0 w-full py-3.5 bg-primary rounded-[0.625rem] text-gray-50 shadow-md'
          onClick={() => setPageNum(2)}
        >
          다음
        </button>
      }
    </div>
  )
}

export default First