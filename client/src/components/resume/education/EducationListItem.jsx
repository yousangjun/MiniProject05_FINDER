import React from 'react'
import { useParams } from 'react-router-dom';

const EducationListItem = ({ educationList }) => {
    const { cvNo } = useParams('');



    console.log(`dldddjd`, educationList)
    return (
        <>
            {
                educationList.map((education, index) => (
                    <div className="d-flex flex-column w-100 h-auto" key={index}>
                        <div className="education-card d-flex justify-content-between">
                            <div className="flex-column col-3">
                                <p>{education.university}</p>
                            </div>
                            <div className="flex-column col-3">
                                <p>{education.major}</p>
                            </div>
                            <div className="flex-column col-3">
                                <p>{education.universityStatus}</p>
                            </div>
                            <div className="flex-column col-3">
                                <button type='button' className='btn del_btn'>
                                    {/* 클릭 핸들러 추가 가능 */}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>

    )
}

export default EducationListItem