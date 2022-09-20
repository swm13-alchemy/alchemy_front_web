import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import Home from '@mui/icons-material/Home'
import GraphicEq from '@mui/icons-material/GraphicEq'
import { useEffect, useState } from 'react'
import ListAlt from '@mui/icons-material/ListAlt'

// const menuList = [
//   { id: '1', name: 'HOME', icon: Home, path: '/' },
//   { id: '2', name: 'Balance', icon: faChartBar, path: '/balance' },
//   // { id: '3', name: '복용관리', icon: faCalendarCheck, path: '/intake-management' },
// ]

function BottomNavBar() {
  const router = useRouter()

  return (
    <nav className='h-12 flex items-center fixed bottom-0 left-0 right-0 bg-surface z-50'>
      <Menu router={router} id={2} name='밸런스' paths={['/balance']}>
        <GraphicEq className='text-2xl'/>
      </Menu>
      <Menu router={router} id={1} name='HOME' paths={['/', '/search', '/pill-details']}>
        <Home className='text-2xl'/>
      </Menu>
      <Menu router={router} id={3} name='복용관리' paths={['/intake']}>
        <ListAlt className='text-2xl'/>
      </Menu>
    </nav>
  )
}

interface MenuProps {
  children: any
  router: NextRouter
  id: number
  name: string
  paths: string[]
}
function Menu({ children, router, id, name, paths }: MenuProps) {
  // TODO: 추후 useMatch 쓰는 걸 고려해볼 예정
  // startsWith라는 함수도 있더라
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    for (const path of paths) {
      if (path === '/' && router.pathname !== '/') continue
      if (router.pathname.includes(path)) {
        setIsActive(true)
        break
      }
    }
  }, [])

  return (
    <Link
      key={id}
      href={paths[0]}
    >
      <a className='grow w-full'>
        <div
          className={
            'flex flex-col items-center justify-between' +
            (isActive ? ' text-primary bg-indigo-50 border-t-2 border-t-primary' : ' text-gray-300 bg-surface border-none')
          }
        >
          {children}
          <p className={'text-sm' + (isActive ? ' text-primary' : ' hidden')}>{name}</p>
        </div>
      </a>
    </Link>
  )
}

export default BottomNavBar
