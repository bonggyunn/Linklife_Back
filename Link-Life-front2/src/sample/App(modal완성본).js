import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Friend from './components/Friend'
import Tagbar from './components/Tagbar'
import NavbarFull from './components/NavbarFull'
import Navbar from './components/Navbar'
import {FiPlusCircle} from 'react-icons/fi'
import { CiLock } from "react-icons/ci";

import { useState } from 'react'
import Modal from './components/Modal'
import Tabs from './components/Tabs'



function App() {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  // modal을 위한 state
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>
        {/* <Friend></Friend>
        <Tagbar></Tagbar> */}
        
        <div className='flex'>
          <Sidebar sidebarToggle={sidebarToggle}/>
          <Dashboard/>


          <div className='flex items-center justify-center w-full h-screen ml-96'>
            <button className='flex items-center justify-center text-white bg-green-800 hover:bg-green-900 '
                style={{
                  borderRadius: '10px',
                  // border: '1px solid #265136',
                  width: '155px',
                  height: '45px',
                }}
                onClick={() => setModalOpen(true)}
                >
                <FiPlusCircle className='w-5 h-5 mr-2' />Open Modal
                </button>
          </div>

          {modalOpen && (
            <Modal
              // Modal Title 방법(1)
              title={"행사 게시글 등록"}
              // Modal Title 방법(2)
              // title={
              //    <div className="py-2 text-2xl font-semibold">Custom Header</div> 
              // }
              
              // modal 우측 상단 x버튼 (주석처리 or true:x버튼O / false:x버튼X) 
              // closeBtn={false}
              
              onClose={() => setModalOpen(false)}
              footer= {
                <div className='flex justify-end gap-2 py-3'>
                  
                  <select className='p-2 font-bold text-black'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #cfcfcf',
                      width: '135px',
                      height: '35px',
                      fontSize: '14px',
                    }}
                  >
                    <option value='open'>전체공개</option>
                    <option value='close'>비공개</option>
                  </select>

                  <button className='font-bold text-white bg-green-800 hover:bg-green-900'
                    style={{
                      borderRadius: '10px',
                      width: '120px',
                      height: '35px',
                      fontSize: '14px',
                      marginLeft: '15px',
                    }}
                    onClick={() => setModalOpen(false)}
                  >등록
                  </button>
                </div>
              }
            >
            
              {/* Modal 팝업창 내용 */}
              <div className='App'>
                <Tabs />
              </div>
            </Modal>
          )}
        </div>
      </div>
        
      
    </>
  )
}

export default App
