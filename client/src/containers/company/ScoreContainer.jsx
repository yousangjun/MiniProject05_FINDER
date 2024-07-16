import React, { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import ContentTitle from '../../components/resume/ContentTitle';
import Sidebar from '../../components/main/Sidebar';
import ContentHeader from '../../components/main/ContentHeader';
import KeywordItem from '../../components/main/KeywordItem';
import axios from 'axios';
import { getComToUserNo } from '../../apis/recruit/recruit.js'; // postRecruit 함수 import
import { LoginContext } from '../../contexts/LoginContextProvider';

function ScoreContainer() {
    const { userInfo } = useContext(LoginContext);
    const [keyword, setKeyword] = useState([]);
    const userNo = userInfo ? userInfo.userNo : null;
    const companyNo = useRef(null);

    const [resumes, setResumes] = useState([]);
    const [scores, setScores] = useState([]);


    useEffect(() => {
        if (userNo) {
            const handleGetCompany = async () => {
                try {
                    companyNo.current = await getComToUserNo(userInfo.userNo);
                    console.log(companyNo.current.data.comNo, "comNo");
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
            handleGetCompany();
            console.log("언제돌아?1");
        }
    }, [userNo])

    useEffect(() => {
        console.log("언제돌아?2");
        const calculatedScores = resumes.map((resume) => resume.score);
        console.log(calculatedScores);
        setScores(calculatedScores);
    }, [resumes]);


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

    const handleEvaluate = async (resume, keyword, index) => {
        const keywordString = keyword.join(', ');
        console.log(keywordString);
        if (keyword.length > 0) {
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `
                            ${resume.coverLetter}
                            Please evaluate the self-introduction letter out of 100 points.

                            ### First Criteria (up to 70 points):
                            1. The self-introduction must be at least 50 characters long.
                            2. It must comply with Korean spelling rules.
                            3. It should include external activities and achievements.
                            4. It should explain the reasons for choosing the major and related achievements.
                            5. It should clearly state the motivation and determination to apply.

                            If any of these criteria are not met, give a score of 20 or lower.

                            ### Second Criteria (up to 30 points):
                            Strictly evaluate the similarity with the "keyword: ${keywordString}".

                            If there is no similarity with the keyword, give a score of 10 or lower.

                            ### Total Score:
                            Combine the scores from both criteria for the final score. Express the total score as a number only, even if the score is "0".

                            **Important:** Provide the result as a single number only, without any additional text. For example, if the score is "90 points", represent it as "90".

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

                let score = response.data.choices[0].message.content;
                setResumes(prevResumes => {
                    const newResumes = [...prevResumes]; // 배열 복사 (얕은 복사)
                    newResumes[index] = { ...newResumes[index], score: score }
                    return newResumes;
                })


                // setInitialScores(null);
                // setResults({
                //     [resume.cvNo]: { score: score }
                // });

                try {
                    console.log(resume.applyNo, " aN ", score, " sco ", resume.cvNo, " cv ");
                    const result = await axios.get('/company/score', {
                        params: {
                            applyNo: resume.applyNo,
                            score: score,
                            cvNo: resume.cvNo
                        }
                    });
                    console.log(result.data);
                } catch (error) {
                    console.error(error);
                }

                //////////////////////// 여기서 score cvNo으로 컨트롤러에 가져다주면 거기서 score appliy에 넣으면 될듯

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

    const handleALLEvaluate = async (resumes, keyword) => {
        const keywordString = keyword.join(', ');
        const combinedString = resumes.map((resumes) => `${resumes.cvNo} - ${resumes.coverLetter}`).join('\n' + '/' + '\n');


        console.log(keywordString);
        console.log(combinedString);

        // console.log(coverLetterString);

        if (keyword.length > 0) {
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `      
                            ${combinedString}
                            Please evaluate each user's cover letter out of 100 points. Users and their cover letters are separated by "/". Provide the results in order.
                            
                            ### First Criteria (up to 70 points):
                            1. The cover letter must be at least 50 characters long.
                            2. It must comply with Korean spelling rules.
                            3. It should include external activities and achievements.
                            4. It should explain the reasons for choosing the major and related achievements.
                            5. It should clearly state the motivation and determination to apply.
                            
                            If any of these criteria are not met, give a score of 20 or lower.
                            
                            ### Second Criteria (up to 30 points):
                            Strictly evaluate the similarity with the "keyword: ${keywordString}".
                            
                            If there is no similarity with the keyword, give a score of 10 or lower.
                            
                            ### Total Score:
                            Combine the scores from both criteria for the final score. Express the total score as a number only, even if the score is "0".
                            
                            **Important:** Provide the result as a single number only, without any additional text. For example, if the score is "90", represent it as "90".
                            Provide the final scores for all users separated by commas, without spaces.
                                     `
                        }
                    ],
                    temperature: 1,
                    max_tokens: 512,
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
                let scoreArray = score.split(',').map(Number)

                setResumes(prevResumes => {
                    const newResumes = prevResumes.map((resume, index) => {
                        return { ...resume, score: scoreArray[index] }; // 각 resume 객체의 score 업데이트
                    });
                    return newResumes; // 새로운 상태 반환
                });

                const params = new URLSearchParams();
                resumes.forEach((resume) => {
                    params.append('applyNoList', resume.applyNo);
                    params.append('cvNoList', resume.cvNo);
                });
                scoreArray.forEach(score => params.append('scoreList', score));

                try {
                    const result = await axios.get('/company/scoreList', { params });
                    console.log(result.data);
                } catch (error) {
                    console.error(error);
                }

                let timerInterval;
                Swal.fire({
                    width: 800,
                    html: `
                        <h1 style='font-weight:bold; margin-top:50px;'>👨‍💻 AI 이력서 평가 진행중 👩‍🚀</h1>
                        <div class='d-flex justify-content-center'>
                            <img src='/img/AI분석중.gif' width='720' />
                        </div>
                        <h3 style='font-weight:bold;'>전체 이력서 분석을 시작합니다.</h3>
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
                                <h1 style='font-size: 28px; font-weight: bold;'>👨‍💼 모든 사용자의 AI 이력서 점수가 발표되었습니다.✨</h1>
                                <h1 style='font-size: 40px'>
                                    <span style="font-size: 60px;" class="counter" >성공!</span>
                                    
                                </h1>
                            `,
                            width: 800,
                            padding: '3em',
                            color: '#716add',
                            confirmButtonText: '확인',
                            backdrop: `
                                rgba(0,0,0,0.7)
                                left top
                                no-repeat
                            `
                        });

                        // countUp();
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
                            <div className="item d-flex justify-content-between" style={{marginBottom: "10px"}}>
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
                                    <div style={{ width: '25%' }}>
                                        <strong style={{ fontSize: '20px' }}>지원자</strong>
                                    </div>
                                    <div className="w-25">
                                        <strong style={{ fontSize: '20px' }}>이력서 점수</strong>
                                    </div>
                                    <div style={{ width: '68%' }}>
                                        <strong style={{ fontSize: '20px' }}>지원 채용공고</strong>
                                    </div>
                                    <div >
                                        <button
                                            className="btn-in-short finder-btn"
                                            onClick={() => handleALLEvaluate(resumes, keyword)}
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            전체조회
                                        </button>
                                    </div>
                                </li>

                                {resumes.length === 0 ? (
                                    <div style={{ minHeight: '300px', textAlign: 'center' }}>
                                        <h5 style={{ lineHeight: '300px' }}>조회된 이력서 정보가 없습니다.</h5>
                                    </div>
                                ) : (

                                    resumes.map((resume, index) => {

                                        let score = resume.score

                                        let newColor = 'black';

                                        if (scores && scores.length > 0) {
                                            score = scores[index]; // scores 배열에서 점수 가져오기
                                            console.log(scores);
                                        }
                                        // else {
                                        //     score = results[resume.cvNo]?.score || ' '; // results 객체에서 점수 가져오기
                                        //     console.log(score, ": result 어떻게되있음??");
                                        // }
                                        if (score >= 86 && score <= 100) {
                                            newColor = '#155ADC'; // 파란색
                                        } else if (score >= 70 && score <= 85) {
                                            newColor = '#128246'; // 초록색
                                        } else if (score >= 60 && score <= 69) {
                                            newColor = '#FFE039'; // 노란색
                                        } else if (score < 60) {
                                            newColor = 'red';
                                        }

                                        return (
                                            <li key={resume.cvNo} className="list-group-item d-flex">
                                                <div className="d-flex align-items-center" style={{ width: '26%' }}>
                                                    <div className="d-flex me-1" style={{ width: '13px' }}>
                                                        <strong>{index + 1}.</strong>
                                                    </div>
                                                    <div className="d-flex">
                                                        <a href={`/resume/cvead_user/${resume.cvNo}`} className="job-item-link name-link">
                                                            <span>{resume.user.userName}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="w-25" style={{ paddingTop: '5px' }}>
                                                    <span>
                                                        <strong style={{ color: newColor }}>{score !== null ? score : ''}</strong>
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between" style={{ width: '80%' }}>
                                                    <div className="d-flex">
                                                        {resume.recruitPost.map((recruit, recruitIndex) => (
                                                            <div key={recruitIndex} className="me-2" style={{ paddingTop: '5px' }}>
                                                                <span>{recruit.recruitTitle}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="btn-in-short finder-btn"
                                                            onClick={() => handleEvaluate(resume, keyword, index)}
                                                            style={{ fontWeight: 'bold' }}
                                                        >
                                                            FINDER
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })

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
