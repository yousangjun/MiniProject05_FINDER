import React, { useContext, useEffect, useRef, useState } from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { listRecruit, getComToUserNo } from '../../apis/recruit/recruit.js' // postRecruit 함수 import

const RecruitListComContainer = () => {
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const companyNo = useRef(null);
    const [recruits, setRecruits] = useState([]);

    // const rowsPerPage = 5;

    useEffect(() => {
        if (userNo) {
            handleGetList()

        }
    }, [userNo])

    const handleGetList = async () => {
        try {
            companyNo.current = await getComToUserNo(userInfo.userNo);
            const response = await listRecruit(companyNo.current.data.comNo);
            setRecruits(response.data.recruitPosts)
            console.dir(companyNo.current.data.comNo);
            // console.log('Job posted successfully:', response.data);

        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };


    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"혁신과 열정을 바탕으로, 미래를 창조하는 기업."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"등록한 채용공고"} />
                        {recruits.map((recruit, index) => (
                            <ContentListItem key={index} LinkToHref={`/recruit/post_jobs_read_com/${recruit.recruitNo}`} 
                            recruit={recruit} ContentListItemText={"삭제"} ShowBtn={true} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}

export default RecruitListComContainer