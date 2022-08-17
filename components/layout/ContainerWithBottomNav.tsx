import BottomNavBar from './BottomNavBar'

function ContainerWithBottomNav({ children }: any) {
  return (
    <>
      {/* margin이 더 적합한 값일 수 있으나 스크롤 바닥에서는 하단 margin이 안들어감 이러한 이유로 padding 사용. (이런 이유로 다른 사이트들도 padding 쓰는듯) */}
      {/* 때문에 여기서 background color등 사용 X */}
      <div className='w-full pb-12'>
        {children}
      </div>
      <BottomNavBar />
    </>
  )
}

export default ContainerWithBottomNav