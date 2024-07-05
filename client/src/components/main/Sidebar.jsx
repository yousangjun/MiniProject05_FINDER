import React, { useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { userInfo } = useContext(LoginContext);
  const { roles } = useContext(LoginContext);
  const userNo = userInfo ? userInfo.userNo : null;
  const navigate = useNavigate();




  const handleCreateCv = async (no) => {

    try {
      const response = await fetch(`/resume/cv_create_user?userNo=${no}`);
      const data = await response.json(); // 응답 데이터를 JSON 형식으로 파싱
      console.log(data, "response넘");
      navigate(`/resume/cvCreate_user/${data}`);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <nav className="col-12 col-sm-12 col-lg-3 sidebar1" style={{ boxShadow: '-4px 8px 20px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ margin: '15px 0 45px 15px' }}>
        <strong style={{ fontSize: '24px' }}>마이페이지</strong>
      </div>

      {roles.isCompany && (
        <>
          <ul className="nav flex-column ul-header1">
            <li className="li-header1">
              <strong className="fs-5">기업 정보</strong>
            </li>
            <li className="nav-item1">
              <Link to="/company/introduce_com" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/home.png" alt="Home" />
                  </div>
                  <div>기업 소개</div>
                </div>
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/user/update_user" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Registration.png" alt="Registration" />
                  </div>
                  <div>담당자 정보 수정</div>
                </div>
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/company/credit_list_com" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/CreditCard.png" alt="Credit Card" />
                  </div>
                  <div>결제 내역</div>
                </div>
              </Link>
            </li>
          </ul>
          <ul className="nav flex-column ul-header1">
            <li className="li-header1">
              <strong className="fs-5">채용공고 관리</strong>
            </li>
            <li className="nav-item1">
              <Link to="/recruit/post_jobs_com" className="job-item-link1 nav-link1 fw-normal fs-6 token-end">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex justify-content-between">
                  <div className="d-flex gap-2 p-2 ps-2">
                    <div>
                      <img src="/img/list.png" alt="List" />
                    </div>
                    <div>채용공고 등록</div>
                  </div>
                  <div className="d-flex gap-2 p-2">
                    <div>
                      <img src="/img/CreditScore.png" alt="Credit Score" style={{ width: '24px' }} />
                    </div>
                    <div>
                      {/* Replace server-side rendering logic with client-side logic if necessary */}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/recruit/posted_jobs_com" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/list.png" alt="List" />
                  </div>
                  <div>등록한 채용공고</div>
                </div>
              </Link>
            </li>
          </ul>
          <ul className="nav flex-column ul-header1">
            <li className="li-header1">
              <strong className="fs-5">이력서 관리</strong>
            </li>
            <li className="nav-item1">
              <Link to="/recruit/recruit_list_com" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>제출된 이력서</div>
                </div>
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/company/score_com" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>AI 간편 평가</div>
                </div>
              </Link>
            </li>
          </ul>
        </>
      )}
      {!roles.isCompany && roles.isUser && (
        <>
          <ul className="nav flex-column ul-header1">
            <li className="li-header1">
              <strong className="fs-5">내 정보</strong>
            </li>
            <li className="nav-item1">
              <Link to="/user/update_user" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Registration.png" alt="Registration" />
                  </div>
                  <div>내 정보 수정</div>
                </div>
              </Link>
            </li>
          </ul>
          <ul className="nav flex-column ul-header1">
            <li className="li-header1">
              <strong className="fs-5">채용공고 관리</strong>
            </li>
            <li className="nav-item1">
              <Link to="/recruit/applied_jobs_user" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/list.png" alt="List" />
                  </div>
                  <div>지원한 채용공고</div>
                </div>
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/recruit/new_jobs_user" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/list.png" alt="List" />
                  </div>
                  <div>최근 본 채용공고</div>
                </div>
              </Link>
            </li>
          </ul>
          <ul className="nav flex-column ul-header1">
            <li className="li-header1">
              <strong className="fs-5">이력서 관리</strong>
            </li>
            <li className="nav-item1">
              <Link to="/recruit/cv_list_user" className="job-item-link1 nav-link1 fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>나의 이력서</div>
                </div>
              </Link>
            </li>
            <li className="nav-item1">


              <Link to=""
                onClick={() => handleCreateCv(userNo)}
                className="job-item-link1 nav-link1 fw-normal fs-6"
              >
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>이력서 작성</div>
                </div>
              </Link>



              {/*               
              <Link to={`/resume/cvCreate_user/${cvNo}`} className="job-item-link1 nav-link1 fw-normal fs-6" onClick={() => handleCreateCv(userNo)}>
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>이력서 작성</div>
                </div>
              </Link> */}


            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Sidebar;
