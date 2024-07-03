import api from '../user/api';

// 상품 정보 가져오기
export const getProduct = (productNo, userNo) => api.get(`/company/credit/credit_detail_com?productNo=${productNo}&userNo=${userNo}`);


// 미결제 주문 등록하기
export const insertOrder = ({ productNo, userNo }) => api.post('/company/credit/checkout', { productNo, userNo });

// 결제 상품 + 주문 목록 가져오기  
export const getCheckout = ({ productNo, orderNo, userNo }) => api.get(`/company/credit/checkout?productNo=${productNo}&orderNo=${orderNo}&userNo=${userNo}`);

// 결제 등록하기 + 주문 갱신하기
export const insertCredit = (orderCreditDTO) => api.post('/company/credit/process', orderCreditDTO );

// 결제 완료 화면 데이터 가져오기  
export const getSuccess = ({ productNo, orderNo, userNo }) => api.get(`/company/credit/success?productNo=${productNo}&orderNo=${orderNo}&userNo=${userNo}`);



// 회원 가입 
// export const join = (data) => api.post(`/users`, data)

// // 회원 정보 수정
// export const update = (data) => api.put(`/users`, data)

// // 회원 탈퇴
// export const remove = (userId) => api.delete(`/users/${userId}`)