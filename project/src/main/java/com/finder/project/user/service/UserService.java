package com.finder.project.user.service;

import com.finder.project.company.dto.Company;
import com.finder.project.user.dto.UserAuth;
import com.finder.project.user.dto.Users;

public interface UserService {
    
    // 로그인
    public boolean login(Users user) throws Exception;

    // 조회
    public Users select(String username) throws Exception;

    // 회원 가입
    public int join(Users user) throws Exception;

    // 기업 회원 가입 
    public int comJoin(Company company) throws Exception;

    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;

    public int max() throws Exception;

    // 사용자 비밀번호 찾기 할때 정보를 확인
    public Users getUserById(String userId) throws Exception;  

    // 기업 비밀번호 찾기 할때 정보를 확인
    public Company getComName(String comName) throws Exception;

    // 아이디 찾기
    public String findId(Users user) throws Exception;

    // 비밀번호 수정하기
    public int updatePw(Users userPw) throws Exception;

    // 메일 코드 조회
}