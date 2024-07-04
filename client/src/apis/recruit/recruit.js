import api from '../user/api'

export const jobDetails = (recruitNo) => api.get(`/recruit/detail_jobs_user?recruitNo=${recruitNo}`)

// 최근 채용공고
export const listNewRecruit = (newRecruitNos) => {
    const params = newRecruitNos.map(no => `recruitNos=${encodeURIComponent(no)}`).join('&');
    console.log(params);
    return api.get(`/recruit/new_jobs_user?${params}`);
  }

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


// applied
export const appliedRecruits = (userNo) => api.get(`/recruit/applied_jobs_user?userNo=${userNo}` )