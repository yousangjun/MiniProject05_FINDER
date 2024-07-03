import React, { useContext, useState, useEffect  } from 'react'
import { Link, useParams } from "react-router-dom";
import './css/Success.css';
import BtnLong from '../main/BtnLong';
import * as credit from '../../apis/company/credit';
import { LoginContext } from '../../contexts/LoginContextProvider';

const Success = () => {

    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    const { productNo, orderNo } = useParams();
    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const [order, setOrder] = useState({});
    const [credits, setCredits] = useState({});

    // Context
    const { userInfo } = useContext(LoginContext);
    const userNo = userInfo ? userInfo.userNo : null;  // 사용자 정보에서 userNo 가져오기


    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const SuccessData = {
                    productNo,
                    orderNo,
                    userNo,
                };
    
                // userNo를 추가하여 getCheckout 호출
                const response = await credit.getCheckout(SuccessData);
                console.log("결제 상품 및 주문 정보:", response.data);
                setProduct(response.data.product);
                setOrder(response.data.order);
                setUser(response.data.user);
                setCredits()
            } catch (error) {
                console.error("결제 정보를 가져오는 중 오류 발생:", error);
                // 여기에 오류 처리 로직을 추가할 수 있습니다.
                // 예: 사용자에게 오류 메시지 표시
            }
        };
    
        fetchCheckoutData();
    }, [productNo, orderNo, userNo]);


    // useEffect(() => {
    //     // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    //     // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.  
    //     const requestData = {
    //         orderId: searchParams.get("orderId"),
    //         amount: searchParams.get("amount"),
    //         paymentKey: searchParams.get("paymentKey"),
    //         productNo: productNo,
    //         orderNo: orderNo,
    //     };
    //     console.log(requestData.orderNo)
    //     console.log(requestData.productNo)
    //     console.log(requestData.orderId)

    //     async function confirm() {
    //         try {
    //             const response = await credit.insertCredit(requestData);
    //             console.log(response)
    //             if (response.status !== 200) {
    //                 // 결제 실패 비즈니스 로직을 구현하세요.
    //                 const json = await response.json();
    //                 navigate(`/fail?message=${json.message}&code=${json.code}`);
    //                 return;
    //             }

    //             // 결제 성공 비즈니스 로직을 구현하세요.
    //         } catch (error) {
    //             console.error("Error processing payment:", error);
    //             navigate(`/company/fail?message=${error.message}`);
    //         }
    //     }

    //     confirm();
    // }, []);
    
    // 전화번호 형식 변환 함수
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const formattedDate = `${year}/${month}/${day} 오후 ${hours}시 ${minutes}분`;
        return formattedDate;
    };

    return (
        <div className="d-flex flex-column container main-content align-items-center">
            <h1 className="my-5">결제가 완료되었습니다.</h1>

            <div className="col-lg-4 col-md-6 col-sm-12 credit-content-wrap">
                <div className="card text-center">
                    <div className="card-body d-flex flex-column credit-body-success justify-content-center" style={{rowGap: '20px'}}>
                        <h3>
                            <span style={{fontSize: '30px'}}>{product.productName}</span>
                            <span> / {product.productDuration}개월 {product.productCount}건</span>
                        </h3>
                        <ul className="credit-list-info-success">
                            <li>채용공고 작성 건수</li>   
                            <li>AI 평가 사용 : {productNo != 1 ? '사용 가능' : '사용 불가'}</li> 
                            <li>건당 <span>{product.productDuration}</span>개월 유지 가능</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mt-5 payment-form-wrap">
                <div className="payment-form-success">
                    <form className="d-flex flex-column justify-content-between"> 
                        <div className="credit_user_info">
                        <p>결제 일시 : <span>{formatDate(order.updatedDate)}</span></p>
                        <p>결제 금액 : <span>{product.productPrice}</span>원</p>
                            <hr/>
                            <p>결제자 : <span>{user.userName}</span></p>
                            <div className="d-flex justify-content-between align-items-center">
                                <p>연락처 : <span>{formatPhoneNumber(user.userPhone)}</span></p>
                            </div>
                            <hr/>
                        </div>

                        <div className="d-flex credit-form-btn-success align-items-center justify-content-between">
                            <div>
                                <p>결제 수단 : <span>신용카드</span></p>
                            </div>
                            <div className="align-self-end credit-list-btn">
                                <Link to={`/company/credit_list_com/${productNo}/${orderNo}`}><BtnLong btnLongText={"결제내역"}/></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Success;
