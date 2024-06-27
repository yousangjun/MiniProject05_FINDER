import React from 'react';
import { useSearchParams, Link } from "react-router-dom";

const Fail = () => {
    const [searchParams] = useSearchParams();

    return (
        <div className="container error-page h-auto">
            <img src="/img/logo.png" alt="Logo" />
            <h1>결제 실패</h1>
            <p id="code"></p>
            <p id="message"></p>
            <Link 
                to="#"
                onClick={() => window.history.back()}
                style={{ fontSize: '30px', textDecoration: 'none' }}
            >
                이전페이지로 돌아가기
            </Link>
        </div>
    );
}

export default Fail;