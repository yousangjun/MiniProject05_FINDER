import React from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'

const RecruitListComContainer = () => {
    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"혁신과 열정을 바탕으로, 미래를 창조하는 기업."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main1 className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"등록한 채용공고"} />
                        <ContentListItem />
                    </div>
                </main1>
            </div>
        </>
    )
}

export default RecruitListComContainer