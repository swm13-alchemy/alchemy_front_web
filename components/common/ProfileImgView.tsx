import Image from 'next/image'

interface Props {
  imgUrl: string
}

function ProfileImgView({ imgUrl }: Props) {
  return (
    <div className='relative w-12 h-12 rounded-full overflow-hidden'>
      <Image
        src={imgUrl}
        className='object-cover'
        layout='fill'
      />
    </div>
  )
}

export default ProfileImgView