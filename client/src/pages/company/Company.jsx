import React from 'react'
import ComDetailContainer from '../../containers/company/ComDetailContainer'
import CreditCom from '../../components/company/CreditCom'
import CheckoutContainer from '../../containers/company/CheckoutContainer'
import CreditDetailComContainer from '../../containers/company/CreditDetailComContainer'
import CreditComContainer from '../../containers/company/CreditComContainer'
import Fail from '../../components/company/Fail'
import MainLayout from '../../layouts/MainLayout'


const Company = () => {
  return (
    <>
      <MainLayout>
        {/* <ComDetailContainer /> */}
        {/* <CreditComContainer /> */}
        {/* <CreditDetailComContainer /> */}
        {/* <CheckoutContainer /> */}
        <Fail />
      </MainLayout>
    </>
  )
}

export default Company