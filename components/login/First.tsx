import React from 'react'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'

interface Props {
  setPageNum: (pageNum: number) => void
  nickName: string
  setNickName: (nickName: string) => void
  birth: Dayjs | null
  setBirth: (birth: Dayjs | null) => void
  isMale: boolean | null
  setIsMale: (isMale: boolean) => void
}

function First({ setPageNum, nickName, setNickName, birth, setBirth, isMale, setIsMale }: Props) {
  return (
    <div className='bg-gray-50 h-screen px-8 py-16 text-gray-900 flex flex-col items-center justify-between'>
      <div className='space-y-12'>
        <main className='space-y-2'>
          <h1 className='text-3xl font-bold text-gray-900'>환영합니다 👋</h1>
          <h2 className='text-lg text-gray-900'>
            가입을 위해 간단한 정보가 필요합니다.
          </h2>
        </main>

        <div className='space-y-8'>
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
              <DesktopDatePicker
                className={'w-full h-[3.75rem] px-4 py-3.5 bg-white rounded-xl shadow text-sm' + (birth ? ' !text-black' : ' !text-gray-400')}
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
        </div>
      </div>

      {/* 다음 버튼 */}
      {nickName && birth && isMale !== null &&
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