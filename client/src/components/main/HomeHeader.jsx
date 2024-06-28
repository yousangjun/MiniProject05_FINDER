import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchRecruit from './SearchRecruit';


const HomeHeader = () => {
    const [keyword, setKeyword] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const [recruitList, setRecruitList] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            //dropdownRef.current 해당 돔 요소가 존재하는지 ?
            //contains(event.target)  = current안에있는 요소 참조 만약에 클릭이벤트이면 클릭한 요소 참조
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
        setKeyword(newKeyword);
        console.log(newKeyword);

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


    const handleMouseOver = (e) => {
        const comNo = e.target.dataset.id;
        const recruitListItem = document.querySelector(`.recruit-list-item[data-id='${comNo}']`);
        if (recruitListItem) {
            recruitListItem.classList.remove("d-none");
        }
       
        fetch(`/keyword?comNo=${encodeURIComponent(comNo)}`)
            .then(response => response.json())
            .then(data => {
                setRecruitList(data.recruitPosts);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    const handleMouseOut = (e) => {
        const comNo = e.target.dataset.id;
        const recruitListItem = document.querySelector(`.recruit-list-item[data-id='${comNo}`);
        if (recruitListItem) {
            recruitListItem.classList.add("d-none");
        }
    };

    const initKeywordEvent = () => {
        console.log('Initializing keyword event');
        const items = document.querySelectorAll("[class*='custom-dropdown-item-']");
        items.forEach(item => {
            console.log('Adding event listeners to item:', item);
            item.addEventListener("mouseover", handleMouseOver);
            item.addEventListener("mouseout", handleMouseOut);
        });
    };

    useEffect(() => {
        if (dropdownVisible) {
            initKeywordEvent();
        }
    }, [dropdownVisible, companyList]);

    return (
        <>
            <div className="col-1 w-100 d-flex job-index-header" style={{ padding: '0 35px' }}>
                <div className="w-25">
                    <span style={{ padding: '15px', fontSize: '1.6em' }} className="job-index-header-title">채용공고</span>
                </div>

                <form action="" method="get" className="w-75 d-flex align-items-center justify-content-end">
                    <div className="d-flex align-items-center w-75 mb-3 mt-3 position-relative flex-column">
                        <div className="d-flex align-items-center w-75 mb-3 mt-3 box">
                            <div className="custom-form-floating">
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
                                >
                                    {/* {optionList.map((item) => (
                                        <option key={item.code} value={item.code}>
                                            {item.keyword}
                                        </option>
                                    ))} */}
                                </select>
                            </div>
                        </div>


                        <div className={`custom-dropdown-menu ${dropdownVisible ? 'show' : ''}`} id="customDropdownMenu" ref={dropdownRef}>
                            {dropdownVisible && companyList.map((company) => (
                                <React.Fragment key={company.comNo}>
                                    <div className="d-flex company-item" data-id={company.comNo}></div>
                                    <div className="company-item">
                                        <ul className="item">
                                            <li className="d-flex">
                                                <div className={`custom-dropdown-item w-50 custom-dropdown-item-${company.comNo}`} data-id={company.comNo}>
                                                    <a href={`/company/com_detail_user?comNo=${company.comNo}`}>{company.comName}</a>
                                                </div>
                                                <ul className="recruit-wrab w-50">
                                                    <div className={`item recruit-list-item custom-dropdown-item-${company.comNo}`} data-id={company.comNo}>
                                                        <SearchRecruit recruitList={recruitList} />
                                                        {console.log(recruitList + "??")}
                                                    </div>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>




                    </div>
                </form>
            </div>
            <div style={{ margin: '15px 0' }}>
                <strong>총 <span style={{ color: 'blue' }}>여기에 count</span>개의 정보를 탐색 하였습니다.</strong>
            </div>
            <hr style={{ marginBottom: '65px' }} />
        </>
    );
};

export default HomeHeader;
