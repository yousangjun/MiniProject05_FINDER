import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Introduce_com.css'

const Introduce_com = () => {
  return (
    <>
    <div className='row'>
    <div className="d-flex flex-column row-gap-3 col-3">
      <img src="/img/업력연차.png" alt="업력연차" />
      <div className='com-intro-input'>
        <input type="text" id='comBitrh' name='comBitrh' className='w-75 Comyear1'/>
        <span>년</span>
      </div>
      <h4>업력연차</h4>
    </div>
    <div className="d-flex flex-column row-gap-3 col-3">
      <img src="/img/대기업1.png" alt="기업규모" />
      <select name="comSize" id="comSize" className='comSize'>
        <option value="기업선택" aria-readonly="true">기업선택</option>
        <option value="대기업">대기업</option>
        <option value="중견기업">중견기업</option>
        <option value="중소기업">중소기업</option>
      </select>
      <h4>기업 규모</h4>
    </div>
    <div className="d-flex flex-column row-gap-3 col-3">
      <img src="/img/사원수1.png" alt="사원수" />
      <div className='com-intro-input'>
        <input type="text" id='comEmpCount' name='comEmpCount' className='w-75  ComSalary2'/>
        <span>명</span>
      </div>
      <h4>사원 수</h4>
    </div>
    <div className="d-flex flex-column row-gap-3 col-3">
      <img src="/img/매출액1.png" alt="매출액" />
      <div className='com-intro-input'>
        <input type="text" id='ComSales2' name='ComSales2' className='w-75 ComSales2' />
        <span>억</span>
      </div>
      <h4>매출액</h4>
    </div>
    </div>
    </>
  )
}

export default Introduce_com