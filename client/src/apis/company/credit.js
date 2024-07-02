import api from '../user/api';

// 상품 정보 가져오기
export const getProduct = (productNo) => api.get(`/company/credit/credit_detail_com?productNo=${productNo}` );


// 미결제 주문 등록하기
export const insertOrder = ({ productNo, userNo }) => api.post('/company/credit/checkout', { productNo, userNo });

// 결제 상품 + 주문 목록 가져오기  
export const getCheckout = ({ productNo, orderNo }) => api.get(`/company/credit/credit_detail_com?productNo=${productNo}`);


// 회원 가입 
// export const join = (data) => api.post(`/users`, data)

// // 회원 정보 수정
// export const update = (data) => api.put(`/users`, data)

// // 회원 탈퇴
// export const remove = (userId) => api.delete(`/users/${userId}`)