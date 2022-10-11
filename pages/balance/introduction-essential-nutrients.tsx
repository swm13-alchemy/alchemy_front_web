import { useRouter } from 'next/router'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import BackHeader from '../../components/layout/BackHeader'
import { Essential14Nutrients, ESSENTIAL_NUTRIENTS_LIST } from '../../utils/constants'
import { changeEssentialNutrientName } from '../../utils/functions/changeEssentialNutrientName'

const IntroductionEssentialNutrients = () => {
  const router = useRouter()
  return (
    <ContainerWithBottomNav>
      <BackHeader router={router} name='비힐러 선정 14가지 필수 영양분' />

      <div className='flex flex-col space-y-4 text-gray-900'>
        {/* 처음 부분 */}
        <div className='p-6 bg-surface'>
          <p className='text-sm text-primary'>비힐러 사용법 A to Z</p>
          <p className='text-lg font-bold mt-1'>비힐러의 개인 영양제 분석 리포트는<br/>14가지 영양분 섭취를 권장하고 있어요!</p>
        </div>

        {ESSENTIAL_NUTRIENTS_LIST.map((nutrient) =>
          <div key={nutrient.id} className='p-6 bg-white'>
            <div className='flex items-start space-x-4'>
            <span className='h-8 rounded-lg bg-primary px-2 py-1.5 text-sm text-white text-center'>
              {changeEssentialNutrientName(nutrient.name as Essential14Nutrients)}
            </span>
              <p className='text-sm font-bold pt-1'>{nutrient.name}</p>
            </div>
            {nutrient.tips.map((tip, idx) =>
              <p key={idx} className='text-sm mt-1'>{tip}</p>
            )}
          </div>
        )}

      </div>
    </ContainerWithBottomNav>
  )
}

export default IntroductionEssentialNutrients