import api from '../user/api';

// 상품 정보 가져오기
export const getProduct = (productNo) => api.get(`/company/credit/credit_detail_com`, { params: { productNo } });



// 회원 가입 
// export const join = (data) => api.post(`/users`, data)

// // 회원 정보 수정
// export const update = (data) => api.put(`/users`, data)

// // 회원 탈퇴
// export const remove = (userId) => api.delete(`/users/${userId}`)