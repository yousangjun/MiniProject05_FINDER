import React from 'react'
import Header from '../../layouts/Header'
import BtnShort from '../../components/main/BtnShort'
import BtnLong from '../../components/main/BtnLong'
import Footer from '../../layouts/Footer'

const Company = () => {
  return (
    <>
      <Header />
      <div>Company</div>
      <BtnShort btnShortText={"제출"} />
      <BtnLong btnLongText={"안녕하세요"} />
      <Footer />
    </>
  )
}

export default Company