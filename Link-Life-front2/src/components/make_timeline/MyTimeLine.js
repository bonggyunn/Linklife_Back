import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "./Modal";
import Tabs from "./Tabs";
import MainTimeLine from "./MainTimeLine";
import { useTimeline } from "./TimelineContext";


const MyTimeLine = () => {
    const { posts, handleAddPost } = useTimeline();
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [eventContent, setEventContent] = useState("");

    const addPost = () => {
        handleAddPost(title, eventContent);
        setModalOpen(false);
        setTitle("");
        setEventContent("");
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
                            <button
                                className="font-bold text-white bg-green-800 hover:bg-green-900 rounded-lg px-4 py-2"
                                onClick={addPost}
                            >
                                등록
                            </button>
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
