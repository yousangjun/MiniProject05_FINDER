import React, { useEffect, useRef, useState } from 'react';
import Card from '../../components/main/Card';
import HomeHeader from '../../components/main/HomeHeader';

const HomeContainer = () => {
    const [keyword, setKeyword] = useState('');
    const [option, setOption] = useState('');
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
    const optionRef = useRef(null);
    const loader = useRef(null);
    const rowsPerPage = 12;
    

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && !loading) {
            fetchCardList();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 0.8
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

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
        setOption(e.target.value);
        setCurrentPage(1); // Reset pagination on option change
    };

    const fetchCardList = () => {
        if (loading) return;  // 이미 로딩 중인 경우 요청을 시작하지 않음
        setLoading(true);
        const url = `/cardList?page=${currentPage}&rows=${rowsPerPage}&code=${option}&keyword=${encodeURIComponent(keyword)}`;
        fetch(url)
            .then(response => response.json())
            .then(newData => {
                if (newData.recruitList.length === 0) {
                    setLoading(false); // 더 이상 로드할 데이터가 없음
                    return; // 함수 종료
                }
                setCount(newData.count);
                setData(prevData => [...prevData, ...newData.recruitList]);
                setCurrentPage(prev => prev + 1);  // 페이지 번호 안전하게 증가
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    return (
        <>
            <HomeHeader
                keyword={keyword}
                option={option}
                dropdownVisible={dropdownVisible}
                subDropdownVisible={subDropdownVisible}
                companyList={companyList}
                recruitList={recruitList}
                refs={{ inputRef, dropdownRef, optionRef }}
                handleKeywordChange={handleKeywordChange}
                handleOptionChange={handleOptionChange}
                count={count}
            />
            <Card data={data} />
            <div ref={loader} className="loading-indicator">
                {loading && <p>Loading more items...</p>}
            </div>
        </>
    );
};

export default HomeContainer;
