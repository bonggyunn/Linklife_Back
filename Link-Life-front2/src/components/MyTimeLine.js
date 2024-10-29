import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Event from "./Event";

const MyTimeLine = () => {
    // 모달 창 상태 관리 (열기/닫기)
    const [modalOpen, setModalOpen] = useState(false);
    // 게시글 목록 관리
    const [posts, setPosts] = useState([]);
    // 게시글 제목 상태
    const [title, setTitle] = useState("");
    // 게시글 내용 상태
    const [eventContent, setEventContent] = useState("");

    // 게시글 추가 함수 - 서버에 POST 요청을 보내 게시글을 등록
    const handleAddPost = async () => {
        // 제목과 내용을 입력했는지 확인
        if (!title || !eventContent) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            // 로그인 인증 토큰 가져오기
            const token = localStorage.getItem("token");
            // 서버에 POST 요청으로 게시글 데이터 전송
            const response = await fetch("/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 인증 토큰 추가
                },
                body: JSON.stringify({
                    subject: title,
                    content: eventContent,
                    eventStartDateTime: "2023-12-01T10:00:00", // 임시 데이터 (필요 시 변경)
                    eventEndDateTime: "2023-12-01T12:00:00",   // 임시 데이터 (필요 시 변경)
                    eventLocation: "서울",                    // 임시 데이터 (필요 시 변경)
                }),
            });

            // 요청이 성공적일 때
            if (response.ok) {
                const data = await response.json();
                alert("게시글이 성공적으로 등록되었습니다.");
                // 게시글 목록에 새 게시글 추가
                setPosts([...posts, { title, content: eventContent }]);
                // 모달 창 닫기
                setModalOpen(false);
                // 입력 필드 초기화
                setTitle("");
                setEventContent("");
            } else {
                console.error("게시글 등록 실패:", response.statusText);
            }
        } catch (error) {
            console.error("오류 발생:", error);
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
                        {/* 타임라인 가로선 */}
                        <hr
                            className="absolute border-2 border-green-800"
                            style={{
                                width: "615px",
                                marginTop: "85px",
                                zIndex: "1",
                            }}
                        />
                        <div className="flex">
                            {/* 게시글 목록을 반복하여 표시 */}
                            {posts.map((post, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center"
                                    style={{
                                        height: "140px",
                                        position: "relative",
                                    }}
                                >
                                    {/* 게시글 이미지 영역 (임시) */}
                                    <div className="w-full mb-2 border border-green-700 h-2/4"></div>
                                    {/* 게시글 표시 동그라미 */}
                                    <span
                                        className="w-4 h-4 mb-2 bg-green-400 rounded-full"
                                        style={{
                                            zIndex: "2",
                                        }}
                                    ></span>
                                    {/* 게시글 제목 표시 */}
                                    <div className="flex items-center justify-center w-48 border border-gray-700 h-1/4">
                                        {post.title}
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
                    onClick={() => setModalOpen(true)} // 버튼 클릭 시 모달 열기
                >
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 hover:bg-gray-200">
                        <FiPlusCircle className="w-10 h-10" />
                    </div>
                </div>

                {/* 게시글 등록 모달 */}
                {modalOpen && (
                    <div className="-ml-96 bg-black/40" style={{ marginTop: "-410px" }}>
                        <Modal
                            title={"행사 게시글 등록"} // 모달 제목
                            onClose={() => setModalOpen(false)} // 닫기 버튼 클릭 시 모달 닫기
                            footer={
                                <div className="flex justify-end gap-2 py-3">
                                    <button
                                        className="font-bold text-white bg-green-800 hover:bg-green-900"
                                        style={{
                                            borderRadius: "10px",
                                            width: "120px",
                                            height: "35px",
                                            fontSize: "14px",
                                            marginLeft: "15px",
                                        }}
                                        onClick={handleAddPost} // 등록 버튼 클릭 시 handleAddPost 호출
                                    >
                                        등록
                                    </button>
                                </div>
                            }
                        >
                            {/* Event 컴포넌트를 통해 제목과 내용 입력 */}
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