import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import userApi from '../apis/user/userApi';
import * as userAuth from '../apis/user/userAuth';

// 로그인 상태를 관리할 LoginContext 생성
export const LoginContext = createContext();

// LoginContextProvider 컴포넌트
const LoginContextProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [roles, setRoles] = useState({ isUser: false, isBand: false, isClub: false });
    const navigate = useNavigate();

    // 로그인 상태 체크 함수
    const loginCheck = async (isAuthPage = false) => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            console.log(`쿠키에 accessToken(jwt)이 없음`);
            return;
        }

        try {
            const response = await userAuth.userInfo();
            console.log(`리스폰` + response);
            console.log(`데이터` + data);
            const data = response.data;

            if (data === 'UNAUTHRIZED' || response.status === 401) {
                console.error(`accessToken (jwt)이 만료되었거나 인증에 실패하였습니다.`);
                return;
            }

            console.log(`accessToken (jwt) 토큰으로 사용자 인증정보`);
            loginSetting(data, accessToken);
        } catch (error) {
            console.error(`error : ${error}`);
            if (error.response) {
                console.log(`status : ${error.response.status}`);
            }
        }
    };

    // 로그인 함수
    const login = async (username, password, rememberId, rememberMe) => {
        if (rememberId) Cookies.set("rememberId", username);
        else Cookies.remove("rememberId");

        if (rememberMe) Cookies.set("rememberMe", username);
        else Cookies.remove("rememberMe");

        try {
            const response = await userAuth.login(username, password);
            const data = response.data;
            const status = response.status;
            const authorization = response.headers.authorization;
            const accessToken = authorization.replace("Bearer ", "");
            console.log(`accessToken : ` + accessToken);
            console.dir(`리스폰` + response);
            console.dir(`데이터` + data);

            if (status === 200) {
                Cookies.set("accessToken", accessToken);
                console.dir(`200아래 if 문` + data);
                await loginCheck();
                navigate("");
            }
        } catch (error) {
            console.error("로그인 에러:", error);
            if (error.response && error.response.status === 401) {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            } else {
                alert('로그인에 실패했습니다.');
            }
        }
    };

    // 로그아웃 함수
    const logout = () => {
        Cookies.remove("accessToken");
        setLogin(false);
        setUserInfo({});
        setRoles({ isUser: false, isBand: false, isClub: false });
        navigate('/liveBoard');
    };

    // 로그인 설정 함수
    const loginSetting = (userData, accessToken) => {
        const { username, authList, profileNo, phone, nickname, name } = userData;
        const roleList = authList.map((auth) => auth.auth);

        userApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        if (Cookies.get('rememberMe') != null) {
            Cookies.set("accessToken", accessToken, { expires: 7 });
        } else {
            Cookies.set("accessToken", accessToken);
        }

        setLogin(true);
        setUserInfo({ username, roleList, profileNo, phone, nickname, name });

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

        setRoles(updatedRoles);
    };

    useEffect(() => {
        loginCheck();
    }, []);

    const contextValue = {
        isLogin,
        userInfo,
        roles,
        login,
        logout,
        loginCheck
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;
