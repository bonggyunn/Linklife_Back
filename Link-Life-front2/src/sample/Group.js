import React from 'react'
import logo from '../images/logo_Link-Life(1).png'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// 즐겨찾기(bookmark) 탭 데이터 영역
const dataCollection_groupMember = [
  {
      name: '유봉균',
      date: '2025.02.09 (D-456)',
      title: '2025학년도 전기 학위수여식',
      image: '../media/bong-gyun.jpg'
  },
  {
    name: '홍길동',
    date: '2024.01.09 (D-61)',
    title: '삼성SDS 취업연계형 인턴',
    image: '../media/user.jpeg'
  },
  {
    name: '고강희',
    date: '2024.01.09 (D-61)',
    title: '삼성SDS 취업연계형 인턴',
    image: '../media/kang-hui.jpg'
  },
  {
    name: '이순신',
    date: '2024.01.09 (D-61)',
    title: '삼성SDS 취업연계형 인턴',
    image: '../media/user.jpeg'
  },
  {
    name: '우혜원',
    date: '2025.02.09 (D-456)',
    title: '2025학년도 전기 학위수여식',
    image: '../media/hye-won.jpg'
  }
]

const Group = () => {
  return (
    <>
      <div className='w-full'
        style={{
          minHeight:'1000px', // 배경 크기(최소 높이)
        }}
      >
        <div className='px-10 py-8'>
          <div className='flex items-center text-xl'>
            <span className='font-semibold text-white'><img src={logo} alt="link-life logo" className='h-5 w-25'/></span>
          </div>
        </div>



        <div>
          {/* 즐겨찾기 탭 -> 접었을 때 안 쪽에 적혀 있는 공간 및 내용 */}
          <p>
            {dataCollection_groupMember.map((item, index) =>
              <div key={index}>
                {/* ******* 친구 리스트 (가로 한세트 start) ******** */}
                <div className='flex h-full'
                style={{
                  height:'150px',
                  padding:'15px 0px 15px 0px',
                  margin: '0px 40px',
                  // borderBottom: '1px solid #cfcfcf',
                }}
                >  
                  {/* 1. 인물 소개(이름, 서버시간부터 가장 가까운 일정 및 시간) */}
                  <div className='flex items-center justify-center'
                  style={{
                    width:'120px', 
                    height:'120px',
                    marginLeft: '14px',
                    backgroundColor: 'white',
                  }}
                  >
                    {/* 사진 */}
                    <div
                      style={{
                        height: '100px',
                        width: '100px',
                        padding: '0px 15px 15px 15px',
                      }}
                    >
                      <img src={process.env.PUBLIC_URL + item.image} alt="개인 사진" 
                        style={{
                          height: '70px',
                          width: '70px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                      <div className='flex items-center justify-center'>
                        <span className='text-xl font-bold'>{item.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. 타임라인 */}
                  <div
                  style={{
                    width:'750px', // 배경이미지 크기(너비)
                    height:'120px', // 배경이미지 크기(높이)
                    border: '1px solid #CFCFCF',
                    marginLeft: '44px',
                    backgroundColor: 'white',
                  }}
                  >
                    <div className='flex w-full h-full'>
                      <div className='flex items-center w-8 h-full cursor-pointer hover:bg-blue-200'>
                        <MdChevronLeft className='w-8 h-8 text-gray-400 hover:text-gray-500' />
                      </div>

                      {/* 타임라인 설계 영역(핵심 영역) */}
                      <div className='w-full h-full cursor-pointer hover:bg-green-100'>
                        
                      </div>

                      <div className='flex items-center w-8 h-full cursor-pointer hover:bg-blue-200'>
                        <MdChevronRight className='w-8 h-8 text-gray-400 hover:text-gray-500' />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ******* 친구 리스트 (가로 한세트 end) ******** */}
              </div>
            )}
          </p>
        </div>
        

      </div>
    </>
  )
}

export default Group
