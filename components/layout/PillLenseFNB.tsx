import Link from 'next/link'
import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined'

interface Props {
  bottomMargin: string
}

const PillLenseFNB = ({ bottomMargin }: Props) => {
  return (
    <div className={'fixed right-4 w-12 h-12 bg-primary z-60 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center' + ` ${bottomMargin}`}>
      <Link href='/pillLense'>
        <a className='flex items-center justify-center'>
          <CameraAltOutlined className='text-2xl text-white' />
        </a>
      </Link>
    </div>
  )
}

export default PillLenseFNB
