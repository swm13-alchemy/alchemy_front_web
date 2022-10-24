import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ContainerWithBottomNav from '../../../../components/layout/ContainerWithBottomNav'
import BackHeaderWithBtn from '../../../../components/layout/BackHeaderWithBtn'
import MoreVert from '@mui/icons-material/MoreVert'
import { Essential14Nutrients } from '../../../../utils/constant/constants'
import { changeEssentialNutrientName } from '../../../../utils/functions/changeEssentialNutrientName'
import useUserIsTakeEssentialNutrients from '../../../../hooks/useUserIsTakeEssentialNutrients'
import { PillIcon } from '../../../../components/common/balance/BalanceSummary'
import PillListAttachedToThePost from '../../../../components/common/community/PillListAttachedToThePost'
import { 임시영양제목록 } from '../../postDetails/[id]'

const Portfolio = () => {
  const router = useRouter()
  const userId: number = parseInt(router.query.userId as string)
  // const { isTakeEssentialNutrients } = useUserIsTakeEssentialNutrients() TODO: 이게 되려면 서버에서 데이터를 저장하고 가져와야 함 리포트도 마찬가지

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

      <div className='space-y-4'>
        {/* 건강 알약 부분 */}
        {/*<section className='w-full px-8 pt-6 pb-8 bg-surface'>*/}
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
        {/*</section>*/}
        {/* 한줄 자기소개 부분 */}
        <section className='bg-white px-6 py-4 space-y-2'>
          <div className='flex items-center space-x-2.5'>
            <p className='text-base font-bold text-gray-900'>한 줄 자기소개</p>
            <button className='bg-gray-100 px-2 py-1 rounded text-xs text-gray-500'>
              편집
            </button>
          </div>
          <p className='text-sm text-gray-500'>#50대 #직장인 #고혈압3년째 #등산애호가 #탈모내력</p>
        </section>
        {/* 섭취중인 영양제 목록 부분 */}
        <section className='bg-white px-6 pt-4 pb-6'>
          <PillListAttachedToThePost mentionedPillList={임시영양제목록} />
        </section>
      </div>
    </ContainerWithBottomNav>
  )
}

export default Portfolio