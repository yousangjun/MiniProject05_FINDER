import React from 'react';

const EducationListItem = ({ educationList, handleDelete }) => {

    console.log(`dasdasdjaasd : ` , educationList[0] )
    return (
        <div>
            {educationList.map((education, index) => (
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
                            <button 
                                type="button" 
                                className="btn del_btn"
                                onClick={() => handleDelete(education.educationNo)}
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EducationListItem;
