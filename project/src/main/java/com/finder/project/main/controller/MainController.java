package com.finder.project.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Option;
import com.finder.project.main.service.FileService;
import com.finder.project.recruit.dto.RecruitPage;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.recruit.mapper.RecruitMapper;
import com.finder.project.recruit.service.RecruitService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MainController {

    @Autowired
    RecruitService recruitService;

    @Autowired
    RecruitMapper recruitMapper;

    @Autowired
    FileService fileService;

    // 메인페이지 (채용공고) 이런식으로 하는게 맞는지 물어보기
    @GetMapping({ "/index", "" })
    public ResponseEntity<Map<String, Object>> main(Files file, RecruitPage page,
            @RequestParam(value = "code", required = false) Integer code,
            @RequestParam(value = "keyword", required = false) String keyword) throws Exception {
        Map<String, Object> response = new HashMap<>();
        Option option = new Option(code != null ? code : 0, keyword != null ? keyword : "");
        // page.setRows(12);
        // log.info("Page rows set to12312312311323: " + page.getRows());
        // List<RecruitPost> recruitList = recruitService.recruitList(page, option);
        int count = recruitMapper.count(option);
        // log.info("옵션값 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" +
        // option.getCode() + "@@@@"
        // + option.getKeyword());

        // recruitList.forEach(recruit -> {
        // if (recruit.getKeywordList() == null) {
        // recruit.setKeywordList(Collections.emptyList());
        // }
        // });


        response.put("count", count);
        response.put("page", page);
        response.put("option", option);
        // model.addAttribute("count", count);
        // model.addAttribute("page", page);
        // model.addAttribute("optionList", optionList);
        // model.addAttribute("option", option);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 무한 스크롤을 위한 엔드포인트
    // @GetMapping("/indexList")
    // @ResponseBody
    // public List<RecruitPost> getRecruitList(@RequestParam("page") int page,
    // @RequestParam("rows") int rows,
    // @RequestParam(value = "code", required = false) Integer code,
    // @RequestParam(value = "keyword", required = false) String keyword) throws
    // Exception {
    // Page pageRequest = new Page(page, rows);
    // Option option = new Option(code != null ? code : 0, keyword != null ? keyword
    // : "");

    // List<RecruitPost> recruitList = recruitService.recruitList(pageRequest,
    // option);
    // for (RecruitPost recruitPost : recruitList) {
    // log.info("RecruitNo받아오나요 ?" + recruitPost.getRecruitNo());
    // }
    // return recruitList;
    // }

    @GetMapping("/cardList")
    public ResponseEntity<Map<String, Object>> recrutiCardList(@RequestParam("page") int page,
            @RequestParam("rows") int rows,
            @RequestParam(value = "code", required = false) Integer code,
            @RequestParam(value = "keyword", required = false) String keyword) throws Exception {
        Map<String, Object> response = new HashMap<>();
        log.info("page cardList" + page);
        
        RecruitPage pageRequest = new RecruitPage(page, rows);
        
        Option option = new Option(code != null ? code : 0, keyword != null ? keyword : "");
        List<Option> optionList = new ArrayList<Option>();
        optionList.add(new Option(0, "회사명"));
        optionList.add(new Option(1, "제목"));
        optionList.add(new Option(2, "#키워드"));
        optionList.add(new Option(3, "카테고리"));
        int count = recruitMapper.count(option);

        List<RecruitPost> recruitList = recruitService.recruitList(pageRequest, option);
        // for (RecruitPost recruitPost : recruitList) {
        // List<Keyword> keywords = recruitPost.getKeywordList();
        // // log.info("keyword :::::" + keywords);
        // // 필요한 작업 수행
        // // 예를 들어, 로그 출력
        // }
        // log.info("옵션값 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" +
        // option.getCode() + "@@@@"
        // + option.getKeyword());

        response.put("page", pageRequest);
        response.put("recruitList", recruitList);
        response.put("count", count);
        response.put("optionList", optionList);
        response.put("option", option);

        log.info("리스폰스", response);
        // model.addAttribute("page", pageRequest);
        // model.addAttribute("recruitList", recruitList);
        // return "/recruit/card";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 로그인 페이지 REST에서는 필요없음
    // @GetMapping("/login")
    // public String login() {

    // return "/login";
    // }
    // @GetMapping({"/", ""})
    // public String home() {
    // return "index";
    // }

    // @GetMapping("/login")
    // public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
    //     try {
    //         // 사용자 인증
    //         Authentication authentication = authenticationManager.authenticate(
    //             new UsernamePasswordAuthenticationToken(username, password)
    //         );

    //         SecurityContextHolder.getContext().setAuthentication(authentication);

    //         // 유저 정보 조회
    //         Users user = userService.select(username);
    //         List<UserAuth> userAuthList = user.getAuthList();

    //         // List<UserAuth>를 List<String>으로 변환
    //         List<String> roles = userAuthList.stream()
    //             .map(UserAuth::getAuth)
    //             .collect(Collectors.toList());

    //         // JWT 토큰 생성
    //         String jwtToken = jwtTokenProvider.createToken(user.getUserNo(), user.getUserId(), roles);

    //         // 토큰을 클라이언트에 반환
    //         return ResponseEntity.ok().body(jwtToken);

    //     } catch (Exception e) {
    //         return ResponseEntity.status(401).body("로그인 실패: 유효하지 않은 사용자입니다.");
    //     }
    // }

}
