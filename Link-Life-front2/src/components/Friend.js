import React from 'react'
import NavbarFull_Friend from './NavbarFull_Friend'

import { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import Modal from './Modal'
import Tabs from './Tabs'
import picture_user from '../images/user.jpeg';

// 즐겨찾기 및 친구 탭 관리
const dataCollection_tab1 = [
  {
      title_name: '즐겨찾기',
  }
]
const dataCollection_tab2 = [
  {
      title_name: '친구',
  }
]

// 즐겨찾기(bookmark) 탭 데이터 영역
const dataCollection_my = [
  {
      name: '차훈',
      date: '2025.02.09 (D-456)',
      title: '2025학년도 전기 학위수여식',
      image: '../media/hoon.jpg'
      // image: 'https://image.shutterstock.com/image-photo/blueberries-isolated-260nw-722035450.jpg'
  }
]

// 즐겨찾기(bookmark) 탭 데이터 영역
const dataCollection_bookmark = [
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
  }
]

// 친구(friend) 탭 데이터 영역
const dataCollection_friend = [
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

const Friend = () => {

  // modal을 위한 state
  const [modalOpen, setModalOpen] = useState(false);

  // accordion(즐겨찾기; bookmark)를 위한 state 
  // -> userState(-1, 0...): 접기, userState(0): 펴기
  const[bookmarkAccordion, setActiveBookmarkAccordion] = useState(0);
  function toggleBookmarkAccordion(index) {
      if(index === bookmarkAccordion) {
        setActiveBookmarkAccordion(-1);
          return;
      }    
      setActiveBookmarkAccordion(index);
  }

  // accordion(친구; friend)를 위한 state 
  // -> userState(-1, 0...): 접기, userState(0): 펴기
  const[friendAccordion, setActiveFriendAccordion] = useState(0);
  function toggleFriendAccordion(index) {
      if(index === friendAccordion) {
        setActiveFriendAccordion(-1);
          return;
      }    
      setActiveFriendAccordion(index);
  }

  return (
    <>
      <div className=''
        style={{
          minHeight:'900px', // 배경 크기(최소 높이)
        }}
      >
        <div className='flex'>

          {/* 0. 친구 화면 - 왼쪽(left) 영역 -> 인물소개, 타임라인 */}
          <div className='w-full h-screen'>
            {/* 0. 제목(Title) - 친구 */}
            <div className='py-8 px-11'>
              <h1 className='text-3xl font-bold text-black'>친구</h1>
            </div>
            
            {/* ******* 친구 리스트 (가로 한세트 start) ******** */}
            <div className='flex h-full'
            style={{
              height:'130px',
              padding:'15px 0px 15px 0px',
              margin: '0px 40px',
              // borderBottom: '1px solid #cfcfcf',
            }}
            >  
              {/* 1. 인물 소개(이름, 서버시간부터 가장 가까운 일정 및 시간) */}
              <div className='flex'
              style={{
                width:'380px', 
                height:'100px',
                marginLeft: '14px',
                backgroundColor: 'white',
              }}
              >
                {/* 사진 */}
                <div className='flex items-center justify-center'
                  style={{
                    height: '100px',
                    width: '100px',
                    padding: '10px',
                  }}
                >
                  {/* 사진을 빠르고 쉬운 탐색을 위해 public-images 파일에 유저(user)들의 사진을 보관하고 
                  사진의 경로를 찾을 때는 'process.env.PUBLIC_URL + 경로'를 사용함 */}
                  <img src={process.env.PUBLIC_URL + dataCollection_my[0].image} alt="인물 사진" 
                    style={{
                      height: '80px',
                      width: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* 이름, 날짜 */}
                <div>
                  <div className='flex justify-between p-2'
                  style={{
                    height: '60px',
                    width: '280px',
                  }}
                  >
                    <span className='text-xl font-bold'>{dataCollection_my[0].name}</span>
                    <span className='text-sm text-gray-400'>{dataCollection_my[0].date}</span>
                  </div>
                  <div className='pl-2 text-sm text-gray-400'
                  style={{
                    height: '40px',
                    width: '280px',
                  }}
                  >
                    {/* 일정 */}
                    {dataCollection_my[0].title}</div>                
                </div>
              </div>

              {/* 2. 타임라인 */}
              <div
              style={{
                width:'750px', // 배경이미지 크기(너비)
                height:'100px', // 배경이미지 크기(높이)
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
          
            <div className='h-full f-container'>
              <div className='f-accordion-faq'>
                  {/* 즐겨찾기(bookmark) 탭을 반복적으로 만들기 위해 사용한 영역 */}
                  {dataCollection_tab1.map((item, index) =>
                      <div key={index} onClick={()=>toggleBookmarkAccordion(index)}>
                          <div className='f-accordion-faq-heading'>
                              <h3 className={bookmarkAccordion === index ? "f-active" : ""}>
                                  {item.title_name}
                              </h3>
                              <div>
                                  {bookmarkAccordion === index ? (
                                  <>
                                      <span className='f-verticle'><FaAngleDown className='w-5 h-5' /></span>
                                  </> 
                                  ) : ( 
                                  <>
                                      <span className='f-verticle'><FaAngleUp className='w-5 h-5' /></span>
                                  </> 
                                  )}
                                  
                              </div>
                          </div>
                          <div>
                              {/* 즐겨찾기 탭 -> 접었을 때 안 쪽에 적혀 있는 공간 및 내용 */}
                              <p className={bookmarkAccordion === index ? "f-active" : "f-inactive"}>
                                {dataCollection_bookmark.map((item, index) =>
                                  <div key={index} onClick={()=>toggleBookmarkAccordion(index)}>
                                    {/* ******* 친구 리스트 (가로 한세트 start) ******** */}
                                    <div className='flex h-full'
                                    style={{
                                      height:'130px',
                                      padding:'15px 0px 15px 0px',
                                      margin: '0px 40px',
                                      // borderBottom: '1px solid #cfcfcf',
                                    }}
                                    >  
                                      {/* 1. 인물 소개(이름, 서버시간부터 가장 가까운 일정 및 시간) */}
                                      <div className='flex'
                                      style={{
                                        width:'380px', 
                                        height:'100px',
                                        marginLeft: '14px',
                                        backgroundColor: 'white',
                                      }}
                                      >
                                        {/* 사진 */}
                                        <div className='flex items-center justify-center'
                                          style={{
                                            height: '100px',
                                            width: '100px',
                                            padding: '10px',
                                          }}
                                        >
                                          <img src={process.env.PUBLIC_URL + item.image} alt="개인 사진" 
                                            style={{
                                              height: '80px',
                                              width: '80px',
                                              borderRadius: '50%',
                                              objectFit: 'cover',
                                            }}
                                          />
                                        </div>

                                        {/* 이름, 날짜 */}
                                        <div>
                                          <div className='flex justify-between p-2'
                                          style={{
                                            height: '60px',
                                            width: '280px',
                                          }}
                                          >
                                            <span className='text-xl font-bold'>{item.name}</span>
                                            <span className='text-sm text-gray-400'>{item.date}</span>
                                          </div>
                                          <div className='pl-2 text-sm text-gray-400'
                                          style={{
                                            height: '40px',
                                            width: '280px',
                                          }}
                                          >
                                            {/* 일정 */}
                                            {item.title}
                                          </div>                
                                        </div>
                                      </div>

                                      {/* 2. 타임라인 */}
                                      <div
                                      style={{
                                        width:'750px', // 배경이미지 크기(너비)
                                        height:'100px', // 배경이미지 크기(높이)
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
                  )}

                  {dataCollection_tab2.map((item, index) =>
                      <div key={index} onClick={()=>toggleFriendAccordion(index)}>
                          <div className='f-accordion-faq-heading'>
                              <h3 className={friendAccordion === index ? "f-active" : ""}>
                                  {item.title_name}
                              </h3>
                              <div>
                                  {friendAccordion === index ? (
                                  <>
                                      <span className='f-verticle'><FaAngleDown className='w-5 h-5' /></span>
                                  </> 
                                  ) : ( 
                                  <>
                                      <span className='f-verticle'><FaAngleUp className='w-5 h-5' /></span>
                                  </> 
                                  )}
                              </div>
                          </div>

                          <div>
                              {/* 즐겨찾기 탭 -> 접었을 때 안 쪽에 적혀 있는 공간 및 내용 */}
                              <p className={friendAccordion === index ? "f-active" : "f-inactive"}>
                                {dataCollection_friend.map((item, index) =>
                                  <div key={index} onClick={()=>toggleFriendAccordion(index)}>
                                    {/* ******* 친구 리스트 (가로 한세트 start) ******** */}
                                    <div className='flex h-full'
                                    style={{
                                      height:'130px',
                                      padding:'15px 0px 15px 0px',
                                      margin: '0px 40px',
                                      // borderBottom: '1px solid #cfcfcf',
                                    }}
                                    >  
                                      {/* 1. 인물 소개(이름, 서버시간부터 가장 가까운 일정 및 시간) */}
                                      <div className='flex'
                                      style={{
                                        width:'380px', 
                                        height:'100px',
                                        marginLeft: '14px',
                                        backgroundColor: 'white',
                                      }}
                                      >
                                        {/* 사진 */}
                                        <div className='flex items-center justify-center'
                                          style={{
                                            height: '100px',
                                            width: '100px',
                                            padding: '10px',
                                          }}
                                        >
                                          <img src={process.env.PUBLIC_URL + item.image} alt="개인 사진" 
                                            style={{
                                              height: '80px',
                                              width: '80px',
                                              borderRadius: '50%',
                                              objectFit: 'cover',
                                            }}
                                          />
                                        </div>

                                        {/* 이름, 날짜 */}
                                        <div>
                                          <div className='flex justify-between p-2'
                                          style={{
                                            height: '60px',
                                            width: '280px',
                                          }}
                                          >
                                            <span className='text-xl font-bold'>{item.name}</span>
                                            <span className='text-sm text-gray-400'>{item.date}</span>
                                          </div>
                                          <div className='pl-2 text-sm text-gray-400'
                                          style={{
                                            height: '40px',
                                            width: '280px',
                                          }}
                                          >
                                            {/* 일정 */}
                                            {item.title}
                                          </div>                
                                        </div>
                                      </div>

                                      {/* 2. 타임라인 */}
                                      <div
                                      style={{
                                        width:'750px', // 배경이미지 크기(너비)
                                        height:'100px', // 배경이미지 크기(높이)
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
                  )}
              </div>
            </div>
          </div>
          
          {/* 0. 친구 화면 -  우측(right) 영역 -> 타임라인 및 해시태그 */}
          <div className='flex h-screen'
            style={{
              width: '500px',
            }}
          >
              {/* 1. 우측(right) 하단 -> D-day 영역 (일정상 가장 가까운 D-day 5개 항목) */}
              <div className=''
                style={{
                  border: '1px solid #CFCFCF',
                  background: 'white',
                  width: '300px',
                  height: '240px',
                  marginLeft: '50px',
                  position: 'fixed',
                  marginTop: '560px',
                }}
              >
                <div className='flex justify-between w-full h-12 pl-2'>
                  <div className='p-1'>
                    <div className='text-sm font-bold'>기술고시 1차 시험</div>
                    <div className='text-sm'>2023.11.26(토)</div>
                  </div>
                  <div>
                    <div className='flex items-center justify-center w-16 h-12 font-bold text-orange-600'>D-10</div>
                  </div>
                </div>
                <div className='flex justify-between w-full h-12 pl-2'>
                  <div className='p-1'>
                    <div className='text-sm font-bold'>프로젝트 발표</div>
                    <div className='text-sm'>2023.11.30(목)</div>
                  </div>
                  <div>
                    <div className='flex items-center justify-center w-16 h-12 font-bold text-orange-600'>D-14</div>
                  </div>
                </div>
                <div className='flex justify-between w-full h-12 pl-2'>
                  <div className='p-1'>
                    <div className='text-sm font-bold'>결혼식</div>
                    <div className='text-sm'>2023.12.12(화)</div>
                  </div>
                  <div>
                    <div className='flex items-center justify-center w-16 h-12 font-bold text-orange-600'>D-26</div>
                  </div>
                </div>
                <div className='flex justify-between w-full h-12 pl-2'>
                  <div className='p-1'>
                    <div className='text-sm font-bold'>교회세례</div>
                    <div className='text-sm'>2023.12.24(일)</div>
                  </div>
                  <div>
                    <div className='flex items-center justify-center w-16 h-12 font-bold text-orange-600'>D-38</div>
                  </div>
                </div>
                <div className='flex justify-between w-full h-12 pl-2'>
                  <div className='p-1'>
                    <div className='text-sm font-bold'>SAFFY 결과 발표</div>
                    <div className='text-sm'>2023.12.25(월)</div>
                  </div>
                  <div>
                    <div className='flex items-center justify-center w-16 h-12 font-bold text-orange-600'>D-39</div>
                  </div>
                </div>
              </div>
          </div>
      </div>
        {/* --------------------------- 이벤트 눌렀을 때 modal 영역 ---------------------------------- */}
        
      </div>
    </>
  )
}

export default Friend
