import React, { useState } from 'react';
// import axios from 'axios';
import './css/Update.css';

const Update_user = () => {

    return (
        <div className='d-flex flex-column align-items-center'>

            <form id='PwForm' onSubmit={handlePwFormSubmit} className="myFormUpdate register-form-update">
                <div id='id' className="d-flex flex-column p-4">
                    {/* 사용자 아이디 */}
                    <div className='userid-update'>아이디</div>
                    <input type="text" name="username" id="username" placeholder='사용자 아이디'/>

                    {/* 현재 비밀번호 확인 */}
                    <div className='userpw-update' style={{width: '115px', textAlign: 'center'}}>비밀번호 변경</div>
                    <input type="password" name="userBeforePw" id="userBeforePw" 
                    placeholder='현재 비밀번호 입력' required autoComplete='off' />
                    <button type="button" id='confirm-password-btn' onClick={handlePasswordConfirm}
                    className="pw-confirm-btn btn-in-short align-self-end">확인</button>
                </div>

                {/* UpdatePassword의 css 가 display none 으로 */}
                <div id='passwordChange' className={`UpdatePassword d-flex flex-column p-4 ${passwordChangeVisible ? '' : 'd-none'}`}>
                    <input type="password" name="userPw" id="userPw" placeholder='8~16자리의 영문/대소문자/숫자/특수문자 조합' 
                    required autoComplete='off'/>
                    <input type="password" name="confirm-password" id="confirm-password" required
                    placeholder='비밀번호 확인' autoComplete='off'/>
                    <button id='UpdatePw' type='submit'
                    className="pw-update-btn btn-in-short align-self-end">변경</button>
                </div>
            </form>

            <form id='InfoForm' onSubmit={handleInfoFormSubmit} className="myFormUpdate register-form-update mt-4">
                
                <div className='gender-update px-4'>
                    <input type="text" name="name" id="name" className="input-name" required placeholder='이름' readOnly/>
                    <div className='gender-btn-update'>
                        <button type="button" className='btn-male-update' id='male' name='gender'>남</button>
                        <button type="button" className='btn-female-update' id='female' name='gender'>여</button>
                    </div>
                </div>

                <div className='px-4'>
                    <div className='userbirth-update' style={{width: '84px', textAlign: 'center'}}>생년월일</div>

                    <div className='birthdate-update'>
                        <input type="date" name="userBirth" id="startDate" className="keyword-main"/>
                    </div>
                </div>

                <div className='px-4'>
                    <div className='userphone-update'>휴대폰</div>
                    <div className="phone-update d-flex flex-column">
                        <input type="text" name="userPhone" id="phone" placeholder='eg) 010-****-****' required/>
                    </div>
                </div>
            
                <div className='px-4'>
                    <div className='useremail-update'>이메일</div>
                    <div className="phone-update d-flex flex-column">
                        <input type="email" name="userEmail" id="email" placeholder='eg)asdf@zxcv.com' required/>
                    </div>
                </div>

                <div className="phone-update d-flex flex-column px-4">
                    <button type="submit" id='UpdateUserInfo' className="info-update-btn btn-in-short align-self-end">
                        변경
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update_user;
