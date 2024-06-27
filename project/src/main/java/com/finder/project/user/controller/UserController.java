package com.finder.project.user.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.finder.project.company.dto.Company;
import com.finder.project.company.service.CompanyService;
import com.finder.project.user.dto.CompanyUserRequest;
import com.finder.project.user.dto.EmailVerification;
import com.finder.project.user.dto.InformationCheck;
import com.finder.project.user.dto.Users;
import com.finder.project.user.mapper.UserMapper;
import com.finder.project.user.service.EmailService;
import com.finder.project.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService; // 변수명은 카멜케이스로 (유상준)

    @Autowired
    private UserMapper userMapper;

    private CompanyService companyService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // ✅ 사용자 회원가입 (해결~!~!~!~!!~~!~~!)
    @PostMapping("/join_user")
    public ResponseEntity<?> userjoinPro(@RequestBody Users users) throws Exception {

        String userEmail = users.getUserEmail();
        String checkEmail = userMapper.checkEmail(userEmail);

        log.info("db에서 가져오는 이메일" + checkEmail);

        if (checkEmail == null) {
            // 회원가입 성공
            userService.join(users);
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        // 회원가입 실패
        log.info("회원가입 실패! - FAIL");
        return new ResponseEntity<>(users, HttpStatus.BAD_REQUEST);
    }
    // ---------------------------------------------------------------------------------

    // ✅ 기업 회원가입 (해결~!~!~!~!!~~!~~!)
    @PostMapping("/join_com")
    public ResponseEntity<?> companyjoinPro(@RequestBody Users users) throws Exception {

        Company company = users.getCompany();
        log.info("company의 뭐들어있나여?" + company);

        String userEmail = users.getUserEmail();
        String checkEmail = userMapper.checkEmail(userEmail);

        if (checkEmail == null) {
            // 회원가입 성공
            userService.join(users);
            int userNo = userService.max();
            company.setUserNo(userNo);
            userService.comJoin(company);
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        // 회원가입 실패
        log.info("회원가입 실패! - FAIL");
        return new ResponseEntity<>(users, HttpStatus.BAD_REQUEST);
    }

    // ✅ 아이디 중복확인 (해결~!~!~!~!!~~!~~!)
    @ResponseBody
    @GetMapping("/check/{userId}")
    public ResponseEntity<Boolean> userCheck(@PathVariable("userId") String userId) throws Exception {
        log.info("아이디 중복 확인 : " + userId);
        Users user = userService.select(userId);
        // 아이디 중복
        if (user != null) {
            log.info("중복된 아이디 입니다 - " + userId);
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        // 사용 가능한 아이디입니다.
        log.info("사용 가능한 아이디 입니다." + userId);
        return new ResponseEntity<>(true, HttpStatus.OK);

    }
    // ---------------------------------------------------

    // 이거 아이디 찾기 할때 alert 해야함
    // return "<script>alert('해당 이메일로 ID를 발송하였습니다.');
    // location.href='/login';</script>"; 이거 뻄
    @ResponseBody
    @GetMapping("/find_user")
    // ✅ 아이디 찾기 이메일로 전송 (해결~!~!~!~!!~~!~~!)
    public ResponseEntity<String> findId(@RequestBody Users users) throws Exception {

        Users user = new Users();
        String userEmail = users.getUserEmail();
        String userName = users.getUserName();

        log.info("이메일 파라미터 : " + userEmail);
        log.info("유저 이름 파라미터 : " + userName);

        user.setUserEmail(userEmail);
        user.setUserName(userName);

        String userId = userService.findId(user);
        log.info("유저아이디 : " + userId);

        if (userId != null) {
            String subject = "FINDER의 아이디 찾기";
            String text = "회원님의 아이디는: " + userId;
            emailService.sendSimpleMessage(userEmail, subject, text);
            return ResponseEntity.ok("해당 이메일로 ID를 발송하였습니다.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseBody
    @PostMapping("/find_users")
    // ✅ 회원가입시 하는 이메일인증 자동생성 완료
    public ResponseEntity<?> join(@RequestBody Users users) throws Exception {

        String userEmail = users.getUserEmail();

        // 랜덤한 인증 코드 생성
        String mailKey = generateRandomKey(); // 임의의 인증 코드 생성하는 메소드 호출
        EmailVerification emailVerification = new EmailVerification();
        emailVerification.setEmail(userEmail);
        emailVerification.setVerificationCode(mailKey);

        userMapper.saveEmailVerification(emailVerification);
        // 이메일로 인증 코드 전송
        String subject = "FINDER의 이메일 인증";
        String text = "이메일 인증 코드 : " + mailKey;

        emailService.sendSimpleMessage(userEmail, subject, text);

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    // 랜덤한 인증 코드 생성 메소드
    private String generateRandomKey() {
        UUID uuid = UUID.randomUUID();
        // 생성된 UUID에서 앞의 8자리만 가져와 출력
        String shortUuid = uuid.toString().substring(0, 8);

        return shortUuid;

    }

    // ✅ db에 있는 자동생성된 code랑 사용자가 입력한 코드랑 비교 (해결~!~!~!~!!~~!~~!)
    @PostMapping("/email_code_check")
    public ResponseEntity<String> codeCheck(@RequestBody EmailVerification request) throws Exception {

        String checkCode = request.getVerificationCode();
        String code = userMapper.checkCode(checkCode);
        log.info("이메일 인증 코드 데이터베이스에서 불러오나요?  " + code);

        if (code != null) {
            return ResponseEntity.ok("성공"); // 코드 인증 성공
        } else {
            return ResponseEntity.ok(null); // 코드 인증 실패
        }
    }

    // ✅ 사용자 아이디 찾기⭕ (해결~!~!~!~!!~~!~~!)
    @PostMapping("/info_check")
    public ResponseEntity<Boolean> infoUserCheck(@RequestBody InformationCheck request) throws Exception {

        // 데이터베이스에서 사용자 정보 가져오기
        Users user = userService.getUserById(request.getId());

        if (user == null) {
            // 사용자가 존재하지 않는 경우 false 반환
            return ResponseEntity.ok(false);
        }

        // 사용자 정보 비교
        boolean isMatch = request.getEmail().equals(user.getUserEmail()) &&
                request.getName().equals(user.getUserName());

        return ResponseEntity.ok(isMatch);
    }

    // ✅ 기업 아이디 찾기 (해결~!~!~!~!!~~!~~!)
    @PostMapping("/info_com_check")
    public ResponseEntity<Boolean> infoCompanyCheck(@RequestBody CompanyUserRequest request) throws Exception {

        // 데이터베이스에서 사용자 정보 가져오기
        Company company = userService.getComName(request.getComName());
        Users users = userService.getUserById(request.getUserId());

        if (company == null) {
            // 사용자가 존재하지 않는 경우 false 반환
            return ResponseEntity.ok(false);
        }

        // 사용자 정보 비교
        boolean isMatch = request.getComName().equals(company.getComName()) &&
                request.getUserId().equals(users.getUserId());

        return ResponseEntity.ok(isMatch);
    }

    // ✅ 비밀번호 수정 ⭕
    @PutMapping("/update_pw")
    public ResponseEntity<?> updateCompany(@RequestBody Users users) throws Exception {

        String userPw = users.getUserPw();
        String userId = users.getUserId();

        Users user = new Users();
        user.setUserPw(userPw);
        user.setUserId(userId);

        log.info("내가입력한 비밀번호" + userPw);

        String password = user.getUserPw();
        String encodedPassword = passwordEncoder.encode(password); // 🔒 비밀번호 암호화
        user.setUserPw(encodedPassword);

        int result = userService.updatePw(user);

        // 데이터 처리 성공
        if (result > 0) {

            return ResponseEntity.ok("성공"); // 코드 인증 성공
        }
        // 데이터 처리 실패
        return ResponseEntity.ok(null); // 코드 인증 실패
    }

    // import org.springframework.stereotype.Controller;
    // import org.springframework.web.bind.annotation.ModelAttribute;
    // import org.springframework.web.bind.annotation.PostMapping;

}
