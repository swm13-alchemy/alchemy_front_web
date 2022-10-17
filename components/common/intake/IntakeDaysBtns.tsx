import { Days } from '../../../utils/types'

interface Props {
  intakeDays: Days[]
  setIntakeDays: (intakeDays: Days[]) => void
}

function IntakeDaysBtns({ intakeDays, setIntakeDays }: Props) {

  const clickDay = (day: Days) => {
    // 해당 요일이 체크 되어있는 상태
    if (intakeDays.includes(day)) {
      // 해당 요일을 제거
      setIntakeDays(intakeDays.filter(x => x !== day))
    } else {  // 해당 요일이 체크되지 않은 상태
      setIntakeDays(intakeDays.concat(day)) // 해당 요일 추가
    }
  }

  return (
    <div className='bg-white px-6 pt-6 pb-7 space-y-7'>
      <p className='text-base font-bold text-primary'>섭취 요일</p>
      {/* 일주일 요일 버튼들 */}
      <div className='w-full flex items-center justify-between text-base text-gray-900'>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Sun') ? ' border border-primary text-primary' : ' border-none text-red-500')}
          onClick={() => clickDay('Sun')}
        >
          일
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Mon') ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => clickDay('Mon')}
        >
          월
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Tue') ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => clickDay('Tue')}
        >
          화
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Wed') ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => clickDay('Wed')}
        >
          수
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Thu') ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => clickDay('Thu')}
        >
          목
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Fri') ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => clickDay('Fri')}
        >
          금
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.includes('Sat') ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => clickDay('Sat')}
        >
          토
        </button>
      </div>
    </div>
  )
}

export default IntakeDaysBtns