import React from 'react'
import {FaCog, FaFileAlt, FaHome, FaPollH, FaRegEnvelope} from 'react-icons/fa'
import picture_user from '../images/user.jpeg'

const Sidebar = () => {
  return (
    <>
        <div className='fixed h-full px-4 py-2 bg-black w-96'>
            <div className='my-2 mb-4'>
                <h1 className='font-bold text-center text-white text-2x'>MY</h1>
            </div>
            <hr className='border-black'/>
            <ul className='py-24 mt-3 font-bold text-center text-white'>
                <li className='flex justify-center py-2 mb-2 rounded'>
                    <div 
                    className="pt-20 pb-5"
                    style={{
                        backgroundImage: `url(${picture_user})`,
                        backgroundPosition: "center", // 이미지 위치
                        backgroundSize: "cover", // 이미지 꽉차게
                        backgroundRepeat: 'no-repeat', // 이미지 반복 지정
                        width:'150px', // 배경이미지 크기(너비)
                        height:'150px', // 배경이미지 크기(높이)
                        borderRadius: '100px',
                    }}
                    >
                    </div>

                </li>
                <li className='py-2 mb-2 rounded'>
                    <span className='p-10 text-2xl font-bold text-white'>우혜원</span>
                </li>
                <li className='py-2 mb-2 rounded'>
                    <input type='button' value='개인정보 수정' className='p-5 px-6 py-2 text-lg font-bold text-black bg-white rounded-lg' />
                </li>
            </ul>
            <div>
            </div>    
        </div>
    </>
  )
}

export default Sidebar
