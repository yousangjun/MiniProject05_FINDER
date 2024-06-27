import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Keyword from './Keyword';

const HomeHeader = ({ keyword, handleKeywordChange, selectedCode, handleCodeChange, optionList }) => {
    const [option, setOption] = useState(optionList || []);
    return (
        <>
            <div className="col-1 w-100 d-flex job-index-header" style={{ padding: '0 35px' }}>
                <div className="w-25">
                    <span style={{ padding: '15px', fontSize: '1.6em' }} className="job-index-header-title">채용공고</span>
                </div>

                <form action="" method="get" className="w-75 d-flex align-items-center justify-content-end">
                    <div className="d-flex align-items-center w-75 mb-3 mt-3 position-relative flex-column">
                        <div className="d-flex align-items-center w-75 mb-3 mt-3 box">
                            <div className="custom-form-floating ">
                                <input type="text" id="customDropdownMenuInput" className="custom-input" placeholder="기업, 채용공고를 검색해보세요."
                                    name="keyword" value={keyword} onChange={handleKeywordChange} autoComplete="off" />
                            </div>

                            <div className=" w-25" style={{ height: 'auto', marginLeft: '1px', boxShadow: 'none', borderWidth: '-8px'}}>
                                <select name="code" className="form-select" id="floatingSelectGrid"
                                    value={selectedCode} onChange={handleCodeChange} >
                                    {option.map((item) => (
                                        <option key={item.code} value={item.code}>
                                            {item.keyword}
                                            여기에 옵션들어와야함
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="custom-dropdown-menu" id="customDropdownMenu">
                            <Keyword/>
                        </div>
                    </div>
                </form>



            </div>
            <div style={{ margin: '15px 0' }}>
                <strong>총 <span style={{ color: 'blue' }}>여기에 count</span>개의 정보를 탐색 하였습니다.</strong>
            </div>
            <hr style={{ marginBottom: '65px' }} />
        </>

    )
}

export default HomeHeader