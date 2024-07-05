
import React, { forwardRef } from 'react';
import SearchRecruit from './SearchRecruit';

const HomeHeader = forwardRef((props, ref) => {
    const { keyword, dropdownVisible, subDropdownVisible, companyList, recruitList, refs, handleKeywordChange, handleOptionChange, count, handleMouseOver, handleMouseOut } = props;
    const option = [
        { value: 0, label: "회사명" },
        { value: 1, label: "제목" },
        { value: 2, label: "키워드" },
        { value: 3, label: "카테고리" }
    ];

    return (
        <>
            <div className="col-1 w-100 d-flex job-index-header" style={{ padding: '0 35px' }}>
                <div className="w-25">
                    <span style={{ padding: '15px', fontSize: '1.6em' }} className="job-index-header-title">채용공고</span>
                </div>

                <form action="" method="get" className="w-75 d-flex align-items-center justify-content-end">
                    <div className="d-flex align-items-center w-75 mb-3 mt-3 position-relative flex-column">
                        <div className="d-flex align-items-center w-75 mb-3 mt-3 box">
                            <div className="custom-form-floating" style={{borderRadius:'8px', marginRight:'3px'}}>
                                <input
                                    ref={refs.inputRef}
                                    type="text"
                                    id="customDropdownMenuInput"
                                    className="custom-input"
                                    placeholder="기업, 채용공고를 검색해보세요."
                                    name="keyword"
                                    value={keyword}
                                    onChange={handleKeywordChange}
                                    onClick={handleKeywordChange}/* 👩‍🏫 onClick 이벤트 추가 */
                                    autoComplete="off"
                                    style={{borderRadius:'8px', marginRight:'3px'}}
                                />
                            </div>

                            <div className="w-25" style={{ height: 'auto', marginLeft: '1px', boxShadow: 'none', borderWidth: '-8px' }}>
                                <select
                                    name="code"
                                    className="form-select"
                                    id="floatingSelectGrid"
                                    ref={refs.optionRef}
                                    onChange={handleOptionChange}
                                >
                                    {option.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>

                        <div className={`custom-dropdown-menu ${dropdownVisible ? 'show' : ''}`} id="customDropdownMenu" ref={refs.dropdownRef}>
                            {dropdownVisible && companyList.map((company) => (
                                <React.Fragment key={company.comNo}>
                                    {/* 👩‍🏫 MouseLeave 이벤트 */}
                                    <div onMouseLeave={() => handleMouseOut(company.comNo)}>
                                        <div className="d-flex company-item" data-id={company.comNo} ></div>
                                        <div className="company-item">
                                            <ul className="item">
                                                <li className="d-flex"  >
                                                    <div className={`custom-dropdown-item w-50 custom-dropdown-item-${company.comNo}`} data-id={company.comNo} onMouseOver={() => handleMouseOver(company.comNo)}>
                                                        <a href={`/company/com_detail_user?comNo=${company.comNo}`} style={{ display: 'block' }}>{company.comName}</a>
                                                    </div>
                                                    <ul className="recruit-wrab w-50">
                                                        <div className={`item recruit-list-item custom-dropdown-item-${company.comNo}`} data-id={company.comNo} >
                                                            <SearchRecruit recruitList={recruitList[company.comNo] || []} />
                                                            {/* {console.log(recruitList[company.comNo] || [] + "??")} */}
                                                        </div>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            <div>
                <h2>여기에 배너 넣는다는 뜻 같음</h2>
            </div>
            
            <div style={{ margin: '15px 0' }}>
                <strong>총 <span style={{ color: 'blue' }}>{count}</span>개의 정보를 탐색 하였습니다.</strong>
            </div>
            <hr style={{ marginBottom: '65px' }} />
        </>
    );
});

export default HomeHeader;
