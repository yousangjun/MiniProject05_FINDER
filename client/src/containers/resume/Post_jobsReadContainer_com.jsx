import React from 'react'
import Post_jobs_com from '../../components/resume/Post_jobs_com'
import BtnLong from '../../components/main/BtnLong'
import './css/Post_job_btn.css'

const Post_jobsReadContainer_com = () => {
  return (
    <div className='container main-content'>
        <Post_jobs_com/>
        <div className='UpdateBtnR'>
            <BtnLong btnLongText={"수정"}/>
        </div>
        <div className='DeleteBtnR'>
            <BtnLong btnLongText={"삭제"}/>
        </div>
    </div>
  )
}

export default Post_jobsReadContainer_com