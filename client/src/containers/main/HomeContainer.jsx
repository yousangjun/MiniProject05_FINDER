import React, { useEffect, useRef, useState } from 'react';
import Card from '../../components/main/Card';
import HomeHeader from '../../components/main/HomeHeader';
import './HomeContainer.css'

const HomeContainer = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [subDropdownVisible, setSubDropdownVisible] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const [recruitList, setRecruitList] = useState([]);
    const [count, setCount] = useState(0);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const loader = useRef(null);
    const rowsPerPage = 12;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSubDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && !loading) {
            setCurrentPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 1
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
        // 처음엔 의존성 없이 실행하니 첫 로딩할때 2번쨰페이지까지 보여지게됨 의존성 생기니 무한로딩 .
        // 무한로딩 오류해결방법은 전체 데이터 개수를알고 개수를 넘으면 로딩을 안하면 됨.
    }, [loading]);
    

    useEffect(() => {
        const fetchInitialData = () => {
            setLoading(true);
            const url = `/cardList?page=1&rows=${rowsPerPage}&code=${selectedOption}&keyword=${encodeURIComponent(keyword)}`;
            fetch(url)
                .then(response => response.json())
                .then(newData => {
                    setData(newData.recruitList);
                    setCount(newData.count);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        };

        fetchInitialData();
    }, [selectedOption, keyword]);

    useEffect(() => {
        if (currentPage === 1) return; // 초기 페이지는 이미 로드되었으므로 무시
        if ((currentPage - 1) * rowsPerPage >= count) return; // 로드할 데이터가 없으면 무시

        const fetchMoreData = () => {
            setLoading(true);
            const url = `/cardList?page=${currentPage}&rows=${rowsPerPage}&code=${selectedOption}&keyword=${encodeURIComponent(keyword)}`;
            fetch(url)
                .then(response => response.json())
                .then(newData => {
                    setData(prevData => [...prevData, ...newData.recruitList]);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        };

        fetchMoreData();
    }, [currentPage]);

    const handleKeywordChange = (e) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);
        setCurrentPage(1); // Reset pagination on keyword change
        if (newKeyword) {
            fetch(`/search?query=${encodeURIComponent(newKeyword)}`)
                .then(response => response.json())
                .then(data => {
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

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setCurrentPage(1); // Reset pagination on option change
    };

    useEffect (() => {
     console.log(currentPage, "페이지 로드됨");
    },[currentPage])
    

    const handleMouseOver = (comNo) => {
        fetch(`/keyword?comNo=${encodeURIComponent(comNo)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRecruitList(prevState => ({ ...prevState, [comNo]: data.recruitPosts }));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleMouseOut = (comNo) => {
        const updatedRecruitList = { ...recruitList };
        delete updatedRecruitList[comNo]; 
        setRecruitList(updatedRecruitList);
    };

    return (
        <>
            <HomeHeader
                keyword={keyword}
                dropdownVisible={dropdownVisible}
                subDropdownVisible={subDropdownVisible}
                companyList={companyList}
                recruitList={recruitList}
                refs={{ inputRef, dropdownRef }}
                handleKeywordChange={handleKeywordChange}
                handleOptionChange={handleOptionChange}
                count={count}
                handleMouseOver={handleMouseOver}
                handleMouseOut={handleMouseOut}
                selectedOption={selectedOption}
            />
            <Card data={data} />
            <div ref={loader} className="loading-indicator" style={{height: "50px"}}>
                {loading && <p>Loading more items...</p>}
            </div>
        </>
    );
};

export default HomeContainer;
