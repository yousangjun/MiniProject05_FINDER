import React, { useState, useEffect, useContext } from 'react';
import './css/Introduce_com.css';
import BtnShort from '../main/BtnShort';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as introCom from '../../apis/resume/introCom'; // Import your API functions

const Introduce_com = () => {
  const { userInfo } = useContext(LoginContext);
  const userNo = userInfo ? userInfo.userNo : null;

  // 입력 양식 input
  const [comName, setComName] = useState('');
  const [comCategory, setComCategory] = useState('');
  const [comAddress, setComAddress] = useState('');
  const [comBirth, setComBirth] = useState(0);
  const [comSize, setComSize] = useState('');
  const [comEmpCount, setComEmpCount] = useState(0);
  const [comSales, setComSales] = useState(0);
  const [comRepresent, setComRepresent] = useState('');
  const [comContent, setComContent] = useState('');

  // 등록 수정 모드 전환
  const [isEditMode, setIsEditMode] = useState(false);


  // 데이터 요청
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await introCom.GetIntroCom(userNo);
        if (response.data) {
          console.log(response.data);
          // setCompany(response.data.company || {});
          // setComDetail(response.data.comDetail || {});
          const comData = response.data.company
          const comDetailData = response.data.comDetail

          setComName(comData.comName || '');
          setComCategory(comData.comCategory || '');
          setComAddress(comData.comAddress || '');
          setComBirth(comDetailData.comBirth || 0);
          setComSize(comDetailData.comSize || '');
          setComEmpCount(comDetailData.comEmpCount || 0);
          setComSales(comDetailData.comSales || 0);
          setComRepresent(comDetailData.comRepresent || '');
          setComContent(comDetailData.comContent || '');


          // isEditMode 플래그 설정
          setIsEditMode(response.data.company && response.data.comDetail);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, [userNo]); // Run effect when userNo changes

  // input 값 수시로 state에 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    const setState = {
      comName: setComName,      // comName 상태 설정
      comCategory: setComCategory,  // comCategory 상태 설정
      comAddress: setComAddress,    // comAddress 상태 설정
      comBirth: setComBirth,        // comBirth 상태 설정
      comSize: setComSize,          // comSize 상태 설정
      comEmpCount: setComEmpCount,  // comEmpCount 상태 설정
      comSales: setComSales,        // comSales 상태 설정
      comRepresent: setComRepresent,// comRepresent 상태 설정
      comContent: setComContent     // comContent 상태 설정
    };
    
    // 동적으로 상태 설정 함수를 찾고 호출
    if (setState[name]) {
      setState[name](value);
    }
  };


  // com / comdetail 모두 수정 가능
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      comName: comName,
      comCategory: comCategory,
      comAddress: comAddress,
      
      comBirth: comBirth,
      comSize: comSize,
      comEmpCount: comEmpCount,
      comSales: comSales,
      comRepresent: comRepresent,
      comContent: comContent,
    };

    try {
      const response = await introCom.UpdateIntroCom({ userNo, formData });
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // comdetail 만 등록
  const handleInsert = async (e) => {
    e.preventDefault();

      const formData = new FormData();
      formData.append('comBirth', comBirth || 0);
      formData.append('comSize', comSize || '');
      formData.append('comEmpCount', comEmpCount || 0);
      formData.append('comSales', comSales || 0);
      formData.append('comRepresent', comRepresent || '');
      formData.append('comContent', comContent || '');

      console.log(formData);

      try {
        const response = await introCom.InsertIntroCom({ userNo, formData });
        console.log('Insert successful:', response);
        setIsEditMode(true)
      } catch (error) {
        console.error('Error:', error);
      }

  };

  return (
    <>
      <div id='form'>
        <div className='btnShort'>
          {isEditMode ? (
            <BtnShort btnShortText="수정" onClick={handleUpdate} />
          ) : (
            <BtnShort btnShortText="등록" onClick={handleInsert} />
          )}
        </div>

         <div>
            <input
              type="text"
              name="comName"
              id="comName"
              className="w-100 my-4 com-intro-title"
              placeholder='기업명을 작성해주세요'
              value={comName}
              onChange={handleChange}
              readOnly={!isEditMode}
            />
          </div>
          <div className='row ComRow pt-4'>
            <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
              <img src="/img/연차1.png" alt="업력연차" className='introImg' />
              <div className='com-intro-input'>
                <input
                  type="text"
                  id='comBirth'
                  name='comBirth'
                  className="w-75 ComInput"
                  value={comBirth}
                  onChange={handleChange}
                />
                <span>년</span>
              </div>
              <h4 className='introduceCom'>업력연차</h4>
            </div>
            <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
              <img src="/img/대기업1.png" alt="기업규모" className='introImg' />
              <select
                name="comSize"
                id="comSize"
                className='com-intro-input'
                value={comSize}
                onChange={handleChange}
              >
                <option value="기업선택">기업선택</option>
                <option value="대기업">대기업</option>
                <option value="중견기업">중견기업</option>
                <option value="중소기업">중소기업</option>
              </select>
              <h4 className='introduceCom'>기업 규모</h4>
            </div>
            <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
              <img src="/img/사원수1.png" alt="사원수" className='introImg' />
              <div className='com-intro-input'>
                <input
                  type="text"
                  id='comEmpCount'
                  name='comEmpCount'
                  className="w-75 ComInput"
                  value={comEmpCount}
                  onChange={handleChange}
                />
                <span>명</span>
              </div>
              <h4 className='introduceCom'>사원 수</h4>
            </div>
            <div className="d-flex flex-column row-gap-3 col-3 align-items-center">
              <img src="/img/매출액1.png" alt="매출액" className='introImg' />
              <div className='com-intro-input'>
                <input
                  type="text"
                  id='comSales'
                  name='comSales'
                  className="w-75 ComInput"
                  value={comSales}
                  onChange={handleChange}
                />
                <span>억</span>
              </div>
              <h4 className='introduceCom'>매출액</h4>
            </div>
          </div>
          <div className="ComName mt-3 d-flex justify-content-between introduce-col2 mb-3">
            <div className="w-100">
              <label htmlFor="com_represent">대표명</label>
              <input
                type="text"
                className="com-intro-input"
                id='comRepresent'
                name='comRepresent'
                value={comRepresent}
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
                value={comCategory}
                onChange={handleChange}
                readOnly={!isEditMode}
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
              value={comAddress}
              onChange={handleChange}
              readOnly={!isEditMode}
            />
          </div>
          <div className="w-100 introduce-col4">
            <h5 className="introduceT w-100 py-2">기술소개</h5>
            <textarea
              name="comContent"
              id="comContent"
              placeholder='기업 소개글을 작성하시오'
              className="introduceT2 w-100 p-3 fs-5"
              value={comContent}
              onChange={handleChange}
            ></textarea>
          </div>
      </div>
    </>
  );
}

export default Introduce_com;
