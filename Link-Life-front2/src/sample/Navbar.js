import React from 'react'
import { FaBars, FaCalendarAlt, FaHashtag, FaAngleLeft, FaUserCircle, FaUserFriends } from 'react-icons/fa'
import logo from '../images/logo_Link-Life(1).png'

const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <nav className='flex justify-between px-4 py-3 bg-white border'>
      <div className='text-black'><FaAngleLeft className='w-6 h-6 m-1'/></div>
      <div className='flex items-center text-xl'>
        <FaBars className='text-black cursor-pointer me-4' 
            onClick={() => setSidebarToggle(!sidebarToggle)}/>
        <span className='font-semibold text-white'><img src={logo} alt="link-life logo" className='h-5 w-25'/></span>
      </div>
      <div className='flex items-center gap-x-5'>

        <div className='relative md:w-65'>
            <span className='relative inset-y-0 left-0 flex items-center pl-2 md:absolute'>
                <button className='p-1 text-white focus:outline-none md:text-black'><FaSearch /></button></span>
            <input type="text" className='hidden w-full px-4 py-1 pl-12 rounded shadow outline-none md:block'/>
        </div>

        <div className='text-black'><FaUserFriends className='w-5 h-5'/></div>
        <div className='text-black'><FaCalendarAlt className='w-5 h-5'/></div>
        <div className='text-black'><FaHashtag className='w-5 h-5'/></div>
        <div className='relative'>
            <button className='text-black group'>
                <FaUserCircle className='w-5 h-5 mt-1'/>
                <div className='absolute right-0 z-10 hidden w-32 rounded-lg shadow group-focus:block top-full'>
                    <ul className='py-2 text-sm text-gray-950'>
                        <li><a href="">Profile</a></li>
                        <li><a href="">Setting</a></li>
                        <li><a href="">Log Out</a></li>
                    </ul>
                </div>
            </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
