import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <nav className="col-12 col-sm-12 col-lg-3 sidebar">
          <div style={{ margin: '15px 0 45px 15px' }}>
            <strong style={{ fontSize: '24px' }}>마이페이지</strong>
          </div>
          <ul className="nav flex-column ul-header">
            <li className="li-header">
              <strong className="fs-5">기업 정보</strong>
            </li>
            <li className="nav-item">
              <a href="/company/introduce_com" className="job-item-link nav-link fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/home.png" alt="Home" />
                  </div>
                  <div>기업 소개</div>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="/user/update_user" className="job-item-link nav-link fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Registration.png" alt="Registration" />
                  </div>
                  <div>담당자 정보 수정</div>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="/company/credit/credit_list_com" className="job-item-link nav-link fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/CreditCard.png" alt="Credit Card" />
                  </div>
                  <div>결제 내역</div>
                </div>
              </a>
            </li>
          </ul>
          <ul className="nav flex-column ul-header">
            <li className="li-header">
              <strong className="fs-5">채용공고 관리</strong>
            </li>
            <li className="nav-item">
              <a href="/recruit/post_jobs_com" className="job-item-link nav-link fw-normal fs-6 token-end">
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
              </a>
            </li>
            <li className="nav-item">
              <a href="/recruit/posted_jobs_com" className="job-item-link nav-link fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/list.png" alt="List" />
                  </div>
                  <div>등록한 채용공고</div>
                </div>
              </a>
            </li>
          </ul>
          <ul className="nav flex-column ul-header">
            <li className="li-header">
              <strong className="fs-5">이력서 관리</strong>
            </li>
            <li className="nav-item">
              <a href="/recruit/recruit_list_com" className="job-item-link nav-link fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>제출된 이력서</div>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="/company/score_com" className="job-item-link nav-link fw-normal fs-6">
                <div style={{ backgroundColor: '#fff', borderRadius: '8px' }} className="d-flex gap-2 p-2 ps-2">
                  <div>
                    <img src="/img/Documents.png" alt="Documents" />
                  </div>
                  <div>AI 간편 평가</div>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      );
}

export default Sidebar