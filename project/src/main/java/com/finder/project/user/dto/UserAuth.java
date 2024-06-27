package com.finder.project.user.dto;

import lombok.Data;

@Data
public class UserAuth {
    private int authNo;
    private int userNo;
    private String auth;

//     public UserAuth(int userNo, String auth) {
//         this.userNo = userNo;
//         this.auth = auth;
//     }

public UserAuth() {}

// 새 생성자 추가
public UserAuth(int userNo, String role) {
    this.userNo = userNo;
    this.auth = auth;
}
}