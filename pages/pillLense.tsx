import BottomNavBar from '../components/layout/BottomNavBar'
import Webcam from 'react-webcam'
import { useCallback, useState, useRef } from 'react'

const FACING_MODE_USER = 'user'
const FACING_MODE_ENVIRONMENT = 'environment'

const videoConstraints = {
  facingMode: FACING_MODE_USER,
}

const PillLense = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT)
  const [image, setImage] = useState('')
  const webcamRef = useRef(null)

  // @ts-ignore
  const handleSwitch = useCallback((e) => {
    e.preventDefault()

    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER,
    )
  }, [])

  // @ts-ignore
  const handleCapture = useCallback(
    (e) => {
      e.preventDefault()

      setImage(webcamRef.current.getScreenshot())
    },
    [webcamRef],
  )

  // @ts-ignore
  const handleReset = useCallback((e) => {
    e.preventDefault()

    setImage('')
  }, [])

  return (
    <div className=' min-h-screen'>
      <div className='h-[90vh]'>
        {/* Camera Here */}
        {image === '' ? (
          <Webcam
            audio={false}
            screenshotFormat='image/jpeg'
            ref={webcamRef}
            videoConstraints={{
              ...videoConstraints,
              facingMode,
            }}
          />
        ) : (
          <img src={image} alt='' />
        )}

        {/* Guide Line Here */}
      </div>

      {/* Other Buttons Here (Switch-Mode, Capture, Gallery) */}
      {image === '' ? (
        <button onClick={handleSwitch}>Switch</button>
      ) : (
        <button onClick={handleReset}>Reset</button>
      )}

      <button onClick={handleCapture}>Capture</button>
    </div>
  )
}

export default PillLense
