import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import CreditListComContainer from '../../containers/company/CreditListComContainer'

const credit_list_com = () => {
    return (
        <>
            <Header />
            <CreditListComContainer />
            <Footer />        
        </>
    )
}

export default credit_list_com