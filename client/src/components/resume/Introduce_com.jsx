import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Introduce_com.css';
import BtnShort from '../main/BtnShort';

const Introduce_com = () => {
  const [formData, setFormData] = useState({  // 임시데이터
    comName: 'asd',
    comBirth: 'asd',
    comSize: '기업선택',
    comEmpCount: 'asd',
    comSales2: 'asd',
    comRepresent: 'asd',
    comCategory: 'asd',
    comAddress: 'asd',
    comContent: 'asd'
  });

  // false : 등록버튼, true : 수정버튼
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // 데이터 가져오기
    axios.get('/company/get_detail')
      .then(response => {
        if (response.data) {
          setFormData(response.data);
          setIsEditMode(true);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // 폼(input) 요소에서 발생 state 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // post 요청(등록) , put 요청(수정)
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode ? '/company/update_detail' : '/company/insert_detail';
    const method = isEditMode ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      alert(isEditMode ? '수정이 완료되었습니다.' : '등록이 완료되었습니다.');
    })
    .catch(error => {
      console.error('There was an error submitting the form!', error);
    });
  };

  return (
    <>
      <form id='form' onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='btnShort'>
          <BtnShort btnShortText={isEditMode ? "수정" : "등록"} />
        </div>
        <div>
          <input
            type="text"
            name="comName"
            id="comName"
            className="w-100 my-4 com-intro-title"
            placeholder='기업명을 작성해주세요'
            value={formData.comName}
            onChange={handleChange}
          />
        </div>
        <div className='row ComRow pt-4'>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/연차1.png" alt="업력연차" />
            <div className='com-intro-input'>
              <input
                type="text"
                id='comBirth'
                name='comBirth'
                className="w-75 ComInput"
                value={formData.comBirth}
                onChange={handleChange}
              />
              <span>년</span>
            </div>
            <h4>업력연차</h4>
          </div>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/대기업1.png" alt="기업규모" />
            <select
              name="comSize"
              id="comSize"
              className='com-intro-input'
              value={formData.comSize}
              onChange={handleChange}
            >
              <option value="기업선택">기업선택</option>
              <option value="대기업">대기업</option>
              <option value="중견기업">중견기업</option>
              <option value="중소기업">중소기업</option>
            </select>
            <h4>기업 규모</h4>
          </div>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/사원수1.png" alt="사원수" />
            <div className='com-intro-input'>
              <input
                type="text"
                id='comEmpCount'
                name='comEmpCount'
                className="w-75 ComInput"
                value={formData.comEmpCount}
                onChange={handleChange}
              />
              <span>명</span>
            </div>
            <h4>사원 수</h4>
          </div>
          <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
            <img src="/img/매출액1.png" alt="매출액" />
            <div className='com-intro-input'>
              <input
                type="text"
                id='ComSales2'
                name='ComSales2'
                className="w-75 ComInput"
                value={formData.ComSales2}
                onChange={handleChange}
              />
              <span>억</span>
            </div>
            <h4>매출액</h4>
          </div>
        </div>
        <div className="ComName d-flex justify-content-between introduce-col2 mb-3">
          <div className="w-100">
            <label htmlFor="com_represent">대표명</label>
            <input
              type="text"
              className="com-intro-input"
              id='comRepresent'
              name='comRepresent'
              value={formData.comRepresent}
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <label htmlFor="com_category">업종</label>
            <input
              type="text"
              className="com-intro-input"
              id='comCategory'
              name='comCategory'
              placeholder='e.g) 소프트웨어 개발'
              value={formData.comCategory}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="introduce-col3">
          <label htmlFor="com_address">주소</label>
          <input
            type="text"
            className="com-intro-input"
            name="comAddress"
            id="comAddress"
            placeholder='e.g) **시 **구 **로 **...'
            value={formData.comAddress}
            onChange={handleChange}
          />
        </div>
        <div className="w-100 introduce-col4">
          <h5 className="introduceT w-100 py-2">기술소개</h5>
          <textarea
            name="comContent"
            id="comContent"
            placeholder='기업 소개글을 작성하시오'
            className="introduceT2 w-100 p-3 fs-5"
            value={formData.comContent}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </>
  );
}

export default Introduce_com;
