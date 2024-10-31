import React, { createContext, useContext, useState, useEffect } from "react";

const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (!token) return; // 토큰 없으면 요청 안함

        const fetchPosts = async () => {
            try {
                const response = await fetch("/post/list?page=0", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched posts:", data.content);
                    setPosts(data.content); // 서버에서 받은 게시글 목록 설정
                } else {
                    console.error("게시글 목록 가져오기 실패:", response.statusText);
                    console.log(posts); // 확인용
                }
            } catch (error) {
                console.error("오류 발생:", error);
            }
        };
        fetchPosts();
    }, [token])

    const handleAddPost = async (subject, content) => {
        if (!subject || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }
        //게시글 생성
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    subject,
                    content,
                    eventStartDateTime: "2023-12-01T10:00:00",
                    eventEndDateTime: "2023-12-01T12:00:00",
                    eventLocation: "서울",
                }),
            });

            if (response.ok) {
                const newPost = await response.json(); // 서버로부터 반환된 새 게시글 데이터
                alert("게시글이 성공적으로 등록되었습니다.");

                // 타임라인 표시 수정필요 !!!!!
                setPosts((prevPosts) =>
                    [...prevPosts, newPost].sort((a, b) =>
                        new Date(a.eventStartDateTime) - new Date(b.eventStartDateTime)
                    )
                );
            } else {
                console.error("게시글 등록 실패:", response.statusText);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <TimelineContext.Provider value={{ posts, handleAddPost }}>
            {children}
        </TimelineContext.Provider>
    );
};

export const useTimeline = () => useContext(TimelineContext);
