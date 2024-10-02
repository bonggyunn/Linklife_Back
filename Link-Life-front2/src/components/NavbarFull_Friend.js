import React from 'react'
import { FaSearch, FaCalendarAlt, FaHashtag, FaAngleLeft, FaUserCircle, FaUsers, FaUserPlus} from 'react-icons/fa'
import logo from '../images/logo_Link-Life(1).png'
import { Link } from 'react-router-dom'

const NavbarFull_Friend = () => {
  return (
    <nav className='flex justify-between px-4 py-3 bg-white border'>
      <Link to="/introduceTeam">
        <div className='items-center px-3 py-2.5 text-xl'>
          <span className='font-semibold text-white'><img src={logo} alt="link-life logo" className='h-5 w-25'/></span>
        </div>
      </Link>

      <div className='relative md:w-96'>
      </div>
      <span className='relative inset-y-0 left-0 flex items-center p-1 bg-gray-200 rounded w-96'>
      <input type="text" placeholder='친구 검색' className='hidden w-full px-4 py-1 bg-gray-200 rounded outline-none md:block'/>
          <button className='p-2 focus:outline-none md:text-gray-600'><FaSearch /></button></span>
      
      <div className='flex items-center m-1 gap-x-5'>
        {/* 1. 친구추가 */}
        <div className='relative'>
          <button className='text-black group'>
              <FaUserPlus className='w-6 h-6 mt-1'/>
              <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full'>
                  <ul className='py-2 text-xs text-gray-950'>
                      <li>친구 추가</li>
                  </ul>
              </div>
          </button>
        </div>

        {/* 2. 그룹 */}
        <div className='relative'>
          <button className='text-black group'>
              <Link to="/group">
                <div className='text-black'><FaUsers className='w-6 h-6 mt-1'/></div>
              </Link>
              <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full'>
                  <ul className='py-2 text-xs text-gray-950'>
                      <li>그룹</li>
                  </ul>
              </div>
          </button>
        </div>

        {/* 3. 해시태그 */}
        <div className='relative'>
          <button className='text-black group'>
              <FaHashtag className='w-6 h-6 mt-1'/>
              <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full'>
                  <ul className='py-2 text-xs text-gray-950'>
                      <li>해시태그</li>
                  </ul>
              </div>
          </button>
        </div>

        {/* 4. 로그아웃 */}
        <div className='relative'>
          <button className='text-black group'>
              <FaUserCircle className='w-6 h-6 mt-1'/>
              <div className='absolute right-0 z-10 hidden w-20 bg-gray-200 rounded-lg shadow group-hover:block group-focus:block top-full'>
                  <ul className='py-2 text-xs text-gray-950'>
                      <li><a href='' className='hover:text-blue-600 hover:font-bold'>로그아웃</a></li>
                  </ul>
              </div>
          </button>
        </div>

      </div>
    </nav>
  )
}

export default NavbarFull_Friend
