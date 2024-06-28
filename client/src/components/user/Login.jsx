import React from 'react'
import './css/Login.css'

const Login = () => {
  return (
    <>
        <div className="register-form row flex-column row-gap-2 align-items-center m-auto">

          <div className="row login-which mb-4">
            {/*  onClick={switchUser}, onClick={switchCom}가 있었음 */}
              <div className="col-md-6 text-center p-0">
                  <button id="login-user" className="login-user"><strong>일반 회원</strong></button>
              </div>
              <div className="col-md-6 text-center p-0">
                  <button id="login-com" className="login-com" ><strong>기업 회원</strong></button>
              </div>
          </div>

          <div className="login-title">
              <h2  style={{textAlign: 'center'}}><strong id="login-title">로그인</strong></h2>
          </div>

          <form action="/login" method="post" className="login-form row flex-column row-gap-2 mb-3">
              {/* CSRF TOKEN 있었음*/}

              <input type="text" className='id' id="id" name="userId" placeholder="아이디" required />
              <input type="password" className='pw' id="password" name="userPw" placeholder="비밀번호" required />

              <button type="submit" className="btn-long w-100 login-btn">
                  로그인
              </button>

              <div className="d-flex">
                  <div className="w-100 d-flex">
                      <input type="checkbox" id="remember-id" name="remember-id" className='keep' />
                      <label htmlFor="remember-id" className="w-100">아이디 저장</label>
                  </div>
                  <div className="w-100 d-flex">
                      <input type="checkbox" id="remember-me" name="remember-me" className='keep' />
                      <label htmlFor="remember-me" className="w-100">자동 로그인</label>
                  </div>
              </div>

          </form>

          <div className="row find-id-password">
            <div className="col-md-6 text-center">
              {/* <Link to='/user/join_user' id="join" className='joinUser'><strong>가입</strong></Link> */}
              <a href='/user/join_user' id="join" className='joinUser'><strong>회원가입</strong></a>
            </div>
            <div className="col-md-6 text-center">
              {/* <Link to='/user/find_user' id="find" className='findUser'>아이디/비밀번호 찾기</Link> */}
              <a href='/user/find_user' id="find" className='findUser'>아이디/비밀번호 찾기</a>
            </div>
          </div>

          <hr/>
          <p style={{ textAlign: 'center'}}>or continue with</p>

          <div className="social-login row flex-column row-gap-3">
              {/* 소셜 로그인 버튼 */}
              <a href="/oauth2/authorization/kakao">
                  <img src="/img/kakao_login_large.png" className='kakao' alt="카카오 로그인" />
              </a>
          </div>

          </div>
    </>
  )
}

export default Login