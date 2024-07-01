import api from "../user/api";

//기업 정보 가져오기
export const GetIntroCom = (ComNo) => api.get(`/company/introduce_com`, {params: {ComNo}})

//기업 정보 등록하기
export const InsertIntroCom = (formData, setFormData) => api.post(`/company/introduce_com`, formData, setFormData)

//기업 정보 수정하기
export const UpdateIntroCom =  (formData, setFormData) => api.put(`/company/introduce_com`, formData, setFormData)