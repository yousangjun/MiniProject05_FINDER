import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            
            <div class="header-wrap">
                <div class="logo">
                    <Link to="/">
                        <img class="logo-header" src="/img/logo.png" alt="기업로고" width="auto" />
                        <h1 class="logo-title">
                            <strong>FINDER</strong>
                        </h1>
                    </Link>
                </div>
                <div class="nav-menu">
                        <input type="hidden" name="accessOrder" id="accessOrder" />
                        <input type="hidden" name="remainQuantity" id="remainQuantity" />
                        <input type="hidden" name="expirationDate" id="expirationDate" />
                        <input type="hidden" name="currentDate" id="currentDate" />
                        <input type="hidden" name="userNo" id="userNo" />

                        {/* 기업 권한 */}
                        <Link to="/credit"><b>기업 정보</b></Link>
                        <Link to="/company/resume"><b>제출된 이력서</b></Link>

                        <Link to="/credit" id="paymentLink"><b>결제</b></Link>
                        <Link to="/info"><b>담당자 정보</b></Link>

                        {/* 사용자 권한 */}
                        <Link to="/info"><b>내 정보</b></Link> 
                        <Link to="/user/resume"><b>이력서 관리</b></Link> 


                        <Link to="/"><b>채용공고</b></Link> 
                        <Link to="/login"><b>로그인</b></Link> 

                        <form action="/logout" method="post">
                            <Link to="/"><b>채용공고</b></Link> 
                            <button class="logout-button" type="submit"><b>로그아웃</b></button>
                        </form>
                </div>
            </div>

        </div>
    )
}

export default Header