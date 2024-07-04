import React, { useContext, useEffect, useRef, useState } from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { listRecruit, getComToUserNo } from '../../apis/recruit/recruit.js' // postRecruit 함수 import
import Paging from '../../components/company/Paging.jsx'

const RecruitListComContainer = () => {
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const companyNo = useRef(null);
    const [recruits, setRecruits] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태

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
            handleGetList()

        }
    }, [userNo])

    const handleGetList = async (newPage=1) => {
        setIsLoading(true);
        try {
            companyNo.current = await getComToUserNo(userInfo.userNo);
            const response = await listRecruit(companyNo.current.data.comNo, newPage);
            setRecruits(response.data.recruitPosts)
            console.dir(companyNo.current.data.comNo);
            // console.log('Job posted successfully:', response.data);

            setPageInfo(response.data.page);

        } catch (error) {
            console.error('Error fetching company data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPageChange = (newPage) => {
        // setPage(newPage)
        if (userNo) {
            handleGetList(newPage);
        }
    }

    useEffect(() => {
        
        if (userNo) {
            handleGetList();
        }

    }, [userNo]); 


    return (
        <>
            <ContentTitle SubTitle1={"채용공고 관리"} SubTitle2={"혁신과 열정을 바탕으로, 미래를 창조하는 기업."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"등록한 채용공고"} />
                        {isLoading ? null : (
                            <>
                                {!recruits || recruits.length === 0 ? (
                                    <div className='d-flex flex-column justify-content-center mt-5 me-auto'>
                                        <h1>등록한 채용공고가 없습니다.</h1>
                                    </div>
                                ) : (
                                    recruits.map((recruit, index) => (
                                        <ContentListItem key={index} LinkToHref={`/recruit/post_jobs_read_com/${recruit.recruitNo}`} 
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

export default RecruitListComContainer