import React from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Timeline from '../components/Timeline'

const Update = () => {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className= 'w-full ml-96'>
          <Navbar />
          <Timeline />
        </div>
      </div>
    </>
  )
}

export default Update
