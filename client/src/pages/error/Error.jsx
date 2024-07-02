import React from 'react'
import './css/Error.css'
import { Link } from 'react-router-dom';


const error = () => {

    return (
      <>
      <title>Error 페이지</title>
      <div className='container error-page h-auto'>
         <img src="/img/logo.png" alt="Logo"/>
          <h1>404 not found</h1>
          <p>페이지를 불러올 수 없습니다.</p>
          <Link 
                to="#"
                onClick={() => window.history.back()}
                style={{ fontSize: '30px', textDecoration: 'none', padding: "0px 20px 40px 20px", lineHeight: "40px" }}
                className='btn-long w-auto'
            >
                이전페이지로 돌아가기
            </Link>
      </div>
      </>
    )
  }
  
export default error