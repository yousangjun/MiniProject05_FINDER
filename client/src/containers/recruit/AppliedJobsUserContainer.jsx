import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/main/Sidebar'
import ContentListItem from '../../components/main/ContentListItem'
import ContentTitle from '../../components/resume/ContentTitle'
import ContentHeader from '../../components/main/ContentHeader'
import { appliedRecruits } from '../../apis/recruit/recruit.js'
import { LoginContext } from '../../contexts/LoginContextProvider.jsx'
import useNotification from '../../Hooks/useNotification.jsx'
import Paging from '../../components/company/Paging.jsx'


const AppliedJobsUserContainer = () => {

    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const [recruits, setRecruits] = useState([])
    

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
        if (userNo) {
            handleRecruitList();

        }
    }, [userNo]);

    const handleRecruitList = async (newPage=1) => {
        setIsLoading(true);
        try {
            const response = await appliedRecruits(userNo, newPage);
            console.log(response.data);
            setRecruits(response.data.recruitPosts)
            setPageInfo(response.data.page);
        } catch (error) {
            console.error('Error fetching recruit list:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPageChange = (newPage) => {
        // setPage(newPage)
        if (userNo) {
            handleRecruitList(newPage);
        }
    }


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
                        {isLoading ? null : (
                            <>
                                {!recruits || recruits.length === 0 ? (
                                    <div className='d-flex flex-column justify-content-center mt-5 me-auto'>
                                        <h1>지원한 채용공고가 없습니다.</h1>
                                    </div>
                                ) : (
                                    recruits.map((recruit, i) => (
                                        <ContentListItem key={i} LinkToHref={`/recruit/detail_jobs_user/${recruit.recruitNo}`} 
                                        recruit={recruit} ContentListItemText={"합격조회"} ShowBtn={true} />
                                    ))
                                )}
                                <Paging page={pageInfo} onPageChange={onPageChange} />
                            </>
                        )}
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