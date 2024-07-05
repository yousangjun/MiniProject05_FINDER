import api from "../user/api";

// 나의 이력서 목록 조회
export const myCvList = (userNo, page) => api.get(`/resume/cv_list_user?userNo=${userNo}&page=${page}` )
