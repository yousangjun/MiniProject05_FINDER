import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import ComDetailContainer from '../../containers/company/ComDetailContainer'
import CreditCom from '../../components/company/CreditCom'
import CheckoutContainer from '../../containers/company/CheckoutContainer'
import CreditDetailComContainer from '../../containers/company/CreditDetailComContainer'
import CreditComContainer from '../../containers/company/CreditComContainer'
import Fail from '../../components/company/Fail'


const Company = () => {
  return (
    <>
      <Header />
      {/* <ComDetailContainer /> */}
      {/* <CreditComContainer /> */}
      {/* <CreditDetailComContainer /> */}
      {/* <CheckoutContainer /> */}
      <Fail />
      <Footer />
    </>
  )
}

export default Company