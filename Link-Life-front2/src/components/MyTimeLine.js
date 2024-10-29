import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Tabs from "./Tabs";
import Event from "./Event";

const MyTimeLine = () => {
  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  // 게시글 상태 관리
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [eventContent, setEventContent] = useState("");

  // 게시글 추가 함수
  const handleAddPost = () => {
    if (title) {
      setPosts([...posts, title]);
      setModalOpen(false); // 모달 닫기
    }
  };

  return (
    <>
      <div className="w-full" style={{ minHeight: "500px" }}>
        <div className="py-12 px-11">
          <h1 className="text-3xl font-bold text-black">내 타임라인</h1>
        </div>
        <div>
          {/* 타임라인 영역 */}
          <div
            className="flex overflow-x-auto"
            style={{
              width: "615px",
              height: "155px",
              border: "1px solid #CFCFCF",
              marginLeft: "44px",
            }}
          >
            {/* 가로선 */}
            <hr
              className="absolute border-2 border-green-800"
              style={{
                width: "615px",
                marginTop: "85px",
                zIndex: "1",
              }}
            />

            <div className="flex">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                  style={{
                    height: "140px", // 요소 높이 고정
                    position: "relative", // 위치 고정
                  }}
                >
                  {/* 사진을 위한 공간 */}
                  <div className="w-full mb-2 border border-green-700 h-2/4"></div>
                  {/* 날짜 및 행사명 */}
                  <span
                    className="w-4 h-4 mb-2 bg-green-400 rounded-full"
                    style={{
                      zIndex: "2",
                    }}
                  ></span>
                  <div className="flex items-center justify-center w-48 border border-gray-700 h-1/4">
                    {post}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 게시글 등록 버튼 */}
        <div
          style={{
            position: "relative",
            width: "615px",
            height: "65px",
            border: "1px solid #CFCFCF",
            marginLeft: "44px",
          }}
          onClick={() => setModalOpen(true)}
        >
          <div className="flex items-center justify-center w-full h-full bg-gray-100 hover:bg-gray-200">
            <FiPlusCircle className="w-10 h-10" />
          </div>
        </div>

        {/* 게시글 모달 */}
        {modalOpen && (
          <div className="-ml-96 bg-black/40" style={{ marginTop: "-410px" }}>
            <Modal
              title={"행사 게시글 등록"}
              onClose={() => setModalOpen(false)}
              footer={
                <div className="flex justify-end gap-2 py-3">
                  <select
                    className="p-2 font-bold text-black"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #cfcfcf",
                      width: "135px",
                      height: "35px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="open">전체공개</option>
                    <option value="close">비공개</option>
                  </select>

                  <button
                    className="font-bold text-white bg-green-800 hover:bg-green-900"
                    style={{
                      borderRadius: "10px",
                      width: "120px",
                      height: "35px",
                      fontSize: "14px",
                      marginLeft: "15px",
                    }}
                    onClick={handleAddPost} // 클릭 시 게시글 등록
                  >
                    등록
                  </button>
                </div>
              }
            >
              <Event
                title={title}
                setTitle={setTitle}
                eventContent={eventContent}
                setEventContent={setEventContent}
              />
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default MyTimeLine;
