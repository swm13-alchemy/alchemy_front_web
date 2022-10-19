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
  // TODO: webview에서 shadow가 안먹힘 방법 강구 -> 임시로 border 추가
  return (
    <Link href={`${prefixDomain}/${id}`}>
      <a>
        <div className='w-full h-[6.75rem] flex bg-white shadow-04dp border rounded-lg'>
          <div className='relative basis-5/12 overflow-hidden shadow border rounded-lg'>
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
  )
}

export default PillListItem
