import React from 'react';
import './css/Fail.css'
import { useSearchParams, Link, useNavigate } from "react-router-dom";

const Fail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div className="container credit-error-page h-auto">
            <img src="/img/logo.png" alt="Logo" />
            <h1>결제 실패</h1>
            <p id="code"></p>
            <p id="message"></p>
            <Link 
                to='/company/credit_com'
                style={{ fontSize: '30px', textDecoration: 'none', padding: "0px 20px 40px 20px", lineHeight: "40px" }}
                className='btn-long w-auto'
            >
                결제페이지로 돌아가기
            </Link>
        </div>
    );
}

export default Fail;