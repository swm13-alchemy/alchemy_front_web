import Image from 'next/image'
import Link from 'next/link'
import { requestURLs } from '../../utils/api'

interface Props {
  id: number
  name: string
  maker: string
  prefixDomain: string
}

function PillListItem({ maker, name, id, prefixDomain }: Props) {
  return (
    <Link href={`${prefixDomain}/${id}`}>
      <a>
        <div className='w-full h-[6.75rem] flex bg-white shadow-04dp rounded-lg'>
          <div className='relative basis-5/12 overflow-hidden shadow rounded-lg'>
            <Image
              src={requestURLs.getSupplementThumbnailURL(id.toString())}
              className='object-contain'
              layout='fill'
            />
          </div>
          <div className='basis-7/12 pt-2 pb-4 px-4 flex flex-col space-y-1'>
            <p className='text-xs text-gray-500 ellipsisTwoLine'>{maker}</p>
            <p className='text-base text-gray-900 ellipsisTwoLine'>{name}</p>
          </div>
        </div>
      </a>
    </Link>
    // <Link href={`/pill-details/${id}`}>
    //   <a>
    //     <div className='w-full flex items-center h-[5.75rem] shadow-04dp border rounded-lg space-x-4'>
    //       <div className='relative w-5/12 h-full overflow-hidden'>
    //         <Image
    //           src={requestURLs.getSupplementThumbnailURL(id.toString())}
    //           className='object-contain'
    //           layout='fill'
    //         />
    //       </div>
    //       <div className='flex flex-col space-y-1'>
    //         <p className='text-xs text-gray-500'>{maker}</p>
    //         <p className='text-base text-gray-900'>{name}</p>
    //       </div>
    //     </div>
    //   </a>
    // </Link>
  )
}

export default PillListItem
