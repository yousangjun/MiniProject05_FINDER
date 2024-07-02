import api from '../user/api'

export const jobDetails = (recruitNo, userNo) => api.get(`/recruit/detail_jobs_user?recruitNo=${recruitNo}&userNo=${userNo}`)

export const postRecruit = (recruitPost) => api.post(`/recruit/post_jobs_com`, recruitPost)

export const getComToUserNo = (userNo) => api.get(`/recruit/post_jobs_com?userNo=${userNo}`)