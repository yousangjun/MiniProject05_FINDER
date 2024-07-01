import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import './css/Login.css'

const Login = () => {
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [rememberid, setRememberid] = useState(false)
  const [rememberme, setRememberme] = useState(false)
  const [isCompany, setIsCompany] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // try {
    //   const response = await axios.post('/login', {
    //     userId,
    //     userPw,
    //     rememberid,
    //     rememberme,
    //     isCompany
    //   })
    //   console.log(response.data)
    // } catch (error) {
    //   console.error('Login failed:', error)
    // }
  }

  const switchUser = () => setIsCompany(false)
  const switchCom = () => setIsCompany(true)

  return (
    <>
        <div className="register-form row flex-column row-gap-2 align-items-center m-auto">

        <div className="row login-which mb-4">
              <div className="col-md-6 text-center p-0">
                  <button 
                    id="login-user" 
                    className={isCompany ? 'login-com' : 'login-user'} 
                    onClick={switchUser}
                  >
                    <strong>일반 회원</strong>
                  </button>
              </div>
              <div className="col-md-6 text-center p-0">
                  <button 
                    id="login-com" 
                    className={isCompany ? 'login-user' : 'login-com'} 
                    onClick={switchCom}
                  >
                    <strong>기업 회원</strong>
                  </button>
              </div>
          </div>

          <div className="login-title">
              <h2 style={{textAlign: 'center'}}>
                <strong id="login-title">{isCompany ? '기업 로그인' : '일반 로그인'}</strong>
              </h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form row flex-column row-gap-2 mb-3">

              <input type="text" className='id' id="id" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디" required />
              <input type="password" className='pw' id="password" value={userPw} onChange={(e) => setUserPw(e.target.value)} placeholder="비밀번호" required />

              <button type="submit" className="btn-long w-100 login-btn">
                  로그인
              </button>

              <div className="d-flex">
                  <div className="w-100 d-flex">
                      <input type="checkbox" id="remember-id" checked={rememberid} onChange={(e) => setRememberid(e.target.checked)} className='keep' />
                      <label htmlFor="remember-id" className="w-100">아이디 저장</label>
                  </div>
                  <div className="w-100 d-flex">
                      <input type="checkbox" id="remember-me" checked={rememberme} onChange={(e) => setRememberme(e.target.checked)} className='keep' />
                      <label htmlFor="remember-me" className="w-100">자동 로그인</label>
                  </div>
              </div>

          </form>

          <div className="row find-id-password">
            <div className="col-md-6 text-center">
              <Link to={isCompany ? '/join_com' : '/join_user'} id="join" className='joinUser'>
                <strong>{isCompany ? '기업 회원가입' : '일반 회원가입'}</strong>
              </Link>
            </div>
            <div className="col-md-6 text-center">
              <Link to={isCompany ? '/find_com' : '/find_user'} id="find" className='findUser'>
                {isCompany ? '기업 아이디/비밀번호 찾기' : '일반 아이디/비밀번호 찾기'}
              </Link>
            </div>
          </div>

          <hr/>
          <p style={{ textAlign: 'center'}}>or continue with</p>

          <div className="social-login row flex-column row-gap-3">
              <Link to="/oauth2/authorization/kakao">
                  <img src="/img/kakao_login_large.png" className='kakao' alt="카카오 로그인" />
              </Link>
          </div>

          </div>
    </>
  )
}

export default Login