import { faImage, faCamera, faCheck, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'
import BackHeader from '../../components/layout/BackHeader'
import { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import Compressor from 'compressorjs'
import { isMobile } from '../../utils/functions/isMobile'
import { requestCameraPermission } from '../../utils/functions/flutterBridgeFunc/intakeNotification'

/*
  TODO :: Refactoring 필요 => Logic 코드 정리 필요함
  TODO :: props 코드 정리 필요
*/

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

  const [isCaptured, setImageStatus] = useState(false)
  const [image, setImage] = useState('')
  const fileInput = useRef(null)

  const size = useWindowSize()
  const isLandscape = size.height <= size.width
  const ratio = isLandscape ? size.width / (size.height - 88) : (size.height - 88) / size.width

  const handleTakePhoto = (e) => {
    e.preventDefault()

    const img = window.camera.getScreenshot()

    setImage(img)
    setImageStatus(true)
  }

  const handleReset = (e) => {
    e.preventDefault()

    setImage('')
    setImageStatus(false)
  }

  const handleResponse = async (e) => {
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

  const handleButtonClick = (e) => {
    fileInput.current.click()
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()

    const rawImage = e.target.files[0]

    const getBase64 = (file) => {
      const reader = new FileReader()

      // eslint-disable-next-line no-new
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          reader.readAsDataURL(result)

          reader.onloadend = () => {
            setImage(reader.result)
            setImageStatus(true)
          }
        },
      })
    }

    getBase64(rawImage)
  }

  // 만약 모바일이면 카메라 권한을 받음
  if (isMobile()) {
    requestCameraPermission()
  }

  return (
    <div>
      <BackHeader router={router} name='카메라' />

      {image !== '' && <img src={image} alt='' />}

      <Webcam
        className={image !== '' && 'hidden'}
        height={size.height - 88}
        width={size.width}
        screenshotFormat='image/jpeg'
        videoConstraints={{ facingMode: 'environment', aspectRatio: ratio }}
        ref={(camera) => (window.camera = camera)}
      />

      <div className='fixed bottom-0 w-full max-w-2xl h-12 bg-[#1C65D1] flex items-center justify-center'>
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

const PhotoButton = ({ children, onClick, iconValue }) => {
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
