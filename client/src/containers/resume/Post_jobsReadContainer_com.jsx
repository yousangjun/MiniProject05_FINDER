import React from 'react'
import Post_jobs_com from '../../components/resume/Post_jobs_com'
import BtnLong from '../../components/main/BtnLong'

const Post_jobsReadContainer_com = () => {
  return (
    <div className='container main-content'>
        <Post_jobs_com/>
        <div>
            <BtnLong btnLongText={"수정"}/>
            <BtnLong btnLongText={"삭제"}/>
        </div>
    </div>
  )
}

export default Post_jobsReadContainer_com