import React, { useState } from "react";
import Modal from "./Modal";
import { FaEdit, FaRegImages } from "react-icons/fa";

const PostModal = ({ post, onClose }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`; // 날짜 포맷
    };
    const [activeTab, setActiveTab] = useState(1);

    const renderContent = () => {
        switch (activeTab) {
            case 1:
                return <p>{post.content || "행사 내용이 없습니다"}</p>;
            case 2:
                return <p>{post.images || "사진이 없습니다"}</p>;
            default:
                return null;
        }
    };


    return (
        <Modal
            title={
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {post.subject}
                    {/* ---로 구분 */}
                    <span style={{ margin: "20px" }}> ----- ♡ ----- </span>
                    {formatDate(post.eventStartDateTime)}
                </div> // 모달창 이름에 게시글 제목이랑 날짜 표시
            }
            onClose={onClose}
            width={600}
            height={400}
        >
            <div className="container">
                <div className="tabs">
                    <div
                        className={activeTab === 1 ? "tab active-tab" : "tab"}
                        onClick={() => setActiveTab(1)}
                    >
                        <div className="flex items-center justify-center text-sm font-semibold">
                            <FaEdit className="w-5 h-5 mr-2"/>
                            행사
                        </div>
                    </div>
                    <div
                        className={activeTab === 2 ? "tab active-tab" : "tab"}
                        onClick={() => setActiveTab(2)}
                    >
                        <div className="flex items-center justify-center text-sm font-semibold">
                            <FaRegImages className="w-5 h-5 mr-2"/>
                            사진
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {renderContent()}
                </div>
            </div>
        </Modal>
    );
};

export default PostModal;
