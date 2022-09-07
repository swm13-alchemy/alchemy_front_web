interface Props {
  intakeSupplementsCnt: number
}

function BalanceSummary({ intakeSupplementsCnt }: Props) {
  return (
    <section className='w-full h-[12.5rem] px-8 py-6 bg-white'>
      <p className='text-base font-bold text-gray-900'>나의 건강 알약  💊</p>
      <div className='flex items-end justify-between mt-1 mb-6'>
        <div className='flex items-end'>
          <p className='text-6xl text-primary font-bold'>6</p>
          <p className='text-lg text-primary font-bold ml-1'>/ 14</p>
        </div>

        <div className='grid grid-cols-7 gap-1.5'>
          <PillIcon isFill={true} />
          <PillIcon isFill={true} />
          <PillIcon isFill={true} />
          <PillIcon isFill={true} />
          <PillIcon isFill={true} />
          <PillIcon isFill={true} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
          <PillIcon isFill={false} />
        </div>
      </div>
      <p className='text-sm text-gray-900'>섭취중이신 <span className='font-bold'>{intakeSupplementsCnt}개</span>의 영양제를 통해<br/>14가지 건강 알약 중 <span className='font-bold text-primary'>6개</span>를 먹고 있어요!</p>
    </section>
  )
}

interface PillIconProps {
  isFill: boolean
}

// 알약 컴포넌트
function PillIcon({ isFill }: PillIconProps) {
  if (isFill) {
    return (
      <div className='w-5 h-5 shadow rounded-full' style={{ backgroundImage: 'linear-gradient(to right, #1C65D1 50%, #60A5FA 50%)' }}></div>
    )
  } else {
    return (
      <div className='w-5 h-5 bg-gray-100 shadow-inner rounded-full'></div>
    )
  }
}

export default BalanceSummary