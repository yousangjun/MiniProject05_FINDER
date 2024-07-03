import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as credit from '../../apis/company/credit';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './css/CreditList.css';
import Paging from './Paging';

const CreditList = () => {
    
    // Context
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;  // 사용자 정보에서 userNo 가져오기
    // const { productNo, orderNo } = useParams();
    const [orderCreditList, setOrderCreditList] = useState([]);

    // console.log(productNo)
    // console.log(orderNo)
    console.log(userNo)
    
    useEffect(() => {
        const fetchCreditList = async () => {
            try {
                const response = await credit.getCreditList(userNo);
                setOrderCreditList(response.data);
            } catch (error) {
                console.error('결제 목록을 가져오는 중 오류 발생:', error);
            }
        };

        fetchCreditList();
    }, [userNo]);

    // 페이지네이션 임시 데이터
    const page = { first: 1, prev: 1, page: 2, next: 3, last: 5, start: 1, end: 5 };

    return (
        <>
            <div className="credit-table-wrap">
                <table className="table-credit" style={{ minWidth: '100%' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>주문번호</th>
                            <th>결제수단</th>
                            <th>결제일시</th>
                            <th>결제금액</th>
                            <th>결제상태</th>
                            <th style={{ width: '80px' }}>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderCreditList.length === 0 ? (
                            <tr>
                                <td style={{ height: '400px' }} colSpan="6" align="center">
                                    <h5>결제하신 내역이 없습니다.</h5>
                                </td>
                            </tr>
                        ) : (
                            orderCreditList.map((order, index) => (
                                <tr key={index} className="creditList-item">
                                    <td>{order.orderNo}</td>
                                    <td>{order.creditMethod}</td>
                                    <td>{order.creditDate}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.orderStatus === 'PAID' && '결제완료'}
                                        {order.orderStatus === 'PENDING' && '결제대기'}
                                        {order.orderStatus === 'CANCELLED' && '결제취소'}
                                    </td>
                                    <td>
                                        {order.orderStatus === 'PAID' && (
                                            <button className="btn-short w-auto m-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                상세조회
                                            </button>
                                        )}
                                        {order.orderStatus === 'PENDING' && (
                                            <Link to={`/company/credit/checkout?orderNo=${order.orderNo}&productNo=${order.productNo}`}>
                                                <button className='btn-short w-auto m-auto' >결제하기</button>                                            
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Paging page={page} />
        </>
    );
};

export default CreditList;
