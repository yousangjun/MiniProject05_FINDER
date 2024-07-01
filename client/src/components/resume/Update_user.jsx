import React from 'react'
import './css/Update.css'

const Update_user = () => {
  return (
    <div className="job-listings d-flex flex-column align-items-center">
        <div className="job-header w-100">
            {/*         <th:block sec:authorize="hasRole('ROLE_COMPANY')">
                            <div style="padding: 15px;"><strong>담당자 정보 수정</strong></div>
                        </th:block> */}
            <div className='myUpdate'>
                <strong>내 정보 수정</strong>
            </div>
        </div>

        <form id='PwForm' action="/company/update_pw" method='POST' className="myFormUpdate register-form">
        {/*  <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"> */}
            <div id='id' className="d-flex flex-column">
                {/* 사용자 아이디 */}
                <div for="username" className='userid'>아이디</div>
                <input type="text" name="username" id="username" placeholder='사용자 아이디'/>

                {/* 현재 비밀번호 확인 */}
                <div for='password' className='userpw' style={{width: '115px', textAlign: 'center'}}>비밀번호 변경</div>
                <input type="password" name="userBeforePw" id="userBeforePw" 
                placeholder='현재 비밀번호 입력' required autoComplete='off' />
                <button type="button" id='confirm-password-btn'
                className="UpdateBtn1 btn-in-short align-self-end">확인</button>
            </div>

            <div id='passwordChange' className="UpdatePassword d-flex flex-column">
                <input type="password" name="userPw" id="userPw" placeholder='8~16자리의 영문/대소문자/숫자/특수문자 조합' 
                required autoComplete='off'/>
                <input type="password" name="confirm-password" id="confirm-password" required
                placeholder='비밀번호 확인' autoComplete='off'/>
                <button id='UpdatePw' type='submit' /* onclick="validatePasswordConfirmation()" */
                className="UpdatePw2 btn-in-short align-self-end">변경</button>
            </div>
        </form>
        <form id='InfoForm' action="/company/update_info" method='POST' className="register-form mt-4">
        <div className='gender'>
            {/* 이름 */}
            <input type="text" name="name" id="name" className="input-name" required placeholder='이름' readOnly/>
            <div className='gender-btn'>
                <button type="button" className='btn-male' id='male' name='gender'>남</button>
                <button type="button" className='btn-female' id='female' name='gender'>여</button>
            </div>
        </div>

        <div for='birthdate' className='userbirth' style={{width: '84px', textAlign: 'center'}}>생년월일</div>

        <div className='birthdate'>
            <input type="date" name="userBirth" id="startDate" className="keyword-main"/>
            {/* th:value="${session.user.userBirth}" */}
        </div>

        <div for='phone' className='userphone'>휴대폰</div>
        <div className="phone d-flex flex-column">
            <input type="text" name="userPhone" id="phone" placeholder='eg) 010-****-****' required/>
            {/* onchange="validatePhone(this)"  th:value="${session.user.userPhone} */}
        </div>
        
        <div for='email' className='useremail'>이메일</div>
        <div className="phone d-flex flex-column">
            <input type="email" name="userEmail" id="email" placeholder='eg)asdf@zxcv.com' required/>
            {/* onchange="validateEmail(this)*/}
        </div>

        <div className="phone d-flex flex-column">
                {/* 폼 전송 이거 컴포넌트로 쓸까했는데 아이디 따로 걸려있어서 그냥 넣었어요. */}
                <button type="submit" id='UpdateUserInfo' className="UpdateFormPost btn-in-short align-self-end">
                    변경
                </button>
        </div>
        </form>
    </div>
  )
}

export default Update_user