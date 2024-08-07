import Swal from 'sweetalert2';
import api from './api';

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

// 사용자 정보
export const info = () => api.get(`/user/info`)

// 회원 가입 
export const join = (data) => api.post(`/users`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/users`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`)

// 아이디 체크
export const usernameCheck = (username) => {
    return api.get(`/user/check?userId=${username}`)
}