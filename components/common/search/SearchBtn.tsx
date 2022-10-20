import Link from 'next/link'
import Search from '@mui/icons-material/Search';

interface Props {
  href: string
  placeHolder: string
}

function SearchBtn({ href, placeHolder }: Props) {
  return (
    <Link href={href}>
      <a>
        <div className='h-12 px-4 bg-gray-50 shadow rounded-2xl flex items-center justify-between'>
          <p className='text-gray-500 text-sm'>{placeHolder}</p>
          <Search className='text-2xl text-gray-900' />
        </div>
      </a>
    </Link>
  )
}

export default SearchBtn
