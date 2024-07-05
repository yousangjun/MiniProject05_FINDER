import React, { useState } from 'react';
import RecruitListBtn from '../recruit/RecruitListBtn';
import { Link } from 'react-router-dom';
import KeywordItem from './KeywordItem';

const ContentListItem = ({ recruit, ContentListItemText, ShowBtn, LinkToHref, cv, myCv }) => {
    const [keyword, setKeyword] = useState([])

    const keywordsArray = recruit?.keywordString?.split(", ") ?? [];




    // console.log(recruit);

    return (

        <Link
            to={LinkToHref}
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
                    <span>
                        {recruit &&
                            recruit.recruitRegDate
                        }
                        {cv &&
                            cv.recruitPost[0].recruitTitle
                        }
                    </span>
                </div>

                <div style={{ fontSize: '17px', marginBottom: '15px', fontWeight: 'bold' }}>
                    {recruit &&
                        recruit.recruitTitle
                    }
                    {cv &&
                        cv.cvTitle
                    }
                    {myCv &&
                        myCv.cvTitle
                    }
                </div>

                <div className="item d-flex justify-content-between">

                    <div className="keyword-span1">
                        {recruit !== null &&
                            <KeywordItem keywords={keywordsArray} />
                        }
                        {cv &&

                            <div className="span-wrapper">
                                <span>{cv.user.userName}</span>
                                <span>{cv.user.userGender}</span>
                                <span>{cv.user.userEmail}</span>
                            </div>
                        }
                        {myCv &&
                            <div className="span-wrapper">
                                <span>{myCv.user.userName}</span>
                                <span>{myCv.user.userGender}</span>
                                <span>{myCv.user.userEmail}</span>
                            </div>
                        }
                    </div>

                    <div className="gap-2 d-flex">
                        {ShowBtn &&
                            <RecruitListBtn ContentListItemText={ContentListItemText} />
                        }

                        <div className="d-flex justify-content-center m-1">
                            <strong style={{ color: '#024FDF' }}>FINDER</strong>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default ContentListItem;
