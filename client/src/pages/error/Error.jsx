import React from 'react'
import './css/Error.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const error = () => {
    return (
      <>
      <title>Error 페이지</title>
      <div className='container error-page h-auto'>
         <img src="/img/logo.png" alt="Logo"/>
          <h1>404 not found</h1>
          <p>웹 페이지를 불러올 수 없습니다.</p>
          <a href="javascript:hisroty.back()">이전 페이지로 돌아가기</a>
      </div>
      </>
    )
  }
  
export default error