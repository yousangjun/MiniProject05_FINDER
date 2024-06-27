import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreditDetailCom.css'
import { Link } from 'react-router-dom'

const CreditDetailCom = () => {

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
                                    <button id="buyCheck" style={{ alignSelf: 'self-end' }} type="button" className="btn-long">구매 동의</button>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className="d-flex credit-form-btn align-items-center">
                            <div>
                                <p>결제 수단 :</p>
                            </div>
                            <div className="align-self-end">
                                <button id="tossURL" type="button" className="btn-long disabled">신용카드 결제</button>
                                <Link to="/company/credit_com">취소</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreditDetailCom;