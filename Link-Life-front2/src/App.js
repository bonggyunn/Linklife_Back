import "./App.css";
import { FiPlusCircle } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

import Tagbar from "./components/Tagbar";
import NavbarFull_Friend from "./components/NavbarFull_Friend";
import NavbarFull from "./components/NavbarFull";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Modal from "./components/Modal";
import Tabs from "./components/Tabs";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Friend from "./components/Friend";

import IntroduceTeam from "./components/IntroduceTeam";
import InformationUpdate from "./components/InformationUpdate";
import MyTimeLine from "./components/MyTimeLine";
import Group_Total from "./components/Group_Total";
import Group_Calendar from "./components/Group_Calendar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar_Group from "./components/Sidebar_Group";

import Update from "./components/Update";
import Timeline from "./components/Timeline";
import MyTimeLinetest from "./components/MyTimeLine(test)";

function App() {
  // sidebar(펼치기,접기 관리)을 위한 state
  // const [sidebarToggle, setSidebarToggle] = useState(true);

  // modal(팝업 켜기,끄기 관리)을 위한 state
  // const [modalOpen, setModalOpen] = useState(false);

  const [message, setMessage] = useState([]);

  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get("/hello")
      .then((response) => setHello(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 0. 팀소개 화면 */}
          <Route exact path="/introduceTeam" element={<IntroduceTeam />} />

          {/* 1. 회원가입 */}
          <Route
            exact
            path="/signUp"
            element={
              <>
                <NavbarFull />
                <SignUp />
              </>
            }
          />

          {/* 2. 로그인 */}
          <Route exact path="/login" element={<Login />} />

          {/* 3. 개인정보수정 화면 */}
          <Route exact path="/informationUpdate" element={<Update />} />

          {/* ------------- 여기까지는 UI 완성됨 ---------------- */}

          {/* 4. 내 타임라인 */}
          <Route
            exact
            path="/timeline"
            element={
              <>
                <div className="flex">
                  <Sidebar />
                  <div className="w-full ml-96">
                    <Navbar />
                    <MyTimeLinetest />
                  </div>
                </div>
              </>
            }
          />

          {/* 5. 친구 화면 */}
          <Route
            exact
            path="/"
            element={
              <>
                <NavbarFull_Friend />
                <Friend />
              </>
            }
          />

          {/* 6. 그룹 화면 */}
          <Route exact path="/group" element={<Group_Total />} />

          {/* 6. 그룹-캘린더 화면 */}
          <Route exact path="/group/calendar" element={<Group_Calendar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
