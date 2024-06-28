import React from 'react'

import './ComDetail2.css'

const ComDetail2 = () => {
    return (
        <>
            <div className="row w-75 justify-content-center" style={{margin: '10px auto'}}>
                <div className="d-flex flex-column row-gap-3 col-3 text-center">
                    <img src="/img/연차1.png" alt="업력연차" style={{ width: '190px', padding: '26px 12px 10px' }} className="align-self-center" />
                    <div className="mb-3">
                        <label htmlFor="com_birth" className="fs-4" style={{ textAlign: 'center' }}>업력 연차</label>
                        <input type="text" readOnly className="form-control-plaintext" id="com_birth" placeholder="" value="10년" style={{ textAlign: 'center' }} />
                    </div>
                </div>
                <div className="d-flex flex-column row-gap-3 col-3 text-center">
                    <img src="/img/대기업1.png" alt="기업규모" style={{ width: '190px', padding: '26px 12px 10px' }} className="align-self-center" />
                    <div className="mb-3">
                        <label htmlFor="com_size" className="fs-4" style={{ textAlign: 'center' }}>기업 규모</label>
                        <input type="text" readOnly className="form-control-plaintext" id="com_size" placeholder="" value="대기업" style={{ textAlign: 'center' }} />
                    </div>
                </div>
                <div className="d-flex flex-column row-gap-3 col-3 text-center">
                    <img src="/img/사원수1.png" alt="사원수" style={{ width: '190px', padding: '26px 12px 10px' }} className="align-self-center" />
                    <div className="mb-3">
                        <label htmlFor="com_emp_count" className="fs-4" style={{ textAlign: 'center' }}>사원 수</label>
                        <input type="text" readOnly className="form-control-plaintext" id="com_emp_count" placeholder="" value="500명" style={{ textAlign: 'center' }} />
                    </div>
                </div>
                <div className="d-flex flex-column row-gap-3 col-3 text-center">
                    <img src="/img/매출액1.png" alt="매출액" style={{ width: '190px', padding: '26px 12px 10px' }} className="align-self-center" />
                    <div className="mb-3">
                        <label htmlFor="com_sales" className="fs-4" style={{ textAlign: 'center' }}>매출액</label>
                        <input type="text" readOnly className="form-control-plaintext" id="com_sales" placeholder="" value="1000억" style={{ textAlign: 'center' }} />
                    </div>
                </div>
                <br />
                <hr />
            </div>

            <div className="w-100">
                <div className="d-flex flex-column mx-auto">
                    <label htmlFor="com_content" className="fs-2 mb-3" style={{ textAlign: 'center' }}>기술 소개</label>
                    <textarea readOnly className="w-75 mx-auto detail-content" id="com_content" placeholder="기술 소개 내용" value="이 회사는 최첨단 기술을 보유하고 있습니다."></textarea>
                </div>
            </div>
            <div className="w-100">
                <div className="d-flex flex-column mx-auto">
                    <label htmlFor="com_vision" className="fs-2 mb-3" style={{ textAlign: 'center' }}>기업 비전</label>
                    <textarea readOnly className="w-75 mx-auto detail-content" id="com_vision" placeholder="기업 비전 내용" value="글로벌 리더로 도약하는 것이 우리의 목표입니다."></textarea>
                </div>
            </div>
            <div className="w-100">
                <div className="d-flex flex-column mx-auto">
                    <label htmlFor="com_welfare" className="fs-2 mb-3" style={{ textAlign: 'center' }}>기업 복지</label>
                    <textarea readOnly className="w-75 mx-auto detail-content" id="com_welfare" placeholder="기업 복지 내용" value="직원들을 위한 다양한 복지 혜택을 제공합니다."></textarea>
                </div>
            </div>
        </>
    )
}

export default ComDetail2
