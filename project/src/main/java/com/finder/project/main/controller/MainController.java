package com.finder.project.main.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Option;
import com.finder.project.main.service.FileService;
import com.finder.project.recruit.dto.RecruitPage;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.recruit.mapper.RecruitMapper;
import com.finder.project.recruit.service.RecruitService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MainController {

    @Autowired
    RecruitService recruitService;

    @Autowired
    RecruitMapper recruitMapper;

    @Autowired
    FileService fileService;

    // 메인페이지 (채용공고)
    @GetMapping({ "/index", "" })
    public String main(Model model, Files file, RecruitPage page, @RequestParam(value = "code", required = false) Integer code,
            @RequestParam(value = "keyword", required = false) String keyword) throws Exception {
        Option option = new Option(code != null ? code : 0, keyword != null ? keyword : "");

        // page.setRows(12);
        // log.info("Page rows set to12312312311323: " + page.getRows());
        // List<RecruitPost> recruitList = recruitService.recruitList(page, option);
        int count = recruitMapper.count(option);
        // log.info("옵션값 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + option.getCode() + "@@@@"
        //         + option.getKeyword());

        // recruitList.forEach(recruit -> {
        //     if (recruit.getKeywordList() == null) {
        //         recruit.setKeywordList(Collections.emptyList());
        //     }
        // });

        List<Option> optionList = new ArrayList<Option>();

        optionList.add(new Option(0, "제목"));
        optionList.add(new Option(1, "회사명"));
        optionList.add(new Option(2, "#키워드"));
        optionList.add(new Option(3, "카테고리"));

        model.addAttribute("count", count);
        model.addAttribute("page", page);
        model.addAttribute("optionList", optionList);
        model.addAttribute("option", option);
        // model.addAttribute("recruitList", recruitList);

        return "/index";
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
    public String recrutiCardList(@RequestParam("page") int page, @RequestParam("rows") int rows,
    @RequestParam(value = "code", required = false) Integer code,
            @RequestParam(value = "keyword", required = false) String keyword,
            Model model) throws Exception {
        log.info("page cardList" + page);
        
        RecruitPage pageRequest = new RecruitPage(page, rows);
        
        Option option = new Option(code != null ? code : 0, keyword != null ? keyword : "");
        
        List<RecruitPost> recruitList = recruitService.recruitList(pageRequest, option);
        // for (RecruitPost recruitPost : recruitList) {
        //     List<Keyword> keywords = recruitPost.getKeywordList();
        //     // log.info("keyword :::::" + keywords);
        //     // 필요한 작업 수행
        //     // 예를 들어, 로그 출력
        // }
        // log.info("옵션값 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + option.getCode() + "@@@@"
                // + option.getKeyword());

        model.addAttribute("page", pageRequest);
        model.addAttribute("recruitList", recruitList);
        return "/recruit/card";
    }

    // 로그인 페이지
    @GetMapping("/login")
    public String login() {
        return "/login";
    }
    // @GetMapping({"/", ""})
    // public String home() {
    //     return "index";
    // }
    
}
