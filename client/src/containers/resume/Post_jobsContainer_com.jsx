import React from 'react'
import Post_jobs_com from '../../components/resume/Post_jobs_com'
import ContentTitle from '../../components/resume/ContentTitle'
import BtnLong from '../../components/main/BtnLong'
import './css/Post_job_btn.css'
import Sidebar from '../../components/main/Sidebar'

const Post_jobsContainer_com = () => {
  return (
    <>
      <ContentTitle SubTitle1={"채용공고 관리"}
      SubTitle2={"혁신과 열정을 바탕으로, 미래를 창조하라"}/>
      <div className="row justify-content-center" style={{padding: '0 40px'}}>
        <Sidebar/>
        <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start"
        >
        <div className='job-listings1'>
          <Post_jobs_com/>
        </div>
        </main>
      </div>
    </>
  )
}

export default Post_jobsContainer_com