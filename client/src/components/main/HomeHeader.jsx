import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Keyword from './Keyword';

const HomeHeader = ({ handleInputChange, keyword, selectedCode, optionList }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        // companyList가 변경될 때마다 실행됩니다.
        console.log('CompanyList updated:', companyList);
        // 여기에 필요한 추가 로직을 넣을 수 있습니다.
    }, [companyList]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleKeywordChange = (e) => {
        const newKeyword = e.target.value;
        console.log(newKeyword);
        handleInputChange(newKeyword);

        if (newKeyword) {
            fetch(`/search?query=${encodeURIComponent(newKeyword)}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.companyList);
                    setCompanyList(data.companyList);
                    setDropdownVisible(true);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setDropdownVisible(false);
        }
    };

    const handleCodeChange = (e) => {
        handleInputChange(keyword, e.target.value);
    };

    const initKeywordEvent = () => {
        const items = document.querySelectorAll("[class*='custom-dropdown-item-']");
        items.forEach(item => {
            item.addEventListener("mouseover", handleMouseOver);
            item.addEventListener("mouseout", handleMouseOut);
        });
    };

    const handleMouseOver = (e) => {
        const comNo = e.target.dataset.id;
        const recruitListItem = document.querySelector(`.recruit-list-item[data-id='${comNo}']`);

        if (recruitListItem && recruitListItem.children.length === 0) {
            fetch(`/keyword?comNo=${encodeURIComponent(comNo)}`)
                .then(response => response.text())
                .then(html => {
                    recruitListItem.innerHTML = html;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (recruitListItem) {
            recruitListItem.classList.remove("d-none");
        }
    };

    const handleMouseOut = (e) => {
        const comNo = e.target.dataset.id;
        const recruitListItem = document.querySelector(`.recruit-list-item[data-id='${comNo}']`);
        if (recruitListItem) {
            recruitListItem.classList.add("d-none");
        }
    };

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
                                <input
                                    ref={inputRef}
                                    type="text"
                                    id="customDropdownMenuInput"
                                    className="custom-input"
                                    placeholder="기업, 채용공고를 검색해보세요."
                                    name="keyword"
                                    value={keyword}
                                    onChange={handleKeywordChange}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="w-25" style={{ height: 'auto', marginLeft: '1px', boxShadow: 'none', borderWidth: '-8px' }}>
                                <select
                                    name="code"
                                    className="form-select"
                                    id="floatingSelectGrid"
                                    value={selectedCode}
                                    onChange={handleCodeChange}
                                >
                                    {/* {optionList.map((item) => (
                                        <option key={item.code} value={item.code}>
                                            {item.keyword}
                                        </option>
                                    ))} */}
                                </select>
                            </div>
                        </div>


                        <div
                            ref={dropdownRef}
                            className="custom-dropdown-menu"
                            id="customDropdownMenu"
                        >
                            <Keyword companies={companyList} />
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