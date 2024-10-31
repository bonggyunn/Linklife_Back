import React from "react";
import { GrMapLocation } from "react-icons/gr";

const Event = ({ title, setTitle, eventContent, setEventContent, location, setLocation }) => {
  return (
    <>
      <div className="w-full h-full">
        <div
          className="w-full h-10"
          style={{
            borderBottom: "1px solid #cfcfcf",
            fontSize: "20px",
          }}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="행사명"
            value={title}
            className="w-full h-full p-1 focus:outline-none focus:bg-gray-50"
          />
        </div>

          <div
              className="flex items-center w-full h-10"
              style={{
                  borderBottom: "1px solid #cfcfcf",
                  fontSize: "15px",
              }}
          >
              <GrMapLocation className="w-5 h-5 mx-2"/>
              <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="위치 정보를 입력하세요"
              />
          </div>

          <div
              className="w-full h-52"
              style={{
                  borderBottom: "1px solid #cfcfcf",
              }}
          >
          <textarea
              onChange={(e) => setEventContent(e.target.value)}
            placeholder="행사 내용을 작성하세요"
            value={eventContent}
            className="w-full h-full p-1 focus:outline-none focus:bg-gray-50"
            style={{
              resize: "none",
              fontSize: "15px",
            }}
          ></textarea>
        </div>

        <div className="w-full h-10">
          <textarea
            placeholder="# 해시태그"
            className="w-full h-full p-1 focus:outline-none focus:bg-gray-50"
            style={{
              resize: "none",
              fontSize: "15px",
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Event;
