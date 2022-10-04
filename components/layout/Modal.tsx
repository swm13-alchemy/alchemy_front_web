import React, { useEffect, useState } from 'react'

const Modal = ({ onClose, closeOnOverlayClick, visible = false, children }) => {
  const onOverlayClick = (e) => {
    e.preventDefault()
    if (e.target === e.currentTarget) onClose(e)
  }

  useEffect(() => {
    // document.body.style.cssText = `top: -${window.scrollY}px`

    return () => {
      const scrollY = document.body.style.top

      document.body.style.cssText = `position: ""; top: "";`
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [])

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper tabIndex={-1} onClick={closeOnOverlayClick && onOverlayClick} visible={visible}>
        {children}
      </ModalWrapper>
    </>
  )
}

const ModalOverlay = ({ visible }) => {
  const overlayStyle = `box-border ${
    visible ? 'block' : 'hidden'
  } absolute top-0 -left-8 bottom-0 -right-8 bg-[rgba(0,0,0,0.2)] z-40`

  return <div className={overlayStyle} />
}

const ModalWrapper = ({ tabIndex, onClick, visible, children }) => {
  const wrapperStyle = `box-border ${
    visible ? 'block' : 'hidden'
  } absolute top-0 -left-8 bottom-0 -right-8 bg-[rgba(0,0,0,0.2)] z-50 overflow-auto outline-0`

  return (
    <div tabIndex={tabIndex} className={wrapperStyle} onClick={onClick}>
      {children}
    </div>
  )
}

export default Modal
