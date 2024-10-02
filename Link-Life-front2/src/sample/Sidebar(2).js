import React from 'react'
import {FaCog, FaFileAlt, FaHome, FaPollH, FaRegEnvelope} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='fixed h-full px-4 py-2 bg-black w-96'>
        <div className='my-2 mb-4'>
            <h1 className='font-bold text-center text-white text-2x'>MY</h1>
        </div>
        <hr className='border-black'/>
        <ul className='mt-3 font-bold text-white'>
            <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-500'>
                <a href="" className='px-3'>
                    <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
                    Home
                </a>
            </li>

            <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-500'>
                <a href="" className='px-3'>
                    <FaFileAlt className="inline-block w-6 h-6 mr-2 -mt-2" />
                    Blogs
                </a>
            </li>

            <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-500'>
                <a href="" className='px-3'>
                    <FaPollH className="inline-block w-6 h-6 mr-2 -mt-2" />
                    Reports
                </a>
            </li>

            <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-500'>
                <a href="" className='px-3'>
                    <FaRegEnvelope className="inline-block w-6 h-6 mr-2 -mt-2" />
                    Inbox
                </a>
            </li>

            <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-500'>
                <a href="" className='px-3'>
                    <FaCog className="inline-block w-6 h-6 mr-2 -mt-2" />
                    Setting
                </a>
            </li>

        </ul>
    </div>
  )
}

export default Sidebar
