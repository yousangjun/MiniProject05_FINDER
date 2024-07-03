package com.finder.project.company.dto;

import lombok.Data;

@Data
public class PasswordConfirmRequest {
    private String password;
    private int userNo;
    private String userPw;

    // 현재 비밀번호 확인하기 위한 멤버변수 
}
