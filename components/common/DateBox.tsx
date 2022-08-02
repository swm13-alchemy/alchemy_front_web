import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface Props {
  name: string
}

function DateBox({ name }: Props) {
  return (
    <div className='weekCalendar'>
      <p className='text-sm'>{name}</p>
      <div className='rounded-full bg-white h-5 w-5 flex items-center justify-center'>
        <FontAwesomeIcon icon={faCheck} className='text-sm' />
      </div>
    </div>
  )
}

export default DateBox
