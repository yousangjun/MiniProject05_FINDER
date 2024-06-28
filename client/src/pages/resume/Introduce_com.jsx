import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import Introduce_com_Controller from '../../containers/resume/Introduce_com_Controller'
import Resume from './Resume'
import BtnShort from '../../components/main/BtnShort'

const Introduce_com = () => {
  return (
    <>
    <Header/>
    <Resume/>
    <BtnShort btnShortText={"수정"}/>
    <Introduce_com_Controller/>
    <Footer/>
    </>
  )
}

export default Introduce_com