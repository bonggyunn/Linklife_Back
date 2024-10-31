import React, { useState } from "react";
import "../../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaSearch,
  FaEdit,
  FaRegCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { FaRegImages, FaPeopleGroup, FaRegClock } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";
import { IoCloseCircle, IoPlayCircleSharp, IoPlaySharp } from "react-icons/io5";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import picture_user from "../../images/user.jpeg";
import picture_user2 from "../../images/user2.jpeg";
import picture_user3 from "../../images/user3.jpeg";
import NavbarFull from "../NavbarFull";
import Event from "./Event";
import "react-datepicker/dist/react-datepicker.css";

const Tabs = ({ title, setTitle, eventContent, setEventContent, selectedDate, setSelectedDate }) => {
    const [toggleState, setToggleState] = useState(1);
    // 참석자 - 친구/그룹 버튼 관련 state 생성
    const [searchTypeState, setSearchTypeState] = useState(1);
    // 참석자 - 친구/그룹 버튼 관련 state 생성
    const [groupState, setGroupState] = useState(1);
    // 일정 - (우측 하단)종일, 오늘, D-day 버튼
    const [allDayState, setAllDayState] = useState(0);
    const [todayState, setTodayState] = useState(0);
    const [dDayState, setDDayState] = useState(0);
    // 파일정보를 저장할 state 생성
    // - 업로드한 파일의 정보를 저장할 state를 만든다.
    const [file, setFile] = useState({});

    const toggleTab = (index) => setToggleState(index);
    const searchTypeButton = (index) => setSearchTypeState(index);
    const groupTab = (index) => setGroupState(index);
    const alldayButton = (index) => {
        count_AllDayButton = count_AllDayButton + index;
        setAllDayState(count_AllDayButton % 2);
        console.log("count : " + parseInt(count_AllDayButton));
        console.log("count/2 : " + parseInt(count_AllDayButton % 2));
    };
    const todayButton = () => setTodayState((prev) => (prev + 1) % 2);
    const dDayButton = () => setDDayState((prev) => (prev + 1) % 2);

    const formatDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const [activeTab, setActiveTab] = useState("event");
    //const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        const formatDate = (date) => {
            if (!date) return null;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };

        const postForm = {
            subject: title,
            content: eventContent,
            eventStartDateTime: selectedDate ? formatDate(selectedDate) : null,
            eventEndDateTime: selectedDate ? formatDate(selectedDate) : null, // 필요에 따라 종료 날짜도 설정 가능
            // 다른 필요한 필드들 추가 가능
        };

        console.log("Sending postForm:", postForm); // 전송할 데이터 확인용

        fetch("http://localhost:8080/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => console.error("Error:", error));
    };


    let count_AllDayButton = 0;

  // URL.createObjectURL() 이용하기
  // - 이미지 미리보기 url을 state 값에 저장한다.
  const imageUpload = (e) => {
    const imageType = e.target.files[0].type.includes("image");
    const videoType = e.target.files[0].type.includes("video");

    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      image: imageType,
      video: videoType,
    });

    // 가져온 파일 제목(input)을 다른 공간(output)에 출력
    const input = document.getElementById("file");
    const output1 = document.getElementById("output1");
    const output2 = document.getElementById("output2");
    const output3 = document.getElementById("output3");

    output1.textContent = input.files[0].name;
    output2.textContent = input.files[0].type;

    // 가져온 파일 크기가 몇 Byte, KB, MB인지 게산해서 출력
    // 이를 위해 fotmatByte() 함수를 통해 계산 실행 후 return
    output3.textContent = formatByte(input.files[0].size);
  };

  // fotmatByte()를 통해 파일 크기 계산 후 return
  function formatByte(byte, decimals = 2) {
    if (byte === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(byte) / Math.log(k));

    return parseFloat((byte / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      <div className="container">
        <div className="tabs">
          <div
            className={toggleState === 1 ? "tab active-tab" : "tab"}
            onClick={() => toggleTab(1)}
          >
            <div className="flex items-center justify-center text-sm font-semibold">
              <FaEdit className="w-5 h-5 mr-2" />
              행사
            </div>
          </div>
          <div
            className={toggleState === 2 ? "tab active-tab" : "tab"}
            onClick={() => toggleTab(2)}
          >
            <div className="flex items-center justify-center text-sm font-semibold">
              <FaRegCalendarAlt className="w-5 h-5 mr-2" />
              일정
            </div>
          </div>
          <div
            className={toggleState === 3 ? "tab active-tab" : "tab"}
            onClick={() => toggleTab(3)}
          >
            <div className="flex items-center justify-center text-sm font-semibold">
              <FaRegImages className="w-5 h-5 mr-2" />
              사진
            </div>
          </div>
          <div
            className={toggleState === 4 ? "tab active-tab" : "tab"}
            onClick={() => toggleTab(4)}
          >
            <div className="flex items-center justify-center text-sm font-semibold">
              <FaPeopleGroup className="w-5 h-5 mr-2" />
              참석자
            </div>
          </div>
        </div>

        <div className="contents">
          <div
            className={toggleState === 1 ? "content active-content" : "content"}
          >
              <Event
                  title={title}
                  setTitle={setTitle}
                  eventContent={eventContent}
                  setEventContent={setEventContent}
              />
          </div>

          <div
            className={toggleState === 2 ? "content active-content" : "content"}
          >
            <div className="flex w-full h-full -mt-2 ">
              {/* 일정 Tab - 좌측(left) 화면 */}
                {/* 일정 Tab - 좌측 화면 */}
                <div
                    style={{
                        border: "1px solid #cfcfcf",
                        borderRight: "none",
                        height: "315px",
                        width: "364px",
                        padding: "16px",
                    }}
                >
                    <h3 className="mb-2 text-lg font-semibold ">날짜 선택</h3>
                    <div style={{
                        width: "100px;"
                    }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            justify
                            inline
                            placeholderText="날짜를 선택하세요"
                            display={""}

                        />
                    </div>
                </div>
              {/* 0. 일정 Tab -> 우측(right) 화면 */}
              <div
                style={{
                  border: "1px solid #cfcfcf",
                  height: "315px",
                  width: "364px",
                }}
              >
                {/* 1. 날짜 및 시간 Title -> 우측(right) 화면 */}
                <div className="flex w-full h-8">
                  <FaRegClock className="w-5 h-5 mr-2" />{" "}
                  <h2 className="w-full h-8 p-3 text-sm font-bold">
                    날짜 및 시간
                  </h2>
                </div>

                {/* 2. 날짜 및 시간 Box -> 우측(right) 화면 */}
                <div
                  style={{
                    border: "1px solid red",
                    height: "200px",
                    width: "362px",
                  }}
                ></div>

                {/* 3. 날짜 및 시간 Button 영역 -> 우측(right) 화면 */}
                <div
                  style={{
                    border: "1px solid blue",
                    height: "82px",
                    width: "362px",
                  }}
                >
                  <button
                    className="calanderButton"
                    onClick={() => alldayButton(1)}
                  >
                    종일
                  </button>
                  <button
                    className="calanderButton"
                    onClick={() => todayButton(1)}
                  >
                    오늘
                  </button>
                  <button
                    className="calanderButton"
                    onClick={() => dDayButton(1)}
                  >
                    D-day
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={toggleState === 3 ? "content active-content" : "content"}
          >
            <div className="flex w-full h-full -mt-2">
              {/* 사진 Tab - 좌측(left) 화면 */}
              <div
                style={{
                  border: "1px solid #cfcfcf",
                  height: "315px",
                  width: "480px",
                  overflow: "scroll",
                }}
              >
                {/* 사진&영상 영역 틀 예시(1) */}
                {/* <div className='w-32 h-32 m-3 bg-gray-100'
                        style={{
                            border: '1px solid #8c8c8c',
                            borderRadius: '5px',
                            float: 'left',
                            }}
                        >
                            <div className='flex items-center h-7 w-31'>
                                <IoCloseCircle className='w-5 h-5 ml-24' />
                            </div>
                        </div> */}

                {/* 사진&영상 영역 틀 예시(2) */}
                {/* <div className='w-32 h-32 m-3 bg-gray-100'
                        style={{
                            border: '1px solid #8c8c8c',
                            borderRadius: '5px',
                            float: 'left',
                            }}

                        >
                            <div className='flex items-center h-7 w-31'>
                                <IoCloseCircle className='w-5 h-5 ml-24' />
                            </div>
                            <div className='flex items-center justify-center h-16 w-31'>
                                <IoPlayCircleSharp className='w-10 h-10' />
                            </div>
                            <div className='flex items-center h-9 w-31'>
                                <div className='flex items-center w-16 h-5 text-sm text-white rounded-lg p- bg-black/80'>
                                    <IoPlaySharp className='w-3 h-3 m-1' />11:20
                                </div>
                            </div>
                        </div> */}
              </div>

              {/* 0. 사진 Tab -> 우측(right) 화면 */}
              <div
                style={{
                  border: "1px solid #cfcfcf",
                  borderLeft: "none",
                  height: "315px",
                  width: "248px",
                  overflowY: "hidden",
                }}
              >
                <div>
                  <div
                    className="m-4 h-28 w-52"
                    style={{
                      border: "1px solid #8c8c8c",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <input type="file" onChange={imageUpload} /> */}
                    {file.image && <img src={file.url} className="h-28 w-52" />}
                    {file.video && <video src={file.url} controls />}
                  </div>

                  {/* 2. 파일 업로드 - 버튼(button) */}
                  <div
                    className="flex justify-center mx-4 my-2 h-9 w-52 bg-slate-600 hover:bg-slate-700"
                    style={{
                      borderRadius: "5px",
                      fontSize: "13px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    <label for="file">
                      <div className="btn-upload">
                        <div className="flex items-center justify-center">
                          <FiUpload className="w-4 h-4 mr-2" />
                          파일 업로드
                        </div>
                      </div>
                    </label>

                    {/* accept 특성을 통해 고유 파일 유형 한정시킴
                                (video/* -> 아무 비디오 파일, image/* -> 아무 이미지 파일) */}
                    <input
                      type="file"
                      name="file"
                      data-ax-path="file"
                      id="file"
                      accept="video/*, image/*"
                      onChange={imageUpload}
                    />
                  </div>

                  {/* 3-(1). 파일제목(input.files[0].name) */}
                  <p
                    id="output1"
                    className="px-6 font-semibold"
                    style={{
                      fontSize: "12px",

                      // 제목이 길 경우 글자수 영역 범람을 막기 위해
                      //display=block, overflow=hidden, text-overflow=ellipsis로 설정
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  ></p>
                  {/* 3-(2). 파일타입(input.files[0].type) */}
                  <p
                    id="output2"
                    className="px-6"
                    style={{ fontSize: "10px" }}
                  ></p>

                  {/* 3-(3). 파일크기(input.files[0].size => byte단위) */}
                  <p
                    id="output3"
                    className="px-6"
                    style={{ fontSize: "10px" }}
                  ></p>

                  {/* 4. 목록추가 버튼 */}
                  <div
                    className="flex justify-center mx-4 my-2 bg-blue-600 h-9 w-52 hover:bg-blue-700"
                    style={{
                      borderRadius: "5px",
                      fontSize: "13px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    <button
                      className="btn-upload"
                      // onClick={addFileList()}
                    >
                      <div className="flex items-center justify-center">
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        목록 추가
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={toggleState === 4 ? "content active-content" : "content"}
          >
            <div className="flex w-full h-full -mt-2">
              {/* 0. 참석자 Tab - 좌측(left) 화면 */}
              <div
                style={{
                  height: "315px",
                  width: "290px",
                  overflowX: "hidden",
                }}
              >
                {/* 1. 친구 및 그룹 버튼, 검색창 */}
                <div className="flex h-16 py-3">
                  {/* 1-(1). 친구 및 그룹 버튼(button) */}
                  <div>
                    <button
                      className={
                        searchTypeState === 1
                          ? "typeButton active-typeButton"
                          : "typeButton"
                      }
                      onClick={() => searchTypeButton(1)}
                    >
                      친구
                    </button>
                    <button
                      className={
                        searchTypeState === 2
                          ? "typeButton active-typeButton"
                          : "typeButton"
                      }
                      onClick={() => searchTypeButton(2)}
                    >
                      그룹
                    </button>
                  </div>
                  {/*1-(2). 검색창(search bar) */}
                  <div>
                    <span className="relative inset-y-0 left-0 flex items-center p-1 ml-4 bg-gray-300 rounded-lg w-36">
                      <input
                        type="text"
                        className="hidden w-24 px-4 py-1 bg-gray-300 rounded outline-none md:block"
                      />
                      <button className="px-4 focus:outline-none md:text-gray-600">
                        <FaSearch />
                      </button>
                    </span>
                  </div>
                </div>

                {/* 2. 친구 및 그룹 리스트(List) 출력 */}
                <div
                  className="lists"
                  style={{
                    border: "2px solid #7d7d7d",
                    height: "250px",
                    width: "290px",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    className={
                      searchTypeState === 1 ? "list active-list" : "list"
                    }
                  >
                    <div>
                      {/* 2-(1). 친구 리스트 */}
                      <div
                        className="flex items-center w-full"
                        style={{
                          borderBottom: "1px solid #cfcfcf",
                          width: "290px",
                        }}
                      >
                        <div
                          className="m-2 ml-3"
                          style={{
                            backgroundImage: `url(${picture_user})`,
                            backgroundPosition: "center", // 이미지 위치
                            backgroundSize: "cover", // 이미지 꽉차게
                            backgroundRepeat: "no-repeat", // 이미지 반복 지정
                            width: "30px", // 배경이미지 크기(너비)
                            height: "30px", // 배경이미지 크기(높이)
                            borderRadius: "100px",
                          }}
                        ></div>
                        <span className="m-2">이순신</span>
                        {/* user 고유의 pk를 통해 관리 */}
                        <input type="hidden" id="user_num" name="user_num" />
                        <div className="m-2 ml-24">
                          <button className="add-cancel-button">추가</button>
                        </div>
                      </div>

                      <div
                        className="flex items-center w-full"
                        style={{
                          borderBottom: "1px solid #cfcfcf",
                          width: "290px",
                        }}
                      >
                        <div
                          className="m-2 ml-3"
                          style={{
                            backgroundImage: `url(${picture_user2})`,
                            backgroundPosition: "center", // 이미지 위치
                            backgroundSize: "cover", // 이미지 꽉차게
                            backgroundRepeat: "no-repeat", // 이미지 반복 지정
                            width: "30px", // 배경이미지 크기(너비)
                            height: "30px", // 배경이미지 크기(높이)
                            borderRadius: "100px",
                          }}
                        ></div>
                        <span className="m-2">김성결</span>
                        <div className="m-2 ml-24">
                          <button className="add-cancel-button">추가</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      searchTypeState === 2 ? "list active-list" : "list"
                    }
                  >
                    <div>
                      {/* 2-(2) 그룹 리스트 */}
                      <div
                        className="flex items-center"
                        style={{
                          borderBottom: "1px solid #cfcfcf",
                          overflowX: "scroll",
                          scrollbarWidth: "none",
                          width: "290px",
                        }}
                      >
                        <button className="groupTab">
                          컴퓨터공학과 21학번
                        </button>
                        <button className="groupTab">신나는 우리 가족</button>
                        <button className="groupTab">
                          컴퓨터공학과 총동문회
                        </button>
                        <button className="groupTab">외가친척</button>
                        <button className="groupTab">전공종합설계(1)</button>
                      </div>

                      <div
                        className="flex items-center w-full"
                        style={{
                          borderBottom: "1px solid #cfcfcf",
                          width: "290px",
                        }}
                      >
                        <div
                          className="m-2 ml-3"
                          style={{
                            backgroundImage: `url(${picture_user3})`,
                            backgroundPosition: "center", // 이미지 위치
                            backgroundSize: "cover", // 이미지 꽉차게
                            backgroundRepeat: "no-repeat", // 이미지 반복 지정
                            width: "30px", // 배경이미지 크기(너비)
                            height: "30px", // 배경이미지 크기(높이)
                            borderRadius: "100px",
                          }}
                        ></div>
                        <span className="m-2">홍길동</span>
                        <div className="m-2 ml-24">
                          <button className="add-cancel-button">추가</button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        className="flex items-center w-full"
                        style={{
                          borderBottom: "1px solid #cfcfcf",
                          width: "290px",
                        }}
                      >
                        <div
                          className="m-2 ml-3"
                          style={{
                            backgroundImage: `url(${picture_user})`,
                            backgroundPosition: "center", // 이미지 위치
                            backgroundSize: "cover", // 이미지 꽉차게
                            backgroundRepeat: "no-repeat", // 이미지 반복 지정
                            width: "30px", // 배경이미지 크기(너비)
                            height: "30px", // 배경이미지 크기(높이)
                            borderRadius: "100px",
                          }}
                        ></div>
                        <span className="m-2">김구라</span>
                        <div className="m-2 ml-24">
                          <button className="add-cancel-button">추가</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 0. 참석자 Tab - 중간(center) 화면 */}
              <div
                style={{
                  height: "315px",
                  width: "148px",
                  overflow: "scroll",
                }}
              >
                <div
                  className="flex items-end justify-center p-3"
                  style={{
                    width: "148px",
                    height: "180px",
                  }}
                >
                  <ImArrowRight className="w-12 h-12 text-green-700 cursor-pointer hover:text-green-800" />
                </div>
                <div
                  className="flex items-start justify-center p-3"
                  style={{
                    width: "148px",
                    height: "130px",
                  }}
                >
                  <ImArrowLeft className="w-12 h-12 text-green-700 cursor-pointer hover:text-green-800" />
                </div>
              </div>

              {/* 0. 참석자 Tab -> 우측(right) 화면 -> 요청 목록 */}
              <div
                style={{
                  height: "315px",
                  width: "290px",
                  overflowX: "hidden",
                }}
              >
                {/* 1. 요청 목록 - 제목 */}
                <div className="flex items-center justify-center h-16 py-3">
                  <h1 className="text-lg font-bold">요청 목록</h1>
                </div>

                {/* 2. 요청 목록 - 리스트(List) 출력 */}
                <div
                  style={{
                    border: "2px solid #7d7d7d",
                    height: "250px",
                    width: "290px",
                    overflow: "scroll",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    className="flex items-center w-full"
                    style={{
                      borderBottom: "1px solid #cfcfcf",
                    }}
                  >
                    <div
                      className="m-2 ml-3"
                      style={{
                        backgroundImage: `url(${picture_user2})`,
                        backgroundPosition: "center", // 이미지 위치
                        backgroundSize: "cover", // 이미지 꽉차게
                        backgroundRepeat: "no-repeat", // 이미지 반복 지정
                        width: "30px", // 배경이미지 크기(너비)
                        height: "30px", // 배경이미지 크기(높이)
                        borderRadius: "100px",
                      }}
                    ></div>
                    <span className="m-2">김성결</span>
                    <div className="m-2 ml-24">
                      <button className="add-cancel-button">취소</button>
                    </div>
                  </div>

                  <div
                    className="flex items-center w-full"
                    style={{
                      borderBottom: "1px solid #cfcfcf",
                    }}
                  >
                    <div
                      className="m-2 ml-3"
                      style={{
                        backgroundImage: `url(${picture_user3})`,
                        backgroundPosition: "center", // 이미지 위치
                        backgroundSize: "cover", // 이미지 꽉차게
                        backgroundRepeat: "no-repeat", // 이미지 반복 지정
                        width: "30px", // 배경이미지 크기(너비)
                        height: "30px", // 배경이미지 크기(높이)
                        borderRadius: "100px",
                      }}
                    ></div>
                    <span className="m-2">홍길동</span>
                    <div className="m-2 ml-24">
                      <button className="add-cancel-button">취소</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
