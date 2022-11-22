import React from 'react'
import BottomNavBar from './BottomNavBar'
// import { BOTTOM_NAV_BAR_PADDING_TAILWINDCSS_VALUE } from '../../utils/constant/systemConstants'

interface Props {
  children: any
  headerHeight?: string  // header가 들어간다면 header 공간만큼 padding 넣기 위한 값 (테일윈드 속성으로 쓰면 됨. ex. pt-10)
}

// headerHeight Props 기본값 공백
function ContainerWithBottomNav({ children, headerHeight = '' }: Props) {
  return (
    <>
      {/* margin이 더 적합한 값일 수 있으나 스크롤 바닥에서는 하단 margin이 안들어감 이러한 이유로 padding 사용. (이런 이유로 다른 사이트들도 padding 쓰는듯) */}
      {/* 때문에 여기서 background color등 사용 X */}
      {/* pb-14가 적당하나 pb-20으로 여유를 둠 */}
      <div className={'w-full pb-20' + ` ${headerHeight}`}>
        {children}
      </div>
      <BottomNavBar />
    </>
  )
}

export default ContainerWithBottomNav