import React, { useState, useEffect, useContext } from 'react';
import './css/Introduce_com.css';
import BtnShort from '../main/BtnShort';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as introCom from '../../apis/resume/introCom'; // Import your API functions

const Introduce_com = () => {
  const { userInfo } = useContext(LoginContext);
  const userNo = userInfo ? userInfo.userNo : null;

  const [company, setCompany] = useState({
    comName: '',
    comCategory: '',
    comAddress: ''
  });
  const [comDetail, setComDetail] = useState({
    comBirth: '',
    comSize: '',
    comEmpCount: '',
    comSales: '',
    comRepresent: '',
    comContent: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await introCom.GetIntroCom(userNo);
        if (response.data) {
          console.log(response.data);
          setCompany(response.data.company || {});
          setComDetail(response.data.comDetail || {});

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

/*   const handleChange = (e) => {
    const { name, value } = e.target; //속성 name을 쓰는 value 가지고오는 거 
    setCompany((prevState) => ({ 
      ...prevState,
      [name]: value                   
    }));
    setComDetail((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }; */

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in company) {
      setCompany((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name in comDetail) {
      setComDetail((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      comName: company.comName,
      comCategory: company.comCategory,
      comAddress: company.comAddress,
      comBirth: comDetail.comBirth,
      comSize: comDetail.comSize,
      comEmpCount: comDetail.comEmpCount,
      comSales: comDetail.comSales,
      comRepresent: comDetail.comRepresent,
      comContent: comDetail.comContent,
    };
    

    try {
      if (isEditMode) {
        // 수정
        const response = await introCom.UpdateIntroCom({ userNo, formData });
        console.log('Update successful:', response);
      } else {
        // 등록
        const response = await introCom.InsertIntroCom({ userNo, formData });
        console.log('Insert successful:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div id='form'>
        <div className='btnShort'>
          <BtnShort btnShortText={isEditMode ? "수정" : "등록"} onClick={handleSubmit} />
        </div>
        {company && comDetail ? (
          <>
            <div>
              <input
                type="text"
                name="comName"
                id="comName"
                className="w-100 my-4 com-intro-title"
                placeholder='기업명을 작성해주세요'
                value={company.comName}
                onChange={handleChange}
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
                    value={comDetail.comBirth}
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
                  value={comDetail.comSize}
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
                    value={comDetail.comEmpCount}
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
                    value={comDetail.comSales}
                    onChange={handleChange}
                  />
                  <span>억</span>
                </div>
                <h4 className='introduceCom'>매출액</h4>
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
                  value={comDetail.comRepresent}
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
                  value={company.comCategory}
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
                value={company.comAddress}
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
                value={comDetail.comContent}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Introduce_com;
