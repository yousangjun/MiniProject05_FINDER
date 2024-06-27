package com.finder.project.main.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.finder.project.user.dto.UserAuth;

@Mapper
public interface MainMapper {
    
    // User 세션 정보로 UserAuth 정보 추출
    public UserAuth userNoToUserAuth(int userNo);
}
