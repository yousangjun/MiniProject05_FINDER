import React from 'react'

import JoinUserContainer from '../../containers/user/JoinUserContainer'
import MainLayout from '../../layouts/MainLayout'

const join_user = () => {
    return (
        <>
            <MainLayout>
                <JoinUserContainer />
            </MainLayout>
        </>
    )
}

export default join_user