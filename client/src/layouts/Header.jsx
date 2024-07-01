import React, { useContext } from 'react'
import './Header.css';
import { Link } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContextProvider'

const Header = () => {
    const { isLogin, roles,logout } = useContext(LoginContext);

    return (
        <div className='header'>
            <div className="header-wrap">
                <div className="logo">
                    <Link to="/">
                        <img className="logo-header" src="/img/logo.png" alt="기업로고" width="auto" />
                        <h1 className="logo-title">
                            <strong>FINDER</strong>
                        </h1>
                    </Link>
                </div>
                <div className="nav-menu no-wrap">
                    {isLogin && roles.isCompany && (
                        <>
                            <Link to="/company/introduce_com"><b>기업 정보</b></Link>
                            <Link to="/recruit/applied_jobs_user"><b>제출된 이력서</b></Link>
                            <Link to="/company/credit_com" id="paymentLink"><b>결제</b></Link>
                            <Link to="/user/update_user"><b>담당자 정보</b></Link>
                        </>
                    )}

                    {isLogin && roles.isUser && !roles.isCompany && (
                        <>
                            <Link to="/user/update_user"><b>내 정보</b></Link> 
                            <Link to="/recruit/cv_list_user"><b>이력서 관리</b></Link> 
                        </>
                    )}

                    {!isLogin ? (
                        <>
                            <Link to="/"><b>채용공고</b></Link> 
                            <Link to="/login"><b>로그인</b></Link> 
                        </>
                    ) : (
                        <>
                            <Link to="/"><b>채용공고</b></Link> 
                            {/* <form action="/logout" method="post" className='d-inline-block'> */}
                                <button className="logout-button" type="submit"onClick={logout}><b>로그아웃</b></button>
                            {/* </form> */}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header