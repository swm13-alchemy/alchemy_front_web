import Image from 'next/image'
import logo from '../../public/asset/image/logo.png'

// logo 있는 헤더
function Header() {
  return (
    <header className='w-full h-10 flex items-center px-6 py-2'>
      <div className='relative w-[6.5rem] h-6'>
        <Image
          src={logo}
          className='object-cover'
          layout='fill'
        />
      </div>
    </header>
  )
}

export default Header