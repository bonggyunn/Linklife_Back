import React from 'react'
import {FaCog, FaFileAlt, FaHome, FaPollH, FaRegEnvelope} from 'react-icons/fa'

import { AiOutlineUsergroupAdd } from "react-icons/ai";

import picture_user from '../images/user.jpeg'
import { useState } from 'react'

import { FaSearch, FaBars, FaCalendarAlt, FaHashtag, FaAngleLeft, FaUserCircle, FaUserFriends } from 'react-icons/fa'
import logo from '../images/logo_Link-Life(1).png'

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from 'react-router-dom'

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

/// 그룹(group) 네브바(navbar) 탭 데이터 영역
const dataCollection_groupInfo = [
    {
        name: '전공종합설계(1)',
        numberOfPeople: 4,
    }
  ]

// 그룹(group) 전체 데이터 영역
// 즐겨찾기(bookmark) 탭 데이터
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

const Group_Total = () => {
  return (
    <>
      <div className='flex'>
          {/* (1) <Sidebar_Group /> 영역 */}


          <div className='fixed h-full pt-2 w-96'
        style={{
            border: '1px solid #cacaca',
            overflowY: 'scroll',
            background: 'white',
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


        <div className= 'w-full ml-96'>
             
            {/* (2). <Navbar_Group /> 영역 */}
            <nav className='flex justify-between px-4 py-3 bg-white border'>
                <div className='relative'>
                    <button className='text-black group'>
                        <FaAngleLeft className='w-6 h-6 mt-1'/>
                        <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-12 group-hover:block top-full'>
                            <ul className='py-2 text-xs text-gray-950'>
                                <li>뒤로가기</li>
                            </ul>
                        </div>
                    </button>
                </div>
                {/* <div className='text-black'><FaAngleLeft className='w-6 h-6 m-1'/></div> */}
                    

                {/* (1) Navbar - 중간(center) - 로고 */}
                {/* <div className='flex items-center text-xl'>
                    <span className='font-semibold text-white'><img src={logo} alt="link-life logo" className='h-5 w-25'/></span>
                </div> */}
                {/* (2) Navbar - 중간(center) - 그룹명 */}
                <div className='flex items-center text-xl'>
                    <span className='font-semibold'>{dataCollection_groupInfo[0].name}</span>
                    <span className='ml-2 text-[#A6A6A6]'>{dataCollection_groupInfo[0].numberOfPeople}</span>
                </div>

                <div className='flex items-center m-1 gap-x-5'>

                    {/* 친구 */}
                    <div className='relative'>
                        <button className='text-black group'>
                            <Link to="/">
                                <div className='text-black'><FaUserFriends className='w-6 h-6 mt-1'/></div>
                            </Link>
                            <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full'>
                                <ul className='py-2 text-xs text-gray-950'>
                                    <li>친구</li>
                                </ul>
                            </div>
                        </button>
                    </div>

                    {/* 캘린더 */}
                    <div className='relative'>
                        <button className='text-black group'>
                            <Link to="/group/calendar">
                                <div className='text-black'><FaCalendarAlt className='w-6 h-6 mt-1'/></div>
                            </Link>
                            <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full'>
                                <ul className='py-2 text-xs text-gray-950'>
                                    <li>캘린더</li>
                                </ul>
                            </div>
                        </button>
                    </div>
                    
                    {/* 해시태그 */}
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
                    
                    {/* 로그인/로그아웃 */}
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


          
            {/* (3). <Group /> 영역 */}
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





          </div>
        </div>




    </>
  )
}

export default Group_Total
