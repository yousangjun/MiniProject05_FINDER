import React, { useState } from 'react'

const searchRecruit = ({ recruitPost }) => {
    const [recruit, setRecruit] = useState(recruitPost || []);
    return (
        (

            <li key={recruit.recruitNo} className="recruit-box custom-dropdown-item2 w-100">
                <a
                    className="recruit-box"
                    href={`/recruit/detail_jobs_user?recruitNo=${recruit.recruitNo}`}
                    style={{ display: 'block', height: '100%', padding: '10px' }}
                >
                    {recruit.recruitTitle}
                </a>
            </li>

        )

    )
}

export default searchRecruit