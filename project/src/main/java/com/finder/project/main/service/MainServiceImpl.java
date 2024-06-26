package com.finder.project.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finder.project.main.mapper.MainMapper;
import com.finder.project.user.dto.UserAuth;

@Service
public class MainServiceImpl implements MainService{

    @Autowired
    MainMapper mainMapper;

    // User 세션 정보로 UserAuth 정보 추출
    public UserAuth userNoToUserAuth(int userNo) {
        UserAuth userAuth = mainMapper.userNoToUserAuth(userNo);        
        return userAuth;
    }
    
}
