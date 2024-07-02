import api from "../user/api";

//기업 정보 가져오기
export const GetIntroCom = (userNo) => api.get(`/company/introduce_com?userNo=${userNo}` );

//기업 정보 등록하기
export const InsertIntroCom = ({userNo}) => api.post(`/company/introduce_com`, {userNo})

//기업 정보 수정하기
export const UpdateIntroCom =  (formData, setFormData) => api.put(`/company/introduce_com`, {formData, setFormData})
