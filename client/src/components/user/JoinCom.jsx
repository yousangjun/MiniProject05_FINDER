import React, { useState } from 'react';
import './css/JoinCom.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const JoinCom = () => {
    const [formData, setFormData] = useState({
        userId: '',
        userPw: '',
        userName: '',
        userGender: '',
        userPhone: '',
        userBirth: '',
        firstEmail: '',
        lastEmail: 'gmail.com',
        userEmail: '',
        emailCode: '',
        comName: '',
        comCategory: '',
        comBusiness: '',
        comAddress: '',
    });
    const navi = useNavigate()

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            file: e.target.files[0],
        }));
    };

    const validateId = (id) => {
        return /^[a-zA-Z0-9_]{4,20}$/.test(id);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}[\]:;"'<>,.?\\/]).{8,16}$/.test(password);
    };

    const validatePhone = (phone) => {
        return phone.length === 11 && /^[0-9]+$/.test(phone);
    };

    // ✅ 이메일 코드 전송 완료 
    const combineEmail = async () => {
        const userEmail = `${formData.firstEmail}@${formData.lastEmail}`;
        setFormData((prevData) => ({
            ...prevData,
            userEmail: userEmail,
        }));

        try {
            const response = await axios.post('/user/find_users', { userEmail });

            if (response.data === 'SUCCESS') {
                alert('이메일에서 인증코드를 확인해주세요.');
                setIsEmailVerified(true);
            } else {
                alert('에러가 발생했습니다.');
            }
        } catch (error) {
            alert('서버 에러가 발생했습니다.');
        }
    };

    //  ✅ 이메일 코드 검사
    const emailCodeVerification = async () => {
        try {
            const response = await axios.post('/user/email_code_check', { verificationCode: formData.emailCode });


            if (response.data === formData.emailCode) {
                alert('코드 인증에 성공하였습니다.');
                document.getElementById('joinbutton').style.display = 'flex';
            } else {
                alert('코드 인증에 실패하였습니다.');
            }
        } catch (error) {
            alert('서버 에러가 발생했습니다.');
        }
    };

    // ✅ 아이디 중복 검사
    const checkIdAvailability = async () => {
        try {
            const response = await axios.get(`/user/check/${formData.userId}`);

            console.log(`response 회원가입 시 불러오는 ` + response.data)

            if (response.data === true) {

                alert('사용 가능한 아이디입니다.');
            } else {
                alert('중복된 아이디입니다.');
            }
        } catch (error) {
            alert('서버 에러가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateId(formData.userId)) {
            alert("아이디는 4~20자리로 영문, 숫자, 특수문자 '_'만 사용 가능합니다.");
            return;
        }

        if (!validatePassword(formData.userPw)) {
            alert("비밀번호는 8~16자리의 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
            return;
        }

        if (formData.userPw !== formData.pw_confirm) {
            alert("비밀번호와 일치하지 않습니다.");
            return;
        }

        if (!validatePhone(formData.userPhone)) {
            alert("휴대전화번호 형식이 아닙니다.");
            return;
        }

        if (!formData.userGender) {
            alert("성별을 선택해주세요.");
            return;
        }

        if (!isEmailVerified) {
            alert("이메일 인증이 필요합니다.");
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            if (key === 'file') {
                data.append(key, formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        }
        // 기업 회원가입 
        try {
            const response = await axios.post('/user/join_com', data);
            if (response.data) {
                alert('회원가입이 완료되었습니다.');
                navi("/")
            } else {
                alert('회원가입에 실패했습니다.');
            }
        } catch (error) {
            alert('서버 에러가 발생했습니다.');
        }
    };

    return (
        <div className="main-content">
            <main>
                <form className="register-form" onSubmit={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>

                    <h2 style={{ color: '#787979', borderBottom: '1px solid lightgrey', paddingBottom: '10px' }}>회원정보를 입력해주세요 </h2>

                    <div htmlFor="username" className="userid">아이디</div>

                    <div id="id">
                        <div className="check-btn">
                            <input type="text" className="username_input" name="userId" id="userId"
                                placeholder="4~20자리/영문,숫자,특수문자 '_'사용가능" required
                                onChange={handleChange} />

                            <button type="button" className="btn-male"
                                style={{ backgroundColor: '#007bff', color: 'white', marginLeft: '15px' }}
                                onClick={checkIdAvailability}
                            >중복</button>

                            <img id="id_check_sucess" style={{ display: 'none' }} />
                        </div>
                    </div>

                    <br />

                    <div htmlFor="password" className="userpw" style={{ width: '84px', textAlign: 'center' }}>비밀번호</div>

                    <input type="password" id="password" name="userPw" placeholder="8~16자리/영문 대소문자,숫자,특수문자 조합"
                        required onChange={handleChange} />

                    <input type="password" id="confirm-password" name="pw_confirm" required placeholder="비밀번호 확인"
                        onChange={handleChange} />

                    <div htmlFor="name" className="username" style={{ width: '55px', textAlign: 'center' }}>이름</div>


                    <div className="gender">
                        <input className="input-name" type="text" id="name" name="userName" required placeholder="이름" onChange={handleChange} />
                        <div className="gender-btn">
                            <button type="button" className={`btn-male-join ${formData.userGender === '남자' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, userGender: '남자' })}>남</button>
                            <button type="button" className={`btn-female-join ${formData.userGender === '여자' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, userGender: '여자' })}>여</button>
                        </div>
                    </div>

                    <div htmlFor="phone" className="userphone">휴대폰</div>
                    <div className="phone">
                        <input type="text" id="phone" name="userPhone" required placeholder="번호를 입력해주세요."
                            onChange={handleChange} />
                    </div>

                    <div htmlFor="birthdate" className="userbirth" style={{ width: '84px', textAlign: 'center' }}>생년월일</div>
                    <div className="birthdate">
                        <input type="date" id="startDate" name="userBirth" className="keyword-main" onChange={handleChange} />
                    </div>

                    <br />

                    <div className="img-file">
                        <div style={{ textAlign: 'center' }}>
                            <img className="img2" src="/img/인증서.png" alt="인증서png" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {/* <button type="button" className="btn-short w-auto" onClick={() => document.getElementById('fileInput').click()}>파일 선택</button>
                            <span id="fileName">{formData.file ? formData.file.name : '파일을 추가해주세요.'}</span> */}
                        </div>
                        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                        <h2 style={{ color: '#787979', borderBottom: '1px solid lightgrey', paddingBottom: '10px' }}>기업정보를 입력해주세요</h2>
                    </div>

                    <div htmlFor="com-name" className="userphone">기업명</div>
                    <input type="text" name="comName" placeholder="기업명" required onChange={handleChange} />
                    <div htmlFor="sector" className="userphone">업종</div>
                    <input type="text" name="comCategory" placeholder="업종" required onChange={handleChange} />
                    <div htmlFor="sector-category" className="userphone">사업분야</div>
                    <input type="text" name="comBusiness" placeholder="사업분야" required onChange={handleChange} />
                    <div htmlFor="com-address" className="userphone">기업주소</div>
                    <input type="text" name="comAddress" placeholder="예시, 대한민국 인천광역시 강화군 내가면 구하리 5번길" required onChange={handleChange} />

                    <div htmlFor="email" className="useremail">이메일</div>
                    <div className="phone">
                        <div className="d-flex justify-content">
                            <input type="text" required placeholder="이메일" name="firstEmail" id="firstEmail" style={{ height: '45.6px' }} onChange={handleChange} />

                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="72" fill="currentColor" className="bi bi-at" viewBox="0 0 16 16" style={{ height: '64.6px' }}>
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914" />
                            </svg>

                            <select className="form-control w-100 h-auto" name="lastEmail" id="lastEmail" onChange={handleChange}>
                                <option value="gmail.com">gmail.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>

                            <input type="hidden" id="userEmail" name="userEmail" value={formData.userEmail} />

                            <div className="justify-content-end">
                                <button type="button" className="btn-male" style={{ backgroundColor: '#007bff', color: 'white', marginLeft: '10px' }} onClick={combineEmail} >인증</button>
                            </div>
                        </div>

                        {isEmailVerified && (
                            <div id="passwordChange" className="d-flex flex-column">
                                <div className="check-btn">
                                    <input type="text" className="username_input" name="emailCode" id="emailCode" placeholder="이메일 인증코드를 입력해주세요" onChange={handleChange} />
                                    <button type="button" className="btn-male" style={{ backgroundColor: '#007bff', color: 'white', marginLeft: '15px' }} onClick={emailCodeVerification}>확인</button>
                                </div>
                            </div>
                        )}

                        <div className="d-grid gap-2" id="joinbutton" style={{ display: 'none' }}>
                            <button className="btn mt-4" type="submit" style={{ backgroundColor: 'var(--main-color)', color: '#fff' }}>회원가입</button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default JoinCom;
