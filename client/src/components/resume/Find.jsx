import React from 'react'
import './css/Find.css'

const Find = () => {
  return (
    <>
    <div className='form-header'>
        <h4 className='FindText'>회원 아이디/비밀번호를 잊으셨습니까?</h4>
        <p>아이디 찾기와 비밀번호 찾기 중 해당되는 것에 입력해주세요.</p>
    </div>

    <div className="row mt-4">
        <div className="d-flex justify-content-center">
            <div className="col-md-6">
                <h4><strong>아이디 찾기</strong></h4>
                <form action="/user/find_user" method='POST'>
                    <div className="form-group">
                        <label htmlFor="email" className='FindEmail'><strong>이메일</strong></label>
                        <div className="d-flex">
                            {/* 이메일 태그 */}
                            <input type="text" name="firstEmail" id="firstEmail" className="form-control w-100"
                            placeholder='이메일을 입력해주세요'/>
                            <span className="mx-2">@</span>
                                <select name="lastEmail" id="lastEmail" className='SelectEmail w-100'>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.com">daum.com</option>
                                </select>
                            <input type="hidden" name="userEmail" id="userEmail" />
                        </div>
                    </div>

                    <div className="UserGroup form-group">
                        <label htmlFor="username"> <strong>사용자명</strong></label>
                        <div className="d-flex justify-content-between">
                            {/* 사용자명 입력태그 */}
                            <input type="text" name="userName" id="username" 
                            className="form-control" placeholder='이름을 입력해주세요' />

                            <button type="submit" className="FindCheck btn btn-primary" >
                                {/* onclick="combineEmail()" */}
                                확인
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="divider">
            </div>

            <div className="col-md-6">
                <h4><strong>비밀번호 찾기</strong></h4>
                <form action="/user/update_pw" method='POST'>
                    {/* 토큰 있던 자리 */}
                    <div className="form-group">
                        <label htmlFor="user-id" className='FindId2'><strong>아이디</strong></label>
                        <input className='form-control' type="text" name="userId" id="userId" placeholder='아이디를 입력해주세요' />
                    </div>

                    <div className="FindGroup2 form-group">
                        <label htmlFor="email"><strong>기업명</strong></label>
                        <div className="d-flex justify-content-between">
                            {/* 사업체명 입력태그 */}
                            <input type="text" name="comName" id="comName" className="form-control" placeholder='사업체명을 입력해주세요' />
                            <button type="button" className="FindCheck btn btn-primary">
                                {/* onclick: Pw_Confirm() */}
                                확인
                            </button>
                        </div>

                        <div id='passwordChange' className="PwChange d-flex flex-clumn gap-3">
                            <input type="password" name="userPw" id="userPw" className="PwChange2 form-control" 
                            placeholder='비밀번호' required/>

                            <input type="password" name="confirm-password" id="confirm-password"
                            className="PwCheck2 form-control" required placeholder='비밀번호 확인'/>
                            <button type="submit" id='UpdatePw' className='FindChange btn btn-primary'>변경</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    <div className="alert alert-primary mt-4" role='alert'>
        고객님께서 검색하신 아이디 비밀번호는 이메일로 전송됩니다.
        <p>아이디는 이메일과 사용자명이 맞아야 전송됩니다. 비밀번호는 아이디/이메일/사용자명이 모두 맞아야 전송됩니다.</p>
    </div>
    </div>
    </>
    
  )
}

export default Find