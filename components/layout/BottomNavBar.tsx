import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { GraphicEq, Home } from '@mui/icons-material'

// const menuList = [
//   { id: '1', name: 'HOME', icon: Home, path: '/' },
//   { id: '2', name: 'Balance', icon: faChartBar, path: '/balance' },
//   // { id: '3', name: '복용관리', icon: faCalendarCheck, path: '/intake-management' },
// ]

function BottomNavBar() {
  const router = useRouter()

  return (
    <nav className='h-12 flex items-center fixed bottom-0 left-0 right-0 bg-surface z-50'>
      <Menu router={router} id={1} name='HOME' path='/'>
        <Home className='text-2xl'/>
      </Menu>
      <Menu router={router} id={2} name='Balance' path='/balance'>
        <GraphicEq className='text-2xl'/>
      </Menu>
    </nav>
  )
}

interface MenuProps {
  children: any
  router: NextRouter
  id: number
  name: string
  path: string
}
function Menu({ children, router, id, name, path }: MenuProps) {
  return (
    <Link
      key={id}
      href={path}
    >
      <a className='grow w-full'>
        <div
          className={
            'flex flex-col items-center justify-between' +
            (path === router.pathname ? ' text-primary bg-indigo-50 border-t-2 border-t-primary' : ' text-gray-300 bg-surface border-none')
          }
        >
          {children}
          <p className={'text-sm' + (path === router.pathname ? ' text-primary' : ' hidden')}>{name}</p>
        </div>
      </a>
    </Link>
  )
}

export default BottomNavBar
