import React from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Update_user from '../../components/resume/Update_user'
import ContentHeader from '../../components/main/ContentHeader'
import Sidebar from '../../components/main/Sidebar'

const UpdateContainer_user = () => {
  return (
    <>
        <ContentTitle SubTitle1={"나의 정보"} SubTitle2={"모두가 주인이 되는 문화를 통해, 꿈을 현실로 만듭니다"} />
        <div className="row justify-content-center" style={{ padding: '0 40px' }}>
            <Sidebar />
            <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                <div className="job-listings1">
                    <ContentHeader ContentHeaderText={"정보 수정"} />
                    <Update_user />
                </div>
            </main>
        </div>
    </>
  )
}

export default UpdateContainer_user