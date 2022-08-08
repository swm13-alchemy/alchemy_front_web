import Image from 'next/image'
import requests from '../../utils/requests'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface Props {
  id: number
  name: string
  maker: string
  deleteFunc: (id: number) => void
}

function PillManagementListItem({ maker, name, id, deleteFunc }: Props) {
  return (
    <div className='flex items-center justify-between w-full h-28 border-[#BABABA] border rounded-3xl px-2'>
      <Link href={`/pill-details/${id}`}>
        <a className='flex items-center w-4/5 h-full space-x-5'>
          <div className='relative w-24 h-24 rounded-3xl border-[#BABABA] border overflow-hidden'>
            <Image
              src={
                requests.fetchSupplementThumbnail(id.toString())
                  ?? 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              }
              className='object-cover'
              layout='fill'
            />
          </div>
          <div className='flex flex-col space-y-0.5'>
            <p className='text-lg text-[#7A7A7A]'>{maker}</p>
            <p className='text-lg'>{name}</p>
          </div>
        </a>
      </Link>
      <div className='border-l border-[#BABABA] w-1/5 h-full flex items-center justify-center'>
        <FontAwesomeIcon
          icon={faTrashCan}
          className='text-2xl text-red-600 z-10'
          onClick={() => deleteFunc(id)}
        />
      </div>
    </div>
  )
}

export default PillManagementListItem