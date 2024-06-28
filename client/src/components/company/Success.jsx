import React, { useEffect  } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import './Success.css';
import BtnLong from '../main/BtnLong';

const Success = ( {  } ) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.  
        const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
        const response = await fetch("/confirm", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
            // 결제 실패 비즈니스 로직을 구현하세요.
            navigate(`/fail?message=${json.message}&code=${json.code}`);
            return;
        }

        // 결제 성공 비즈니스 로직을 구현하세요.
        }
        confirm();
    }, []);

    return (
        <div className="d-flex flex-column container main-content align-items-center">
            <h1 className="my-5">결제가 완료되었습니다.</h1>

            <div className="col-lg-4 col-md-6 col-sm-12 credit-content-wrap">
                <div className="card text-center">
                    <div className="card-body d-flex flex-column credit-body justify-content-center" style={{rowGap: '20px'}}>
                        <h3>
                            <span style={{fontSize: '30px'}}>스탠다드</span>
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
                            <p>결제 일시 : <span>2024/06/27 오후 15시 30분</span></p>
                            <hr/>
                            <p>결제자 : <span>홍길동</span></p>
                            <div className="d-flex justify-content-between align-items-center">
                                <p>연락처 : <span>010-1234-5678</span></p>
                            </div>
                            <hr/>
                        </div>

                        <div className="d-flex credit-form-btn align-items-center justify-content-between">
                            <div>
                                <p>결제 수단 : <span>신용카드</span></p>
                            </div>
                            <div className="align-self-end">
                                <Link to="/company/credit_list_com"><BtnLong btnLongText={"결제내역"}/></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Success