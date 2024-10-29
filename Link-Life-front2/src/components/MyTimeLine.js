import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Event from "./Event";

const MyTimeLine = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [eventContent, setEventContent] = useState("");

    // 초기 로드 시 게시글 목록 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("/post/list?page=0");
                if (response.ok) {
                    const data = await response.json();
                    // 서버에서 받아온 게시글 목록을 posts 상태로 설정
                    setPosts(data.content); // Page 객체의 content 속성에서 게시글 배열 가져옴
                } else {
                    console.error("게시글 목록 가져오기 실패:", response.statusText);
                }
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchPosts();
    }, []);

    // 게시글 추가 함수 - 서버에 POST 요청을 보내 게시글을 등록
    const handleAddPost = async () => {
        if (!title || !eventContent) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    subject: title,
                    content: eventContent,
                    eventStartDateTime: "2023-12-01T10:00:00",
                    eventEndDateTime: "2023-12-01T12:00:00",
                    eventLocation: "서울",
                }),
            });

            if (response.ok) {
                const newPost = { title, content: eventContent };
                alert("게시글이 성공적으로 등록되었습니다.");
                // 서버에 저장된 새 게시글을 posts 상태에 추가
                setPosts([newPost, ...posts]); // 새 게시글이 맨 앞에 오도록 추가
                setModalOpen(false);
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
                    onClick={() => setModalOpen(true)}
                >
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 hover:bg-gray-200">
                        <FiPlusCircle className="w-10 h-10" />
                    </div>
                </div>

                {/* 게시글 등록 모달 */}
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