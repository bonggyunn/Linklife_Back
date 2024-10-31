import React, { useState, useEffect, useCallback } from "react";
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
    const [location, setLocation] = useState("");

    const { posts, handleAddPost } = useTimeline();

    const fetchPosts = useCallback((date) => {
        // TimelineContext 내 fetchPosts 함수 호출 코드
    }, []);

    // 선택된 날짜가 변경될 때마다 게시글 목록을 가져오고 정렬
    useEffect(() => {
        fetchPosts(selectedDate);
    }, [selectedDate, fetchPosts]);


    const handleAddPostClick = async () => {
        if (!selectedDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        const adjustedStartDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString();

        await handleAddPost(title, eventContent, adjustedStartDate, location);

        setModalOpen(false);
        setTitle("");
        setEventContent("");
        setLocation("");
        setSelectedDate(null);
    };

    return (
        <>
            <div className="py-12 px-11">
                <h1 className="text-3xl font-bold text-black">내 타임라인</h1>
            </div>

            <MainTimeLine posts={posts} />

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
                            location={location}
                            setLocation={setLocation}
                        />
                    </Modal>
                </div>
            )}

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
