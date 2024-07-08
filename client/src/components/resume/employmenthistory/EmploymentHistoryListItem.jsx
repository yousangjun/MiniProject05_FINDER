import React from 'react'
import { useParams } from 'react-router-dom';

const EmploymentHistoryListItem = ({ employmentHistoryList }) => {
    const { cvNo } = useParams('');



    console.log(`dldddjd`, employmentHistoryList)
    return (
        <>
            {
                employmentHistoryList.map((employment, index) => (
                    <div className="d-flex flex-column w-100 h-auto" key={index}>
                        <div className="education-card d-flex justify-content-between">
                            <div className="flex-column col-3">
                                <p>{employment.university}</p>
                            </div>
                            <div className="flex-column col-3">
                                <p>{employment.major}</p>
                            </div>
                            <div className="flex-column col-3">
                                <p>{employment.universityStatus}</p>
                            </div>
                            <div className="flex-column col-3">
                                <button type='button' className='btn del_btn'>
                                    {/* 삭제 버튼 추가 */}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>

    )
}

export default EmploymentHistoryListItem