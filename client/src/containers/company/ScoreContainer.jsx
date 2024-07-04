import React, { useState } from 'react';

function ScoreContainer() {
  const [keywords, setKeywords] = useState([]);
  const [resumes, setResumes] = useState([
    // 샘플 데이터, 실제 데이터로 교체 필요
    { id: 1, userName: 'John Doe', coverLetter: '샘플 자기소개서', cvNo: 'cv123' },
    // 필요한 만큼 더 많은 샘플 이력서 추가
  ]);
  const [scores, setScores] = useState({});

  const handleKeywordEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputValue = event.target.value.trim();
      if (inputValue) {
        setKeywords([...keywords, inputValue]);
        event.target.value = '';
      }
    }
  };

  const handleEvaluate = async (resume, index) => {
    const inputKeywords = keywords.join(' ');
    if (!inputKeywords) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const API_KEY = ''; // 여기에 API 키 입력
    if (!API_KEY) {
      alert('API 키를 입력해주세요!');
      return;
    }

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${resume.coverLetter} 자기소개서를 100점 만점으로 평가해주세요.
          무조건 점수만 응답해주세요.
          자기소개서는 '50자 이상이어야 하며', '한글 맞춤법을 준수할 경우', '외부 활동과 성취 내용이 있는 경우', '전공 선택 이유와 성취 내용이 있는 경우', 
          '지원 동기와 의지가 확실한 경우' 에 해당하지 않는 경우 점수를 줄 수 없습니다. 나머지 점수는 아래 키워드와의 유사성을 평가하여 매우 엄격하게 평가해야 합니다. 키워드와 유사성이 없으면 최하점을 주어야합니다.
          '디자이너' 라는 글자가 들어가면 점수는 30점입니다.
          만약 자기소개서가 빈 문자열이거나 null이면 0점을 주세요. 결과를 꼭 숫자로만 표현해주세요 꼭 숫자만 값이 나와야합니다. '예를들어 90점이면 90으로 표현' ${inputKeywords}`
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        const score = result.choices[0].message.content.trim();
        setScores(prevScores => ({ ...prevScores, [index]: score }));
        alert(`${resume.userName}님의 이력서 점수: ${score}점`);
      } else {
        alert('서버 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI 평가</h1>
        <p>새로운 길을 만드는 여정에 함께하세요.</p>
      </div>

      <div className="sidebar">
        <h2>마이페이지</h2>
        <ul>
          <li><a href="/company/introduce_com">기업 소개</a></li>
          <li><a href="/user/update_user">담당자 정보 수정</a></li>
          <li><a href="/company/credit/credit_list_com">결제 내역</a></li>
          <li><a href="/recruit/post_jobs_com">채용공고 등록</a></li>
          <li><a href="/recruit/posted_jobs_com">등록한 채용공고</a></li>
          <li><a href="/recruit/recruit_list_com">제출된 이력서</a></li>
          <li><a href="/company/score_com">AI 간편 평가</a></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="keyword-input">
          <input type="text" onKeyDown={handleKeywordEnter} placeholder="키워드 입력 후 Enter" />
          <div className="keywords">
            {keywords.map((keyword, index) => (
              <span key={index} className="keyword">{`#${keyword}`}</span>
            ))}
          </div>
        </div>

        <div className="resume-list">
          {resumes.length === 0 ? (
            <p>조회된 이력서 정보가 없습니다.</p>
          ) : (
            <ul>
              {resumes.map((resume, index) => (
                <li key={resume.id} className="resume-item">
                  <div className="resume-info">
                    <strong>{index + 1}. {resume.userName}</strong>
                    <p>{resume.coverLetter}</p>
                  </div>
                  <div className="resume-score">
                    <strong>{scores[index]}</strong>
                  </div>
                  <button onClick={() => handleEvaluate(resume, index)}>평가</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScoreContainer;
