import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './css/Update.css';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const { userInfo } = useContext(LoginContext);

    useEffect(() => {
        console.log("userInfo에 뭐가 들어가있나요?", userInfo);
    }, [userInfo]);

    const [formData, setFormData] = useState({
        username: '',
        userBeforePw: '',
        userPw: '',
        confirmPassword: '',
        name: '',
        gender: '',
        userBirth: '',
        userPhone: '',
        userEmail: ''
    });

    const navi = useNavigate();
    const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
    const [genderSet, setGenderSet] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userInfo && userInfo.userNo) {
                    const response = await axios.get('/user/info_user', {
                        params: {
                            userNo: userInfo.userNo
                        }
                    });
                    const userData = response.data;
                    console.log(userData, "???//Asdf'dskljsaflksafjdk;afsjdk;lfjlkaasfdjok");

                    const formattedDate = `${userData.userBirth.slice(0, 4)}-${userData.userBirth.slice(4, 6)}-${userData.userBirth.slice(6, 8)}`;

                    setFormData({
                        username: userData.userId,
                        name: userData.userName,
                        userGender: userData.userGender,
                        userBirth: formattedDate,
                        userPhone: userData.userPhone,
                        userEmail: userData.userEmail,
                        userBeforePw: '',
                        userPw: '',
                        confirmPassword: ''
                    });
                    setGenderSet(true);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();
    }, [userInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordConfirm = async () => {
        try {
            const response = await axios.post('/company/update_pw_confirm', {
                userNo: userInfo.userNo,
                userPw: formData.userBeforePw
            });

            if (response.data) {
                alert('비밀번호가 일치합니다.');
                setPasswordChangeVisible(true);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                setPasswordChangeVisible(false);
            }
        } catch (error) {
            alert('에러 발생');
        }
    };

    const handlePwFormSubmit = async (e) => {
        e.preventDefault();

        const { userPw, confirmPassword } = formData;

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-={}[\]:;"'<>,.?\\/]).{8,16}$/.test(userPw)) {
            alert("비밀번호는 8~16자리의 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
            return;
        }

        if (userPw !== confirmPassword) {
            alert("비밀번호와 일치하지 않습니다!.");
            return;
        }

        try {
            const response = await axios.post('/company/update_pw', {
                userNo: userInfo.userNo,
                userPw: formData.confirmPassword,
            });

            if (response.data) {
                alert('비밀번호를 수정하였습니다.');
                navi("/");
                setPasswordChangeVisible(true);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                setPasswordChangeVisible(false);
            }
        } catch (error) {
            alert('에러 발생');
        }
    };

    const handleInfoFormSubmit = async (e) => {
        e.preventDefault();

        const { userEmail, userPhone } = formData;

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(userEmail)) {
            alert("이메일 형식이 아닙니다.");
            return;
        }

        if (userPhone.length !== 11 || !/^[0-9]+$/.test(userPhone)) {
            alert("휴대전화번호 형식이 아닙니다.");
            return;
        }

        try {
            const response = await axios.post('/company/update_info', {
                userNo: userInfo.userNo,
                userEmail: formData.userEmail,
                userBirth: formData.userBirth,
                userPhone: formData.userPhone,
                userGender: formData.userGender,
            });

            if (response.status === 200) {
                alert('정보가 변경되었습니다.');
            }
        } catch (error) {
            alert('에러 발생');
        }
    };

    return (
        <div className='d-flex flex-column align-items-center'>
            <form id='PwForm' onSubmit={handlePwFormSubmit} className="myFormUpdate register-form-update">
                <div id='id' className="d-flex flex-column p-4">
                    <div className='userid-update'>아이디</div>
                    <input type="text" name="username" id="username" placeholder='사용자 아이디' readOnly value={formData.username} onChange={handleInputChange} />
                    <div className='userpw-update' style={{ width: '115px', textAlign: 'center' }}>비밀번호 변경</div>
                    <input type="password" name="userBeforePw" id="userBeforePw" placeholder='현재 비밀번호 입력' required autoComplete='off' value={formData.userBeforePw} onChange={handleInputChange} />
                    <button type="button" id='confirm-password-btn' onClick={handlePasswordConfirm} className="pw-confirm-btn btn-in-short align-self-end">확인</button>
                </div>

                <div id='passwordChange' className={`UpdatePassword d-flex flex-column p-4 ${passwordChangeVisible ? '' : 'd-none'}`}>
                    <input type="password" name="userPw" id="userPw" placeholder='8~16자리의 영문/대소문자/숫자/특수문자 조합' required autoComplete='off' value={formData.userPw} onChange={handleInputChange} />
                    <input type="password" name="confirmPassword" id="confirm-password" required placeholder='비밀번호 확인' autoComplete='off' value={formData.confirmPassword} onChange={handleInputChange} />
                    <button id='UpdatePw' type='submit' className="pw-update-btn btn-in-short align-self-end">변경</button>
                </div>
            </form>

            <form id='InfoForm' onSubmit={handleInfoFormSubmit} className="myFormUpdate register-form-update mt-4">
                <div className='gender-update px-4'>
                    <input type="text" name="name" id="name" className="input-name" required placeholder='이름' readOnly value={formData.name} onChange={handleInputChange} />
                    <div className="gender">
                        <div className="gender-btn">
                            <button
                                type="button"
                                className={`btn-male-join ${formData.userGender === '남자' ? 'selected' : ''}`}
                                disabled={genderSet}
                                onClick={() => setFormData({ ...formData, userGender: '남자' })}
                            >
                                남
                            </button>
                            <button
                                type="button"
                                className={`btn-female-join ${formData.userGender === '여자' ? 'selected' : ''}`}
                                disabled={genderSet}
                                onClick={() => setFormData({ ...formData, userGender: '여자' })}
                            >
                                여
                            </button>
                        </div>
                    </div>
                </div>

                <div className='px-4'>
                    <div className='userbirth-update' style={{ width: '84px', textAlign: 'center' }}>생년월일</div>
                    <div className='birthdate-update'>
                        <input type="date" name="userBirth" id="startDate" className="keyword-main" readOnly value={formData.userBirth} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='px-4'>
                    <div className='userphone-update'>휴대폰</div>
                    <div className="phone-update d-flex flex-column">
                        <input type="text" name="userPhone" id="phone" placeholder='eg) 010-****-****' required value={formData.userPhone} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='px-4'>
                    <div className='useremail-update'>이메일</div>
                    <div className="phone-update d-flex flex-column">
                        <input type="email" name="userEmail" id="email" placeholder='eg)asdf@zxcv.com' required value={formData.userEmail} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="phone-update d-flex flex-column px-4">
                    <button type="submit" id='UpdateUserInfo' className="info-update-btn btn-in-short align-self-end" >변경</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
