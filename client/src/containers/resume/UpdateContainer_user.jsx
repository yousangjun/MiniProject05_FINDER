import React from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Update_user from '../../components/resume/Update_user'

const UpdateContainer_user = () => {
  return (
    <div  className='container main-content'>
        <ContentTitle SubTitle1={"나의 정보"} SubTitle2={"모두가 주인이 되는 문화를 통해, 꿈을 현실로 만듭니다"} />
        <Update_user/>
    </div>
  )
}

export default UpdateContainer_user