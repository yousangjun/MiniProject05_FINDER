import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as recruitApi from '../../apis/recruit/recruit.js'
import './css/DetailJobsUserContainer.css';
import { LoginContext } from '../../contexts/LoginContextProvider';

const DetailJobsUserContainer = () => {
  const { userInfo, roles } = useContext(LoginContext);
  const { setNewRecruitNo } = useContext(LoginContext);
  const { newRecruitNo } = useContext(LoginContext);
  const { recruitNo } = useParams('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const textareaRef = useRef(null); // useRef 훅을 사용하여 ref 생성
  const userNo = userInfo ? userInfo.userNo : null;
  // console.log(userInfo.userNo);


  useEffect(() => {
    if (userNo) {

      recruitApi.jobDetails(recruitNo)
        .then(response => {
          // 성공적으로 데이터를 받아왔을 때 처리
          setThumbnail(response.data.Thumbnail);
          setCompanyDetail(response.data.companyDetail);
          setRecruitPost(response.data.recruitPost);
          setFileList(response.data.fileList);
          adjustTextareaHeight()

          // 최근 본 채용공고
          setNewRecruitNo(prevRecruits => {
            // recruitNo가 이전 배열에 존재하지 않는 경우에만 추가
            if (!prevRecruits.includes(recruitNo)) {
              return [...prevRecruits, recruitNo];
            }
            // 중복된 경우 이전 상태를 그대로 반환
            return prevRecruits;
          });
          console.log(newRecruitNo + "?????? newRecruit");
        })
        .catch(error => {
          // 에러 발생 시 처리
          console.error('Error fetching job details:', error);
        });
    }

  }, [userNo]);

  useLayoutEffect(() => {
    adjustTextareaHeight();
    window.addEventListener('resize', adjustTextareaHeight);

    return () => {
      window.removeEventListener('resize', adjustTextareaHeight);
    }
  }, []);

  const [aeCount, setAeCount] = useState(0);
  const [resumeList, setResumeList] = useState([

    {
      cvNo: 1,
      cvTitle: '이력서 1',
      userBirth: '1990',
      userGender: '남성',
      userName: '홍길동'
    },
    {
      cvNo: 2,
      cvTitle: '이력서 2',
      userBirth: '1992',
      userGender: '여성',
      userName: '김영희'
    }

  ]);
  const [recruitPost, setRecruitPost] = useState({
    company: { comName: '용달' },
    recruitTitle: '리액트 2명 타세요',
    keywordList: [{ id: 1, recruitKeyword: '키워드1' }, { id: 2, recruitKeyword: '키워드2' }],
    recruitResponsibilities: '담당업무 내용',
    recruitQualifications: '자격조건 내용',
    recruitPreferredQualifications: '우대사항 내용',
    recruitContent: '추가 정보 내용'
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [focusedCvNo, setFocusedCvNo] = useState('');
  const [user, setUser] = useState({});
  const [companyDetail, setCompanyDetail] = useState({
    comBirth: '5년',
    comSize: '대기업',
    comEmpCount: '500명',
    comSales: '1000억'
  });
  const [thumbnail, setThumbnail] = useState([]);
  const [fileList, setFileList] = useState([])


  function adjustTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 기본 높이로 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // 실제 내용의 높이로 설정
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }

  // 이력서 제출
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!focusedCvNo) {
      alert('이력서를 선택해주세요.');
      return;
    }
    // try {
    //   const response = await axios.post('/recruit/detail_jobs_user/submitCv', {
    //     focusedCvNo,
    //     aeCount,
    //     recruitNo: recruitPost.recruitNo
    //   });
    //   if (response.data.success) {
    //     alert('제출 성공');
    //   } else {
    //     alert('제출 실패');
    //   }
    // } catch (error) {
    //   console.error('제출 오류:', error);
    //   alert('제출 중 오류가 발생했습니다.');
    // }
  };

  // 이력서 삭제
  const deleteCv = async (cvNo, event) => {
    event.stopPropagation();
    event.preventDefault();
    // try {
    //   const response = await axios.post(`/recruit/detail_jobs_user/${cvNo}`);
    //   if (response.data.success) {
    //     alert('삭제되었습니다.');
    //     setResumeList(resumeList.filter(resume => resume.cvNo !== cvNo));
    //   } else {
    //     alert('삭제가 불가능합니다!');
    //   }
    // } catch (error) {
    //   console.error('삭제 오류:', error);
    //   alert('삭제 중 오류가 발생했습니다.');
    // }
  };


  return (
    <>
      <div className="w-100 d-flex justify-content-center">
        <div className="container-fluid container row" style={{ height: 'auto' }}>

          <div className="col-md-12 col-lg-9 order-2 order-lg-1">

            <div className="wrapper d-flex flex-column">
              <div className="detail-header ">
                <div className="detail-logo justify-content-start flex-column">
                  <div>
                    <img src={thumbnail ? `/file/img/${thumbnail.fileNo}` : '/img/no-image.png'} alt="썸네일" style={{width:"100px", height:"100px"}} />
                  </div>
                  <div>
                    <span style={{ fontSize: '14px' }}>{recruitPost.company?.comName}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{recruitPost.recruitTitle}</span>
                  </div>
                </div>
                <div className="item d-flex justify-content-between">
                  <div className="keyword-span-detail">
                    {recruitPost.keywordList?.map((keyword, index) => (
                      <span key={index}>{keyword.recruitKeyword}</span>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              <div className="sec_detail d-flex flex-column justify-content-start">
                <div className="detail-box01">
                  <span style={{ fontSize: '17px', fontWeight: 'bold', marginRight: '72px' }}>담당업무</span>
                  <span style={{ fontSize: '14px' }}>{recruitPost.recruitResponsibilities}</span>
                </div>
                <div className="detail-box02">
                  <span style={{ fontSize: '17px', fontWeight: 'bold', marginRight: '72px' }}>자격조건</span>
                  <span style={{ fontSize: '14px' }}>{recruitPost.recruitQualifications}</span>
                </div>
                <div className="detail-box03">
                  <span style={{ fontSize: '17px', fontWeight: 'bold', marginRight: '72px' }}>우대사항</span>
                  <span style={{ fontSize: '14px' }}>{recruitPost.recruitPreferredQualifications}</span>
                </div>
              </div>


              <div className="row d-flex justify-content-start" style={{ margin: '44px 26px', height: 'auto' }}>
                <div>
                  <p>{recruitPost.recruitContent}</p>
                </div>
                {fileList &&
                  fileList.map((file) => (
                    <div key={file.fileNo}>
                      <img src={`/file/img/${file.fileNo}`} alt="파일 썸네일" style={{ width: '100%' }} />
                    </div>
                  ))
                }
                {companyDetail && (
                  <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column w-75">
                      <div className="row">
                        <div className="d-flex flex-column row-gap-3 col-3">
                          <img src="/img/연차1.png" alt="업력연차" style={{ width: '8vw', padding: '26px 12px 10px' }} />
                          <div className="form-floating mb-3">
                            <input type="text" readOnly className="form-control-plaintext" id="floatingPlaintextInput" value={`${companyDetail.comBirth}년`} />
                            <label htmlFor="floatingPlaintextInput">업력 연차</label>
                          </div>
                        </div>
                        <div className="d-flex flex-column row-gap-3 col-3">
                          <img src="/img/대기업1.png" alt="기업규모" style={{ width: "8vw", padding: "26px 12px 10px" }} />
                          <div className="form-floating mb-3">
                            <input type="text" readOnly className="form-control-plaintext" id="floatingPlaintextInput" value={`${companyDetail.comSize}`} />
                            <label htmlFor="floatingPlaintextInput">기업 규모</label>
                          </div>
                        </div>
                        <div className="d-flex flex-column row-gap-3 col-3">
                          <img src="/img/사원수1.png" alt="사원수" style={{ width: "8vw", padding: "26px 12px 10px" }} />
                          <div className="form-floating mb-3">
                            <input type="text" readOnly className="form-control-plaintext" id="floatingPlaintextInput" value={`${companyDetail.comEmpCount}명`} />
                            <label htmlFor="floatingPlaintextInput">사원 수</label>
                          </div>
                        </div>
                        <div className="d-flex flex-column row-gap-3 col-3">
                          <img src="/img/매출액1.png" alt="매출액" style={{ width: "8vw", padding: "26px 12px 10px" }} />
                          <div className="form-floating mb-3">
                            <input type="text" readOnly className="form-control-plaintext" id="floatingPlaintextInput" value={`${companyDetail.comSales}`} />
                            <label htmlFor="floatingPlaintextInput">매출액</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between introduce-col2 mb-3" style={{ columnGap: "25px" }}>
                        <div className="d-flex w-100">
                          <div className="col-3">
                            <label htmlFor="" style={{ fontWeight: "bold" }}>회사이름</label>
                          </div>
                          <div className="col-9">
                            <span> {companyDetail.company && companyDetail.company.comName} </span>
                          </div>
                        </div>
                        <div className="d-flex w-100">
                          <div className="col-3">
                            <label htmlFor="com_represent" style={{ fontWeight: "bold" }}>대표명</label>
                          </div>
                          <div className="col-9">
                            <span>{companyDetail.comRepresent}</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between introduce-col2 mb-3" style={{ columnGap: "25px" }}>
                        <div className="d-flex w-100">
                          <div className="col-3">
                            <label htmlFor="com_category" style={{ fontWeight: "bold" }}>업종</label>
                          </div>
                          <div className="col-9">
                            <span>{companyDetail.company && companyDetail.company.comCategory}</span>
                          </div>
                        </div>
                        <div className="d-flex w-100">
                          <div className="col-3">
                            <label htmlFor="com_address" style={{ fontWeight: "bold" }}>주소</label>
                          </div>
                          <div className="col-9">
                            <span>{companyDetail.company && companyDetail.company.comAddress}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-100 introduce-col4">
                        <div className="form-floating mb-3">
                          <textarea ref={textareaRef} readOnly className="form-control-plaintext textarea-comContent" id="floatingPlaintextInput" value={`${companyDetail.comContent}`} style={{ overflowY: "hidden", resize: "none", color: "#475067", height: textareaHeight }}></textarea>
                          <label htmlFor="floatingPlaintextInput">기술 소개</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="col-md-12 col-lg-3 order-1 order-lg-2">
            <div className="d-flex flex-row flex-lg-column job_notice_detail a-wrapper" style={{ position: 'sticky', top: '130px', right: '50px' }}>
              {!roles.isCompany && (
                <Button variant="primary" onClick={() => setModalOpen(true)} className="detail-form w-100" id="ae-btn" style={{ backgroundColor: '#004ea0', fontWeight: 'bold', border: 'transparent' }}>
                  지원하기
                </Button>
              )}
              <Link to="#" onClick={() => window.history.back()} className="detail-form w-100" style={{ backgroundColor: '#fff', color: '#000000E6', border: '1px solid #aaa', fontWeight: 'bold' }}>
                뒤로가기
              </Link>
            </div>
          </div>

        </div>
      </div>


      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered scrollable size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{aeCount === null ? '이력서를 지원하시려면 회원가입을 해주세요.' : aeCount !== 0 ? '이미 지원한 채용공고입니다.' : '이력서 선택'}</Modal.Title>
        </Modal.Header>
        {aeCount === 0 && (
          <form onSubmit={handleFormSubmit}>
            <Modal.Body style={{ textAlign: 'center' }}>
              <strong>{recruitPost.recruitTitle}</strong>
              <br />
              {resumeList.length === 0 ? (
                <div>
                  <span>조회된 이력서 정보가 없습니다.</span>
                </div>
              ) : (
                resumeList.map((resume) => (
                  <div key={resume.cvNo} className="job-item-link modal-list-detail" id={`cv_${resume.cvNo}`} onClick={() => setFocusedCvNo(resume.cvNo)}>
                    <div className="job-item-detail d-flex flex-column" tabIndex="0">
                      <div style={{ width: '38px; height: 15px;' }}>
                        {/* new 자리 */}
                      </div>
                      <div className="item d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="mb-3" style={{ fontSize: '19px', fontWeight: 'bold' }}>{resume.cvTitle}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '16px' }} className="row">
                        <div className="d-flex">
                          <div style={{ width: '100%' }} className="d-flex">
                            <span>{user.userBirth}</span>
                            <span>/</span>
                            <span>{user.userGender}</span>
                            <span>/</span>
                            <span>{user.userName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="item d-flex justify-content-between">
                        <div className="keyword-span">
                          {recruitPost.keywordList.map((keyword) => (
                            <span key={keyword.id}>{keyword.recruitKeyword}</span>
                          ))}
                        </div>
                        <div className="gap-2 d-flex">
                          <div>
                            <button type="button" className="btn-short" onClick={(event) => deleteCv(resume.cvNo, event)}>
                              <strong>삭제</strong>
                            </button>
                          </div>
                          <div className="d-flex justify-content-center m-1">
                            <strong style={{ color: '#024FDF' }}>FINDER</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className="btn-short">
                제출
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </>
  );
};

export default DetailJobsUserContainer;
