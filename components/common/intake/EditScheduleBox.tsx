import PillEditBtn from './PillEditBtn'
import Link from 'next/link'
import Add from '@mui/icons-material/Add'

interface Props {
  time: string
}

function EditScheduleBox({ time }: Props) {
  return (
    <div className='bg-white px-6 py-4'>
      {/* 알림 시간 */}
      <div className='flex items-center space-x-0.5'>
        <p className='text-2xl font-bold text-primary'>12:59</p>
        <p className='text-xs text-primary'>AM</p>
      </div>
      {/* 영양제 목록 부분 */}
      <div className='mt-4 grid grid-cols-4 gap-x-5 gap-y-4 justify-center'>
        <PillEditBtn
          id={1}
          imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
          pillName='슈퍼 항산화제'
        />
        <PillEditBtn
          id={1}
          imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
          pillName='슈퍼 항산화제'
        />
        <PillEditBtn
          id={1}
          imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
          pillName='슈퍼 항산화제'
        />
        <PillEditBtn
          id={1}
          imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
          pillName='슈퍼 항산화제'
        />
        <PillEditBtn
          id={1}
          imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
          pillName='슈퍼 항산화제'
        />
        <PillEditBtn
          id={1}
          imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
          pillName='슈퍼 항산화제'
        />
        <Link href={`/intake/edit-schedule/add/${time}`}>
          <a className='bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center'>
            <Add className='text-2xl text-white' />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default EditScheduleBox