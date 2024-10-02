import React from 'react'
import {FaCog, FaFileAlt, FaHome, FaPollH, FaRegEnvelope} from 'react-icons/fa'

import { FaSearch } from 'react-icons/fa'
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import picture_user from '../images/user.jpeg'
import { useState } from 'react'

// 그룹(group) 사이드바(sidebar) 탭 데이터 영역
const dataCollection_group = [
    {
      image: '../media/sungkyul.jpeg',
      groupName: '컴퓨터공학과 21학번',
      numberOfPeople: 15,
      latestDate: '2024.01.09 (D-61)',
      user: '고강희',
      title: '삼성SDS 취업연계형 인턴',
    },
    {
      image: '../media/group.png',
      groupName: '신나는 우리 가족',
      numberOfPeople: 5,
      latestDate: '2023.11.26 (D-10)',
      user: '차훈',
      title: '부모님 35주년 결혼기념일',
    },
    {
      image: '../media/computer-science.jpeg',
      groupName: '컴퓨터공학과 총동문회',
      numberOfPeople: 200,
      latestDate: '2024.01.09 (D-61)',
      user: '고강희',
      title: '삼성SDS 취업연계형 인턴',
    },
    {
      image: '../media/group.png',
      groupName: '외가 친척',
      numberOfPeople: 50,
      latestDate: '2024.01.09 (D-61)',
      user: '호수',
      title: '결혼식',
    },
    {
      image: '../media/group.png',
      groupName: '전공종합설계(1)',
      numberOfPeople: 4,
      latestDate: '2024.01.09 (D-61)',
      user: '고강희',
      title: '삼성SDS 취업연계형 인턴',
    },
]

// const [groupTabState, setGroupTabState] = useState();
// const callGroup = (index) => {
//     console.log(index);
//     setGroupTabState(index);
// }


const Sidebar_Group = () => {
  return (
    <>
        <div className='fixed h-full pt-2 w-96'
        style={{
            border: '1px solid #cacaca',
            overflowY: 'scroll',
        }}
        >
            
            {/* 1. 그룹 제목, 그룹 검색창, 그룹 추가 탭 */}
            <div className='pb-3 w-96'
            style={{
                borderBottom: '1px solid #cacaca',
            }}
            >
                <div className='flex justify-center my-2 mb-4'>
                    <h1 className='text-xl font-bold text-center'>그룹</h1>
                </div>
                
                <div className='flex'>
                    <div>
                        <span className='relative inset-y-0 left-0 flex items-center p-1 mx-2 bg-gray-200 rounded-xl w-80'>
                        <input type="text" placeholder='그룹 검색' className='hidden w-full px-4 py-1 bg-gray-200 rounded outline-none md:block'/>
                        <button className='p-2 focus:outline-none md:text-gray-600'><FaSearch /></button></span>
                    </div>
                    <div className='flex items-center justify-center'>
                        <AiOutlineUsergroupAdd className='w-8 h-8 rounded-lg hover:bg-gray-100'/>
                    </div>
                </div>
            </div>
            
            {/* 2. 그룹별 목록 탭 */}
            <div>
                {/* 즐겨찾기 탭 -> 접었을 때 안 쪽에 적혀 있는 공간 및 내용 */}
                <p>
                    {dataCollection_group.map((item, index) =>
                        <div key={index} className='flex'>
                            {/* ******* 친구 리스트 (가로 한세트 start) ******** */}
                            <div className='flex'
                            style={{
                                height:'81px',
                                border: '1px solid #cfcfcf',
                                borderTop: 'none',
                            }}
                            >  
                                {/* 1. 그룹 탭(사진, 그룹 이름, 이벤트명, 서버시간에 가장 가까운 일정 및 디데이) */}
                                <div className='flex cursor-pointer hover:bg-gray-100'
                                style={{
                                width:'381px', 
                                height:'80px',
                                }}
                                // onClick={() => callGroup(index)}
                                >
                                    {/* 사진 */}
                                    <div className='flex items-center justify-center'
                                        style={{
                                        height: '80px',
                                        width: '80px',
                                        padding: '10px',
                                        }}
                                    >
                                        <img src={process.env.PUBLIC_URL + item.image} alt="개인 사진" 
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                        />
                                    </div>

                                    {/* 이름, 날짜 */}
                                    <div>
                                        <div className='flex justify-between p-2'
                                        style={{
                                        height: '40px',
                                        width: '290px',
                                        }}
                                        >
                                            <span className='text-sm font-bold'>{item.groupName}</span>
                                            <span className='text-sm text-gray-400'>{item.latestDate}</span>
                                        </div>
                                        
                                        <div className='flex justify-between text-sm text-gray-400'
                                        style={{
                                        height: '40px',
                                        width: '290px',
                                        }}
                                        >
                                            {/* 일정 */}
                                            <span className='p-2 text-sm text-gray-400'>{item.title}</span>
                                            <span className='p-2 text-sm text-gray-400'>{item.user}</span>
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

export default Sidebar_Group
