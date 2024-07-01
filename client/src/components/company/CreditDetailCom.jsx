import React, { useState, useEffect } from 'react';
import './css/CreditDetailCom.css';
import * as credit from '../../apis/company/credit';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const CreditDetailCom = () => {
    const [modalShow, setModalShow] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [product, setProduct] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productNo = queryParams.get('productNo');

    useEffect(() => {
        if (productNo) {
            const fetchProduct = async () => {
                try {
                    const response = await credit.getProduct(productNo);
                    setProduct(response.data);
                } catch (error) {
                    console.error('상품 정보를 불러오는 중 에러 발생:', error);
                }
            };
            fetchProduct();
        }
    }, [productNo]);

    const handleBuyCheck = () => {
        setIsAgreed(true);
    };

    return (
        <div className="d-flex flex-column container main-content align-items-center">
            <h1 className="my-5">상품을 선택하셨습니다.</h1>

            {product ? (
                <div className="col-lg-4 col-md-6 col-sm-12 credit-content-wrap">
                    <div className="card text-center">
                        <div className="card-body d-flex flex-column credit-body">
                            <h3>
                                <span style={{ fontSize: '30px' }}>{product.productName}</span>
                                <span> / {product.productDuration}개월 {product.productCount}건</span>
                            </h3>
                            <ul className="credit-list-info1">
                                <li>채용공고 작성 건수</li>
                                <li>AI 평가 사용 : {product.aiEvaluation ? '사용 가능' : '사용 불가'}</li>
                                <li>건당 <span>{product.productDuration}</span>개월 유지 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div>상품 정보를 불러오는 중입니다...</div>
            )}

            <div className="container mt-5 payment-form-wrap">
                <div className="payment-form1">
                    <form className="d-flex flex-column justify-content-between">
                        <div className="credit_user_info">
                            
                            <div>
                                <p>결제 금액 : <span>{product ? product.price : '...'}</span>원</p>
                                <hr />
                            </div>

                            <div>
                                <p>결제자 : <span>홍길동</span></p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>연락처 : <span>010-1234-5678</span></p>
                                    <button
                                        className='btn-long'
                                        type="button" 
                                        id="buyCheck" 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setModalShow(true);
                                        }}
                                    >구매동의</button>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className="d-flex">
                            <div>
                                <p>결제 수단 :</p>
                            </div>
                            <div className="d-flex credit-form-btn1 align-items-end">
                                <Link to="/company/checkout">
                                    <button 
                                        className={`btn-long ${isAgreed ? 'btn-agreed' : 'btn-not-agreed'}`} 
                                        type="button"
                                        disabled={!isAgreed}
                                    >간편 결제</button>
                                </Link>
                                <button 
                                className='btn-long'
                                type="button"
                                onClick={(e) => {
                                        e.preventDefault()   
                                        window.history.back()
                                    }}
                                >취소</button>
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
                    <div className='d-flex justify-content-center gap-2'>
                        <button 
                            id="confirmBtn" 
                            className="btn-short" 
                            onClick={() => {
                                handleBuyCheck();
                                setModalShow(false);
                            }}
                        >확인</button>
                        <button 
                            className="btn-short" 
                            onClick={() => setModalShow(false)}
                        >닫기</button>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreditDetailCom;
