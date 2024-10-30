import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Event from "./Event";
import Tabs from "./Tabs";
import MainTimeLine from "./MainTimeLine";

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
                    setPosts(data.content); // 서버에서 받은 게시글 목록 설정
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
                setPosts([newPost, ...posts]);
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
            <div className="py-12 px-11">
                <h1 className="text-3xl font-bold text-black">내 타임라인</h1>
            </div>

            {/* MainTimeLine 컴포넌트 삽입 */}
            <MainTimeLine posts={posts} />

            {/* 게시글 등록 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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
                        <Tabs
                            title={title}
                            setTitle={setTitle}
                            eventContent={eventContent}
                            setEventContent={setEventContent}
                        />
                    </Modal>
                </div>
            )}

            {/* 게시글 등록 버튼 */}
            <div
                style={{
                    width: "750px",
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
        </>
    );
};

export default MyTimeLine;
