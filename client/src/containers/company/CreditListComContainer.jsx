import React from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import CreditList from '../../components/company/CreditList';
import Sidebar from '../../components/main/Sidebar';
import ContentHeader from '../../components/main/ContentHeader';

const CreditListComContainer = () => {

    // 임시 데이터
    const orderCreditList = [
        { orderNo: '1', productNo: '3', creditMethod: '신용카드', creditDate: '2024/06/28 15:30:00', totalPrice: '100,000', orderStatus: 'PAID' },
        { orderNo: '1', productNo: '3', creditMethod: '계좌이체', creditDate: '2024/06/27 14:20:00', totalPrice: '150,000', orderStatus: 'PENDING' },
    ];

    return (
        <>
            <ContentTitle SubTitle1={"기업 정보"} SubTitle2={"앞으로의 길을 내다볼 때 필요한 건 아닌 판단이다."}/>
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main1 className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText={"결제 내역"} />
                        <CreditList orderCreditList={orderCreditList} />
                    </div>
                </main1>
            </div>
        </>
    )
}

export default CreditListComContainer