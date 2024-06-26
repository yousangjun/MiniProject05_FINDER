package com.finder.project.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.finder.project.company.dto.Company;
import com.finder.project.company.service.CompanyService;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.recruit.mapper.RecruitMapper;
import com.finder.project.recruit.service.RecruitService;

import lombok.extern.slf4j.Slf4j;

// @RestController
@Slf4j
@Controller
public class SearchController {

    @Autowired
    private CompanyService companyService;
    @Autowired
    RecruitMapper recruitMapper;

    // @GetMapping("/search")
    // public List<Company> searchItems(@RequestParam String query) throws Exception
    // {
    // // 실제로는 DB에서 데이터를 필터링하여 가져옵니다.
    // // List<String> allItems = recruitMapper.selectCompanyNameList();
    // // query를 사용하여 필터링
    // // return allItems.stream()
    // // .filter(item -> item.toLowerCase().contains(query.toLowerCase()))
    // // .collect(Collectors.toList());

    // log.info("query : "+ query);
    // List<Company> companyList = companyService.serachCompanyByName(query);
    // log.info("companyList : "+ companyList);
    // return companyList;

    // }
    @GetMapping("/search")
    public String searchItems(@RequestParam String query, Model model) throws Exception {
        // 실제로는 DB에서 데이터를 필터링하여 가져옵니다.
        // List<String> allItems = recruitMapper.selectCompanyNameList();
        // query를 사용하여 필터링
        // return allItems.stream()
        // .filter(item -> item.toLowerCase().contains(query.toLowerCase()))
        // .collect(Collectors.toList());

        log.info("query : " + query);
        List<Company> companyList = companyService.serachCompanyByName(query);
        // log.info("companyList : " + companyList);
        model.addAttribute("companyList", companyList);

        return "/recruit/keyword";
    }

    @Autowired
    private RecruitService recruitService;

    @GetMapping("/keyword")
    public String getRecruitList(@RequestParam int comNo, Model model) {
        List<RecruitPost> recruitPosts = recruitService.postsRecruitListKeyword(comNo);
        for (RecruitPost recruitPost : recruitPosts) {
            log.info(recruitPost + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        }
        // recruitPosts를 HTML로 변환하는 로직 필요 (예: Thymeleaf를 이용해 변환)
        // 여기서는 간단하게 JSON으로 반환
        model.addAttribute("recruitPost", recruitPosts);
        return "/recruit/searchRecruit";
    }

}