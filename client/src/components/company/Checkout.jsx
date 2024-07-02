import React, { useEffect, useRef, useState, useContext } from "react";
import './css/Checkout.css'
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as credit from '../../apis/company/credit';
import { useParams, useNavigate  } from 'react-router-dom';
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "JawM9IYDGWc4GGIhj2Yz9";

const Checkout = () => {
    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(1);
    const { productNo, orderNo } = useParams();
    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const [order, setOrder] = useState({});
    


    // Context
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;  // 사용자 정보에서 userNo 가져오기

    const navigate = useNavigate();


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
        setPrice(product.productPrice)

        paymentMethodsWidget.updateAmount(price);
    }, [price]);

    const handlePaymentRequest = async () => {
        try {
            const checkoutData = {
                productNo,
                orderNo,
                userNo
            };

            // userNo를 추가하여 getCheckout 호출
            const response = await credit.getCheckout(checkoutData);
            console.log("결제 상품 및 주문 정보:", response.data);
            setProduct(response.data.product)
            setOrder(response.data.order)
            setUser(response.data.user)

            await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: product.productName,
                customerName: user.userName,
                customerEmail: user.userEmail,
                customerMobilePhone: user.userPhone,
                successUrl: `${window.location.origin}/company/success`,
                failUrl: `${window.location.origin}/company/fail`,
                onPaymentSuccess: () => navigate('/company/success'),
                onPaymentFail: () => navigate('/company/fail')
            });
        } catch (error) {
            console.error("Error requesting payment:", error);
        }
    };

    useEffect(() => {
        handlePaymentRequest();
    }, [userNo, productNo, orderNo]);

    // 전화번호 형식 변환 함수
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    return (
        <div className="d-flex flex-column container main-content align-items-center">
            <h1 className="my-5">상품을 선택하셨습니다.</h1>

            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card text-center">
                    <div className="card-body d-flex flex-column credit-body">
                        <h3>
                            <span style={{fontSize: '30px'}}>{product.productName}</span>
                            <span> / {product.productDuration}개월 {product.productCount}건</span>
                        </h3>
                        <ul className="credit-list-info">
                            <li>채용공고 작성 건수</li>   
                            <li>AI 평가 사용 : {productNo != 1 ? '사용 가능' : '사용 불가'}</li> 
                            <li>건당 <span>{product.productDuration}</span>개월 유지 가능</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mt-5 payment-form-wrap">
                <div className="payment-form">
                    <div className="d-flex flex-column justify-content-between">
                        <div className="credit_user_info">

                            <p>결제 금액 : <span>{product.productPrice}</span>원</p>
                            <hr />
                            <p>결제자 : <span>{user.userName}</span></p>
                            <div className="d-flex justify-content-between align-items-center">
                                <p style={{margin: 0}}>연락처 : <span>{formatPhoneNumber(user.userPhone)}</span></p>
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

export default Checkout;