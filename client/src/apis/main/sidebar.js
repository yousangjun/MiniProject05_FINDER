import api from '../user/api';

// 남은 채용공고 등록횟수(remainQuantity) 가져오기
export const getOrder = (userNo) => api.get(`/sidebar?userNo=${userNo}`);
