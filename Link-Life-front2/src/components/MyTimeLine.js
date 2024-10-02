import React from 'react'
import { useState } from 'react'
import {FiPlusCircle} from 'react-icons/fi'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Modal from './Modal'
import Tabs from './Tabs'

const MyTimeLine = () => {

  // modal을 위한 state
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className='w-full'
        style={{
          minHeight:'500px', // 배경 크기(최소 높이)
        }}
      >
        <div className='py-12 px-11'>
          <h1 className='text-3xl font-bold text-black'>내 타임라인</h1>
        </div>
        <div>
          <div
          style={{
            width:'715px', // 배경이미지 크기(너비)
            height:'155px', // 배경이미지 크기(높이)
            border: '1px solid #CFCFCF',
            marginLeft: '44px',
          }}
          >
            <div className='flex w-full h-full'>

              <div className='flex items-center w-8 h-full hover:bg-blue-200'>
                <MdChevronLeft className='w-8 h-8 text-gray-400 hover:text-gray-500' />
              </div>

              {/* 타임라인 설계 영역(핵심 영역) */}
              <div className='w-full h-full hover:bg-green-100'>
                

              </div>

              <div className='flex items-center w-8 h-full hover:bg-blue-200'>
                <MdChevronRight className='w-8 h-8 text-gray-400 hover:text-gray-500' />
              </div>

            </div>
          </div>
          <div
          style={{
            width:'715px', // 배경이미지 크기(너비)
            height:'65px', // 배경이미지 크기(높이)
            border: '1px solid #CFCFCF',
            marginLeft: '44px',
          }}
          onClick={(event) => {
            event.preventDefault();
            setModalOpen(true);
          }}
          >
            <a href=''>
              <div className='flex items-center justify-center w-full h-full bg-gray-100 hover:bg-gray-200'>
                <FiPlusCircle className='w-10 h-10' />
              </div>
            </a>
          </div>
        </div>
        


        {modalOpen && (
          <div className='-ml-96 bg-black/40'
            style={{
              marginTop: '-410px',
            }}
          >  
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
              <div className='px-4'>
                <Tabs/>
              </div>

            </Modal>

          </div>  
          )}
          
      </div>
    </>
  )
}

export default MyTimeLine
