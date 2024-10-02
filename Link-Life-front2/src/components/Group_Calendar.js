import React from 'react'
import {FaCog, FaFileAlt, FaHome, FaPollH, FaRegEnvelope} from 'react-icons/fa'

import { AiOutlineUsergroupAdd } from "react-icons/ai";

import picture_user from '../images/user.jpeg'
import { useState } from 'react'

import { FaSearch, FaBars, FaCalendarAlt, FaHashtag, FaAngleLeft, FaUserCircle, FaUserFriends } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import logo from '../images/logo_Link-Life(1).png'

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from 'react-router-dom'

import Calendar_Modal from "./Calendar_Modal";
import Dday from "./Dday";

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

const Group_Calendar = () => {

    // 캘린더 관련 javascript   
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 현재년도 표시
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 현재 월표시
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 달력 만들기
    const generateCalendar = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // 현재 달의 첫째날
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // (다음달의 0번째)현재 달의 마지막 날
        const firstDayOfWeek = firstDayOfMonth.getDay(); //첫번째 날 요일 반환

        const calendar = [];
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

        // 요일을 표시하는 헤더 추가
        daysOfWeek.forEach((day, index) => {
            let textColor = "#616161"; // 기본 텍스트 색상
            let bgColor = "rgba(128, 128, 128, 0.3)"; // 기본 배경 색상

            // 일요일은 빨간색으로 설정
            if (index === 0) {
                textColor = "#FF8F8F";
            }
            // 토요일은 파란색으로 설정
            else if (index === 6) {
                textColor = "#7B80F9";
            }

            calendar.push(
                <div
                key={day}
                className="px-3 py-2 font-semibold text-center border rounded-md"
                style={{
                    backgroundColor: bgColor,
                    color: textColor,
                }}
                >
                {day}
                </div>
            );
        });

        // 첫째날 시작 전 빈 부분 추가
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendar.push(<div key={`empty${i}`} className="px-4 py-2"></div>);
        }

        // 해당 월의 각 날짜를 표시
        for (let day = 1; day <= daysInMonth; day++) {
            calendar.push(
                <div
                key={day}
                className="flex items-center justify-center py-4 font-semibold cursor-pointer"
                onClick={() => handleDateClick(day)}
                style={{
                    color: "#616161",
                }}
                >
                {day}
                </div>
            );
        }
        return calendar;
    };

    // 이전달 선택
    const prevMonth = () => {
        setCurrentMonth((prevMonth) => {
            let newYear = currentYear;
            let newMonth = prevMonth - 1; // 이전달
            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }
            setCurrentYear(newYear);
            return newMonth;
        });
    };

    // 다음달 선택
    const nextMonth = () => {
        setCurrentMonth((nextMonth) => {
            let newYear = currentYear;
            let newMonth = nextMonth + 1; // 다음달
            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }
            setCurrentYear(newYear);
            return newMonth;
        });
    };

    // 캘린더 모달창 열고 닫기
    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    // 날짜 클릭했을 때 이벤트
    const handleDateClick = (day) => {
        setSelectedDate(day);
        toggleModal();
    };

    // 모달창에 날짜 포맷해서 표시
    const formatDate = () => {
        if (!selectedDate) return ""; // 선택한 날짜가 없을 경우 빈 문자열 반환
        const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
        locale: "ko-KR",
        };
        const formattedDate = new Date(
        currentYear,
        currentMonth,
        selectedDate
        ).toLocaleString("ko-KR", options);
        return formattedDate;
    };

    return (
    <>
      <div className='flex'>
          {/* (1) <Sidebar_Group /> 영역 */}
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

                    {/* 그룹 */}
                    <div className='relative'>
                    <button className='text-black group'>
                        <Link to="/group">
                            <div className='text-black'><FaPeopleGroup className='w-6 h-6 mt-1'/></div>
                        </Link>
                        <div className='absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full'>
                            <ul className='py-2 text-xs text-gray-950'>
                                <li>그룹</li>
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
          
            <div className='flex bg-[#E6E7E6]'>
                {/* (3)-1. <Group /> 영역 - 왼쪽(left) - 캘린더(calendar) */}
                <div className='w-full'
                    style={{
                    minHeight:'1000px', // 배경 크기(최소 높이)
                    width: '600px',
                    }}
                >
                    <div
                        className="flex flex-col items-start py-2 ml-10 px-7 mt-7"
                        style={{
                            minHeight: "550px",
                            width: "550px",
                            fontFamily: "오아 고딕",
                            // borderRadius: "20px",
                        }}
                    >
                        <div className="flex flex-wrap items-start justify-between py-4 space-x-60 px-7">
                            <h1
                                className="text-2xl"
                                style={{ fontWeight: "bold", color: "#616161" }}
                            >
                                {`${new Date(currentYear, currentMonth).toLocaleString("default", {
                                    month: "numeric",
                                    year: "numeric",
                                })}`}
                            </h1>
                            <div className="flex items-end justify-end">
                                <div
                                    className="px-2 py-1 mx-2 rounded-full"
                                    style={{ background: "#7D7D7D", width: "32px", height: "32px" }}
                                >
                                    <button onClick={prevMonth} className="text-base text-white">
                                    ◀
                                    </button>
                                </div>
                                <div
                                    className="px-2.5 py-1 mx-2 rounded-full items-end"
                                    style={{ background: "#7D7D7D", width: "32px", height: "32px" }}
                                >
                                    <button onClick={nextMonth} className="text-base text-white">
                                    ▶
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr className="w-full mb-6 border-2 border-white" />

                        <div className="grid grid-cols-7 gap-4 p-6 ml-8 bg-white rounded-xl">
                            {generateCalendar()}
                        </div>

                        <hr className="w-full mt-6 border-2 border-white" />

                        <Calendar_Modal
                            showModal={showModal}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            toggleModal={toggleModal}
                            formatDate={formatDate}
                        />
                    </div>
                </div>



                {/* (3)-2. <Group /> 영역 - 오른쪽(right) - 디데이(d-day) */}
                <div className='w-full px-16'
                    style={{
                    minHeight:'1000px', // 배경 크기(최소 높이)
                    width: '670px',
                    }}
                >
                    <Dday />
                </div>
            </div>
            



          </div>
        </div>
    </>
  )
}

export default Group_Calendar
