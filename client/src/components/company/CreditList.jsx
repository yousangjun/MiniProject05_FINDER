// CreditTable.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BtnShort from '../main/BtnShort';


const CreditList = ({ orderCreditList }) => {
    return (
        <div className="table-wrap">
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
                                    {order.creditDate && (
                                        <button className="btn-short" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            상세조회
                                        </button>
                                    )}
                                    {order.orderStatus === 'PENDING' && (
                                        <Link to={`/company/credit/checkout?orderNo=${order.orderNo}&productNo=${order.productNo}`}>
                                            <BtnShort btnShortText={"결제하기"} />                                            
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CreditList;