import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './css/Login.css';

const Login = ({ sets }) => {
  const { login } = useContext(LoginContext);
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    // 세션 스토리지에서 아이디를 가져옴
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      sets.setUsername(savedUsername);
    }
  }, [sets]);

  const onLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.userId.value; // 폼 요소의 이름을 통해 값 가져오기
    const password = form.userPw.value;

    // 로그인 로직 실행
    login(username, password, sets.rememberId, sets.rememberMe);

    // 로그인 성공 시 세션 스토리지에 아이디 저장
    if (sets.rememberId) {
      sessionStorage.setItem('username', username);
    } else {
      sessionStorage.removeItem('username');
    }
  };

  const switchUser = () => setIsCompany(false);
  const switchCom = () => setIsCompany(true);

  return (
    <>
      <div className="register-form-login row flex-column row-gap-2 align-items-center m-auto">
        <div className="row login-which mb-4">
          <div className="col-md-6 text-center p-0">
            <button id="login-user" className={isCompany ? 'login-com' : 'login-user'} 
              onClick={switchUser} >
              <strong>일반 회원</strong>
            </button>
          </div>
          <div className="col-md-6 text-center p-0">
            <button id="login-com" className={isCompany ? 'login-user' : 'login-com'} 
              onClick={switchCom} >
              <strong>기업 회원</strong>
            </button>
          </div>
        </div>
        <div className="login-title">
          <h2 style={{textAlign: 'center'}}>
            <strong id="login-title">{isCompany ? '기업 로그인' : '일반 로그인'}</strong>
          </h2>
        </div>
        <form id="loginForm" onSubmit={(e) => onLogin(e)} className="login-form row flex-column row-gap-2 mb-3">
          {/* 아이디 */}
          <input type="text" className='id w-100' id="id" name="userId" placeholder="아이디"
            required autoComplete="off"
            value={sets.username} // 사용자가 입력한 값
            onChange={(e) => {
              sets.setUsername(e.target.value); // 상태를 업데이트 하는 함수
            }}
          />
          {/* 비밀번호 */}
          <input type="password" className='pw w-100' id="password" name="userPw" placeholder="비밀번호"
            required autoComplete="off"
            value={sets.password}
            onChange={(e) => {
              sets.setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn-long w-100 login-btn"> 로그인 </button>
          <div className="d-flex">
            <div className="w-100 d-flex">
              {/* 아이디 저장 */}
              <input type="checkbox" id="remember-id" name="remember-id"
                className='keep' checked={sets.rememberId} // 체크상태를 담당
                onChange={(e) => { // 사용자가 체크하면 업데이트
                  sets.setRememberId(e.target.checked);
                }} />
              <label htmlFor="remember-id" className="w-100">아이디 저장</label>
            </div>
            <div className="w-100 d-flex">
              {/* 자동 로그인 */}
              <input type="checkbox" id="remember-me" name="remember-me"
                className='keep' checked={sets.rememberMe}
                onChange={(e) => {
                  sets.setRememberMe(e.target.checked);
                }}/>
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
            <Link to={isCompany ? '/com/find_com' : '/user/find_user'} id="find" className='findUser'>
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
  );
}

export default Login;
