import React from 'react';

const Employ = ({ employmentHistoryList, employDelete }) => {
    console.log(`employ 컴포넌트 안에서 : ` , employmentHistoryList[0] )
    return (
        <>
            {employmentHistoryList.map((employmentHistory, index) => (
                <div className="d-flex flex-column w-100" key={index}>
                    <div className="education-card d-flex justify-content-between">
                        <div className="flex-column">
                            <p>{employmentHistory.organization}</p>
                        </div>
                        <div className="flex-column">
                            <p>{employmentHistory.startDate}</p>
                        </div>
                        <div className="flex-column">
                            <p>{employmentHistory.endDate}</p>
                        </div>
                        <div className="flex-column">
                            <p>{employmentHistory.duties}</p>
                        </div>
                        <div className="flex-column">
                            <button
                                type="button"
                                className="btn del_btn"
                                onClick={() => employDelete(employmentHistory.employmentHistoryNo)}
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Employ;
