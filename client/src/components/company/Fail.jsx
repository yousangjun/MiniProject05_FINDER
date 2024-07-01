import React from 'react';
import './css/Fail.css'
import { useSearchParams, Link } from "react-router-dom";

const Fail = () => {
    const [searchParams] = useSearchParams();

    return (
        <div className="container credit-error-page h-auto">
            <img src="/img/logo.png" alt="Logo" />
            <h1>결제 실패</h1>
            <p id="code"></p>
            <p id="message"></p>
            <Link 
                to="#"
                onClick={() => window.history.back()}
                style={{ fontSize: '30px', textDecoration: 'none', padding: "0px 20px 40px 20px", lineHeight: "40px" }}
                className='btn-long w-auto'
            >
                이전페이지로 돌아가기
            </Link>
        </div>
    );
}

export default Fail;