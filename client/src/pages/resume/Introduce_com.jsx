import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import BtnShort from '../../components/main/BtnShort'
import ContentTitle from '../../components/resume/ContentTitle'
import Introduce_com_Container from '../../containers/resume/Introduce_com_Container'

const Introduce_com = () => {
  return (
    <>
    <Header/>
    <ContentTitle SubTitle1={"기업 소개"} SubTitle2={"사람을 소중히 대하라"}/>
    <BtnShort btnShortText={"수정"}/>
    <Introduce_com_Container/>
    <Footer/>
    </>
  )
}

export default Introduce_com