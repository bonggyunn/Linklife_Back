import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Event from "./Event";

const MyTimeLine = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [eventContent, setEventContent] = useState("");

    const handleAddPost = async () => {
        if (!title || !eventContent) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // 로그인 토큰 가져오기
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

            if (response.ok) {
                const data = await response.json();
                alert("게시글이 성공적으로 등록되었습니다.");
                setPosts([...posts, { title, content: eventContent }]);
                setModalOpen(false); // 모달 닫기
                setTitle("");        // 입력값 초기화
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
                    <div
                        className="flex overflow-x-auto"
                        style={{
                            width: "615px",
                            height: "155px",
                            border: "1px solid #CFCFCF",
                            marginLeft: "44px",
                        }}
                    >
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
                                        height: "140px",
                                        position: "relative",
                                    }}
                                >
                                    <div className="w-full mb-2 border border-green-700 h-2/4"></div>
                                    <span
                                        className="w-4 h-4 mb-2 bg-green-400 rounded-full"
                                        style={{
                                            zIndex: "2",
                                        }}
                                    ></span>
                                    <div className="flex items-center justify-center w-48 border border-gray-700 h-1/4">
                                        {post.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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

                {modalOpen && (
                    <div className="-ml-96 bg-black/40" style={{ marginTop: "-410px" }}>
                        <Modal
                            title={"행사 게시글 등록"}
                            onClose={() => setModalOpen(false)}
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
                                        onClick={handleAddPost}
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