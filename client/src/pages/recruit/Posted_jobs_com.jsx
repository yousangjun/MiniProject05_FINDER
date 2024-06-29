import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import NewJobsUserContainer from '../../containers/recruit/NewJobsUserContainer'
import PostedJobsCom from '../../containers/recruit/PostedJobsCom'

const Posted_jobs_com = () => {
    return (
        <>
            <MainLayout>
                <PostedJobsCom />
            </MainLayout>
        </>
    )
}

export default Posted_jobs_com