import React from 'react'

import './css/ComDetail1.css'

const ComDetail1 = ({ companyDetail }) => {
    return (
        <>
            <div className="d-flex flex-row justify-content-evenly" style={{ fontSize: '30px', margin: '100px 10px' }}>
                <div>
                    <div className="d-flex w-100 column-gap-3" style={{ marginBottom: '20px' }}>
                            <label htmlFor="com_name" style={{ fontWeight: 'bold' }}>회사이름 :</label>
                            <span>회사이름</span>
                    </div>
                    <div className="d-flex w-100 column-gap-3">
                            <label htmlFor="com_represent" style={{ fontWeight: 'bold' }}>대표명&nbsp;&nbsp;&nbsp; :</label>
                            <span>대표명</span>
                    </div>
                </div>
                <div>
                    <div className="d-flex w-100 column-gap-3" style={{ marginBottom: '20px' }}>
                            <label htmlFor="com_category" style={{ fontWeight: 'bold' }}>업종 : </label>
                            <span>업종</span>
                    </div>
                    <div className="d-flex w-100 column-gap-3">
                            <label htmlFor="com_address" style={{ fontWeight: 'bold' }}>주소 : </label>
                            <span>주소</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComDetail1
