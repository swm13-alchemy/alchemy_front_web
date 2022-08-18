import Image from 'next/image'
import Link from 'next/link'
import { requestURLs } from '../../utils/api'

interface Props {
  id: number
  name: string
  maker: string
}

function SearchResultListItem({ maker, name, id }: Props) {
  return (
    <Link href={`/pill-details/${id}`}>
      <a>
        <div className='flex items-center w-full h-[5.75rem] shadow-04dp border rounded-lg space-x-4'>
          <div className='relative w-5/12 h-full overflow-hidden'>
            <Image
              src={requestURLs.getSupplementThumbnailURL(id.toString())}
              className='object-contain'
              layout='fill'
            />
          </div>
          <div className='flex flex-col space-y-1'>
            <p className='text-xs text-gray-500'>{maker}</p>
            <p className='text-base text-gray-900'>{name}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SearchResultListItem
