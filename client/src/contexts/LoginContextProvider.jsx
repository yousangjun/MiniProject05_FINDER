import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import userApi from '../apis/user/userApi';
import * as userAuth from '../apis/user/userAuth';

// 로그인 상태를 관리할 LoginContext 생성
export const LoginContext = createContext();

// LoginContextProvider 컴포넌트
const LoginContextProvider = ({ children }) => {
    // 상태 정의
    const [isLogin, setLogin] = useState(false); // 로그인 상태
    const [userInfo, setUserInfo] = useState({}); // 사용자 정보
    const [roles, setRoles] = useState({ isUser: false, isBand: false, isClub: false }); // 권한 정보
    const [rememberId, setRememberId] = useState(false); // 아이디 저장 여부
    const [rememberMe, setRememberMe] = useState(false); // 자동 로그인 여부
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 사용

    // 로그인 상태 체크 함수
    const loginCheck = async (isAuthPage = false) => {
        // 쿠키에서 accessToken 가져오기
        const accessToken = Cookies.get("accessToken");

        // accessToken이 없는 경우 처리
        if (!accessToken) {
            console.log(`쿠키에 accessToken(jwt)이 없음`);
            return;
        }

        let response; // response 변수 선언

        try {
            // 사용자 정보 요청
            response = await userAuth.userInfo();
            const data = response.data;
            console.log(`data : ${data}`);

            // 인증 실패 시 처리
            if (data === 'UNAUTHRIZED' || response.status === 401) {
                console.error(`accessToken (jwt) 이 만료되었거나 인증에 실패하였습니다.`);
                return;
            }

            // 인증 성공 시 로그인 설정 함수 호출
            console.log(`accessToken (jwt) 토큰으로 사용자 인증정보`);
            loginSetting(data, accessToken);

        } catch (error) {
            // 오류 처리
            console.error(`error : ${error}`);
            if (response) {
                console.log(`status : ${response.status}`);
            }
            return;
        }
    }

    // 로그인 함수
    const login = async (username, password, rememberId, rememberMe) => {
        // 아이디 저장 처리
        if (rememberId) Cookies.set("rememberId", username);
        else Cookies.remove("rememberId");

        // 자동 로그인 처리
        if (rememberMe) Cookies.set("rememberMe", username);
        else Cookies.remove("rememberMe");

        try {
            // 로그인 요청 및 처리
            const response = await userAuth.login(username, password);
            const data = response.data;
            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", "");

            // 로그인 성공 시
            if (status === 200) {
                Cookies.set("accessToken", accessToken); // accessToken 쿠키에 저장
                await loginCheck(); // 로그인 상태 체크
                navigate("/liveBoard"); // 라이브보드 페이지로 이동
            }

        } catch (error) {
            // 로그인 실패 처리
            console.error("로그인 에러:", error);
            if (error.response && error.response.status === 401) {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            } else {
                alert('로그인에 실패했습니다.');
            }
        }
    }

    // 로그아웃 함수
    const logout = () => {
        navigate('/liveBoard'); // 로그아웃 시 라이브보드 페이지로 이동
    }

    // 로그인 설정 함수
    const loginSetting = (userData, accessToken) => {
        const { username, authList, profileNo, phone, nickname, name } = userData;
        const roleList = authList.map((auth) => auth.auth);

        userApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // rememberMe 쿠키 여부에 따라 accessToken 설정
        if (Cookies.get('rememberMe') != null) {
            Cookies.set("accessToken", accessToken, { expires: 7 });
        } else {
            Cookies.set("accessToken", accessToken);
        }

        // 로그인 상태 설정
        setLogin(true);

        // 사용자 정보 설정
        const updatedUserInfo = { username, roleList, profileNo, phone, nickname, name }
        setUserInfo(updatedUserInfo);

        // 권한 정보 설정
        const updatedRoles = { isUser: false, isBand: false, isClub: false };

        roleList.forEach((role) => {
            switch (role) {
                case 'ROLE_USER':
                    updatedRoles.isUser = true;
                    break;
                case 'ROLE_BAND':
                    updatedRoles.isBand = true;
                    break;
                case 'ROLE_CLUB':
                    updatedRoles.isClub = true;
                    break;
                default:
                    break;
            }
        });

        // 권한 정보 설정
        setRoles(updatedRoles);
    }

    // 컴포넌트 마운트 시 로그인 상태 체크
    useEffect(() => {
        loginCheck(); // 컴포넌트가 마운트될 때 로그인 상태 체크 실행
    }, []);

    // Context 값 설정
    const contextValue = {
        isLogin,
        userInfo,
        roles,
        login,
        logout,
        loginCheck
    };

    // LoginContextProvider 컴포넌트 반환
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider; // LoginContextProvider 컴포넌트 내보내기
