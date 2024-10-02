import React from "react";

const Calendar_Modal = ({
  showModal,
  selectedDate,
  toggleModal,
  formatDate,
  setSelectedDate,
}) => {
  const prevDate = () => {
    setSelectedDate((prevDate) => prevDate - 1);
  };

  const nextDate = () => {
    setSelectedDate((prevDate) => prevDate + 1);
  };

  return (
    showModal && (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="z-50 w-auto bg-white shadow-lg rounded-xl modal-container"
          style={{
            width: "400px",
            height: "505px",
            backgroundColor: "#265136",
          }}
        >
          {/* 날짜표시 */}
          <div className="px-6 py-4 text-center modal-content">
            <div className="flex items-center justify-between pb-3">
              <button
                className="text-2xl text-white text-semibold"
                onClick={prevDate}
              >
                &lt;
              </button>
              <p
                className="text-xl font-bold tracking-widest text-white"
                style={{
                  fontFamily: "조선일보명조",
                }}
              >
                {formatDate(selectedDate)}
              </p>
              <button
                className="text-2xl text-white text-semibold"
                onClick={nextDate}
              >
                &gt;
              </button>
            </div>

            {/* 게시글 연동 공간 */}
            <div
              className="items-center mx-2"
              style={{
                width: "335px",
                height: "380px",
                border: "2px solid rgba(255, 255, 255, 0.8)",
              }}
            >
              {/* "우혜원의 결혼식" 게시글로 이동*/}
              <button className="w-11/12 h-10 my-2 font-normal text-gray-700 rounded-lg bg-green-50 hover:bg-green-100">
                우혜원 님의 결혼식
              </button>
            </div>
          </div>

          {/* 모달창(날짜 클릭시) 닫기 */}
          <div className="flex justify-center">
            <button
              onClick={toggleModal}
              className="items-center px-3 py-1 bg-gray-100 rounded-md modal-close hover:bg-gray-300 focus:outline-none focus:ring"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Calendar_Modal;
