import React, { useState, useEffect } from 'react';
import './css/DetailJobsUserContainer.css';

const DetailJobsUserContainer = () => {
  const [aeCount, setAeCount] = useState(0); // aeCount 임시 데이터
  const [recruitPost, setRecruitPost] = useState({
    company: { comName: '회사명' }, // 회사명 임시 데이터
    recruitTitle: '채용 제목', // 채용 제목 임시 데이터
    keywordList: [{ id: 1, recruitKeyword: '키워드1' }, { id: 2, recruitKeyword: '키워드2' }], // 키워드 목록 임시 데이터
    recruitResponsibilities: '담당업무 내용', // 담당업무 임시 데이터
    recruitQualifications: '자격조건 내용', // 자격조건 임시 데이터
    recruitPreferredQualifications: '우대사항 내용', // 우대사항 임시 데이터
    recruitContent: '추가 정보 내용' // 추가 정보 임시 데이터
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [fileList, setFileList] = useState([
    { id: 1, fileNo: '파일번호1' },
    { id: 2, fileNo: '파일번호2' }
  ]); // 파일 목록 임시 데이터

  const [companyDetail, setCompanyDetail] = useState({
    thumbnail: { fileNo: '썸네일 파일번호' }, // 썸네일 파일 번호 임시 데이터
    comBirth: '업력 연차' // 업력 연차 임시 데이터
  });

  const [user, setUser] = useState({}); // 사용자 데이터 (임시로 비어있음)



  useEffect(() => {
    // fetchData(); // 데이터 요청 함수 주석 처리
  }, []);

  // const fetchData = async () => {
  //   try {
  //     // axios를 사용하여 데이터를 가져옵니다. 예시 URL은 /api/recruit/detail_jobs_user입니다.
  //     const response = await axios.get('/api/recruit/detail_jobs_user');
  //     const data = response.data;

  //     // 데이터를 상태 변수에 설정합니다.
  //     setAeCount(data.aeCount);
  //     setRecruitPost(data.recruitPost);
  //     setResumeList(data.resumeList);
  //     setFileList(data.fileList);
  //     setCompanyDetail(data.companyDetail);
  //     setUser(data.user);
  //   } catch (error) {
  //     console.error('데이터 가져오기 실패:', error);
  //   }
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // 폼 제출 로직 추가
  };

  const deleteCv = (cvNo, event) => {
    event.stopPropagation();
    event.preventDefault();
    // 이력서 삭제 로직 추가
  };

  // 임시로 hasRole 함수를 정의하여 권한 체크
  const hasRole = (role) => {
    // 여기에 권한 체크 로직을 구현
    // 사용자 정보 등 state 참조하여 권한 판단
    return true; // 임시로 모든 사용자 권한 부여
  };


  const openModal = () => {
    setModalOpen(true);
  };


  
  return (
    <>
      <div className="w-100 d-flex justify-content-center">
        <div className="container-fluid container row" style={{ height: 'auto' }}>
          {/* 좌측 컨텐츠 */}
          <div className="col-md-12 col-lg-9 order-2 order-lg-1">
            {/* 상세 정보 헤더 */}
            <div className="wrapper d-flex flex-column">
              <div className="detail-header">
                {/* 로고 및 회사 정보 */}
                <div className="detail-logo d-flex justify-content-start">
                  {/* 썸네일 이미지 */}
                  <img
                    src={companyDetail ? `/file/img/${companyDetail.thumbnail.fileNo}` : '/img/no-image.png'}
                    alt="썸네일"
                    width="100px"
                    height="100px"
                  />
                  {/* 회사명 */}
                  <span style={{ fontSize: '14px' }}>{recruitPost.company?.comName}</span>
                  {/* 채용 제목 */}
                  <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{recruitPost.recruitTitle}</span>
                </div>
                {/* 키워드 목록 */}
                <div className="item d-flex justify-content-between">
                  <div className="keyword-span">
                    {recruitPost.keywordList?.map((keyword) => (
                      <span key={keyword.id}>{keyword.recruitKeyword}</span>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="my-5" />
              {/* 상세 정보 섹션 */}
              <div className="sec_detail d-flex flex-column justify-content-start">
                {/* 담당업무 */}
                <div className="detail-box01">
                  <span style={{ fontSize: '17px', fontWeight: 'bold', marginRight: '72px' }}>담당업무</span>
                  <span style={{ fontSize: '14px' }}>{recruitPost.recruitResponsibilities}</span>
                </div>
                {/* 자격조건 */}
                <div className="detail-box02">
                  <span style={{ fontSize: '17px', fontWeight: 'bold', marginRight: '72px' }}>자격조건</span>
                  <span style={{ fontSize: '14px' }}>{recruitPost.recruitQualifications}</span>
                </div>
                {/* 우대사항 */}
                <div className="detail-box03">
                  <span style={{ fontSize: '17px', fontWeight: 'bold', marginRight: '72px' }}>우대사항</span>
                  <span style={{ fontSize: '14px' }}>{recruitPost.recruitPreferredQualifications}</span>
                </div>
              </div>
              {/* 추가 정보 및 버튼 */}
              <div className="row d-flex justify-content-start" style={{ margin: '44px 26px', height: 'auto' }}>
                {/* 추가 정보 */}
                <div>
                  <p>{recruitPost.recruitContent}</p>
                </div>
                {/* 파일 목록 */}
                {fileList.map((file) => (
                  <div key={file.id}>
                    <img src={`/file/img/${file.fileNo}`} alt="파일 썸네일" style={{ width: '100%' }} />
                  </div>
                ))}
                {/* 회사 상세 정보 */}
                {companyDetail && (
                  <div className="d-flex justify-content-center">
                    <div className="company-introduce d-flex flex-column w-75">
                      {/* 회사 정보 */}
                      <div className="row">
                        <div className="d-flex flex-column row-gap-3 col-3">
                          <img src="/img/연차1.png" alt="업력연차" style={{ width: '8vw', padding: '26px 12px 10px' }} />
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              readOnly
                              className="form-control-plaintext"
                              id="floatingPlaintextInput"
                              placeholder=""
                              value={`${companyDetail.comBirth} 년`}
                            />
                            <label htmlFor="floatingPlaintextInput" style={{ textAlign: 'center' }}>업력 연차</label>
                          </div>
                        </div>
                        {/* 기타 회사 정보들... */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 지원하기 / 뒤로가기 버튼 */}
          <div className="col-md-12 col-lg-3 order-1 order-lg-2">
            <div className="d-flex flex-row flex-lg-column job_notice_detail a-wrapper" style={{ position: 'sticky', top: '130px', right: '50px' }}>
              {hasRole('ROLE_USER') && (
                <button
                  type="button"
                  className="detail-form w-100"
                  id="ae-btn"
                  onClick={openModal}
                  style={{ backgroundColor: '#004ea0', fontWeight: 'bold', border: 'transparent' }}
                >
                  지원하기
                </button>
              )}
              {/* 뒤로 가기 버튼 */}
              <a
                href="javascript:history.back()"
                className="detail-form w-100"
                style={{ backgroundColor: '#fff', color: '#000000E6', border: '1px solid #aaa', fontWeight: 'bold' }}
              >
                뒤로가기
              </a>
            </div>

            {modalOpen && (
            <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">이력서를 지원하시려면 회원가입을 해주세요.</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
                    </div>
                </div>
                </div>
            </div>
            )}
            {aeCount !== null && aeCount === 0 && (
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                  <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">이미 지원한 채용 공고입니다.</h1>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailJobsUserContainer;
