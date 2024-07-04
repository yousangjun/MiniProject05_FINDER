import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/main/Sidebar'
import ContentListItem from '../../components/main/ContentListItem'
import ContentTitle from '../../components/resume/ContentTitle'
import ContentHeader from '../../components/main/ContentHeader'
import { appliedRecruits } from '../../apis/recruit/recruit.js'
import { LoginContext } from '../../contexts/LoginContextProvider.jsx'
import useNotification from '../../Hooks/useNotification.jsx'
const AppliedJobsUserContainer = () => {

    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const [recruits, setRecruits] = useState([])
    

    useEffect(() => {
        if (userNo) {
            const handleRecruitList = async () => {
                try {
                    const response = await appliedRecruits(userNo);
                    console.log(response.data);
                    setRecruits(response.data)
                } catch (error) {
                    console.error('Error fetching recruit list:', error);
                }
            };

            handleRecruitList();
        }
    }, [userNo]);

    // 이력서 합불 알람 // ******
    const pushNotification = useNotification();
    const btn = () => {
        pushNotification('새로운 메시지가 도착했어요!', {
            body: `테스트`
          })

    }
    // 이력서 합불 알람 // ******

    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"열정과 재능이 만나는 곳, 당신의 꿈이 시작됩니다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"지원한 채용공고"} />
                        {recruits.map((recruit) => (
                            <ContentListItem key={recruit.recruitNo} LinkToHref={`/recruit/detail_jobs_user/${recruit.recruitNo}`} 
                            recruit={recruit} ContentListItemText={"합격조회"} ShowBtn={true} />
                        ))}
                    </div>
                </main>
                <div>
                    <button onClick={btn}>

                    </button>
                </div>
            </div>
        </>
    )
}

export default AppliedJobsUserContainer