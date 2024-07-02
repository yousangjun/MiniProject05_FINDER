import React, { useEffect, useRef, useState, useContext } from "react";
import './css/Checkout.css'
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as credit from '../../apis/company/credit';

import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "JawM9IYDGWc4GGIhj2Yz9";

const CreditDetailCom = () => {
    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(50_000);

    // Context
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;  // 사용자 정보에서 userNo 가져오기

    useEffect(() => {
        const fetchPaymentWidget = async () => {
            try {
                const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
                setPaymentWidget(loadedWidget);
            } catch (error) {
                console.error("Error fetching payment widget:", error);
            }
        };

        fetchPaymentWidget();
    }, []);

    useEffect(() => {
        if (paymentWidget == null) {
            return;
        }

        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            "#payment-method",
            { value: price },
            { variantKey: "DEFAULT" }
        );

        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, [paymentWidget, price]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(price);
    }, [price]);

    const handlePaymentRequest = async () => {
        try {
        const checkoutData = {
            productNo: 2,  // 임시 값 설정
            orderNo: 1234567890  // 임시 값 설정
        };

        // userNo를 추가하여 getCheckout 호출
        const response = await credit.getCheckout({ ...checkoutData, userNo });
        console.log("결제 상품 및 주문 정보:", response.data);

        await paymentWidget?.requestPayment({
            orderId: nanoid(),
            orderName: "토스 티셔츠 외 2건",
            customerName: "김토스",
            customerEmail: "customer123@gmail.com",
            customerMobilePhone: "01012341234",
            successUrl: `${window.location.origin}/company/success`,
            failUrl: `${window.location.origin}/company/fail`,
        });
        } catch (error) {
            console.error("Error requesting payment:", error);
        }
    };

    return (
        <div className="d-flex flex-column container main-content align-items-center">
            <h1 className="my-5">상품을 선택하셨습니다.</h1>

            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card text-center">
                    <div className="card-body d-flex flex-column credit-body">
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
                    <div className="d-flex flex-column justify-content-between">
                        <div className="credit_user_info">
                            <input type="hidden" name="productNo" id="productNo" value="2" />
                            <input type="hidden" name="productName" id="productName" value="스탠다드" />
                            <input type="hidden" name="productPrice" id="productPrice" value="100000" />
                            <input type="hidden" name="productCount" id="productCount" value="5" />
                            <input type="hidden" name="productDuration" id="productDuration" value="3" />
                            <input type="hidden" name="userName" id="userName" value="김토스" />
                            <input type="hidden" name="userEmail" id="userEmail" value="customer123@gmail.com" />
                            <input type="hidden" name="userPhone" id="userPhone" value="01012341234" />
                            <input type="hidden" name="orderNo" id="orderNo" value="1234567890" />

                            <p>결제 금액 : <span>100,000</span>원</p>
                            <hr />
                            <p>결제자 : <span>김토스</span></p>
                            <div className="d-flex justify-content-between align-items-center">
                                <p style={{margin: 0}}>연락처 : <span>01012341234</span></p>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

                <div className="box_section d-flex flex-column w-100" style={{marginTop: '20px', marginBottom: '20px'}}>
                    <div id="payment-method"></div>
                    <div id="agreement"></div>
                    <button className="button btn-long align-self-center" id="payment-button" 
                            style={{marginTop: '30px'}} onClick={handlePaymentRequest}>
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreditDetailCom;