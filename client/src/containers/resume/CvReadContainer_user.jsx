import React from 'react'
import CvCreate_user from '../../components/resume/CvCreate_user'
import './css/CvCreate_btn.css'
import BtnLong from '../../components/main/BtnLong'
import './css/CvCreate_btn.css'

const CvReadContainer_user = () => {
  return (
    <div className='container main-content'>
        <CvCreate_user/>
        <div className='cvUpdate-btn'>
          <BtnLong btnLongText={"수정"}/>
        </div>
        <div className='cvDelete-btn'>
          <BtnLong btnLongText={"삭제"}/>
        </div>
    </div>
  )
}

export default CvReadContainer_user