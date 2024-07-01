import JoinUser from '../../components/user/JoinUser'
import React, { useState, useEffect, useContext } from "react";
import * as userAuth from "../../apis/user/auth";
import { useNavigate } from "react-router-dom";

const JoinUserContainer = () => {

    const [userid, setUserId] = useState("");                           // 아이디
    const [password, setPassword] = useState("");                       // 비밀번호
    const [userPwCheck, setUserPwCheck] = useState("");                 // 비밀번호 유효성 검사
    const [name, setName] = useState("");                               // 이름
    const [auth, setAuth] = useState("ROLE_USER");                      // 권한
    const [email, setEmail] = useState("");                             // 이메일
    const [phone, setPhone] = useState("");                             // 전화번호
    const [usernameChecked, setUsernameChecked] = useState(false);      // 아이디 체크
                                                                        // 추후에 이메일 체크도 넣어야함

    //중복검사 통과 여부 상태 만들어야합니다.

    const navi = useNavigate();

    // 유효성 검사 함수
    // 1. 비밀번호에 대한 부분
    function validatePassword() {
        // 나머지 유효성 검사는 그대로 유지
        if (password.length < 8) {
            alert("비밀번호는 8자 이상이어야 합니다.");
            return false;
        }

        let complexityRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]+$/;
        if (!complexityRegex.test(password)) {
            alert(
                "비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자를 포함해야 합니다."
            );
            return false;
        }

        return true;
    }

    // 2. 이메일 유효성 검사 부분
    function validateEmail() {
        let complexityRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // 첫 번째 부분에는 영문자, 숫자, 밑줄("_"), 마침표(".") 및 퍼센트("%") 기호가 포함하게 하고,
        // 두 번째 부분에는 도메인 주소가 오도록 함

        if (!complexityRegex.test(email)) {
            return false;
        }

        return true;
    }

    // 3. 연락처 유효성 검사 부분
    function validatePhone() {
        let complexityRegex = /^(01[016789])(\d{3,4})(\d{4})$/;

        if (!complexityRegex.test(phone)) {
            return false;
        }

        return true;
    }

    const usernameCheckedHandler = async () => {
        const response = await userAuth.usernameCheck(userid);
        const data = await response.data;

        if (data != null) {
            if (data == "Y") {
                window.alert("사용가능한 아이디입니다.");
                setUsernameChecked(true);
            } else {
                window.alert("중복된 아이디입니다.");
            }
        }
    };

    const sets = {
        userid,
        setUserId,
        password,
        setPassword,
        userPwCheck,
        setUserPwCheck,
        name,
        setName,
        nickname,
        setNickname,
        auth,
        setAuth,
        email,
        setEmail,
        phone,
        setPhone,
        file,
        setFile,
        fileSource,
        setFileSource,
        fileName,
        setFileName,
        usernameChecked,
        setUsernameChecked,
        nicknameChecked,
        setNicknameChecked,
        phoneChecked,
        setPhoneChecked,
        usernameCheckedHandler,
        nicknameCheckedHandler,
        phoneCheckedHandler,
    };

    // 회원가입 요청
    const join = async (form) => {
        console.log(sets)

        if (userid.length == 0) {
            alert("아이디를 입력해주세요.");
            return;
        }

        if (!usernameChecked) {
            alert("아이디 중복검사를 실시해주세요.");
            return;
        }

        if (password != userPwCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!nicknameChecked) {
            alert("닉네임 중복검사를 실시해주세요.");
            return;
        }

        if (!phoneChecked) {
            alert("연락처 중복검사를 실시해주세요.");
            return;
        }

        // 유효성 검사 부분
        // 1. 비밀번호에 대한 유효성 검사
        if (!validatePassword()) {
            return;
        }
        // 2. 이메일에 대한 유효성 검사 실시
        if (!validateEmail()) {
            alert("잘못된 이메일 형식입니다.");
            return;
        }
        // 3. 연락처에 대한 유효성 검사 실시
        if (!validatePhone()) {
            alert("잘못된 연락처 형식입니다. ( - 제외)");
            return;
        }

        console.log(form);
        let response;
        let data;
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            response = await userAuth.join(form, headers);
        } catch (error) {
            console.error(`${error}`);
            console.error(`회원가입 요청 중 에러가 발생하였습니다.`);
            return;
        }
        data = response.data;
        const status = response.status;
        console.log(`data : ${data}`);
        console.log(`status : ${status}`);

        if (status === 200) {
            console.log(`회원가입 성공!`);
            alert(`회원가입 성공`);
            navi("/login");
        } else {
            console.log(`회원가입 실패!`);
            alert(`회원가입 실패`);
        }
    };

    useEffectt(() => {

    }, []);

    return (
        <>
            <JoinUser sets={sets} join={join}></JoinUser>
        </>
    );
};

export default JoinUserContainer