import React from 'react'
import CvCreate_user from '../../components/resume/CvCreate_user'
import './css/CvCreate_btn.css'
import BtnLong from '../../components/main/BtnLong'

const CvReadContainer_user = () => {
  return (
    <div className='container main-content'>
        <CvCreate_user/>
        <div className='cvCreate-btn'>
          <BtnLong btnLongText={"수정"}/>
          <BtnLong btnLongText={"삭제"}/>
        </div>
    </div>
  )
}

export default CvReadContainer_user