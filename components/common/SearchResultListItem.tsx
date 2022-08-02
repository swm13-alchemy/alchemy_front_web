import Image from 'next/image'
import EfficiencyTag from '../tag/EfficiencyTag'
import Link from 'next/link'
import { SearchResultsItemType } from '../../utils/types'

function SearchResultListItem({ maker, name, imageUrl, id }: SearchResultsItemType) {
  return (
    <Link href={`/pill-details/${id}`}>
      <a>
        <div className='flex items-center w-full h-40 border-[#BABABA] border rounded-3xl px-2 space-x-2'>
          <div className='relative w-24 h-24 rounded-3xl border-[#BABABA] border overflow-hidden'>
            <Image
              src={imageUrl ? imageUrl : 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'}
              className='object-cover'
              layout='fill'
            />
          </div>
          <div className='flex flex-col space-y-0.5'>
            <p className='text-lg text-[#7A7A7A]'>{maker}</p>
            <p className='text-lg'>{name}</p>
            <div className='w-full grid grid-cols-2 gap-1'>
              <EfficiencyTag tagName='노화&항산화' />
              <EfficiencyTag tagName='눈 건강' />
              <EfficiencyTag tagName='간 건강' />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SearchResultListItem