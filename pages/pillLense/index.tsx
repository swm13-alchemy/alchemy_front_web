import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'
import BackHeader from '../../components/layout/BackHeader'
import { useState, useRef, useEffect, useCallback } from 'react'

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

  const [image, setImage] = useState('')

  const size = useWindowSize()
  const isLandscape = size.height <= size.width
  const ratio = isLandscape ? size.width / (size.height - 88) : (size.height - 88) / size.width

  const handleTakePhoto = (e) => {
    e.preventDefault()

    const img = window.camera.getScreenshot()

    setImage(img)
  }

  const handleReset = (e) => {
    e.preventDefault()

    setImage('')
  }

  return (
    <div>
      <BackHeader router={router} name='카메라' />

      {image !== '' && <img src={image} alt='' />}

      <Webcam
        className={image !== '' && 'hidden'}
        height={size.height - 88}
        width={size.width}
        videoConstraints={{ facingMode: 'environment', aspectRatio: ratio }}
        ref={(camera) => (window.camera = camera)}
      />

      <div className='fixed bottom-0 w-full max-w-2xl h-12 bg-[#1C65D1] flex items-center justify-center'>
        {/* <Link href='/pillLense/result'> */}
        <div
          className='w-8 h-8 bg-white rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center'
          onClick={image !== '' ? handleReset : handleTakePhoto}
        >
          {/* TODO :: 삼항연산자로, Loading 창 묶기. + next Link에 Props를 묶는 작업도 해야함. */}

          {/* TODO :: 하단 임시 Icon 제거 */}
          <FontAwesomeIcon className=' text-xl text-[rgba(28,101,209,1)]' icon={faCamera} />
        </div>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default PillLense
