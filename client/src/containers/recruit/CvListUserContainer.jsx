import React from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'

const CvListUserContainer = () => {
    return (
        <>
            <ContentTitle SubTitle1={"이력서 관리"} SubTitle2={"경험은 만들어 낼 수 없다. 그것은 겪어야만 한다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main1 className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"나의 이력서"} />
                        <ContentListItem LinkToHref={``}/>
                    </div>
                </main1>
            </div>
        </>
    )
}

export default CvListUserContainer