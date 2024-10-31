import React, { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaSearch, FaAngleLeft, FaUserCircle, FaUserFriends, FaHashtag } from "react-icons/fa";
import { Link } from "react-router-dom";
import Calendar_Modal from "./Calendar_Modal";
import Dday from "./Dday";

const dataCollection_groupInfo = [
  { name: "전공종합설계(1)", numberOfPeople: 4 },
];

const dataCollection_group = [
  {
    image: "../media/sungkyul.jpeg",
    groupName: "컴퓨터공학과 21학번",
    numberOfPeople: 15,
    latestDate: "2024.01.09 (D-61)",
    user: "고강희",
    title: "삼성SDS 취업연계형 인턴",
  },
  {
    image: "../media/group.png",
    groupName: "신나는 우리 가족",
    numberOfPeople: 5,
    latestDate: "2023.11.26 (D-10)",
    user: "차훈",
    title: "부모님 35주년 결혼기념일",
  },
  {
    image: "../media/computer-science.jpeg",
    groupName: "컴퓨터공학과 총동문회",
    numberOfPeople: 200,
    latestDate: "2024.01.09 (D-61)",
    user: "고강희",
    title: "삼성SDS 취업연계형 인턴",
  },
  {
    image: "../media/group.png",
    groupName: "외가 친척",
    numberOfPeople: 50,
    latestDate: "2024.01.09 (D-61)",
    user: "호수",
    title: "결혼식",
  },
  {
    image: "../media/group.png",
    groupName: "전공종합설계(1)",
    numberOfPeople: 4,
    latestDate: "2024.01.09 (D-61)",
    user: "고강희",
    title: "삼성SDS 취업연계형 인턴",
  },
];

const Group_Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const calendar = [];

    daysOfWeek.forEach((day, index) => {
      const textColor = index === 0 ? "#FF8F8F" : index === 6 ? "#7B80F9" : "#616161";
      calendar.push(
          <div key={day} className="px-3 py-2 font-semibold text-center border rounded-md" style={{ color: textColor }}>
            {day}
          </div>
      );
    });

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(<div key={`empty${i}`} className="px-4 py-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(
          <div
              key={day}
              className="flex items-center justify-center py-4 font-semibold cursor-pointer"
              onClick={() => handleDateClick(day)}
              style={{ color: "#616161" }}
          >
            {day}
          </div>
      );
    }
    return calendar;
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev - 1 < 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const nextMonth = () => {
    setCurrentMonth((next) => (next + 1 > 11 ? 0 : next + 1));
    setCurrentYear((next) => (currentMonth === 11 ? next + 1 : next));
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleDateClick = (day) => {
    setSelectedDate(day);
    toggleModal();
  };

  const formatDate = () => {
    if (!selectedDate) return "";
    const options = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" };
    return new Date(currentYear, currentMonth, selectedDate).toLocaleString("ko-KR", options);
  };

  return (
      <div className="flex">
        <div className="fixed h-full pt-2 w-96 border border-gray-300 overflow-y-scroll">
          <div className="pb-3 border-b border-gray-300 w-96">
            <div className="flex justify-center my-2 mb-4 text-xl font-bold">그룹</div>
            <div className="flex">
            <span className="relative flex items-center p-1 mx-2 bg-gray-200 rounded-xl w-80">
              <input type="text" placeholder="그룹 검색" className="w-full px-4 py-1 bg-gray-200 rounded outline-none" />
              <button className="p-2">
                <FaSearch />
              </button>
            </span>
              <AiOutlineUsergroupAdd className="w-8 h-8 rounded-lg hover:bg-gray-100" />
            </div>
          </div>

          {/* 그룹 목록 */}
          <div>
            {dataCollection_group.map((item, index) => (
                <div key={index} className="flex cursor-pointer hover:bg-gray-100" style={{ height: "80px", border: "1px solid #cfcfcf", borderTop: index === 0 ? "none" : "1px solid #cfcfcf" }}>
                  <div className="flex items-center justify-center" style={{ height: "80px", width: "80px", padding: "10px" }}>
                    <img src={process.env.PUBLIC_URL + item.image} alt="개인 사진" style={{ height: "60px", width: "60px", borderRadius: "50%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div className="flex justify-between p-2" style={{ height: "40px", width: "290px" }}>
                      <span className="text-sm font-bold">{item.groupName}</span>
                      <span className="text-sm text-gray-400">{item.latestDate}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400" style={{ height: "40px", width: "290px" }}>
                      <span className="p-2 text-sm text-gray-400">{item.title}</span>
                      <span className="p-2 text-sm text-gray-400">{item.user}</span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>

        <div className="w-full ml-96">
          <nav className="flex justify-between px-4 py-3 bg-white border">
            <Link to="/group">
              <button className="relative text-black group">
                <FaAngleLeft className="w-6 h-6 mt-1" />
                <div className="absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow group-hover:block top-full right-0">
                  <ul className="py-2 text-xs text-gray-950">
                    <li>뒤로가기</li>
                  </ul>
                </div>
              </button>
            </Link>
            <div className="flex items-center text-xl">
              <span className="font-semibold">{dataCollection_groupInfo[0].name}</span>
              <span className="ml-2 text-gray-400">{dataCollection_groupInfo[0].numberOfPeople}</span>
            </div>
            <div className="flex items-center gap-x-5">
              <Link to="/"><FaUserFriends className="w-6 h-6 mt-1" /></Link>
              <Link to="/group"><FaHashtag className="w-6 h-6 mt-1" /></Link>
              <FaUserCircle className="w-6 h-6 mt-1 cursor-pointer" />
            </div>
          </nav>

          <div className="flex bg-gray-100">
            <div className="w-full" style={{ minHeight: "1000px", width: "600px" }}>
              <div className="flex flex-col py-2 ml-10 px-7 mt-7">
                <div className="flex justify-between py-4 px-7">
                  <h1 className="text-2xl font-bold text-gray-600">{`${new Date(currentYear, currentMonth).toLocaleString("default", { month: "numeric", year: "numeric" })}`}</h1>
                  <div className="flex">
                    <button onClick={prevMonth} className="px-2 py-1 mx-2 text-base text-white bg-gray-500 rounded-full">◀</button>
                    <button onClick={nextMonth} className="px-2.5 py-1 mx-2 text-base text-white bg-gray-500 rounded-full">▶</button>
                  </div>
                </div>
                <hr className="w-full mb-6 border-2 border-white" />
                <div className="grid grid-cols-7 gap-4 p-6 ml-8 bg-white rounded-xl">
                  {generateCalendar()}
                </div>
                <hr className="w-full mt-6 border-2 border-white" />
                <Calendar_Modal showModal={showModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleModal={toggleModal} formatDate={formatDate} />
              </div>
            </div>

            <div className="w-full px-16" style={{ minHeight: "1000px", width: "670px" }}>
              <Dday />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Group_Calendar;

