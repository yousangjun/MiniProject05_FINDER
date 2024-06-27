package com.finder.project.security;

import java.io.IOException;
import java.time.LocalDate;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Order;
import com.finder.project.company.service.CompanyService;
import com.finder.project.recruit.service.RecruitService;
import com.finder.project.user.dto.CustomSocialUser;
import com.finder.project.user.dto.CustomUser;
import com.finder.project.user.dto.Users;
import com.finder.project.user.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

/**
 * ✅ 로그인 성공 처리 클래스
 */
@Slf4j
@Component
public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private RecruitService recruitService;

    @Autowired
    private UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {

        log.info("로그인 인증 성공...");

        // 아이디 저장
        String rememberId = request.getParameter("remember-id"); // 아이디 저장 여부
        String username = request.getParameter("userId"); // 아이디
        log.info("아이디 저장 : " + rememberId);
        log.info("저장할 아이디 : " + username);

        // ✅ 아이디 저장 체크
        if (rememberId != null && rememberId.equals("on")) {
            Cookie cookie = new Cookie("remember-id", username);
            cookie.setMaxAge(60 * 60 * 24 * 7); // 유효기간 7일
            cookie.setPath("/"); // 쿠키 적용 경로 지정
            response.addCookie(cookie); // 응답에 쿠키 등록
        }
        // 🟩 아이디 저장 체크 ❌
        else {
            Cookie cookie = new Cookie("remember-id", "");
            cookie.setMaxAge(0); // 유효기간 7일
            cookie.setPath("/"); // 쿠키 적용 경로 지정
            response.addCookie(cookie); // 응답에 쿠키 등록
        }

        // 인증된 사용자 정보 - (아이디/패스워드/권한)
        // User user = (User) authentication.getPrincipal();
        log.info("::::::::::::::::::::::::::::::::::::::::::");
        log.info("authentication :  " + authentication);

        CustomUser customUser = null;
        // 소셜 로그인
        if (authentication instanceof OAuth2AuthenticationToken) {// userMapper조회 하고 user에다가 넣어 씨발 병신아 
            try {
                Users user = new Users();
                user.setUserId(authentication.getName());
                String userId  = user.getUserId();
                Users userInfo = userMapper.select(userId);
                customUser = new CustomUser(userInfo);
                System.out.print("ansdjbalfhag" + customUser);
                // response.sendRedirect("/user/update_user");
                response.sendRedirect("/user/social_user?message=pleaseUpdateInfo");
            }
            catch (Exception e) {
            }
        }

        // 그냥 로그
        else {
            customUser = (CustomUser) authentication.getPrincipal();
            log.info("아이디 : " + customUser.getUsername());
            log.info("패스워드 : " + customUser.getPassword()); // 보안상 노출❌
            log.info("권한 : " + customUser.getAuthorities());
        }

       

        // 인증된 사용자 정보 - (아이디/패스워드/권한)
        // User user = (User) authentication.getPrincipal();
        // CustomSocialUser loginUser = (CustomSocialUser)
        // authentication.getPrincipal();
        // CustomUser loginUsers = (CustomUser) authentication.getPrincipal();

        Users user = customUser.getUser();

        // 기업 회원이면, 기업 정보 추가 등록
        Company company = companyService.selectByUserNo(user.getUserNo());
        if (company != null) {
            int comNo = company.getComNo();
            CompanyDetail companyDetail = companyService.selectCompanyDetailByComNo(comNo);
            Order order = recruitService.selectOrdersByUserNo(user.getUserNo());

            user.setOrder(order);
            user.setCompany(company);
            user.setCompanyDetail(companyDetail);
        }

        // 로그인된 사용자 정보 세션에 등록
        HttpSession session = request.getSession();
        session.setAttribute("user", user);
        log.info("세션에 등록하는 user 정보 " + user);

        LocalDate currentDate = LocalDate.now();
        session.setAttribute("currentDate", currentDate);

        // log.info("아이디 : " + loginUser.getUsername());
        // log.info("패스워드 : " + loginUser.getPassword()); // 보안상 노출 ❌
        // log.info("권한 : " + loginUser.getAuthorities());

        super.onAuthenticationSuccess(request, response, authentication);
    }

}
