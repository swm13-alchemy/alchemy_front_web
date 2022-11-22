import Image from 'next/image'
import { TrustedUserType } from '../../utils/types'
import { useEffect, useState } from 'react'


interface Props {
  width?: string
  height?: string
  imgUrl: string
  typesOfTrustedUser?: TrustedUserType
}

function ProfileImgView({ width = 'w-12', height = 'h-12', imgUrl, typesOfTrustedUser = 'normal' }: Props) {
  const [userType, setUserType] = useState<string>('')

  useEffect(() => {
    switch (typesOfTrustedUser) {
      case 'pharmacist':
        setUserType('약사')
        break
      case 'doctor':
        setUserType('의사')
        break
      case 'influencer':
        setUserType('인플루언서')
        break
    }
  }, [])

  switch (typesOfTrustedUser) {
    case 'normal':
      return (
        <div className={'relative rounded-full overflow-hidden' + ` ${width} ${height}`}>
          <Image
            src={imgUrl}
            className='object-cover'
            layout='fill'
          />
        </div>
      )
    default:
      return (
        <div className='relative'>
          <div className={'relative rounded-full overflow-hidden border-4 border-primary' + ` ${width} ${height}`}>
            <Image
              src={imgUrl}
              className='object-cover'
              layout='fill'
            />
          </div>
          <div className={'absolute bottom-0 z-50 bg-primary py-0.5 flex items-center justify-center rounded-[1.125rem]' + ` ${width}`}>
            <p className='text-xs text-white'>{userType}</p>
          </div>
        </div>
      )
  }
}

export default ProfileImgView