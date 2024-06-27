package com.finder.project.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.finder.project.user.dto.CustomUser;
import com.finder.project.user.dto.Users;
import com.finder.project.user.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) {
        log.info("login - loadUserByUsername : " + username);
        try {
            // MyBatis를 사용하여 데이터베이스에서 사용자 세부 정보를 가져옵니다.
            Users user = userMapper.login(username);

            if (user == null) {
                log.info("사용자 없음...");
                throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
            }

            log.info("user :::::");
            log.info(user.toString());

            // CustomUser 객체 생성 및 반환
            CustomUser customUser = new CustomUser(user);

            log.info("customUser :::::");
            log.info(customUser.toString());

            return customUser;
        } catch (Exception e) {
            log.error("Exception occurred while loading user by username: " + username, e);
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username, e);
        }
    }
}
