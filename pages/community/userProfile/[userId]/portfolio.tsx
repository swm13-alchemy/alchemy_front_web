import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import BackHeaderWithBtn from '../../../../components/layout/BackHeaderWithBtn'
import MoreVert from '@mui/icons-material/MoreVert'
import { Essential14Nutrients } from '../../../../utils/constant/constants'
import { changeEssentialNutrientName } from '../../../../utils/functions/changeEssentialNutrientName'

const Portfolio = () => {
  const router = useRouter()
  const userId: number = parseInt(router.query.userId as string)

  // TODO: userId로 필요한 정보 불러오는 api 처리하기
  useEffect(() => {

  }, [userId])

  return (
    <ContainerWithBottomNav>
      <BackHeaderWithBtn router={router} name='OO님의 포트폴리오'>
        <button className='absolute right-1.5 flex items-center justify-center'>
          <MoreVert className='text-2xl text-gray-900' />
        </button>
      </BackHeaderWithBtn>

      {/*<section className='w-full h-[12.5rem] px-8 py-6 bg-white'>*/}
      {/*  <p className='text-base font-bold text-gray-900'>OO님의 건강 알약  💊</p>*/}
      {/*  <div className='flex items-end justify-between mt-1 mb-6'>*/}
      {/*    <div className='flex items-end'>*/}
      {/*      <p className='text-6xl text-primary font-bold'>{13}</p>*/}
      {/*      <p className='text-lg text-primary font-bold ml-1'>/ 14</p>*/}
      {/*    </div>*/}

      {/*    <div className='grid grid-cols-7 gap-1.5'>*/}
      {/*      {Object.keys(isTakeEssentialNutrients).map((essentialNutrient) =>*/}
      {/*        <PillIcon*/}
      {/*          key={essentialNutrient}*/}
      {/*          isFill={isTakeEssentialNutrients[essentialNutrient as Essential14Nutrients]}*/}
      {/*          nutrientName={changeEssentialNutrientName(essentialNutrient as Essential14Nutrients)}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <p className='text-sm text-gray-900'>섭취중이신 <span className='font-bold'>{intakeSupplementsCnt}개</span>의 영양제를 통해<br/>14가지 건강 알약 중 <span className='font-bold text-primary'>{goodTakeEssentialNutrientsCnt}개</span>를 먹고 있어요!</p>*/}
      {/*</section>*/}
    </ContainerWithBottomNav>
  )
}

export default Portfolio