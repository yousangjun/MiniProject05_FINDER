import api from '../user/api'

// 최근 채용공고 조회 안함
export const jobDetails = (recruitNo) => api.get(`/recruit/detail_jobs_user?recruitNo=${recruitNo}`)

// post 끝
export const postRecruit = (recruitPost) => api.post(`/recruit/post_jobs_com`, recruitPost)

export const getComToUserNo = (userNo) => api.get(`/recruit/post_jobs_com?userNo=${userNo}`)
// post 끝

// postread
export const readRecruit = (recruitNo) => api.get(`/recruit/post_jobs_read_com?recruitNo=${recruitNo}` )
export const deleteFile = (fileNo) => api.delete(`/file/${fileNo}`)
export const updateRecruit = (recruitPost) => api.put(`/recruit/post_jobs_read_com/update`,recruitPost)
export const deleteRecruit = (recruitNo) => api.delete(`/recruit/post_jobs_read_com/${recruitNo}`)


// ListRecruit
export const listRecruit = (comNo) => api.get(`/recruit/posted_jobs_com?comNo=${comNo}&page=1` )