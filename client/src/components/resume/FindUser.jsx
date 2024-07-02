import React, { useState } from 'react';
import axios from 'axios';
import './css/Find.css';

const FindUser = () => {
    const [findUserEmail, setFindUserEmail] = useState('');
    const [findUserLastEmail, setFindUserLastEmail] = useState('gmail.com');
    const [findUserName, setFindUserName] = useState('');

    const [updatePwUserId, setUpdatePwUserId] = useState('');
    const [updatePwFirstEmail, setUpdatePwFirstEmail] = useState('');
    const [updatePwLastEmail, setUpdatePwLastEmail] = useState('gmail.com');
    const [updatePwUserName, setUpdatePwUserName] = useState('');
    const [updatePw, setUpdatePw] = useState('');
    const [updateConfirmPw, setUpdateConfirmPw] = useState('');
    const [isInfoVerified, setIsInfoVerified] = useState(false);

    const handleFindUserSubmit = async (event) => {
        event.preventDefault();

        if (!findUserEmail || !findUserName) {
            alert('이메일과 사용자명을 모두 입력해주세요.');
            return;
        }

        const userEmail = `${findUserEmail}@${findUserLastEmail}`;
        const formData = {
            userEmail: userEmail,
            userName: findUserName,
        };

        try {
            const response = await axios.post('/user/find_user', formData);
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                alert('아이디를 이메일로 전송했습니다.');
            } else {
                throw new Error('서버 오류');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const handleUpdatePwSubmit = async (event) => {
        event.preventDefault();

        if (!updatePwUserId || !updatePwFirstEmail || !updatePwUserName || !updatePw || !updateConfirmPw) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (!validatePassword(updatePw)) {
            alert('비밀번호는 8~16자리의 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
            return;
        }

        if (updatePw !== updateConfirmPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const formData = {
            userId: updatePwUserId,
            userEmail: `${updatePwFirstEmail}@${updatePwLastEmail}`,
            userName: updatePwUserName,
            userPw: updatePw,
        };

        try {
            const response = await axios.put('/user/update_pw', formData);
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                alert('비밀번호를 변경했습니다.');
            } else {
                throw new Error('서버 오류');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const handleInfoCheck = async (event) => {
        event.preventDefault();

        if (!updatePwUserId || !updatePwFirstEmail || !updatePwUserName) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const formData = {
            id: updatePwUserId,
            email: `${updatePwFirstEmail}@${updatePwLastEmail}`,
            name: updatePwUserName,
        };

        try {
            const response = await axios.post('/user/info_check', formData);
            if (response.data) {
                const data = response.data;
                console.log(data);
                alert('정보가 일치합니다');
                setIsInfoVerified(true);
            } else {
                throw new Error('서버 오류');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}[\]:;"'<>,.?\\/]).{8,16}$/.test(password);
    };

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
                        <form onSubmit={handleFindUserSubmit}>
                            <div className="form-group">
                                <label htmlFor="findUserEmail" className='FindEmail'><strong>이메일</strong></label>
                                <div className="d-flex">
                                    <input type="text" name="findUserEmail" id="findUserEmail" className="form-control"
                                        placeholder='이메일을 입력해주세요'
                                        value={findUserEmail} onChange={(e) => setFindUserEmail(e.target.value)} />
                                    <span className="mx-2">@</span>
                                    <select name="findUserLastEmail" id="findUserLastEmail" className='SelectEmail w-100'
                                        value={findUserLastEmail} onChange={(e) => setFindUserLastEmail(e.target.value)}>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.com">daum.com</option>
                                    </select>
                                </div>
                            </div>

                            <div className="UserGroup form-group">
                                <label htmlFor="findUserName"> <strong>사용자명</strong></label>
                                <div className="d-flex justify-content-between">
                                    <input type="text" name="findUserName" id="findUserName"
                                        className="form-control" placeholder='이름을 입력해주세요'
                                        value={findUserName} onChange={(e) => setFindUserName(e.target.value)} />

                                    <button type="submit" className="FindCheck btn btn-primary">
                                        확인
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="divider"></div>

                    <div className="col-md-6">
                        <h4><strong>비밀번호 찾기</strong></h4>
                        <form onSubmit={handleInfoCheck}>
                            <div className="form-group">
                                <label htmlFor="updatePwUserId" className='FindId2'><strong>아이디</strong></label>
                                <input className='form-control' type="text" name="updatePwUserId" id="updatePwUserId"
                                    placeholder='아이디를 입력해주세요'
                                    value={updatePwUserId} onChange={(e) => setUpdatePwUserId(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="updatePwFirstEmail" className='FindEmail'><strong>이메일</strong></label>
                                <div className="d-flex">
                                    <input type="text" name="updatePwFirstEmail" id="updatePwFirstEmail" className="form-control"
                                        placeholder='이메일을 입력해주세요'
                                        value={updatePwFirstEmail} onChange={(e) => setUpdatePwFirstEmail(e.target.value)} />
                                    <span className="mx-2">@</span>
                                    <select name="updatePwLastEmail" id="updatePwLastEmail" className='SelectEmail w-100'
                                        value={updatePwLastEmail} onChange={(e) => setUpdatePwLastEmail(e.target.value)}>
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.com">daum.com</option>
                                    </select>
                                </div>
                            </div>

                            <div className="UserGroup form-group">
                                <label htmlFor="updatePwUserName"> <strong>사용자명</strong></label>
                                <div className="d-flex justify-content-between">
                                    <input type="text" name="updatePwUserName" id="updatePwUserName"
                                        className="form-control" placeholder='이름을 입력해주세요'
                                        value={updatePwUserName} onChange={(e) => setUpdatePwUserName(e.target.value)} />

                                    <button type="submit" className="FindCheck btn btn-primary">
                                        확인
                                    </button>
                                </div>
                            </div>
                        </form>

                        {isInfoVerified && (
                            <form onSubmit={handleUpdatePwSubmit}>
                                <div id='passwordChange' className="PwChange d-flex flex-column gap-3">
                                    <input type="password" name="updatePw" id="updatePw" className="PwChange2 form-control"
                                        placeholder='비밀번호' required
                                        value={updatePw} onChange={(e) => setUpdatePw(e.target.value)} />
                                    <input type="password" name="updateConfirmPw" id="updateConfirmPw"
                                        className="PwCheck2 form-control" required placeholder='비밀번호 확인'
                                        value={updateConfirmPw} onChange={(e) => setUpdateConfirmPw(e.target.value)} />
                                    <button type="submit" id='UpdatePw' className='FindChange btn btn-primary'>변경</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                <div className="alert alert-primary mt-4" role='alert'>
                    고객님께서 검색하신 아이디 비밀번호는 이메일로 전송됩니다.
                    <p>아이디는 이메일과 사용자명이 맞아야 전송됩니다. 비밀번호는 아이디/이메일/사용자명이 모두 맞아야 전송됩니다.</p>
                </div>
            </div>
        </>
    );
};

export default FindUser;
