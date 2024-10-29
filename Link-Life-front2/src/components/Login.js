import React from "react";
import { useState, useEffect } from "react";
import picture_logoOnly from "../images/logo_Link-Life(4)_IconOnly.png";
import picture_textOnly from "../images/logo_Link-Life(3)_textonly.png";
import logo_google from "../images/logo_google.svg";
import logo_kakao from "../images/logo_kakao.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();

  const [username, setId] = useState("");
  const [password, setPw] = useState("");

  const [IdValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = async () => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // 로컬 스토리지에 토큰 저장
        localStorage.setItem("username", response.data.username); // 사용자 이름 저장
        alert(`${response.data.username}님 반갑습니다 ! `);
        navigation("/");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (IdValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [IdValid, pwValid]);

  useEffect(() => {
    setIdValid(username.length > 0);
    setPwValid(password.length > 0);
  }, [username, password]);

  return (
    <>
      <div
        className="flex w-full"
        style={{
          minHeight: "1000px", // 배경 크기(최소 높이)
        }}
      >
        {/* <div className='py-12 px-11'>
          <h1 className='text-3xl font-bold text-black'>회원가입</h1>
        </div> */}

        {/* 0. 회원가입 - 좌측(left) 화면 */}
        <div
          className="flex justify-center pt-48"
          style={{
            width: "960px",
            minHeight: "870px",
          }}
        >
          <div>
            <img
              src={picture_textOnly}
              alt="link-life logo"
              className="h-12 w-96"
            />
            <img
              src={picture_logoOnly}
              alt="link-life logo"
              className="h-80 w-96"
            />
          </div>
        </div>

        {/* 0. 회원가입 - 우측(right) 화면 */}
        <div
          style={{
            width: "960px",
            minHeight: "870px",
          }}
        >
          <div className="py-20 px-11">
            <fieldset
              style={{
                width: "600px", // 배경이미지 크기(너비)
                height: "650px", // 배경이미지 크기(높이)
                borderRadius: "10px",
                border: "1px solid #cfcfcf",
                boxShadow: "0px 4px 4px 0px #757575",
              }}
            >
              <div className="l-titleWrap">Link-Life, 인생을 연결합니다 !</div>
              <div className="l-contentWrap">
                {/* 아이디(id) */}
                <div className="l-inputWrap">
                  <input
                    className="l-input"
                    placeholder="아이디"
                    value={username}
                    onChange={handleId}
                  />
                </div>

                {/* 비밀번호(password) */}
                <div className="l-inputWrap">
                  <input
                    className="l-input"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePw}
                  />
                </div>
              </div>

              <div>
                <div
                  onClick={() => !notAllow && onClickConfirmButton()}
                  className="l-loginButton"
                >
                  로그인
                </div>

                {/* 카카오톡 로그인 버튼 */}
                <button className="flex items-center justify-center l-kakaoButton">
                  <img
                    src={logo_kakao}
                    alt="logo_kakao"
                    className="mr-3 w-11 h-11"
                  />
                  카카오톡 아이디로 로그인
                </button>

                {/* 구글 로그인 버튼 */}
                <button className="flex items-center justify-center l-googleButton">
                  <img
                    src={logo_google}
                    alt="logo_google"
                    className="mr-3 w-7 h-7"
                  />
                  구글 아이디로 로그인
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <p>
                  계정이 없으시다면?{" "}
                  <a href="" className="l-signupButton">
                    회원가입
                  </a>
                </p>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
