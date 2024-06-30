import React from 'react'
import './css/CvCreate_user.css'

const CvCreate_user = () => {
  return (
    <>
    <form action="/resume/cvUpdate_user" method='POST' encType='multipart/form-data' style={{marginTop: '20px'}}>
        <div className="container-fluid container resume-form">
            <div className="form-group col-12 Title">
                <span className='Title2'>
                    제목
                </span>
                <input type="text" name="cvTitle" id="title" className='form-controller Title3' placeholder='제목을 입력해주세요'/>
            </div>
        {/* 토큰 있는 자리였음 */}

        <div className="d-flex">
            <div className="form-group col-6" style={{ width: 'calc(100% - 250px)' }}>
                <div className="row">
                    <div className="form-group col-12">
                        <p typeof='text' className=" userName" id='name' placeholder='이름'>이름</p>
                    </div>
                    <div className="form-group col-12">
                        <p typeof='text' className="userAge" id='age' placeholder='나이'>생년월일</p>
                    </div>
                    <div className="form-group col-12">
                        <p typeof='text' className=" userEmail" id='email' placeholder='이메일'>이메일</p>
                    </div>
                    <div className="form-group col-12">
                        <p typeof='text' className=" userPhone" id='phone' placeholder='전화'>폰</p>
                    </div>
                </div>
            </div>

            <div className="profile-pic col-6 userImgTitle">
                <div id='preview' className='preview'>
                    <img src="" alt="썸네일에 따라 다르게 올라가야함" className='img-thumbnail' />
                </div>

                <div className='ImgFile'>
                    <input type="file" name="imgUploadFile" id="thumbnail" accept='image/png, imgage/jpeg' style={{display: 'none'}} />
                    <button className='btn-long imgFile-input' type='button' id='imgUploadBtn'>사진 선택</button>
                </div>
            </div>
          </div>
          <div className="form-group row w-100 flex-column ms-1"> 
            <div className="col-sm-12 border bg-light rounded-3" style={{ border: 'none', '--bs-bg-opacity': 0, paddingLeft: 0 }}>
                <div className="d-flex justify-content-between mt-3" style={{ marginTop: '30px !important' }}>
                    <h5 style={{ fontWeight: 'bold', fontSize: '22px', marginLeft: '10px' }}>학력</h5>
                    <button type="button" className="educationBtn btn-short" style={{ width: '80px', background: 'none', justifyContent: 'flex-end', marginBottom: '7px' }}>
                    <span className="fs-2 more_btn"></span>
                    </button>
                </div>

                <div>
                    <hr color="#eee" style={{ margin: '5px 0 20px', borderColor: '#d7dce5', opacity: 1 }} />
                </div>

                <div>
                    <div className="col-12 d-flex" style={{ marginLeft: '1%' }}>
                    <div className="form-group col-3" style={{ width: '33%' }}>
                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>학교</span>
                        <input type="text" className="form-control w-75" id="university" placeholder="학교" style={{ width: 'calc(100% - 70px)' }} />
                    </div>

                    <div className="form-group col-3" style={{ width: '33%' }}>
                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>전공</span>
                        <input type="text" className="form-control w-75" id="major" placeholder="전공" style={{ width: 'calc(100% - 70px)' }} />
                    </div>

                    <div className="form-group col-3" style={{ width: '33%' }}>
                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>학적</span>
                        <input type="text" className="form-control w-75" id="universityStatus" placeholder="학력상태" style={{ width: 'calc(100% - 70px)' }} />
                    </div>
                    </div>

                    <div className="col-12 p-2">
                        {/* 학력 리스트 */}
                        <div id="education-list">
                            {/* 리스트 아이템들을 여기에 추가 */}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <hr className='hrr'/>
            </div>

            <div className="col-sm-12 border bg-light rounded-3" style={{ border: 'none', '--bs-bg-opacity': 0, paddingLeft: 0 }}>
                <div className="d-flex justify-content-between mt-3" style={{ marginTop: '30px !important' }}>
                    <h5 style={{ fontWeight: 'bold', fontSize: '22px', marginLeft: '10px' }}>경력</h5>
                    <button type="button" className="educationBtn btn-short" style={{ width: '80px', background: 'none', justifyContent: 'flex-end', marginBottom: '7px' }}>
                    <span className="fs-2 more_btn"></span>
                    </button>
                </div>

                <div>
                    <hr color="#eee" style={{ margin: '5px 0 20px', borderColor: '#d7dce5', opacity: 1 }} />
                </div>

                <div>
                    <div className="col-12 d-flex" style={{ marginLeft: '1%' }}>
                        <div className="form-group" style={{ width: '33%' }}>
                            <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>기관</span>
                            <input type="text" className="form-control w-55" id="university" placeholder="기관명" style={{ width: 'calc(100% - 70px)' }} />
                        </div>

                        <div className="form-group" style={{ width: '33%' }}>
                            <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>시작일</span>
                            <input type="date" className="form-control w-55" id="major" placeholder="출" style={{ width: 'calc(100% - 70px)' }} />
                        </div>

                        <div className="form-group" style={{ width: '33%' }}>
                            <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>끝일</span>
                            <input type="date" className="form-control w-55" id="universityStatus" placeholder="퇴" style={{ width: 'calc(100% - 70px)' }} />
                        </div>
                        <div className="form-group" style={{ width: '33%' }}>
                            <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#0d6efd', width: '50px', float: 'left', display: 'inline-block', lineHeight: '32px' }}>담당</span>
                            <input type="text" className="form-control w-55" id="universityStatus" placeholder="담당업무" style={{ width: 'calc(100% - 70px)' }} />
                        </div>
                    </div>

                    <div className="col-12 p-2">
                        {/* 경력 리스트 */}
                        <div id="employmenthistory-list">
                            {/* 리스트 아이템들을 여기에 추가 
                            이거 그냥 추가되는건 아니면 import 시켜야 하는 건지 알아야 함*/}
                        </div>
                    </div>
                </div>
            </div>
            {/* 학경력 끝 */}
            <div className="mt-5" style={{padding: 0}}>
                <h5 className='introduceMe'>자기소개서</h5>
                <hr className='hrrr'/>
                <textarea name="coverLetter" id="coverLetter" minLength={10} className="introduceMe1 form-control border bg-light round-3" 
                rows={5} placeholder='최소 10자이상 작성해야 합니다.' ></textarea>
            </div>

            <div className="file-upload upload-btn d-flex justify-content-between">
                <div>
                    <input type="file" name="uploadFile" id="uploadFile" multiple style={{display: 'none'}} />
                    <button className="btn-long file-input" type='button' id='uploadBtn' name='uploadBtn'>파일 선택</button>
                    <button className="btn-long deleteFile" type='button' id='deleteBtn' name='deleteBtn'>파일 삭제</button>
                    <span id='fileName'>파일을 추가해주세요.</span>
                    <div id='fileAddList'>

                    </div>
                </div>
            </div>
            <div className="btn-click123">
                <button type='button' className='btn-long' style={{float: 'right'}}>이전 페이지</button>
            </div>
                
            </div>
        </div>
    </form>
    </>
  )
}

export default CvCreate_user