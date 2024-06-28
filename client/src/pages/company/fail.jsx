import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import FailContainer from '../../containers/company/FailContainer'

const fail = () => {
    return (
        <>
            <Header />
            <FailContainer />
            <Footer />
        </>
    )
}

export default fail