import Image from 'next/image'

interface Props {
  imageUrl: string
  name: string
}

function PillView({ imageUrl, name }: Props) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='relative w-14 h-14 rounded-3xl overflow-hidden'>
        <Image src={imageUrl} className='object-cover' layout='fill' />
      </div>
      <p className='text-base truncate w-20 text-center'>{name}</p>
    </div>
  )
}

export default PillView
