import React from 'react'

import './css/Introduce_com.css'
import BtnShort from '../main/BtnShort'

const Introduce_com = () => {

  return (
    <>
      <form id='form' method='POST' encType='multipart/form-data' action="/company/insert_detail">
        <div className='btnShort'>
          <BtnShort btnShortText={"수정"} />
        </div>
        <div>
          <input type="text" name="comName" id="comName" className="w-100 my-4 com-intro-title"
            placeholder='기업명을 작성해주세요' />
        </div>
        <div className='row ComRow pt-4'>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/연차1.png" alt="업력연차" />
            <div className='com-intro-input'>
              <input type="text" id='comBitrh' name='comBitrh' className="w-75 ComInput" />
              <span>년</span>
            </div>
            <h4 className='introduceCom'>업력연차</h4>
          </div>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img className='introImg' src="/img/대기업1.png" alt="기업규모" />
            <select name="comSize" id="comSize" className='com-intro-input'>
              <option value="기업선택" aria-readonly="true">기업선택</option>
              <option value="대기업">대기업</option>
              <option value="중견기업">중견기업</option>
              <option value="중소기업">중소기업</option>
            </select>
            <h4 className='introduceCom'>기업 규모</h4>
          </div>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/사원수1.png" alt="사원수" />
            <div className='com-intro-input'>
              <input type="text" id='comEmpCount' name='comEmpCount' className="w-75 ComInput" />
              <span>명</span>
            </div>
            <h4 className='introduceCom'>사원 수</h4>
          </div>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/매출액1.png" alt="매출액" />
            <div className='com-intro-input'>
              <input type="text" id='ComSales2' name='ComSales2' className="w-75 ComInput" />
              <span>억</span>
            </div>
            <h4 className='introduceCom'>매출액</h4>
          </div>
        </div>
        <div className="ComName d-flex justify-content-between introduce-col2 mb-3">
          <div className="w-100">
            <label htmlFor="com_represent">대표명</label>
            <input type="text" className="com-intro-input" id='comRepresent' name='comRepresent' />
          </div>
          <div className="w-100">
            <label htmlFor="com_category">업종</label>
            <input type="text" className="com-intro-input" id='comCategory' name='comCategory' placeholder='e.g) 소프트웨어 개발' />
          </div>
        </div>
        <div className="introduce-col3">
          <label htmlFor="com_address">주소</label>
          <input type="text" className="com-intro-input" name="comAddress" id="comAddress" placeholder='e.g) **시 **구 **로 **...' />
        </div>
        <div className="w-100 introduce-col4">
          <h5 className="introduceT w-100 py-2">기술소개</h5>
          <textarea name="comContent" id="comContent" placeholder='기업 소개글을 작성하시오'
            className="introduceT2 w-100 p-3 fs-5"></textarea>
        </div>
      </form>
    </>
  )
}

export default Introduce_com