import React from 'react'
import './Footer.css';


const Footer = () => {
  return (
    <footer>
      <div className="footer-wrap d-flex flex-wrap flex-md-column flex-lg-row justify-content-center justify-content-lg-between align-items-md-center">
        <div className="footer-col1 my-3">
          <div></div>
          <div className="sns-icon-menu my-2">
            <i className="fa-brands fa-facebook fa-bounce fs-2"></i>
            <i className="fa-brands fa-linkedin fa-bounce fs-2"></i>
            <i className="fa-brands fa-youtube fa-bounce fs-2"></i>
            <i className="fa-brands fa-instagram fa-bounce fs-2"></i>
          </div>
          <div className="footer-col1-1 d-flex flex-wrap flex-md-column flex-lg-row align-items-md-center my-2">
            <div>
              <h1 className="fs-5">주소</h1>
              <p style={{ opacity: 0.7 }}>인천광역시 부평구 더조은 </p>
            </div>
            <div>
              <h1 className="fs-5">대표이사</h1>
              <p style={{ opacity: 0.7 }}>홍준범</p>
            </div>
            <div>
              <h1 className="fs-5">이메일</h1>
              <p style={{ opacity: 0.7 }}>redtiger@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="footer-col2 d-md-flex flex-column align-items-md-center my-3">
          <a href="/index" style={{ textDecoration: 'none', color: '#fff' }}>
            <h1><strong>FINDER</strong></h1>
            <img className="logo-footer" src="/img/logo_white_transparent.png" alt="" />
          </a>
        </div>
        <div className="footer-col3 my-3">
          <div></div>
          <p>&copy; 2023. Poly Inspiration Inc. All Rights Reserved.</p>
          <div className="footer-3-menu3">
            <h3 className="fs-5">사업자등록번호</h3>
            <p style={{ opacity: 0.7 }}>117-81-42415</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer