import PillView from './PillView'
import Link from 'next/link'

function MyPillList() {
  return (
    <Link href='/'>
      <a>
        <div className='w-full px-2'>
          <h1 className='text-xl font-bold px-3'>내 영양제 {'>'}</h1>
          <div className='flex space-x-1.5 mt-5 overflow-x-scroll scrollbar-hide'>
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800 dasfdafsd'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
            <PillView
              imageUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
              name='오메가800'
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default MyPillList
