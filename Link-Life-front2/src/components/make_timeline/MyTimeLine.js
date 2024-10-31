import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Tabs from "./Tabs";
import MainTimeLine from "./MainTimeLine";
import { useTimeline } from "./TimelineContext";

const MyTimeLine = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [eventContent, setEventContent] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    const { posts, fetchPosts, handleAddPost } = useTimeline();

    // 선택된 날짜가 변경될 때마다 게시글 목록을 가져오고 정렬
    useEffect(() => {
        fetchPosts(selectedDate);
    }, [selectedDate, fetchPosts]);

    const handleAddPostClick = async () => {
        if (!selectedDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        const adjustedStartDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString(); // 하루 추가된 날짜 사용
        await handleAddPost(title, eventContent, adjustedStartDate); // 새 게시글 추가

        // 입력 필드 초기화 및 모달 닫기
        setModalOpen(false);
        setTitle("");
        setEventContent("");
        setSelectedDate(null);
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
                                    onClick={handleAddPostClick}
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
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
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
