import React, { useState } from 'react';
import './css/JoinUser.css'
// import axios from 'axios';

const JoinUser = ({ sets, join }) => {
    const onJoin = (e) => {
        e.preventDefault()
        const form = e.target

        const userId = form.userId.value
        const name = form.name.value
        const auth = form.auth.value
        const password = form.password.value
        const userPwCheck = form.userPwCheck.value;
        const phone = form.phone.value;
        const email = form.email.value;

        console.log(userId, name, auth, password, userPwCheck, phone, email)
        join({ userId, name, auth, password, phone, email })
    }

    return (
        <>
            <div className="wrap d-flex flex-column container-fluid container">
                <div className="main-content">
                    <main>
                        <form onSubmit={(e) => onJoin(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                            </svg>

                            <h2 style={{ color: '#787979', borderBottom: '1px solid lightgrey', paddingBottom: '10px' }}>회원정보를 입력해주세요</h2>

                            <div htmlFor="username" className="userid">아이디</div>

                            <div id="id">
                                <div className="check-btn">
                                    <input type="text" className="username_input" name="user" id="userId"
                                        placeholder="아이디"
                                        value={sets.username} onChange={(e) => {
                                            if (sets.usernameChecked) {
                                                sets.setUsernameChecked(false)
                                                sets.setUsername(e.target.value)
                                            } else {
                                                sets.setUsername(e.target.value)
                                            }
                                        }}
                                    />
                                    <button type="button" className="btn-male"
                                        style={{ backgroundColor: '#007bff', color: 'white', marginLeft: '15px' }}
                                        onClick={() => { sets.usernameCheckedHandler() }}
                                    >중복
                                    </button>
                                    <img id="id_check_sucess" style={{ display: 'none' }} />
                                </div>
                            </div>

                            <br />

                            <div htmlFor="password" className="userpw" style={{ width: '84px', textAlign: 'center' }}>비밀번호</div>

                            <input type="password" id="password" name="userPw" placeholder="8~16자리/영문 대소문자,숫자,특수문자 조합"
                                required value={sets.password} onChange={(e) => {
                                    sets.setPassword(e.target.value) }} />

                            <input type="password" id="confirm-password" name="pw_confirm" required placeholder="비밀번호 확인"
                              value={sets.userPwCheck} onChange={(e) => {
                                sets.setUserPwCheck(e.target.value)
                              }} />

                           

                            <br />

                            <div htmlFor="phone" className="userphone">휴대폰</div>

                            <div className="phone">
                                <input type="text" id="phone" name="userPhone" required placeholder="번호를 입력해주세요."
                                    value={sets.phone} />
                            </div>
                             {/* 비밀 번호 확인까지 함 --------------------------------------------------------------------------------------- */}

                            <div htmlFor="name" className="username" style={{ width: '55px', textAlign: 'center' }}>이름</div>

                            <div className="gender">
                                <input className="input-name" type="text" id="name" name="userName" required placeholder="이름"
                                 />
                                <div className="gender-btn">
                                    <input type="hidden" id="userGender" name="userGender" />
                                    <button type="button" className={`btn-male`}>남</button>
                                    <button type="button" className={`btn-female`}>여</button>
                                </div>
                            </div>

                            <div htmlFor="birthdate" className="userbirth" style={{ width: '84px', textAlign: 'center' }}>생년월일</div>

                            <div className="birthdate">
                                <input type="date" id="startDate" name="userBirth" className="keyword-main" />
                            </div>

                            <br />

                            <div htmlFor="email" className="useremail">이메일</div>
                            <div className="phone">
                                <div className="d-flex justify-content">
                                    <input type="text" required placeholder="이메일" name="firstEmail" id="firstEmail"
                                        style={{ height: '45.6px' }}  />

                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="72" fill="currentColor" className="bi bi-at" viewBox="0 0 16 16" style={{ height: '64.6px' }}>
                                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914" />
                                    </svg>
                                    <select className="form-control w-100 h-auto" name="lastEmail" id="lastEmail">
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.net">daum.net</option>
                                    </select>
                                    <input type="hidden" id="userEmail" name="userEmail"  />

                                    <div className="justify-content-end">
                                        <button type="button" className="btn-male" style={{ backgroundColor: '#007bff', color: 'white', marginLeft: '10px' }} >인증</button>
                                    </div>
                                </div>

                                    <div id="passwordChange" className="d-flex flex-column">
                                        <div className="check-btn">
                                            <input type="text" className="username_input" name="emailCode" id="emailCode" placeholder="이메일 인증코드를 입력해주세요"/>
                                            <button type="button" className="btn-male" style={{ backgroundColor: '#007bff', color: 'white', marginLeft: '15px' }} >확인</button>
                                        </div>
                                    </div>

                                <div className="d-grid gap-2" id="joinbutton" style={{ display: 'none' }}>
                                    <button className="btn mt-4" type="submit" style={{ backgroundColor: 'var(--main-color)', color: '#fff' }}>회원가입</button>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
}

export default JoinUser;
