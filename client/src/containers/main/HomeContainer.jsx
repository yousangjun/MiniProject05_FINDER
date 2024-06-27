import React, { useState, useEffect } from 'react'
import HomeHeader from '../../components/main/HomeHeader'
import CardList from '../../components/main/CardList'

const HomeContainer = () => {
    const [keyword, setKeyword] = useState('');
    const [selectedCode, setSelectedCode] = useState('0');
    const [optionList, setOptionList] = useState([]);

    useEffect(() => {
        // 옵션 리스트를 가져오는 API 호출
        fetch('/api/options')
            .then(response => response.json())
            .then(data => setOptionList(data));
    }, []);

    const handleInputChange = (newKeyword, newCode) => {
        setKeyword(newKeyword);
        setSelectedCode(newCode);
    };

    return (
        <div className="container main-content">
            <HomeHeader 
                handleInputChange={handleInputChange} 
                keyword={keyword} 
                selectedCode={selectedCode}
                optionList={optionList}
            />
            <CardList keyword={keyword} selectedCode={selectedCode} />
        </div>
    )
}

export default HomeContainer