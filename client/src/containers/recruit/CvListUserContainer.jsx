import React, { useContext, useEffect, useRef, useState } from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import Sidebar from '../../components/main/Sidebar'
import ContentHeader from '../../components/main/ContentHeader'
import ContentListItem from '../../components/main/ContentListItem'
import { LoginContext } from '../../contexts/LoginContextProvider'
import { myCvList } from '../../apis/resume/bshResume.js'
import Paging from '../../components/company/Paging.jsx'

import './css/RecruitListCom.css';

const CvListUserContainer = () => {

    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;
    console.log("회원 번호 : " + userNo) // 회원정보 입력 잘 받음
    const [cvList, setCvList] = useState([])

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
            handleCvList();

        }
    }, [userNo]);

    const handleCvList = async (newPage=1) => {
        setIsLoading(true);
        try {
            const response = await myCvList(userNo, newPage);
            console.log(response.data);
            setCvList(response.data.cvList)
            setPageInfo(response.data.page);
            console.log("::::::::::::::::::::::::::" + response.data.cvList + "::::::::::::::::::::::::::::::::::")
            console.log("::::::::::::::::::::::::::" + response.data.page + "::::::::::::::::::::::::::::::::::")
        } catch (error) {
            console.error('Error fetching recruit list:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPageChange = (newPage) => {
        // setPage(newPage)
        if (userNo) {
            handleCvList(newPage);
        }
    }

    return (
        <>
            <ContentTitle SubTitle1={"이력서 관리"} SubTitle2={"경험은 만들어 낼 수 없다. 그것은 겪어야만 한다."} />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"나의 이력서"} />
                        {isLoading ? null : (
                            <>
                                {!cvList || cvList.length === 0 ? (
                                    <div className='MissingBox d-flex flex-column justify-content-center mt-5 me-auto'>
                                        <img className='MissingImg' src="/img/Apply.png" alt="이력서가 없어요ㅜㅜ" />
                                        <h3 className='MissingText'>등록된 이력서가 없습니다.</h3>
                                        <p className='MissingText'>구인구직을 위한 이력서를 작성해주세요.</p>
                                    </div>
                                ) : (
                                    cvList.map((myCv, index) => (
                                        <ContentListItem key={index} LinkToHref={`/resume/cvRead_user/${myCv.cvNo}`} 
                                        myCv={myCv} ContentListItemText={"삭제"} ShowBtn={true} />
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

export default CvListUserContainer