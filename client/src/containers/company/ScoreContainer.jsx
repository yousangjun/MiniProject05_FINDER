import React, { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import ContentTitle from '../../components/resume/ContentTitle';
import Sidebar from '../../components/main/Sidebar';
import ContentHeader from '../../components/main/ContentHeader';
import KeywordItem from '../../components/main/KeywordItem';
import axios from 'axios';
import { postRecruit, getComToUserNo } from '../../apis/recruit/recruit.js'; // postRecruit 함수 import
import { LoginContext } from '../../contexts/LoginContextProvider';

function ScoreContainer() {
    const { userInfo } = useContext(LoginContext);
    const [keyword, setKeyword] = useState([]);
    const userNo = userInfo ? userInfo.userNo : null;
    const companyNo = useRef(null);

    const [resumes, setResumes] = useState([]);
    const [results, setResults] = useState({});

    const handleGetCompany = async () => {
        try {
            companyNo.current = await getComToUserNo(userInfo.userNo);
            console.log(companyNo.current.data.comNo,"comNo");
            // console.log(companyNo.current.data.comNo);
            if (companyNo) {

                const handleScoreList = async () => {
                    const response = await axios.get(`/company/score_com?comNo=${companyNo.current.data.comNo}`);
                    console.log(response.data.applyCvList);
                    setResumes(response.data.applyCvList);

                }

                handleScoreList()
            }
            // console.dir(companyNo.current.data.comNo);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    // 예를 들어 컴포넌트가 마운트될 때 이 함수를 호출하려면 useEffect 훅을 사용할 수 있습니다.
    useEffect(() => {
        if (userNo) {
            console.log(userNo,"userNo");
            handleGetCompany();
            

        }
    }, [userNo])


    const handleKeywordKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleKeywordKeyUp = (event) => {
        if (event.key === 'Enter') {
            const newKeyword = `#${event.target.value.trim()}`;
            if (newKeyword && newKeyword !== '#') {
                setKeyword((prevKeywords) => [...prevKeywords, newKeyword]);
                event.target.value = '';
            }
            console.log(keyword);
        }
    };

    const API_KEY = ''; // 여기에 API 키를 추가하세요.

    const handleEvaluate = async (resume, keyword) => {
        const keywordString = keyword.join(', ');
        console.log(keywordString);
        if (keyword.length > 0 ) {
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `${resume.coverLetter}이 자기소개서를 100점 만점으로 평가해주세요.
                                        무조건 점수만 응답해주세요.
                                        첫번째로 점수의 기준은 자기소개서는 '50자 이상', '한글 맞춤법을 준수할 경우', '외부 활동과 성취 내용이 있음', '전공 선택 이유와 성취 내용이 있음', 
                                        '지원 동기와 의지가 확실함' 에 해당하지 않는 경우 20점 이하의 낮은점수 이고. 
                                        두번째 점수의 기준은 "keyword : ${keywordString}"이 keyword와의 유사성을 평가하여 매우 엄격하게 평가해야 합니다.
                                        키워드와 유사성이 없으면 20점 이하의 낮은점수입니다. 두 기준을 각각 최고 50점씩 줄 수 있고 두 기준의 점수를 더한 값이 100점입니다. 
                                        만약 자기소개서가 빈 문자열이거나 null이면 0점을 주세요. 결과를 꼭 숫자로만 표현해주세요 꼭 숫자만 값이 나와야합니다. '예를들어 90점이면 90으로 표현' 
                                       `
                        }
                    ],
                    temperature: 1,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    }
                });
                console.log(response.data);
                console.log(response.data.choices[0].message.content);
                //////////////////////// 여기서 score cvNo으로 컨트롤러에 가져다주면 거기서 score appliy에 넣으면 될듯
                let score = response.data.choices[0].message.content;
                let newColor = 'black'

                if (score >= 86 && score <= 100) {
                    newColor = '#155ADC'; // 파란색
                } else if (score >= 70 && score <= 85) {
                    newColor = '#128246'; // 초록색
                } else if (score >= 60 && score <= 69) {
                    newColor = '#FFE039'; // 노란색
                } else if (score < 60) {
                    newColor = 'red';
                }

                setResults({
                    [resume.cvNo]: { score: score, color: newColor }
                });
                let timerInterval;
                Swal.fire({
                    width: 800,
                    html: `
                        <h1 style='font-weight:bold; margin-top:50px;'>👨‍💻 AI 이력서 평가 진행중 👩‍🚀</h1>
                        <div class='d-flex justify-content-center'>
                            <img src='/img/AI분석중.gif' width='720' />
                        </div>
                        <h3 style='font-weight:bold;'>${resume.user.userName}님의 이력서 분석을 시작합니다.</h3>
                    `,
                    timer: 10000,
                    timerProgressBar: true,
                    backdrop: `
                        rgba(0,0,0,0.7)
                        right center 
                        url("/img/AI_BOT.webp")
                        no-repeat
                    `,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getHtmlContainer().querySelector('b');
                        timerInterval = setInterval(() => {
                            if (timer) {
                                timer.textContent = Swal.getTimerLeft();
                            }
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                        Swal.fire({
                            html: `
                                <img src='http://localhost:3000/file/img/cv/${resume.cvNo}' width='200' style='margin: 0 auto 30px;' />
                                <h1 style='font-size: 28px; font-weight: bold;'>👨‍💼 ${resume.user.userName}님의 AI 이력서 점수 ✨</h1>
                                <h1 style='font-size: 40px'>
                                    <span style="font-size: 60px;" class="counter" data-count="${score}">0</span>
                                    점
                                </h1>
                            `,
                            width: 600,
                            padding: '3em',
                            color: '#716add',
                            confirmButtonText: '확인',
                            backdrop: `
                                rgba(0,0,0,0.7)
                                left top
                                no-repeat
                            `
                        });

                        countUp();
                    }
                });

            } catch (error) {
                alert('서버측 에러 발생');
            }
        } else {
            alert('키워드를 입력해주세요 !');
        }
    };

    const countUp = () => {
        document.querySelectorAll('.counter').forEach(counter => {
            const countTo = counter.getAttribute('data-count');
            let countNum = parseInt(counter.textContent, 10);

            const updateCount = () => {
                const increment = countTo / 100;
                countNum += increment;
                if (countNum < countTo) {
                    counter.textContent = Math.floor(countNum);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = countTo;
                }
            };

            updateCount();
        });
    };

    return (
        <>
            <ContentTitle SubTitle1="기업 정보" SubTitle2="앞으로의 길을 내다볼 때 필요한 건 아닌 판단이다." />
            <div className="row justify-content-center" style={{ padding: '0 40px' }}>
                <Sidebar />
                <main className="col-12 col-md-12 col-lg-8 main-content1 d-flex justify-content-end align-items-start">
                    <div className="job-listings1">
                        <ContentHeader ContentHeaderText="결제 내역" />
                        <div className="main-content">
                            <div style={{ marginBottom: '15px' }}>keyword</div>
                            <div className="item d-flex justify-content-between">
                                <div className="keyword-span" id="outputContainer">
                                    <KeywordItem keywords={keyword} />
                                </div>
                                <div className="gap-2 d-flex">
                                    <div className="d-flex justify-content-center">
                                        <div className="d-flex justify-content-center">
                                            <input
                                                type="text"
                                                name="keyword"
                                                id="keyword"
                                                className="PostJobKeyWord p-1"
                                                placeholder="keyword"
                                                onKeyDown={handleKeywordKeyDown}
                                                onKeyUp={handleKeywordKeyUp}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ol className="list-group">
                                <li className="list-group-item d-flex">
                                    <div style={{ width: '18%' }}>
                                        <strong style={{ fontSize: '20px' }}>지원자</strong>
                                    </div>
                                    <div className="w-25">
                                        <strong style={{ fontSize: '20px' }}>이력서 점수</strong>
                                    </div>
                                    <div style={{ width: '68%' }}>
                                        <strong style={{ fontSize: '20px' }}>지원 채용공고</strong>
                                    </div>
                                </li>

                                {resumes.length === 0 ? (
                                    <div style={{ minHeight: '300px', textAlign: 'center' }}>
                                        <h5 style={{ lineHeight: '300px' }}>조회된 이력서 정보가 없습니다.</h5>
                                    </div>
                                ) : (
                                    resumes.map((resume, index) => (
                                        <li key={resume.cvNo} className="list-group-item d-flex">
                                            <div className="d-flex align-items-center" style={{ width: '18%' }}>
                                                <div className="d-flex me-1" style={{ width: '13px' }}>
                                                    <strong>{index + 1}.</strong>
                                                </div>
                                                <div className="d-flex">
                                                    <a href={`/resume/cv_read_user?cvNo=${resume.cvNo}`} className="job-item-link name-link">
                                                        <span>{resume.user.userName}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="w-25" style={{ paddingTop: '5px' }}>
                                                <span>
                                                    <strong style={{ color: results[resume.cvNo]?.color || 'black' }}>
                                                        {results[resume.cvNo]?.score || ''}
                                                    </strong>
                                                </span>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{ width: '68%' }}>
                                                <div className="d-flex">
                                                    {resume.recruitPost.map((recruit) => (
                                                        <div key={index} className="me-2" style={{ paddingTop: '5px' }}>
                                                            <span>{recruit.recruitTitle}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn-in-short finder-btn"
                                                        onClick={() => handleEvaluate(resume, keyword)}
                                                        style={{ fontWeight: 'bold' }}
                                                    >
                                                        FINDER
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ol>
                        </div>
                    </div>
                </main>
                
            </div>
        </>
    );
}

export default ScoreContainer;
