import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

interface Props {
  name: string
}

function HeadNav({ name }: Props) {
  const router = useRouter()

  return (
    <header className='relative left-0 top-0 w-full h-14 px-3 flex items-center border-b-[#BABABA] border-b'>
      <FontAwesomeIcon
        icon={faAngleLeft}
        className='text-2xl cursor-pointer'
        onClick={() => router.back()}
      />
      <p className='text-2xl w-full font-bold text-center pr-5'>{name}</p>
    </header>
  )
}

export default HeadNav