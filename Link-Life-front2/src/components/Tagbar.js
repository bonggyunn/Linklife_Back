import React from 'react'
import {FaCog, FaFileAlt, FaHome, FaPollH, FaRegEnvelope, FaSearch} from 'react-icons/fa'
import picture_graduation from '../images/graduation.jpeg'

const Tagbar = ({tagbarToggle}) => {
  return (
    <div className={`${tagbarToggle? " hidden " : " block "}w-64 h-screen px-2 py-0 bg-green-100 m-5 border border-green-950 border-4 rounded`}>
        
        <div className='my-4 mb-4'>
            {/* <h1 className='font-bold text-black text-2x'>친구</h1> */}
            
            <span className='relative inset-y-0 left-0 flex items-center w-full p-1 bg-gray-400 rounded'>
            <input type="text" placeholder='해시태그 검색' value='#' className='hidden w-full px-4 py-1 bg-gray-400 rounded outline-none md:block'/>
            <button className='p-2 focus:outline-none md:text-gray-600'><FaSearch /></button></span>
      

        </div>
        <ul className='mt-3 font-bold text-black'>
            <hr className='border-gray-400'/>
            <li className='rounded hover:shadow hover:bg-green-400'>
                <a href="" className='px-1'>
                    <img src={picture_graduation} alt="link-life logo" className='items-center justify-center'/>
                    <p className='text-center'>2025.02.29</p>
                    <p className='font-light text-center'>전기 학위수여식</p>
                </a>
            </li>
            <hr className='border-gray-400'/>

        </ul>
    </div>
  )
}

export default Tagbar