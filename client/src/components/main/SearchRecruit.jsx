import React, { useState, useEffect } from 'react';

const SearchRecruit = ({ recruitList }) => {
    const [recruit, setRecruit] = useState(recruitList || []);

    useEffect(() => {
        setRecruit(recruitList || []);
    }, [recruitList]);

    return (
        <>
            {recruit.map((recruit) => (
                <li key={recruit.recruitNo} className="recruit-box custom-dropdown-item2 w-100">
                    <a
                        className="recruit-box"
                        href={`/recruit/detail_jobs_user?recruitNo=${recruit.recruitNo}`}
                        style={{ display: 'block', height: '100%', padding: '10px' }}
                    >
                        {recruit.recruitTitle}
                    </a>
                </li>
            ))}
        </>
    );
};

export default SearchRecruit;
