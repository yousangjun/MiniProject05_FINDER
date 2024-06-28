import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './CreditCom.css';

const CreditCom = () => {
    return (
        <>
            <div className="container mt-5 main-content">
                <h1 className="text-center fw-bold mb-5">결제</h1>

                <div className="row mt-4 g-5 justify-content-center align-items-center com-credit-wrap p-4" style={{ marginBottom: '200px !important' }}>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="card-body d-flex flex-column credit-body">
                                <h3>10만원<span> / 2개월 30건</span></h3>
                                <ul className="credit-list-info">
                                    <li>채용공고 작성 건수</li>
                                    <li>건당 2개월 유지 가능</li>
                                </ul>
                                <Link to="/company/credit_detail_com?productNo=1" className="btn-long w-100 credit-option-btn">결제</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="card-body d-flex flex-column credit-body">
                                <h3>30만원<span> / 3개월 80건</span></h3>
                                <ul className="credit-list-info">
                                    <li>채용공고 작성 건수</li>
                                    <li>AI 평가 사용</li>
                                    <li>건당 3개월 유지 가능</li>
                                </ul>
                                <Link to="/company/credit_detail_com?productNo=2" className="btn-long w-100 credit-option-btn">결제</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="card-body d-flex flex-column credit-body">
                                <h3>50만원<span> / 3개월 150건</span></h3>
                                <ul className="credit-list-info">
                                    <li>채용공고 작성 건수</li>
                                    <li>AI 평가 사용</li>
                                    <li>건당 5개월 유지 가능</li>
                                </ul>
                                <Link to="/company/credit_detail_com?productNo=3" className="btn-long w-100 credit-option-btn">결제</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CreditCom;
