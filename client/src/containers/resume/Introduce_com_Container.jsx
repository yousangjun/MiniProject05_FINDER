import React from 'react'
import Introduce_com from '../../components/resume/Introduce_com'
import ContentTitle from '../../components/resume/ContentTitle'
import './css/Introduce_btn.css'
import ContentHeader from '../../components/main/ContentHeader'
import Sidebar from '../../components/main/Sidebar'


const Introduce_com_Container = () => {
  return (
    <>
      <ContentTitle SubTitle1={"기업 소개"} SubTitle2={"사람을 소중히 대하라"} />
      <div className="row justify-content-center" style={{ padding: '0 40px' }}>
          <Sidebar />
          <main1 className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
              <div className="job-listings1">
                  <ContentHeader ContentHeaderText={"기업 정보"} />
                  <Introduce_com />
              </div>
          </main1>
      </div>
    </>

  )
}

export default Introduce_com_Container