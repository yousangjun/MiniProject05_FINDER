import React from 'react'
import Post_jobs_com from '../../components/resume/Post_jobs_com'
import ContentTitle from '../../components/resume/ContentTitle'
import BtnLong from '../../components/main/BtnLong'
import './css/Post_job_btn.css'

const Post_jobsContainer_com = () => {
  return (
    <div className='container main-content'>
        <ContentTitle SubTitle1={"채용공고 관리"}
        SubTitle2={"혁신과 열정을 바탕으로, 미래를 창조하라"}/>
        <Post_jobs_com/>
        <div className='PostBtn'>
        <BtnLong btnLongText={"등록"}/>
        </div>
    </div>
  )
}

export default Post_jobsContainer_com