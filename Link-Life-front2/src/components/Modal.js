import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({
  title, 
  footer, 
  children, 
  width,
  height,
  onClose, 
  closeBtn, 
  ...props
}) => {
  return (
    <>
    {/* modal background */}
    <div 
      id='modal-overlay'
      className='bg-black/40 absolute z-[99] w-screen h-screen'
    >
      {/* modal*/}
      <div
        id='modal'
        className='absolute z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg
        flex flex-col'
        // divide-y-[1px] divide-[#cfcfcf] -> 행사 게시글 등록과 탭(Tab) 사이에 존재하던 구분선 주석처리(=제외)
        style={{width, height}}
        {...props}
      >
        {/* modal - header */}
        <header className='flex items-center justify-between px-4 py-0'>
          {typeof title === "string"? (
            <div className='py-3 font-bold text-m'>{title}</div>
          ) : (
            title
          )}
          {closeBtn && <div
            id="close-btn"
            className='font-mono text-3xl font-semibold leading-4 text-center align-middle p-1.5 
            hover:text-red-700 hover:bg-gray-100 rounded-lg cursor-pointer'
            onClick={() => onClose()}
          >
            &times;
          </div>}
        </header>
        
        {/* modal - main */}
        <main className='h-full py-0'>{children}</main>
        
        {/* modal - footer */}
        {footer !== null && <footer className='px-4'
        style={{
          borderTop: '1px solid #cfcfcf',
        }}
        >{footer}</footer>}
        
      </div>
    </div>
    </>

  )
}

Modal.defaultProps = {
  // width: 400,
  width: 800,
  height: 500,
  footer: null,
  closeBtn: true,
}

Modal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  width: PropTypes.number,
  closeBtn: PropTypes.bool.isRequired,
}

export default Modal
