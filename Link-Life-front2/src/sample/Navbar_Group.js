import React from 'react'
import { FaBars, FaCalendarAlt, FaHashtag, FaAngleLeft, FaUserCircle, FaUsers } from 'react-icons/fa'
import logo from '../images/logo_Link-Life(1).png'

const dataCollection_groupInfo = [
  {
      name: '전공종합설계(1)',
      numberOfPeople: 4,
  }
]

const Navbar_Group = () => {
  return (
  <>
    <nav className='flex justify-between px-4 py-3 bg-white border'>
      <div className='text-black'><FaAngleLeft className='w-6 h-6 m-1'/></div>
      
      {/* (1) Navbar - 중간(center) - 로고 */}
      {/* <div className='flex items-center text-xl'>
        <span className='font-semibold text-white'><img src={logo} alt="link-life logo" className='h-5 w-25'/></span>
      </div> */}
      {/* (2) Navbar - 중간(center) - 그룹명 */}
      <div className='flex items-center text-xl'>
        <span className='font-semibold'>{dataCollection_groupInfo[0].name}</span>
        <span className='ml-2 text-[#A6A6A6]'>{dataCollection_groupInfo[0].numberOfPeople}</span>
      </div>

      <div className='flex items-center gap-x-5'>

        <div className='text-black'><FaUsers className='w-6 h-6'/></div>
        <div className='text-black'><FaCalendarAlt className='w-6 h-6'/></div>
        <div className='text-black'><FaHashtag className='w-6 h-6'/></div>
        <div className='relative'>
            <button className='text-black group'>
                <FaUserCircle className='w-6 h-6 mt-1'/>
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
  </>
  )
}

export default Navbar_Group
