import Image from 'next/image'
import logo from '../../public/asset/image/logo.png'
import Link from 'next/link'

// logo 있는 헤더
function MainHeader() {
  return (
    <header className='w-full h-10 flex items-center px-6 py-2 bg-white'>
      <Link href='/'>
        <a className='relative w-[6.5rem] h-6'>
          <Image
            src={logo}
            className='object-cover'
            layout='fill'
          />
        </a>
      </Link>
    </header>
  )
}

export default MainHeader