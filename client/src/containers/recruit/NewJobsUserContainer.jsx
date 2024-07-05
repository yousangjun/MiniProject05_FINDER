import React, { useContext, useEffect, useState } from 'react'
import ContentListItem from '../../components/main/ContentListItem'
import ContentHeader from '../../components/main/ContentHeader'
import Sidebar from '../../components/main/Sidebar'
import ContentTitle from '../../components/resume/ContentTitle'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { listNewRecruit } from '../../apis/recruit/recruit.js'

const NewJobsUserContainer = () => {
    const { userInfo, newRecruitNo } = useContext(LoginContext);
    const [newRecruitList, setNewRecruitList] = useState([]);
    const userNo = userInfo ? userInfo.userNo : null;
        console.log(newRecruitList, " ??????? "); 
    useEffect(() => {
        if (userNo && newRecruitNo) {
            const newRecruitItem =  async () => {
                await listNewRecruit(newRecruitNo)
                    .then(response => {
                        console.log(response.data, "1");
                        if (response.status === 200) {
                            console.log(response.data);
                            
                            setNewRecruitList(response.data);
                        }else {
                            return;
                        }
                    })
                    .catch(error => {
                        alert(`삭제 실패: ${error.response.status} ${error.response.statusText}`);
                    });
            }
            newRecruitItem();  // 함수 호출 추가
        }
    }, [newRecruitNo]);  // 의존성 배열에 newRecruitNo 추가

    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"열정과 재능이 만나는 곳, 당신의 꿈이 시작됩니다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"최근 본 채용공고"} />
                        {newRecruitList.map((recruit, index) => (
                            <ContentListItem key={index} LinkToHref={`/recruit/detail_jobs_user/${recruit.recruitNo}`} 
                            recruit={recruit} ContentListItemText={"삭제"} ShowBtn={true} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}

export default NewJobsUserContainer
