import { useEffect, useState } from 'react'

export function isMobile(): boolean {
  const [isMobileBoolean, setIsMobileBoolean] = useState<boolean>(false)

  useEffect(() => {
    setIsMobileBoolean(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  return isMobileBoolean
}