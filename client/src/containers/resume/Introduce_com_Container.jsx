import React from 'react'
import Introduce_com from '../../components/resume/Introduce_com'
import ContentTitle from '../../components/resume/ContentTitle'
import './css/Introduce_btn.css'


const Introduce_com_Container = () => {
  return (
    <>
      <ContentTitle SubTitle1={"기업 소개"} SubTitle2={"사람을 소중히 대하라"} />
      <Introduce_com />
    </>

  )
}

export default Introduce_com_Container