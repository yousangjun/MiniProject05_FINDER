import React, { useContext } from 'react'
import CvCreate_user from '../../components/resume/CvCreate_user'
import './css/CvCreate_btn.css'
import BtnLong from '../../components/main/BtnLong'
import './css/CvCreate_btn.css'
import CvRead_user from '../../components/resume/CvRead_user'

const CvReadContainer_user = () => {

  return (
    <div className='container main-content'>
        <CvRead_user />

    </div>
  )
}

export default CvReadContainer_user