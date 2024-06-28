import React from 'react'
import ContentTitle from '../../components/resume/ContentTitle'
import CreditList from '../../components/company/CreditList';
import Paging from '../../components/company/Paging';

const CreditListComContainer = () => {

    // 임시 데이터
    const orderCreditList = [
        { orderNo: '1', productNo: '3', creditMethod: '신용카드', creditDate: '2024/06/28 15:30:00', totalPrice: '100,000', orderStatus: 'PAID' },
        { orderNo: '1', productNo: '3', creditMethod: '계좌이체', creditDate: '2024/06/27 14:20:00', totalPrice: '150,000', orderStatus: 'PENDING' },
    ];

    // 페이지네이션 임시 데이터
    const page = { first: 1, prev: 1, page: 2, next: 3, last: 5, start: 1, end: 5 };

    return (
        <>
            <ContentTitle SubTitle1={"기업 정보"} SubTitle2={"앞으로의 길을 내다볼 때 필요한 건 아닌 판단이다."}/>
                        <CreditList orderCreditList={orderCreditList} />
                        <Paging page={page} />
        </>
    )
}

export default CreditListComContainer