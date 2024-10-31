import React, { useState } from "react";
import PostModal from "./PostModal";

const MainTimeLine = ({ posts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const openPostModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closePostModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };

    return (
        <div
            className="flex overflow-x-auto"
            style={{
                width: "750px",
                height: "100px",
                border: "1px solid #CFCFCF",
                marginLeft: "44px",
            }}
        >
            {/* 타임라인 가로선 */}
            <hr
                className="absolute border-2 border-green-800"
                style={{
                    width: "750px",
                    marginTop: "45px",
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
                            height: "80px",
                            position: "relative",
                            margin: "0 20px",
                        }}
                    >
                        {/* 게시글 이미지 영역 (임시) */}
                        <div className="w-full mb-1 border border-green-700 h-2/5"></div>
                        {/* 게시글 표시 동그라미 */}
                        <span
                            className="w-3 h-3 mb-2 bg-green-400 rounded-full"
                            style={{
                                zIndex: "2",
                            }}
                        ></span>
                        {/* 게시글 제목 표시 */}
                        <div
                            onClick={() => openPostModal(post)}
                            className="flex items-center justify-center w-48 h-1/5 cursor-pointer"
                        >
                            {post.subject}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedPost && (
                <PostModal post={selectedPost} onClose={closePostModal} />
            )}
        </div>
    );
};

export default MainTimeLine;
