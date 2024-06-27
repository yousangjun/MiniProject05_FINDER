import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreditDetailCom.css';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const CreditDetailCom = () => {
    const [modalShow, setModalShow] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const handleBuyCheck = () => {
        setIsAgreed(true);
    };

    const handlePostOrder = () => {
        const productNo = 2; // 예시 값, 실제 데이터로 변경 필요
        const url = "/company/credit/checkout";
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productNo })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.history.push(`/company/credit/checkout?productNo=${productNo}&orderNo=${data.orderNo}`);
            } else {
                window.history.push('/company/credit/fail?error');
            }
        })
        .catch(error => {
            alert('에러 발생');
        });
    };

    return (
        <div className="d-flex flex-column container main-content align-items-center">
            <h1 className="my-5">상품을 선택하셨습니다.</h1>

            <div className="col-lg-4 col-md-6 col-sm-12 credit-content-wrap">
                <div className="card text-center">
                    <div className="card-body d-flex flex-column credit-body">
                        <h3>
                            <span style={{ fontSize: '30px' }}>스탠다드</span>
                            <span> / 3개월 5건</span>
                        </h3>
                        <ul className="credit-list-info">
                            <li>채용공고 작성 건수</li>
                            <li>AI 평가 사용</li>
                            <li>건당 <span>3</span>개월 유지 가능</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mt-5 payment-form-wrap">
                <div className="payment-form">
                    <form className="d-flex flex-column justify-content-between">
                        <div className="credit_user_info">
                            <input type="hidden" name="productNo" id="productNo" value="2" />
                            
                            <div>
                                <p>결제 금액 : <span>100,000</span>원</p>
                                <hr />
                            </div>

                            <div>
                                <p>결제자 : <span>홍길동</span></p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>연락처 : <span>010-1234-5678</span></p>
                                    <Button 
                                        id="buyCheck" 
                                        style={{ alignSelf: 'self-end' }} 
                                        className="btn-long" 
                                        onClick={() => setModalShow(true)}
                                    >
                                        구매 동의
                                    </Button>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className="d-flex credit-form-btn align-items-center">
                            <div>
                                <p>결제 수단 :</p>
                            </div>
                            <div className="align-self-end">
                                <Button 
                                    id="tossURL" 
                                    className="btn-long" 
                                    disabled={!isAgreed}
                                    onClick={handlePostOrder}
                                >
                                    신용카드 결제
                                </Button>
                                <Link to="/company/credit_com" className="btn-long">취소</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>구매 동의 안내</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    <strong>해당 항목 구매에 동의하시겠습니까?</strong>
                    <br /><br />
                    <Button 
                        id="confirmBtn" 
                        className="btn-short" 
                        onClick={() => {
                            handleBuyCheck();
                            setModalShow(false);
                        }}
                    >
                        확인
                    </Button>
                    <Button 
                        className="btn-short" 
                        onClick={() => setModalShow(false)}
                    >
                        닫기
                    </Button>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreditDetailCom;
