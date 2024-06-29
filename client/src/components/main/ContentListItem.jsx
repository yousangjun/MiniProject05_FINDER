import React, { useState } from 'react';

const ContentListItem = ({ }) => {
    const [recruits, setRecruits] = useState([]);
    return (

        <a
            href={`/recruit/detail_jobs_user?recruitNo=`}
            className="job-item-link1"
            id={`recruit_`}
            key=""
        >
            <input type="hidden" name="recruitNo" id="recruitNo" value="" />
            <div className="job-item1 ">
                <div style={{ width: '38px', height: '15px' }}>
                    {/* new 자리 */}
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ borderRadius: '8px', width: '38px', fontSize: '10px' }}
                    >
                        {/* 내용 */}
                    </div>
                </div>

                <div style={{ fontSize: '12px' }}>
                    <span>1</span>
                    <span>|</span>
                    <span>기간 : </span>
                    <span>2</span>
                </div>

                <div style={{ fontSize: '17px', marginBottom: '15px', fontWeight: 'bold' }}>
                    제목
                </div>

                <div className="item d-flex justify-content-between">
                    
                    <div className="keyword-span1">
                        {/* {recruit.keywordList.map((keyword, index) => ( */}
                        <span key="{index}">키워드가어디까지길어질수있나테스트중입니다</span>
                        <span key="{index}">키워드</span>
                        <span key="{index}">키워드</span>
                        {/* ))} */}
                    </div>

                    <div className="gap-2 d-flex">
                        <div>
                            <button
                                type="button"
                                className="btn-short1"
                                id="btn-stop"
                                data-recruit-no=""
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <strong>합격조회</strong>
                            </button>
                        </div>

                        <div className="d-flex justify-content-center m-1">
                            <strong style={{ color: '#024FDF' }}>FINDER</strong>
                        </div>
                    </div>
                </div>
            </div>
        </a>

    );
};

export default ContentListItem;
