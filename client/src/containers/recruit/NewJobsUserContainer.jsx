import React from 'react'
import ContentListItem from '../../components/main/ContentListItem'
import ContentHeader from '../../components/main/ContentHeader'
import Sidebar from '../../components/main/Sidebar'
import ContentTitle from '../../components/resume/ContentTitle'

const NewJobsUserContainer = () => {
    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"열정과 재능이 만나는 곳, 당신의 꿈이 시작됩니다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main1 className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"최근 본 채용공고"} />
                        <ContentListItem />
                    </div>
                </main1>
            </div>
        </>
    )
}

export default NewJobsUserContainer