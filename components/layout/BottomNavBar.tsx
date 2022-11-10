import Link from 'next/link'
import { useRouter } from 'next/router'
import Home from '@mui/icons-material/Home'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import PersonOutline from '@mui/icons-material/PersonOutline'
import useUserId from '../../hooks/useUserId'
import InsertChart from '@mui/icons-material/InsertChart'
import InsertChartOutlined from '@mui/icons-material/InsertChartOutlined'
import Article from '@mui/icons-material/Article'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import HomeOutlined from '@mui/icons-material/HomeOutlined'
import Person from '@mui/icons-material/Person'

// const menuList = [
//   { id: '1', name: 'HOME', icon: Home, path: '/' },
//   { id: '2', name: 'Balance', icon: faChartBar, path: '/balance' },
//   // { id: '3', name: '복용관리', icon: faCalendarCheck, path: '/intake-management' },
// ]
const iconSize = 'w-6 h-6'
type MenuType = {
  id: number
  name: string
  paths: string[]
  activeIcon: React.ReactNode
  inActiveIcon: React.ReactNode
}
const menuList: MenuType[] = [
  {
    id: 1,
    name: '홈',
    paths: ['/', '/search', '/pill-details', '/pillLense'],
    activeIcon: <Home className={iconSize} />,
    inActiveIcon: <HomeOutlined className={iconSize} />
  },
  {
    id: 2,
    name: '섭취분석',
    paths: ['/balance'],
    activeIcon: <InsertChart className={iconSize} />,
    inActiveIcon: <InsertChartOutlined className={iconSize} />
  },
  {
    id: 3,
    name: '복용관리',
    paths: ['/intake'],
    activeIcon: <Article className={iconSize} />,
    inActiveIcon: <ArticleOutlined className={iconSize} />
  },
  {
    id: 5,
    name: '마이페이지',
    paths: ['/mypage', '/editMyPillList'],
    activeIcon: <Person className={iconSize} />,
    inActiveIcon: <PersonOutline className={iconSize} />
  },
]

function BottomNavBar() {
  const router = useRouter()
  const userId = useCallback(useUserId, []);
  const [activeMenuId, setActiveMenuId] = useState<number>(1)

  useLayoutEffect(() => {
    menuList.forEach((menuInfo) => {
      for (const path of menuInfo.paths) {
        if (path === '/' && router.pathname !== '/') continue
        if (router.pathname.includes(path)) {
          setActiveMenuId(menuInfo.id)
          break
        }
      }
    })
  }, [])

  return (
    <nav className={`bg-white rounded-t-lg px-4 py-1.5 drop-shadow-lg flex fixed bottom-0 left-0 right-0 z-50`}>
      {menuList.map((menuInfo) => {
        const isActive = menuInfo.id === activeMenuId
        return (
          (menuInfo.name !== '마이페이지' || userId) &&  // 마이페이지는 로그인 했을 때만 보임
            <Menu
              key={menuInfo.id}
              id={menuInfo.id}
              name={menuInfo.name}
              paths={menuInfo.paths}
              isActive={isActive}
            >
              {isActive ? menuInfo.activeIcon : menuInfo.inActiveIcon}
            </Menu>
        )
      })}
      {/*<Menu router={router} id={1} name='홈' paths={['/', '/search', '/pill-details', '/pillLense']}>*/}
      {/*  <HomeOutlined className={iconSize} />*/}
      {/*</Menu>*/}
      {/*<Menu router={router} id={2} name='섭취분석' paths={['/balance']}>*/}
      {/*  <InsertChartOutlined className={iconSize} />*/}
      {/*</Menu>*/}
      {/*<Menu router={router} id={3} name='복용관리' paths={['/intake']}>*/}
      {/*  <ArticleOutlined className={iconSize} />*/}
      {/*</Menu>*/}
      {/*{userId &&*/}
      {/*  <Menu router={router} id={4} name='마이페이지' paths={['/mypage', '/editMyPillList']}>*/}
      {/*    <PersonOutline className={iconSize} />*/}
      {/*  </Menu>*/}
      {/*}*/}
    </nav>
  )
}

interface MenuProps {
  children: React.ReactNode
  id: number
  name: string
  paths: string[]
  isActive: boolean
}
function Menu({ children, id, name, paths, isActive }: MenuProps) {
  // TODO: 추후 useMatch 쓰는 걸 고려해볼 예정
  // startsWith라는 함수도 있더라

  return (
    <Link key={id} href={paths[0]}>
      <a className='grow w-full relative'>
        {isActive &&
          <div className='absolute left-0 right-0 -top-1.5 h-0.5 rounded-b-full bg-primary'></div>
        }
        <div
          className={
            'w-full flex flex-col items-center space-y-1' +
            (isActive
              ? ' text-primary'
              : ' text-gray-300')
          }
        >
          {children}
          {/*<p className={'text-sm' + (isActive ? ' text-primary' : ' hidden')}>{name}</p>*/}
          <p className={'text-xs' + (isActive ? ' text-primary' : ' text-gray-300')}>{name}</p>
        </div>
      </a>
    </Link>
  )
}

export default BottomNavBar