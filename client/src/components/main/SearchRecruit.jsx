import React from 'react';

const SearchRecruit = ({ recruitList }) => {
    if (!Array.isArray(recruitList)) {
        console.error('Expected recruit to be an array but got:', typeof recruit);
        return <div>No data available.</div>;
    }
    return (
        <>
            {recruitList.map((recruit) => (
                <li key={recruit.recruitNo} className="recruit-box custom-dropdown-item2 w-100" >
                    <a
                        className="recruit-box"
                        href={`/recruit/detail_jobs_user?recruitNo=${recruit.recruitNo}`}
                        style={{ display: 'block', height: '100%', padding: '10px', width: '100%'}}

                    >
                        {recruit.recruitTitle}
                    </a>
                </li>
            ))}
        </>
    );
};

export default SearchRecruit;
