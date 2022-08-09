import Webcam from 'react-webcam'
import { useCallback, useState, useRef } from 'react'
import axios from 'axios'

const FACING_MODE_USER = 'user'
const FACING_MODE_ENVIRONMENT = 'environment'
const PILLLENSE_CLASSIFY_URL =
  'https://6eztxfgj8h.execute-api.ap-northeast-2.amazonaws.com/dev/classify'

const videoConstraints = {
  facingMode: FACING_MODE_USER,
}

const PillLense = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT)
  const [image, setImage] = useState('')
  const [result, setResult] = useState([])
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

      setImage(webcamRef.current?.getScreenshot())
    },
    [webcamRef],
  )

  // @ts-ignore
  const handleReset = useCallback((e) => {
    e.preventDefault()

    setImage('')
  }, [])

  return (
    <div className='min-h-screen'>
      <div className='h-[80vh] flex items-center'>
        {/* Camera Here */}
        {image === '' ? (
          <Webcam
            audio={false}
            screenshotFormat='image/jpeg'
            className={'h-[80vh] bg-black'}
            mirrored={facingMode === FACING_MODE_USER}
            ref={webcamRef}
            forceScreenshotSourceSize
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
      {image === '' && <button onClick={handleSwitch}>Switch</button>}

      {image === '' ? (
        <button onClick={handleCapture}>Capture</button>
      ) : (
        <>
          <button onClick={handleReset}>Reset</button>
          <button
            onClick={async () => {
              const img64 = image

              console.time('pilllense')

              const temp = await axios(PILLLENSE_CLASSIFY_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                data: {
                  image: img64,
                },
              })
              console.timeEnd('pilllense')
            }}
          >
            apply
          </button>
        </>
      )}

      <div>{JSON.stringify(result)}</div>
    </div>
  )
}

export default PillLense
