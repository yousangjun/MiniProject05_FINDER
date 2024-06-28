import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import JoinUserContainer from '../../containers/user/JoinUserContainer'

const join_user = () => {
    return (
        <>
            <Header />
            <JoinUserContainer />
            <Footer />
        </>
    )
}

export default join_user