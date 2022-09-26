import Switch from '@mui/material/Switch'
import { useState } from 'react'
import PillIntakeBtn from './PillIntakeBtn'

function ScheduleBox() {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true)

  const checkAll = () => {

  }

  return (
    <div className='bg-white px-6 py-4'>
      {/* 영양제 시간표 박스 상단 부분 */}
      <div className='flex items-center justify-between'>
        {/* 알림 시간 */}
        <div className='flex items-center space-x-0.5'>
          <p
            className={'text-2xl font-bold' +
              (isSwitchOn ? ' text-primary' : ' text-gray-300')}
          >
            12:59
          </p>
          <p
            className={'text-xs' + (isSwitchOn ? ' text-primary' : ' text-gray-300')}
          >
            AM
          </p>
        </div>
        <div className='flex items-center space-x-6'>
          {/* 전체 복용 버튼 */}
          {isSwitchOn &&
            <button
              className='px-2 py-1 text-xs text-primary rounded bg-gray-100'
              onClick={checkAll}
            >
              전체 복용
            </button>
          }
          {/* 알림 전체 ON/OFF 토글 */}
          <Switch
            checked={isSwitchOn}
            onChange={(e) => setIsSwitchOn(e.target.checked)}
          />
        </div>
      </div>
      {/* 영양제 목록 부분 */}
      {isSwitchOn &&
        <div className='mt-4 grid grid-cols-4 gap-x-5 gap-y-4 justify-center'>
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='UC-II'
            isPillIntake={false}
          />
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='UC-II'
            isPillIntake={false}
          />
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='B Flex 종합비타민'
            isPillIntake={false}
          />
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='슈퍼 항산화제'
            isPillIntake={false}
          />
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='UC-II'
            isPillIntake={false}
          />
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='UC-II'
            isPillIntake={false}
          />
          <PillIntakeBtn
            imgUrl='https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now03322/v/23.jpg'
            pillName='UC-II'
            isPillIntake={false}
          />
        </div>
      }
    </div>
  )
}

export default ScheduleBox