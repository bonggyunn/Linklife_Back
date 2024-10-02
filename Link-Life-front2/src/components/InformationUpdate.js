import React from 'react'

const InfromationUpdate = () => {
  return (
    <>
      <div className='w-full'
        style={{
          minHeight:'1000px', // 배경 크기(최소 높이)
        }}
      >
        <div className='py-12 px-11'>
          <h1 className='text-3xl font-bold text-black'>개인정보 수정</h1>
        </div>
        <form>
          <fieldset
          style={{
            width:'615px', // 배경이미지 크기(너비)
            height:'710px', // 배경이미지 크기(높이)
            borderRadius: '10px',
            border: '1px solid #757575',
            boxShadow: '0px 4px 4px 0px #757575',
            marginLeft: '44px',
          }}
          >
            {/* 1. 이름 */}
            <div className='px-16 py-4'>
              <p className='font-semibold text-right'>* 모든 정보는 필수입력입니다</p>
              <p className='font-bold'>이름</p>
              <input type="text" placeholder='이름을 입력해주세요' className='px-3 py-2 w-80 focus:outline-green-800'
              style={{
                // border: 'none',
                // borderBottom: '1px solid #757575',
                borderRadius: '10px',
                border: '1px solid #757575',
                width: '485px',
                height: '45px',
              }}
              />
            </div>

            {/* 2. 휴대전화 */}
            <div className='px-16 py-4'>
              <p className='font-bold'>휴대전화</p>
              <input type="text" placeholder='숫자만 입력해주세요' className='px-3 py-2 w-80 focus:outline-green-800'
              style={{
                // border: 'none',
                // borderBottom: '1px solid #757575',
                borderRadius: '10px',
                border: '1px solid #757575',
                width: '315px',
                height: '45px',
              }}
              />
              <button className='text-white bg-green-800 hover:bg-green-900'
              style={{
                borderRadius: '10px',
                // border: '1px solid #265136',
                width: '155px',
                height: '45px',
                marginLeft: '15px',
              }}
              >인증번호 발송</button>
            </div>

            {/* 3. 이메일 */}
            <div className='px-16 py-4'>
              <p className='font-bold'>이메일</p>
              <input type="text" placeholder='예)linklife@gmail.com' className='px-3 py-2 w-80 focus:outline-green-800'
              style={{
                // border: 'none',
                // borderBottom: '1px solid #757575',
                borderRadius: '10px',
                border: '1px solid #757575',
                width: '315px',
                height: '45px',
              }}
              />
              <button className='text-white bg-green-800 hover:bg-green-900'
              style={{
                borderRadius: '10px',
                // border: '1px solid #265136',
                width: '155px',
                height: '45px',
                marginLeft: '15px',
              }}
              >중복확인</button>
            </div>

            {/* 4. 아이디 */}
            <div className='px-16 py-4'>
              <p className='font-bold'>아이디</p>
              <input type="text" className='px-3 py-2 w-80 focus:outline-green-800'
              style={{
                // border: 'none',
                // borderBottom: '1px solid #757575',
                borderRadius: '10px',
                border: '1px solid #757575',
                width: '315px',
                height: '45px',
              }}
              />
              <button className='text-white bg-green-800 hover:bg-green-900'
              style={{
                borderRadius: '10px',
                // border: '1px solid #265136',
                width: '155px',
                height: '45px',
                marginLeft: '15px',
              }}
              >중복확인</button>
              <p className='py-1 text-sm font-thin'>*6~13자의 영문과 숫자 조합으로 작성해주세요</p>
            </div>


            {/* 5. 비밀번호 */}
            <div className='px-16 py-4'>
              <p className='font-bold'>비밀번호</p>
              <input type="password" className='px-3 py-2 w-80 focus:outline-green-800'
              style={{
                // border: 'none',
                // borderBottom: '1px solid #757575',
                borderRadius: '10px',
                border: '1px solid #757575',
                width: '485px',
                height: '45px',
              }}
              />
              <p className='py-1 text-sm font-thin'>*6~13자의 영문, 숫자, 특수문자의 조합으로 작성해주세요</p>
            </div>

            {/* 6. 비밀번호 확인 */}
            <div className='px-16 py-4'>
              <p className='font-bold'>비밀번호 확인</p>
              <input type="password" className='px-3 py-2 w-80 focus:outline-green-800'
              style={{
                // border: 'none',
                // borderBottom: '1px solid #757575',
                borderRadius: '10px',
                border: '1px solid #757575',
                width: '485px',
                height: '45px',
              }}
              />
            </div>
          </fieldset>
          <div className='flex justify-center py-4'
            style={{
              width:'615px', // 배경이미지 크기(너비)
              height:'80px', // 배경이미지 크기(높이)
              marginLeft: '44px',
            }}
          >
            <button className='text-green-800 bg-gray-100 hover:bg-gray-200'
                style={{
                  borderRadius: '10px',
                  // border: '1px solid #265136',
                  fontWeight: 'bold',
                  width: '240px',
                  height: '45px',
                }}
                >취소</button>
            <button className='text-white bg-green-800 hover:bg-green-900'
                style={{
                  borderRadius: '10px',
                  // border: '1px solid #265136',
                  fontWeight: 'bold',
                  width: '240px',
                  height: '45px',
                  marginLeft: '15px',
                }}
                >등록</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default InfromationUpdate
