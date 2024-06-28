import React, { useState, useEffect, useRef } from 'react'
import HomeHeader from '../../components/main/HomeHeader'
import CardList from '../../components/main/CardList'

const HomeContainer = () => {

    const [keyword, setKeyword] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [subDropdownVisible, setSubDropdownVisible] = useState(false);
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
        setSubDropdownVisible(true);
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
        setSubDropdownVisible(false);
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

        return () => {

        }
    }, [dropdownVisible, companyList]);

    return (
        <div className="container main-content">
            <HomeHeader 
            keyword={keyword} 
            dropdownVisible={dropdownVisible} 
            subDropdownVisible={subDropdownVisible}
            companyList={companyList}
            recruitList={recruitList}
            refs={{ inputRef, dropdownRef }}
            handleKeywordChange={handleKeywordChange}
            />
            <CardList />
        </div>
    )
}

export default HomeContainer