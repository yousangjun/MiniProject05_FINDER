package com.finder.project.recruit.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Order;
import com.finder.project.company.service.CompanyService;
import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Page;
import com.finder.project.main.service.FileService;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.recruit.service.RecruitService;
import com.finder.project.resume.dto.Resume;
import com.finder.project.resume.service.ResumeService;
import com.finder.project.user.dto.Users;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/recruit")
public class RecruitController {

    @Autowired
    RecruitService recruitService;

    @Autowired
    ResumeService resumeService;

    @Autowired
    CompanyService companyService;

    @Autowired
    FileService fileService;

    // 채용공고 상세 페이지 ----
    @GetMapping("/detail_jobs_user")
    public String getMethodName(@RequestParam("recruitNo") Integer recruitNo, Model model, Files file,
            HttpSession session) throws Exception {

        Users user = (Users) session.getAttribute("user");

        if (user != null) {
            Integer userNo = user.getUserNo();
            log.info(" 유저번호는 : " + userNo);

            if (userNo != null) { // userNo가 null이 아닌지 확인

                List<Resume> resumeList = resumeService.resumelist(userNo);

                if (resumeList != null) {
                    // log.info("이력서 목록이 있구나 : " + resumeList.size() + "건");
                    // 모델 등록
                    model.addAttribute("resumeList", resumeList);
                    model.addAttribute("user", user);
                    // 뷰페이지 지정
                }

                // 유저 번호에 해당하는 recruitNo 집합 가져오기
                Map<Integer, Set<Integer>> userVisitedRecruitNos = (Map<Integer, Set<Integer>>) session
                        .getAttribute("userVisitedRecruitNos");
                if (userVisitedRecruitNos == null) {
                    userVisitedRecruitNos = new HashMap<>();
                    session.setAttribute("userVisitedRecruitNos", userVisitedRecruitNos);
                }

                Set<Integer> visitedRecruitNos = userVisitedRecruitNos.get(userNo);
                if (visitedRecruitNos == null) {
                    visitedRecruitNos = new HashSet<>();
                    userVisitedRecruitNos.put(userNo, visitedRecruitNos);
                }

                visitedRecruitNos.add(recruitNo);
                int aeCount = recruitService.userNoToDistnctRecruitNo(userNo, recruitNo);
                log.info("ae?? : " + aeCount);
                model.addAttribute("aeCount", aeCount);
            }
        } else {

        }

        RecruitPost recruitPost = recruitService.recruitRead(recruitNo);
        if (recruitPost == null) {
            // log.error("RecruitPost 객체가 null입니다. : ", recruitPost);
        } else {
            // log.info("RecruitPost 정보: {}", recruitPost);
        }

        // 파일 목록 요청
        file.setParentTable("recruit");
        file.setParentNo(recruitNo);

        int comNo = recruitPost.getCompany().getComNo();
        CompanyDetail companyDetail = recruitService.selectCompanyDetailsWithRecruit(comNo);

        List<Files> fileList = fileService.listByParent(file);

        Files Thumbnail = fileService.listByParentThumbnail(file);
        // log.info("companyDetail", companyDetail);
        model.addAttribute("companyDetail", companyDetail);
        model.addAttribute("Thumbnail", Thumbnail);
        model.addAttribute("recruitPost", recruitPost);
        model.addAttribute("fileList", fileList);

        return "/recruit/detail_jobs_user";
    }

    // 지원하기 비동기 삭제
    @ResponseBody
    @PostMapping("/detail_jobs_user/{cvNo}")
    public ResponseEntity<Boolean> deleteCvNo(@PathVariable("cvNo") int cvNo) throws Exception {

        log.info("이력서 삭제 : " + cvNo);
        int result = recruitService.deleteCvList(cvNo);

        if (result > 0) {
            log.info("삭제되었습니다. ");
            Files file = new Files();
            file.setParentTable("recruit");
            file.setParentNo(cvNo);
            fileService.deleteByParent(file);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        log.info("삭제가 불가능합니다.");
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @PostMapping("/detail_jobs_user/submitCv")
    public String submitCv(@RequestParam("focusedCvNo") int focusedCvNo, @RequestParam("recruitNo") int recruitNo)
            throws Exception {

        log.info(focusedCvNo + "?? " + recruitNo);
        recruitService.apply(recruitNo, focusedCvNo);

        return "redirect:/recruit/applied_jobs_user";
    }

    // 채용공고 상세 페이지 ---- 끝

    // 채용공고 등록 페이지 ----
    @GetMapping("/post_jobs_com")
    public String getPost_jobs_com(@SessionAttribute("user") Users user, Model model) {
        Company company = companyService.selectByUserNo(user.getUserNo());

        model.addAttribute("company", company);
        return "/recruit/post_jobs_com";
    }

    @PostMapping("/post_jobs_com")
    public String postPost_jobs_com(RecruitPost recruitPost, HttpSession session) throws Exception {

        int result = recruitService.recruitPost(recruitPost);

        if (result > 0) {
            log.info(" insert 성공 ");
        }

        Users user = (Users) session.getAttribute("user");
        Order order = user.getOrder();
        int remainQuantity = order.getRemainQuantity();
        int accessOrder = order.getAccessOrder();
        if (remainQuantity > 1) {
            remainQuantity = remainQuantity - 1;
            order.setRemainQuantity(remainQuantity);
            recruitService.updateRemainQuantityByOrderNo(order);
        }

        if (remainQuantity == 1) {
            remainQuantity = remainQuantity - 1;
            accessOrder = accessOrder - 1;
            order.setRemainQuantity(remainQuantity);
            order.setAccessOrder(accessOrder);
            recruitService.updateRemainQuantityAndAccessOrderByOrderNo(order);
        }

        return "redirect:/index";
    }
    // 채용공고 등록 페이지 ---- 끝

    // 채용공고 조회/수정/삭제 페이지 ----
    @GetMapping("/post_jobs_read_com")
    public String getPost_jobs_read_com(@RequestParam("recruitNo") int recruitNo, Model model, Files file)
            throws Exception {

        RecruitPost recruitPost = recruitService.recruitRead(recruitNo);
        log.info(file + "??????????????????????????????????????????");

        // if (recruitPost == null) {
        // log.error("RecruitPost 객체가 null입니다. : ", recruitPost);
        // } else {
        // log.info("RecruitPost 정보: {}", recruitPost);
        // }

        // List<Keyword> keywords = recruitService.recruitReadKeyword(recruitNo);
        // if (keywords == null) {
        // log.error("keywords 객체가 null입니다. : ", keywords);
        // } else {
        // log.info("keywords 정보: {}", keywords);
        // }

        // 파일 목록 요청
        file.setParentTable("recruit");
        file.setParentNo(recruitNo);

        List<Files> fileList = fileService.listByParent(file);

        if (fileList == null) {
            log.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }

        for (Files files : fileList) {
            log.info("files@@@@@@@@@@@@@@@@@@@@@@@정보!!!!!!!!!!!!!!!!!!!", files);
        }

        Files Thumbnail = fileService.listByParentThumbnail(file);

        model.addAttribute("Thumbnail", Thumbnail);
        model.addAttribute("recruitPost", recruitPost);
        model.addAttribute("fileList", fileList);

        model.addAttribute("recruitPost", recruitPost);
        // model.addAttribute("keywords", keywords);

        return "/recruit/post_jobs_read_com";
    }

    @PostMapping("/post_jobs_read_com")
    public String postPost_jobs_read_com(int recruitNo) throws Exception {

        int result = recruitService.deleteRecruitList(recruitNo);

        if (result > 0) {
            Files file = new Files();
            file.setParentTable("recruit");
            file.setParentNo(recruitNo);
            fileService.deleteByParent(file);
            log.info(" delete 성공 ");
        }

        return "redirect:/recruit/posted_jobs_com";
    }

    @PostMapping("/post_jobs_read_com/update")
    public String post_jobs_read_com_update(RecruitPost recruitPost) throws Exception {

        int result = recruitService.recruitUpdate(recruitPost);

        if (result > 0) {
            log.info(" update 성공 ");
        }
        return "redirect:/recruit/posted_jobs_com";
    }

    // 채용공고 조회/수정/삭제 페이지 ---- 끝

    // 기업이 등록 한 채용공고 목록
    @GetMapping("/posted_jobs_com")
    public String getPosted_jobs_com(@SessionAttribute("user") Users user, Model model, Page page) throws Exception {

        Company company = companyService.selectByUserNo(user.getUserNo());
        int comNo = company.getComNo();

        List<RecruitPost> recruitPosts = recruitService.pagedPostsRecruitList(comNo, page);
        model.addAttribute("recruitPosts", recruitPosts);
        model.addAttribute("page", page);

        return "/recruit/posted_jobs_com";
    }

    // 채용공고 삭제 비동기
    @ResponseBody
    @PostMapping("/posted_jobs_com/{recruitNo}")
    public ResponseEntity<Boolean> deleteRecruit(@PathVariable("recruitNo") int recruitNo) throws Exception {

        log.info("채용공고 삭제 : " + recruitNo);
        int result = recruitService.deleteRecruitList(recruitNo);

        if (result > 0) {
            log.info("삭제되었습니다. ");
            Files file = new Files();
            file.setParentTable("recruit");
            file.setParentNo(recruitNo);
            fileService.deleteByParent(file);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        log.info("삭제가 불가능합니다.");
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
    // 기업이 등록 한 채용공고 페이지 ---- 끝

    //////////////////////////////////////////////////////////////// 유저 채용공고 p

    @GetMapping("/new_jobs_user")
    public String getMethodName(HttpSession session, Model model) {
        Users user = (Users) session.getAttribute("user");
        Integer userNo = user.getUserNo();

        // 세션에서 맵을 가져올 때 명시적으로 캐스팅
        Map<Integer, Set<Integer>> userVisitedRecruitNos = (Map<Integer, Set<Integer>>) session
                .getAttribute("userVisitedRecruitNos");
        Set<Integer> visitedRecruitNos = new HashSet<>(); // 빈 집합으로 초기화
        if (userVisitedRecruitNos != null) {
            visitedRecruitNos = userVisitedRecruitNos.get(userNo); // userNo에 해당하는 Set 가져오기
        }

        // 방문한 채용공고 번호를 사용하여 데이터베이스에서 채용공고 리스트를 가져온다
        List<Integer> recruitNosList = new ArrayList<>(visitedRecruitNos);
        List<RecruitPost> recruits = recruitService.selectRecruitsByNos(recruitNosList);
        model.addAttribute("recruits", recruits);

        return "/recruit/new_jobs_user";
    }

    // 지원한 채용공고
    @GetMapping("/applied_jobs_user")
    public String applied(Model model, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");

        int userNo = user.getUserNo();

        List<RecruitPost> recruitPosts = recruitService.applyCvList(userNo);
        // log.info(recruitPosts +
        // "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ re");

        model.addAttribute("recruitPosts", recruitPosts);
        return "/recruit/applied_jobs_user";
    }

    @ResponseBody
    @GetMapping("/applied_jobs_user_check")
    public ResponseEntity<Integer> getRecruitInfo(@RequestParam("recruitNo") int recruitNo, HttpSession session) {

        Users user = (Users) session.getAttribute("user");

        int userNo = user.getUserNo();
        // recruitNo를 사용하여 필요한 처리를 수행합니다.
        Integer checkValue = recruitService.getCheckByRecruitNo(recruitNo, userNo);
        log.info(checkValue + "getCheckByRecruitNo");
        return ResponseEntity.ok(checkValue);
    }

    // 등록된 채용공고 화면
    @GetMapping("/recruit_list_com")

    public String recruit_list_com(Model model, HttpSession session, Page page) throws Exception {

        Users user = (Users) session.getAttribute("user");

        if (user == null) {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            return "redirect:/login";
        }
        int userNo = user.getUserNo();

        Company company = recruitService.userNoToCom(userNo); // 1

        int comNo = company.getComNo(); // 31
        // log.info(comNo + "comNO???????@@!@#!@#@!#?!@#?!@?#?!#");

        List<Resume> applyCvList = recruitService.applyCom(comNo, page);

        // for (Resume resume : applyCvList) {

        // }

        model.addAttribute("resumeList", applyCvList);
        model.addAttribute("page", page);

        return "/recruit/recruit_list_com";
    }

}
