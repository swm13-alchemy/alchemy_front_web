import { Essential14Nutrients, EssentialNutrientsTakeCheckType } from '../../../utils/constant/constants'
import { useEffect, useState } from 'react'
import { changeEssentialNutrientName } from '../../../utils/functions/changeEssentialNutrientName'

interface Props {
  intakeSupplementsCnt: number
  isTakeEssentialNutrients: EssentialNutrientsTakeCheckType
}

function BalanceSummary({ intakeSupplementsCnt, isTakeEssentialNutrients }: Props) {
  const [goodTakeEssentialNutrientsCnt, setGoodTakeEssentialNutrientsCnt] = useState<number>(0)

  useEffect(() => {
    let cnt = 0
    Object.values(isTakeEssentialNutrients).forEach((isGoodTake) => {
      if (isGoodTake) {
        cnt += 1
      }
    })
    setGoodTakeEssentialNutrientsCnt(cnt)
  }, [])

  return (
    <section className='w-full h-[12.5rem] px-8 py-6 bg-white'>
      <p className='text-base font-bold text-gray-900'>나의 건강 알약  💊</p>
      <div className='flex items-end justify-between mt-1 mb-6'>
        <div className='flex items-end'>
          <p className='text-6xl text-primary font-bold'>{goodTakeEssentialNutrientsCnt}</p>
          <p className='text-lg text-primary font-bold ml-1'>/ 14</p>
        </div>

        <div className='grid grid-cols-7 gap-1.5'>
          {Object.keys(isTakeEssentialNutrients).map((essentialNutrient) =>
            <PillIcon
              key={essentialNutrient}
              isFill={isTakeEssentialNutrients[essentialNutrient as Essential14Nutrients]}
              nutrientName={changeEssentialNutrientName(essentialNutrient as Essential14Nutrients)}
            />
          )}
        </div>
      </div>
      <p className='text-sm text-gray-900'>섭취중이신 <span className='font-bold'>{intakeSupplementsCnt}개</span>의 영양제를 통해<br/>14가지 건강 알약 중 <span className='font-bold text-primary'>{goodTakeEssentialNutrientsCnt}개</span>를 먹고 있어요!</p>
    </section>
  )
}

interface PillIconProps {
  isFill: boolean
  nutrientName: string
}

// 알약 컴포넌트
function PillIcon({ isFill, nutrientName }: PillIconProps) {
  if (isFill) {
    return (
      <div className='w-5 h-5 shadow rounded-full flex items-center justify-center' style={{ backgroundImage: 'linear-gradient(to right, #1C65D1 50%, #60A5FA 50%)' }}>
        <p className='text-xs font-black text-white'>{nutrientName}</p>
      </div>
    )
  } else {
    return (
      <div className='w-5 h-5 bg-gray-100 shadow-inner rounded-full flex items-center justify-center'>
        <p className='text-xs font-black text-gray-500'>{nutrientName}</p>
      </div>
    )
  }
}

export default BalanceSummary