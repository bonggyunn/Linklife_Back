import React from 'react'
import Navbar from './Navbar'
import MyTimeLine from './MyTimeLine'
import InformationUpdate from './InformationUpdate'


const Dashboard = () => {
  return (
    <div className= 'w-full ml-96'>
      <Navbar />
      
      {/* My-내 타임라인 */}
      {/* <MyTimeLine></MyTimeLine> */}

      {/* My-개인정보수정 */}
      <InformationUpdate></InformationUpdate>

      
    </div>
  )
}

export default Dashboard
