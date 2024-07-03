import React, { useEffect  } from 'react'
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import * as credit from '../../apis/company/credit';

const Process = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { productNo, orderNo } = useParams();

    useEffect(() => {
        // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
        // 결제 2번 들어가는건 <StrictMode> 때문  
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
            productNo: productNo,
            orderNo: orderNo,
        };
        console.log(requestData.orderNo)
        console.log(requestData.productNo)
        console.log(requestData.orderId)

        async function confirm() {
            try {
                const response = await credit.insertCredit(requestData);
                console.log(response, "ㅂ두번찎히니?")
                if (response.status !== 200) {
                    // 결제 실패 비즈니스 로직을 구현하세요.
                    const json = await response.json();
                    navigate(`/fail?message=${json.message}&code=${json.code}`);
                    return;
                }

                // 결제 성공 비즈니스 로직을 구현하세요.
                navigate(`/company/success/${productNo}/${orderNo}`);
            } catch (error) {
                console.error("Error processing payment:", error);
                navigate(`/company/fail?message=${error.message}`);
            }
        }

        confirm();
    }, []);


    return (
        <div>Process</div>
    )
}

export default Process