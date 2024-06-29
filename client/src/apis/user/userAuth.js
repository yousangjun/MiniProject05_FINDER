import userApi from './userApi';
import { Cookies } from 'react-cookie'

const cookies = new Cookies();

// 로그인
export const login = (username, password) => userApi.post(`/login?username=${username}&password=${password}`)

// export const login = (username, password) => {
//     return userApi.post('/login', { username, password });
// }

// 사용자 정보
export const userInfo = () => {
    return userApi.get(`/users/info`)
}

// 회원가입
export const join = (user, headers) => {
    return userApi.post(`/users`, user, headers)
}
// export const join = (users) => {
//     return userApi.post(`/api/user`, users, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }j
//     })
// }

// 회원 정보 수정
export const update = (user, headers) => {
    return userApi.put(`/users`, user, headers)
}
// export const update = (users) => {
//     return userApi.put(`/api/user`, users, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
// }

// 아이디 중복검사
export const usernameCheck = (username) => {
    return userApi.get(`/api/user/getLoginIdDup?username=${username}`)
}

// 닉네임 중복검사
export const nicknameCheck = (nickname) => {
    return userApi.get(`/api/user/getNicknameDup?nickname=${nickname}`)
}

// 핸드폰 중복검사
export const phoneCheck = (phone) => {
    return userApi.get(`/api/user/getPhoneDup?phone=${phone}`)
}

// 쿠키
export const getCookieValue = (cookieName) => {
    return cookies.get(cookieName)
}
