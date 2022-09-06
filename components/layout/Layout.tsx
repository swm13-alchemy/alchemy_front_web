// 모든 Next Page에 root 태그로 들어가게 되는 Layout 컴포넌트 (_app.tsx 참조)
// Page에만 넣을 css 요소들 여기에 넣기

function Layout({ children }: any) {
  return <div className='relative min-h-screen h-full max-w-2xl mx-auto bg-gray-50 font-notosansKR'>{children}</div>
}

export default Layout
