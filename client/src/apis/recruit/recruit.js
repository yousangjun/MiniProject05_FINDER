import api from '../user/api'

export const jobDetails = (recruitNo, userNo) => api.get(`/recruit/detail_jobs_user?recruitNo=${recruitNo}&userNo=${userNo}`)