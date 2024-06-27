package com.finder.project.main.service;

import com.finder.project.user.dto.UserAuth;

public interface MainService {
    

    // User 세션 정보로 UserAuth 정보 추출
    public UserAuth userNoToUserAuth(int userNo);
}
