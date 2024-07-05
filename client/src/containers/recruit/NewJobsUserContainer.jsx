import React, { useContext, useEffect, useState } from 'react'
import ContentListItem from '../../components/main/ContentListItem'
import ContentHeader from '../../components/main/ContentHeader'
import Sidebar from '../../components/main/Sidebar'
import ContentTitle from '../../components/resume/ContentTitle'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { listNewRecruit } from '../../apis/recruit/recruit.js'

import Paging from '../../components/company/Paging.jsx'
import './css/RecruitListCom.css';


const NewJobsUserContainer = () => {
    const { userInfo, newRecruitNo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const [newRecruitList, setNewRecruitList] = useState([]);

    console.log(newRecruitNo, " ??????? "); 

    const [isLoading, setIsLoading] = useState(true); // 초기 페이지 로딩 상태
    // 페이징정보상태관리
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        first: 1,
        prev: 1,
        start: 1,
        end: 1,
        next: 1,
        last: 1
    });
    const [page, setPage] = useState(1)


    useEffect(() => {
        if (userNo && newRecruitNo.length > 0 ) {
            newRecruitItem();

        }
    }, [newRecruitNo]);


    const newRecruitItem =  async (newPage=1) => {

        setIsLoading(true);

        await listNewRecruit(newRecruitNo, newPage)
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    
                    setNewRecruitList(data.recruits);
                    setPageInfo(data.page);

                    console.log(data.recruits + "---------- recruits[] 리스트 객체 -----------");
                    console.log(data.page + "---------- 페이징 객체 -----------");
                }else {
                    return;
                }
            })
            .catch(error => {
                alert(`삭제 실패: ${error.response.status} ${error.response.statusText}`);
            })
            setIsLoading(false);
    }

    const onPageChange = (newPage) => {
        if (userNo) {
            newRecruitItem(newPage);
        }
    }


    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"열정과 재능이 만나는 곳, 당신의 꿈이 시작됩니다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"최근 본 채용공고"} />
                        {isLoading ? null : (
                            <>
                                {!newRecruitList || newRecruitList.length === 0 ? (
                                    <div className='MissingBox d-flex flex-column justify-content-center mt-5 me-auto'>
                                        <img className='MissingImg' src="/img/ImSorry.png" alt="이력서가 없어요ㅜㅜ" />
                                        <h3 className='MissingText'> 최근 본 채용공고가 없습니다.</h3>
                                        <p className='MissingText'>지원하고 싶은 회사 공고글을 확인해주세요</p>
                                    </div>
                                ) : (
                                    newRecruitList.map((recruit, index) => (
                                        <ContentListItem key={index} LinkToHref={`/recruit/detail_jobs_user/${recruit.recruitNo}`} 
                                        recruit={recruit} ContentListItemText={"삭제"} ShowBtn={true} />
                                    ))
                                )}
                                <Paging page={pageInfo} onPageChange={onPageChange} />
                            </>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}

export default NewJobsUserContainer


