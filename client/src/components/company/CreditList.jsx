import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import * as credit from '../../apis/company/credit';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './css/CreditList.css';
import Paging from './Paging';

const CreditList = () => {

    const { userInfo } = useContext(LoginContext);  // Context
    const userNo = userInfo ? userInfo.userNo : null; 
    const [orderCreditList, setOrderCreditList] = useState([]);
    const [page, setPage] = useState(1);
    const [rows] = useState(10); // 한 페이지에 보여줄 행의 수
    const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 주문
    const [user, setUser] = useState()

    console.log(userNo);
    
    useEffect(() => {
        const fetchCreditList = async () => {
            try {
                const response = await credit.getCreditList(userNo, page, rows);
                setOrderCreditList(response.data.orderCreditList);
                setUser(response.data.user)
            } catch (error) {
                console.error('결제 목록을 가져오는 중 오류 발생:', error);
            }
        };

        fetchCreditList();
    }, [userNo, page, rows]);


    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours(); 
        const minutes = date.getMinutes();
    
        const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
        return formattedDate;
    };

    const handleShow = (order) => {
        setSelectedOrder(order);
    };

    const handleClose = () => {
        setSelectedOrder(null);
    };

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
                                    <td>{order.credits[0].creditMethod ? order.credits[0].creditMethod : '-'}</td>
                                    <td>{order.credits[0].creditDate ? formatDate(order.credits[0].creditDate) : '-'}</td>
                                    <td>{order.totalPrice.toLocaleString()}원</td>
                                    <td>
                                        {order.orderStatus === 'PAID' && '결제완료'}
                                        {order.orderStatus === 'PENDING' && '결제대기'}
                                        {order.orderStatus === 'CANCELLED' && '결제취소'}
                                    </td>
                                    <td>
                                        {order.orderStatus === 'PAID' && (
                                            <button className="btn-short w-auto m-auto" onClick={() => handleShow(order)}>
                                            상세조회
                                            </button>
                                        )}
                                        {order.orderStatus === 'PENDING' && (
                                            <Link to={`/company/checkout/${order.productNo}/${order.orderNo}`}>
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
            {/* <Paging onPageChange={setPage} /> */}

            {selectedOrder && (
                <Modal show={true} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>결제내역 상세 안내</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'center' }}>
                        <strong>
                            결제 날짜: {selectedOrder.credits.length > 0 && selectedOrder.credits[0].creditDate ? 
                                        new Date(selectedOrder.credits[0].creditDate).toLocaleDateString() : 'N/A'}
                        </strong>
                        <br />
                        <br />
                        <span>{user.userName}</span>님의 결제 내역입니다<br />
                        상품 옵션은  
                        {selectedOrder.totalQuantity === 30 ? '\n2' : 
                        selectedOrder.totalQuantity === 80 ? '\n3' : 
                        selectedOrder.totalQuantity === 150 ? '\n5' : '0'}개월이며 <br />
                        채용공고 작성수량은 <span>{selectedOrder.remainQuantity}회</span> 남았습니다.<br />
                        <hr />
                        구매해주셔서 감사합니다.<br />
                        주문처리 일자: {new Date(selectedOrder.orderedDate).toLocaleDateString()}<br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default CreditList;
