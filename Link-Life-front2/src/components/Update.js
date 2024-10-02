import React from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import InformationUpdate from '../components/InformationUpdate'

const Update = () => {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className= 'w-full ml-96'>
          <Navbar />
          <InformationUpdate />
        </div>
      </div>
    </>
  )
}

export default Update
