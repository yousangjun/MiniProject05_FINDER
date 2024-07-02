import api from "../user/api";

//기업 정보 가져오기
export const GetIntroCom = (userNo) => api.get(`/company/introduce_com?userNo=${userNo}` );

//기업 정보 등록하기
// export const InsertIntroCom = ({userNo}) => api.post(`/company/introduce_com`, {userNo})
export const InsertIntroCom = ({ userNo, formData }) => api.post(`/company/introduce_com`, { userNo, formData });

//기업 정보 수정하기
// export const UpdateIntroCom =  ({ userNo, formData }) => api.put(`/company/introduce_com`, { userNo, formData})
export const UpdateIntroCom = ({ userNo, formData }) => api.put(`/company/update_detail`, formData, { params: { userNo } });

// export const UpdateIntroCom = async ({ userNo, formData }) => {
//     console.log("Sending formData:", JSON.stringify(formData, null, 2));
//     try {
//       const response = await api.put(`/company/update_detail`, formData, { params: { userNo } });
//       return response;
//     } catch (error) {
//       console.error("Error from server:", error.response ? error.response.data : error.message);
//       throw error;
//     }
//   };