package com.finder.project.user.dto;

import lombok.Data;

@Data
public class UserAuth {
    private int authNo;
    private int userNo;
    private String userId;
    private String auth;

    // getter 메서드 추가
    public String getAuth() {
        return auth;
    }

//     public UserAuth(int userNo, String auth) {
//         this.userNo = userNo;
//         this.auth = auth;
//     }

public UserAuth() {}

public UserAuth(String userId, String auth) {
    this.userId = userId;
    this.auth = auth;
}


// 새 생성자 추가
public UserAuth(int userNo, String role) {
    this.userNo = userNo;
    this.auth = auth;
}
}