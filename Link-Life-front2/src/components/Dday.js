import React from "react";

const Dday = () => {
  return (
    <>
      <div
        className="bg-white rounded-md shadow-md my-7 shadow-gray-400"
        style={{
          minHeight: "750px",
          width: "450px",
        }}
      >
        <div className="flex items-center"
        style={{
          width: "450px",
          height: "70px",
        }}
        >
          <h1
            className="text-3xl font-black m-7"
            style={{ color: "#858585", fontFamily: "Cooper" }}
          >
            <span
              className="text-color: #white text-4xl"
              style={{
                color: "white",
                marginRight: "5px",
                padding: "0px 10px 0px 10px",
                borderRadius: "50%",
                backgroundColor: "#2c9d1bac",
              }}
            >
              V
            </span>
            D - day
          </h1>
        </div>

        <div style={{
            width: '450px',
            height: '340px',
            padding: '10px 50px 10px 50px',
          }}
        >
          <div className='flex justify-between w-full h-16 pl-2 mb-4'>
            <div className='p-1'>
              <div className='text-lg font-bold'>기술고시 1차 시험</div>
              <div className='text-lg text-[#828282]'>2023.11.26(토)</div>
            </div>
            <div>
              <div className='flex items-center justify-center w-16 h-12 text-2xl font-bold text-orange-600'>D-10</div>
            </div>
          </div>
          <div className='flex justify-between w-full h-16 pl-2 mb-4'>
            <div className='p-1'>
              <div className='text-lg font-bold'>프로젝트 발표</div>
              <div className='text-lg text-[#828282]'>2023.11.30(목)</div>
            </div>
            <div>
              <div className='flex items-center justify-center w-16 h-12 text-2xl font-bold text-orange-600'>D-14</div>
            </div>
          </div>
          <div className='flex justify-between w-full h-16 pl-2 mb-4'>
            <div className='p-1'>
              <div className='text-lg font-bold'>결혼식</div>
              <div className='text-lg text-[#828282]'>2023.12.12(화)</div>
            </div>
            <div>
              <div className='flex items-center justify-center w-16 h-12 text-2xl font-bold text-orange-600'>D-26</div>
            </div>
          </div>
          <div className='flex justify-between w-full h-16 pl-2 mb-4'>
            <div className='p-1'>
              <div className='text-lg font-bold'>교회세례</div>
              <div className='text-lg text-[#828282]'>2023.12.24(일)</div>
            </div>
            <div>
              <div className='flex items-center justify-center w-16 h-12 text-2xl font-bold text-orange-600'>D-38</div>
            </div>
          </div>
          <div className='flex justify-between w-full h-16 pl-2 mb-4'>
            <div className='p-1'>
              <div className='text-lg font-bold'>SAFFY 결과 발표</div>
              <div className='text-lg text-[#828282]'>2023.12.25(월)</div>
            </div>
            <div>
              <div className='flex items-center justify-center w-16 h-12 text-2xl font-bold text-orange-600'>D-39</div>
            </div>
          </div>
        </div>







      </div>
    </>
  );
};

export default Dday;
