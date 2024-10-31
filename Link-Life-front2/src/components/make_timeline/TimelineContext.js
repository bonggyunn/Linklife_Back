import React, { createContext, useContext, useState, useEffect } from "react";

const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    const fetchPosts = async (selectedDate = null) => {
        if (!token) return; // 토큰이 없으면 요청하지 않음

        try {
            let url = "/post/list?page=0";
            if (selectedDate) {
                url += `&date=${selectedDate}`; // 선택된 날짜에 따른 필터링
            }

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched data:", data);

                // selectedDate를 기준으로 앞선 순서로 정렬
                const sortedPosts = data.content.sort(
                    (a, b) => new Date(a.eventStartDateTime) - new Date(b.eventStartDateTime)
                );

                setPosts(sortedPosts);
            } else {
                console.error("게시글 목록 가져오기 실패:", response.statusText);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const handleAddPost = async (subject, content, eventStartDateTime, eventLocation) => {
        if (!subject || !eventStartDateTime) {
            alert("제목과 날짜를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    subject,
                    content,
                    eventStartDateTime,
                    eventEndDateTime: new Date(
                        new Date(eventStartDateTime).getTime() + 2 * 60 * 60 * 1000
                    ).toISOString(),
                    eventLocation,
                }),
            });

            if (response.ok) {
                alert("게시글이 성공적으로 등록되었습니다.");
                await fetchPosts(); // 게시글 목록을 다시 가져와 업데이트
            } else {
                console.error("게시글 등록 실패:", response.statusText);
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 fetchPosts를 호출
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <TimelineContext.Provider value={{ posts, handleAddPost, fetchPosts }}>
            {children}
        </TimelineContext.Provider>
    );
};

export const useTimeline = () => useContext(TimelineContext);
