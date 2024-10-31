import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Tabs from "./Tabs";
import MainTimeLine from "./MainTimeLine";

const MyTimeLine = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [eventContent, setEventContent] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); // 날짜 상태 추가
    const [posts, setPosts] = useState([]);

    // 초기 로드 시 게시글 목록 가져오기
    const fetchPosts = async (date) => {
        const token = localStorage.getItem("token");
        try {
            let url = "/post/list?page=0";
            if (date) {
                url += `&date=${date}`; // 선택한 날짜로 필터링하는 쿼리 파라미터 추가
            }

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                const sortedPosts = data.content.sort((a, b) => new Date(a.eventStartDateTime) - new Date(b.eventStartDateTime)); // 날짜순 정렬
                setPosts(sortedPosts);
            } else {
                console.error("게시글 목록 가져오기 실패:", response.statusText);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    // 초기 로드 시와 날짜 변경 시 게시물 목록 가져오기
    useEffect(() => {
        fetchPosts(selectedDate);
    }, [selectedDate]);

    const handleAddPost = async () => {
        if (!title || !eventContent) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        if (!selectedDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const adjustedStartDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000); // 하루 추가

            const response = await fetch("/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    subject: title,
                    content: eventContent,
                    eventStartDateTime: adjustedStartDate.toISOString(), // 하루 추가된 날짜 사용
                    eventEndDateTime: new Date(adjustedStartDate.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 시작 시간으로부터 2시간 후
                    eventLocation: "서울",
                }),
            });

            if (response.ok) {
                const newPost = { title, content: eventContent, eventStartDateTime: adjustedStartDate };
                await fetchPosts(selectedDate); // 새로 추가된 게시물 포함하여 다시 가져오기
                alert("게시글이 성공적으로 등록되었습니다.");
                setPosts([newPost, ...posts]);
                setModalOpen(false);
                setTitle("");
                setEventContent("");
                setSelectedDate(null); // 등록 후 날짜 초기화
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
                            selectedDate={selectedDate} // 전달: 선택한 날짜 상태
                            setSelectedDate={setSelectedDate} // 전달: 날짜 설정 함수
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
