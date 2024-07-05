package com.finder.project.security.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.finder.project.security.constants.SecurityConstants;
import com.finder.project.security.provider.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;


@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {
   
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 생성자
    public JwtRequestFilter( AuthenticationManager authenticationManager,  JwtTokenProvider jwtTokenProvider ) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    
        
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // HTTP 헤더에서 토큰을 가져옴
        String header = request.getHeader(SecurityConstants.TOKEN_HEADER);
        log.info("authorization1 : " + header);
    
        // ✅ Bearer + {jwt} 체크
        // 헤더가 없거나 형식이 올바르지 않으면 다음 필터로 진행
        if (header == null || header.length() == 0 || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            log.info("헤더가 없거나 형식이 올바르지 않습니다: " + header);
            filterChain.doFilter(request, response);
            // log.info("필터 체인 이후 request: " + request);
            // log.info("필터 체인 이후 response: " + response);
            // log.info("헤더 상태: " + header);
            return;
        }
    
        log.info("유효한 헤더입니다. request: " + request);
        log.info("유효한 헤더입니다. response: " + response);
    
        // 🔐 JWT
        // Bearer + ${jwt} ➡ "Bearer " 제거
        String jwt = header.replace(SecurityConstants.TOKEN_PREFIX, "");
        log.info("추출한 JWT: " + jwt);
    
        // 토큰을 사용하여 Authentication 객체 생성
        Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
    
        log.info("authentication 객체: " + authentication);
        // 토큰 유효 검사 (토큰이 만료되지 않았으면)
        if (jwtTokenProvider.validateToken(jwt)) {
            log.info("유효한 JWT 토큰입니다.");
            // 👩‍💼 [로그인]
            // SecurityContextHolder(사용자 보안정보를 담는 객체)에
            // Authentication(사용자 인증 정보) 객체를 설정
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    
        // 다음 필터로 진행
        filterChain.doFilter(request, response);
    }
    
}
