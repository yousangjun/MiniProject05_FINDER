import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div className='header'>
            <div className="header-wrap">
                <div className="logo">
                    <Link to="/">
                        <a>
                            <img className="logo-header" src="/img/logo.png" alt="기업로고" width="auto" />
                            <h1 className="logo-title">
                                <strong>FINDER</strong>
                            </h1>
                        </a>    
                    </Link>
                </div>
                <div className="nav-menu">

                    {/* 기업 권한 */}
                        <Link to="/credit"><a><b>기업 정보</b></a></Link>
                        <Link to="/company/resume"><a><b>제출된 이력서</b></a></Link>
                        <Link to="/credit" id="paymentLink"><a><b>결제</b></a></Link>
                        <Link to="/info"><a><b>담당자 정보</b></a></Link>

                    {/* 사용자 권한 */}
                        <Link to="/info"><a><b>내 정보</b></a></Link> 
                        <Link to="/user/resume"><a><b>이력서 관리</b></a></Link> 

                    {/* 비로그인 시 */}
                        <Link to="/"><a><b>채용공고</b></a></Link> 
                        <Link to="/login"><a><b>로그인</b></a></Link> 

                    {/* 로그인 시 */}
                    <form action="/logout" method="post">
                        <Link to="/"><a><b>채용공고</b></a></Link> 
                        <button className="logout-button" type="submit"><b>로그아웃</b></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Header
