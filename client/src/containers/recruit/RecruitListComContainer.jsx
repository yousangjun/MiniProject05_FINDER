import React, { useContext, useEffect, useRef, useState } from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { listRecruit, getComToUserNo } from '../../apis/recruit/recruit.js' // postRecruit 함수 import
import Paging from '../../components/company/Paging.jsx'

import './css/RecruitListCom.css';

const RecruitListComContainer = () => {
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    const [cvs,setCvs] = useState([]);

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
    const companyNo = useRef(null);

    useEffect(() => {
        if (userNo) {
            handleGetList();
        }
    }, [userNo]);

    const handleGetList = async (newPage=1) => {
        setIsLoading(true);
        try {
            companyNo.current = await getComToUserNo(userInfo.userNo);

            const response = await listRecruit(companyNo.current.data.comNo, newPage);
            setCvs(response.data.applyCvList)

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
            <ContentTitle SubTitle1={"이력서 관리"} SubTitle2={"앞으로의 길을 내다볼 때 필요한 것은 올바른 판단이다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">

                        <ContentHeader ContentHeaderText={"제출된 이력서"} />
                        {isLoading ? null : (
                            <>
                                {!cvs || cvs.length === 0 ? (
                                    <div className='MissingBox d-flex flex-column justify-content-center mt-5 me-auto'>
                                        <img className='MissingImg' src="/img/ImSorry.png" alt="이력서가 없어요ㅜㅜ" />
                                        <h3 className='MissingText'>지원받은 이력서가 없습니다.</h3>
                                        <p className='MissingText'>이력서가 들어올 때까지 기다려주세요.</p>
                                    </div>
                                ) : (
                                    cvs.map((cv, index) => (
                                        <ContentListItem key={index} LinkToHref={`/resume/cvRead_user?${cv.cvNo}`} 
                                        cv={cv} ContentListItemText={"삭제"} ShowBtn={true} />
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