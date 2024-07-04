import React, { useContext, useEffect, useRef, useState } from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { listRecruit, getComToUserNo } from '../../apis/recruit/recruit.js';


const RecruitListComContainer = () => {
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const [cvs,setCvs] = useState([]);

    const companyNo = useRef(null);

    useEffect(() => {
        if (userNo) {
            handleGetList();
        }
    }, [userNo]);

    const handleGetList = async () => {
        try {
            companyNo.current = await getComToUserNo(userInfo.userNo);
            const response = await listRecruit(companyNo.current.data.comNo);
            setCvs(response.data.applyCvList)
            console.dir(response.data.applyCvList);
            // console.log('Job posted successfully:', response.data);

        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };
    
    // 예를 들어 컴포넌트가 마운트될 때 이 함수를 호출하려면 useEffect 훅을 사용할 수 있습니다.
    return (
        <>
            <ContentTitle SubTitle1={"이력서 관리"} SubTitle2={"앞으로의 길을 내다볼 때 필요한 것은 올바른 판단이다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main1 className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"제출된 이력서"} />
                        {cvs.map((cv, index) => (
                            <ContentListItem key={index} LinkToHref={`/resume/cvRead_user/${cv.cvNo}`} 
                            cv={cv} ContentListItemText={"삭제"} ShowBtn={true} />
                        ))}
                    </div>
                </main1>
            </div>
        </>
    )
}

export default RecruitListComContainer