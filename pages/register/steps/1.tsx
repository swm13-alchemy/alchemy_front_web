import { NextPage } from 'next'
import { useRouter, withRouter } from 'next/router'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const _1: NextPage = (props) => {
  const router = useRouter()

  const [startDate, setStartDate] = useState()
  const [gender, setGender] = useState()

  const defaultGenderButtonStyle =
    'relative mt-2 flex-1 h-12 flex justify-center items-center bg-white rounded-xl shadow-md cursor-pointer'

  const defaultGenderButtonInnerTextStyle = 'block text-gray-900 text-sm leading-5'

  const setGenderButtonStyle = (gen) =>
    `${defaultGenderButtonStyle} ${gen === gender && 'bg-[#1C65D1]'}`

  const setGenderButtonInnerTextStyle = (gen) =>
    `${defaultGenderButtonInnerTextStyle} text-${
      gen === gender ? 'white font-bold' : 'gray-900 font-normal'
    }`

  const nextButtonStyle = `absolute mt-2 bottom-16 w-[100%] h-12 flex justify-center items-center rounded-xl shadow-md bg-[#1C65D1] ${
    startDate && gender ? '' : 'hidden'
  }`

  const handleNextButtonClick = (e) => {
    if (!(startDate && gender)) return

    const leftPad = (value) => {
      if (value >= 10) {
        return value
      }
      return `0${value}`
    }

    const toStringByFormatting = (source, delimiter = '/') => {
      const year = source.getFullYear()
      const month = leftPad(source.getMonth() + 1)
      const day = leftPad(source.getDate())

      return [year, month, day].join(delimiter)
    }

    const birth = toStringByFormatting(startDate)

    // TODO :: Push Logic => Zustand로 변경해서 관리해야함
    router.push({
      pathname: '/register/steps/2',
    })
  }

  return (
    <div className='bg-[#F9FAFB] h-screen mx-8 relative'>
      <div className=' pt-16'>
        <span className='text-3xl leading-9 font-bold text-gray-900'>환영합니다 👋</span> <br />
        <span className=' mt-2 text-lg leading-7 font-normal text-gray-900'>
          가입을 위해 간단한 정보가 필요합니다.
        </span>
      </div>

      <div className='mt-12'>
        <span className='text-sm leading-5 font-normal text-black'>생년월일</span>

        <div className='relative mt-2 w-100 h-12 flex  items-center pl-4 bg-white rounded-xl shadow-md'>
          <DatePicker
            className={`text-${startDate ? 'black' : 'gray-400'} text-sm leading-5 font-normal`}
            dateFormat='yyyy/MM/dd'
            selected={startDate}
            placeholderText='1900/00/00'
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>

      <div className='mt-8'>
        <span className='text-sm leading-5 font-normal text-black'>성별</span>

        <div className='flex flex-row space-x-4 '>
          <div className={setGenderButtonStyle('M')} onClick={(e) => setGender('M')}>
            <span className={setGenderButtonInnerTextStyle('M')}>남자</span>
          </div>

          <div className={setGenderButtonStyle('W')} onClick={(e) => setGender('W')}>
            <span className={setGenderButtonInnerTextStyle('W')}>여자</span>
          </div>
        </div>
      </div>

      {/* TODO :: Link + State 전달 */}
      <div className={nextButtonStyle} onClick={handleNextButtonClick}>
        <span className='block text-white text-sm leading-5 font-bold'>다음</span>
      </div>
    </div>
  )
}

export default withRouter(_1)
