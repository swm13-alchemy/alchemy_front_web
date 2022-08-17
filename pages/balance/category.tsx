import { NextPage } from 'next'
import ContainerWithBottomNav from '../../components/layout/ContainerWithBottomNav'
import HeadNav from '../../components/layout/HeadNav'
import { useRouter } from 'next/router'
import IntakeAdequateTag from '../../components/tag/IntakeAdequateTag'

const Category: NextPage = () => {
  const router = useRouter()
  return (
    <ContainerWithBottomNav>
      <HeadNav router={router} name='영양제 구분 카테고리' />

      <div className='flex flex-col space-y-4 text-gray-900'>
        {/* 처음 부분 */}
        <div className='p-6 bg-surface'>
          <p className='text-sm text-primary'>비힐러 사용법 A to Z</p>
          <p className='text-lg font-bold mt-1'>비힐러의 개인 영양제 분석 리포트는<br/>총 4단계로 구분하고 있어요</p>
        </div>

        {/* 부족 설명 */}
        <div className='p-6 bg-white'>
          <div className='flex items-start space-x-4'>
            <IntakeAdequateTag state={0} content={null} unit={null} />
            <p className='text-sm font-bold pt-1'>최소 권장 섭취량 미만</p>
          </div>
          <p className='text-sm mt-1'>결핍증을 일으킬 수 있는 위험이 있는 단계</p>
        </div>

        {/* 최소 설명 */}
        <div className='p-6 bg-white'>
          <div className='flex items-start space-x-4'>
            <IntakeAdequateTag state={1} content={null} unit={null} />
            <p className='text-sm font-bold pt-1'>권장 섭취량(최소량) ~ 충분량</p>
          </div>
          <p className='text-sm mt-1'>결핍증을 일으키지 않을 만큼 충분하지만, 적극적으로 건강을 개선하는데 필요한 양에는 미치지 못하는 단계</p>
        </div>

        {/* 최적 설명 */}
        <div className='p-6 bg-white'>
          <div className='flex items-start space-x-4'>
            <IntakeAdequateTag state={2} content={null} unit={null} />
            <p className='text-sm font-bold pt-1'>충분량 ~ 상한량</p>
          </div>
          <p className='text-sm mt-1'>최선의 효과를 볼 수 있는 섭취량, 적극적으로 건강을 개선하는데 도움이 될 만큼 충분하며, 과잉증을 일으키지 않는 정도로 적절한 단계</p>
        </div>

        {/* 과다 설명 */}
        <div className='p-6 bg-white'>
          <div className='flex items-start space-x-4'>
            <IntakeAdequateTag state={3} content={null} unit={null} />
            <p className='text-sm font-bold pt-1'>상한량 초과</p>
          </div>
          <p className='text-sm mt-1'>과잉증을 일으킬 수 있는 위험이 있는 단계</p>
        </div>
      </div>
    </ContainerWithBottomNav>
  )
}

export default Category