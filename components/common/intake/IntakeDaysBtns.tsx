export type IntakeDaysType = {
  'Sun': boolean
  'Mon': boolean
  'Tue': boolean
  'Wed': boolean
  'Thu': boolean
  'Fri': boolean
  'Sat': boolean
}

interface Props {
  intakeDays: IntakeDaysType
  setIntakeDays: (intakeDays: IntakeDaysType) => void
}

function IntakeDaysBtns({ intakeDays, setIntakeDays }: Props) {
  return (
    <div className='bg-white px-6 pt-6 pb-7 space-y-7'>
      <p className='text-base font-bold text-primary'>섭취 요일</p>
      {/* 일주일 요일 버튼들 */}
      <div className='w-full flex items-center justify-between text-base text-gray-900'>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Sun ? ' border border-primary text-primary' : ' border-none text-red-500')}
          onClick={() => setIntakeDays({...intakeDays, 'Sun': !intakeDays.Sun})}
        >
          일
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Mon ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => setIntakeDays({...intakeDays, 'Mon': !intakeDays.Mon})}
        >
          월
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Tue ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => setIntakeDays({...intakeDays, 'Tue': !intakeDays.Tue})}
        >
          화
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Wed ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => setIntakeDays({...intakeDays, 'Wed': !intakeDays.Wed})}
        >
          수
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Thu ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => setIntakeDays({...intakeDays, 'Thu': !intakeDays.Thu})}
        >
          목
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Fri ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => setIntakeDays({...intakeDays, 'Fri': !intakeDays.Fri})}
        >
          금
        </button>
        <button
          className={'w-8 h-8 rounded-full' +
            (intakeDays.Sat ? ' border border-primary text-primary' : ' border-none')}
          onClick={() => setIntakeDays({...intakeDays, 'Sat': !intakeDays.Sat})}
        >
          토
        </button>
      </div>
    </div>
  )
}

export default IntakeDaysBtns