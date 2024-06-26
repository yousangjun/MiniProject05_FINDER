package com.finder.project.user.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
@Controller
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

    @GetMapping("/{page}")
    public String main(@PathVariable("page") String page) {
        log.info("메인 화면...");
        return "/user/" + page;
    }

    @GetMapping("/join_user")
    public String join() {

        return "user/join_user";
    }

    // 사용자 회원가입
    @PostMapping("/join_user")
    public String userjoinPro(Users users) throws Exception {

        String userEmail = users.getUserEmail();
        String checkEmail = userMapper.checkEmail(userEmail);

        log.info("db에서 가져오는 이메일" + checkEmail);

        if (checkEmail == null) {
            // 회원가입 성공
            userService.join(users);
            return "redirect:/login";
        }
        // 회원가입 실패
        return "redirect:/user/join_user?error=emailExists";
    }

    // 기업 회원가입
    @PostMapping("/join_com")
    public String companyjoinPro(Users users, Company company) throws Exception {

        String userEmail = users.getUserEmail();
        String checkEmail = userMapper.checkEmail(userEmail);

        if (checkEmail == null) {
            // 회원가입 성공
            userService.join(users);
            int userNo = userService.max();
            company.setUserNo(userNo);
            userService.comJoin(company);
            return "redirect:/login";
        }
        // 회원가입 실패
        return "redirect:/user/join_com?error=emailExists";
    }

    // 아이디 중복확인
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

    // 아이디 찾기 이메일로 전송 완료
    @ResponseBody
    @PostMapping("/find_user")
    public String findId(@RequestParam("userEmail") String userEmail, @RequestParam("userName") String userName)
            throws Exception {
        log.info("이메일 파라미터 : " + userEmail);
        log.info("유저 이름 파라미터 : " + userName);

        Users user = new Users();
        user.setUserEmail(userEmail);
        user.setUserName(userName);

        String userId = userService.findId(user);
        log.info("유저아이디 : " + userId);

        if (userId != null) {
            String subject = "FINDER의 아이디 찾기";
            String text = "회원님의 아이디는: " + userId;
            emailService.sendSimpleMessage(userEmail, subject, text);
            return "<script>alert('해당 이메일로 ID를 발송하였습니다.'); location.href='/login';</script>";
        } else {
            return "<script>alert('해당 이메일을 찾을 수 없습니다.'); history.back();</script>";
        }
    }

    // ✅ 이메일 자동생성 완료
    @ResponseBody
    @PostMapping("/find_users")
    public String emailCheck(@RequestBody String userEmail) throws Exception {

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

        return "1";
    }

    // 랜덤한 인증 코드 생성 메소드
    private String generateRandomKey() {
        UUID uuid = UUID.randomUUID();
        // 생성된 UUID에서 앞의 8자리만 가져와 출력
        String shortUuid = uuid.toString().substring(0, 8);

        return shortUuid;

    }

    // ✅ db에 있는 자동생성된 code랑 사용자가 입력한 코드랑 비교
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

    // 사용자 정보 확인⭕
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

    // 기업 정보 확인
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

    // 비밀번호 수정 ⭕
    @PostMapping("/update_pw")
    public String updateCompany(@RequestParam("userPw") String userPw, @RequestParam("userId") String userId)
            throws Exception {

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

            return "redirect:/login";
        }
        // 데이터 처리 실패
        return "redirect:/user/error";
    }

    // import org.springframework.stereotype.Controller;
    // import org.springframework.web.bind.annotation.ModelAttribute;
    // import org.springframework.web.bind.annotation.PostMapping;

}
