import { faImage, faCamera, faCheck, faArrowRotateRight, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'
import BackHeader from '../../components/layout/BackHeader'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Compressor from 'compressorjs'
import { isMobile } from '../../utils/functions/isMobile'
import { requestCameraPermission } from '../../utils/functions/flutterBridgeFunc/intakeNotification'

/**
 * useWindowSize => 사용자 기기 Viewport 값 조회
 * @returns width 그리고 height값 (px) 반환
 */
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      // @ts-ignore
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

const PillLense: NextPage = () => {
  const router = useRouter()
  const webcamRef = useRef(null)

  const [isCaptured, setImageStatus] = useState(false)
  const [image, setImage] = useState('')
  const fileInput = useRef(null)

  const size = useWindowSize()
  const isLandscape = size.height <= size.width
  const ratio = isLandscape ? size.width / (size.height - 88) : (size.height - 88) / size.width

  // // 만약 모바일이면 카메라 권한을 받음
  // useEffect(() => {
  //   if (isMobile()) {
  //     requestCameraPermission()
  //   }
  // }, [])

  const handleTakePhoto = (e: any) => {
    e.preventDefault()

    if (webcamRef.current) {
      // @ts-ignore
      const img = webcamRef.current.getScreenshot()

      setImage(img)
      setImageStatus(true)
    }
  }

  const handleReset = (e: any) => {
    e.preventDefault()

    setImage('')
    setImageStatus(false)
  }

  const handleResponse = async (e: any) => {
    // 여기에 로직

    const PILLLENSE_SERVER_URL = `https://api.beehealer.ml/pillLense`

    const rawImage = `${image}`.split(',')[1]

    const res = await axios(PILLLENSE_SERVER_URL, {
      method: 'POST',
      data: {
        image: rawImage,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const predictResult = res.data

    if (!predictResult.length) {
      router.push({
        pathname: '/pillLense/result',
        query: { image: image },
      })
    } else {
      router.push(`/search?name=${predictResult[0].label}`)
    }
  }

  const handleButtonClick = (e: any) => {
    // @ts-ignore
    fileInput.current.click()
  }

  const handleFileUpload = async (e: any) => {
    e.preventDefault()

    const rawImage = e.target.files[0]

    const getBase64 = (file: any) => {
      const reader = new FileReader()

      // eslint-disable-next-line no-new
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          reader.readAsDataURL(result)

          reader.onloadend = () => {
            // @ts-ignore
            setImage(reader.result)
            setImageStatus(true)
          }
        },
      })
    }

    getBase64(rawImage)
  }

  return (
    <div className='w-full h-screen'>
      <BackHeader router={router} name='카메라' />

      {image && <img src={image} alt='' />}

      <Webcam
        className={'fixed bottom-12 left-0 right-0 top-10' + (image && ' hidden')}
        audio={false}
        screenshotFormat='image/jpeg'
        videoConstraints={{ facingMode: 'environment' }}
        ref={webcamRef}
      />

      <div className='fixed bottom-0 w-full h-12 bg-[#1C65D1] flex items-center justify-center'>
        <div
          className='absolute left-6 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center'
          onClick={handleReset}
        >
          <FontAwesomeIcon className='text-xl text-white' icon={faArrowRotateRight} />
        </div>


        <PhotoButton
          onClick={isCaptured ? handleResponse : handleTakePhoto}
          iconValue={isCaptured ? faCheck : faCamera}
        />

        <div
          className='absolute right-6 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center'
          onClick={handleButtonClick}
        >
          <input
            type='file'
            ref={fileInput}
            onChange={handleFileUpload}
            accept='image/*'
            className='hidden'
          />
          <FontAwesomeIcon className='text-xl text-white' icon={faImage} />
        </div>
      </div>
    </div>
  )
}

export default PillLense

interface PhotoButtonProps {
  onClick: (data: any) => void
  iconValue: IconDefinition
}
const PhotoButton = ({ onClick, iconValue }: PhotoButtonProps) => {
  return (
    <div
      className='w-8 h-8 bg-white rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center'
      onClick={onClick}
    >
      {/* TODO :: 하단 임시 Icon 제거 */}
      <FontAwesomeIcon className='text-xl text-[rgba(28,101,209,1)]' icon={iconValue} />
    </div>
  )
}
