package com.finder.project.user.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.finder.project.company.dto.Company;
import com.finder.project.user.dto.EmailVerification;
import com.finder.project.user.dto.UserAuth;
import com.finder.project.user.dto.UserSocial;
import com.finder.project.user.dto.Users;

@Mapper
public interface UserMapper {

    // 로그인
    public Users login(String username) throws Exception;

    // 회원 조회
    public Users select(String username) throws Exception;

    // 회원 가입
    public int join(Users user) throws Exception;

    // 기업 회원 가입
    public int comJoin(Company company) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;

    // 권한 업데이트
    // public int updateAuth(UserAuth userAuth) throws Exception;

    public int max() throws Exception;

    // 기업 비밀번호 찾기
    @Select("SELECT * FROM company WHERE com_name = #{comName}")
    public Company getComName(String comName) throws Exception;

    // 아이디 찾기
    public String findId(Users user) throws Exception;

    // 사용자 비밀번호 찾기
    @Select("SELECT * FROM user WHERE user_id = #{userId}")
    public Users findUserById(String userId) throws Exception;

    // 비밀번호 수정하기
    public int updatePw(Users userPw) throws Exception;

    // 이메일이랑 자동생성된 값 넣기
    @Insert("INSERT INTO email_verification (email, verification_code) VALUES (#{email}, #{verificationCode})")
    void saveEmailVerification(EmailVerification emailVerification) throws Exception;

    // 사용자가 입력한 인증코드랑 db에 인증코드랑 비교하기
    @Select("SELECT verification_code FROM email_verification WHERE verification_code = #{checkCode}")
    public String checkCode(String checkCode) throws Exception;

    // 사용자가 입력한 이메일이 중복인지 아닌지 확인하기
    @Select("SELECT user_email FROM user WHERE user_email = #{checkEmail}")
    public String checkEmail(String checkEmail) throws Exception;

    // 소셜 회원 가입
    public int insertSocial(UserSocial userSocial) throws Exception;

    // 소셜 회원 조회
    public UserSocial selectSocial(UserSocial userSocial) throws Exception;

    // 소셜 회원 수정
    public int updateSocial(UserSocial userSocial) throws Exception;

    // 소셜 정보로 회원 조회
    public Users selectBySocial(UserSocial userSocial) throws Exception;

}