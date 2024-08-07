package com.finder.project.recruit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
@RestController   // @Controller + @ResponseBody
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
    public ResponseEntity<Map<String,Object>> getMethodName(@RequestParam("recruitNo") Integer recruitNo, Files file  ) throws Exception {
        log.info(recruitNo + ": recruitNo");
        Map<String, Object> response = new HashMap<>();
        // Users user = (Users) session.getAttribute("user");

        // if (userNo != null) {
        //     // Integer userNo = user.getUserNo();
        //     log.info(" 유저번호는 : " + userNo);

        //     if (userNo != null) { // userNo가 null이 아닌지 확인

        //         List<Resume> resumeList = resumeService.resumelist(userNo);

        //         if (resumeList != null) {
        //             // log.info("이력서 목록이 있구나 : " + resumeList.size() + "건");
        //             // 모델 등록
        //             // model.addAttribute("resumeList", resumeList);
        //             // model.addAttribute("user", user);
        //             // 뷰페이지 지정
        //         }

        //         // 유저 번호에 해당하는 recruitNo 집합 가져오기
        //         Map<Integer, Set<Integer>> userVisitedRecruitNos = (Map<Integer, Set<Integer>>) session
        //                 .getAttribute("userVisitedRecruitNos");
        //         if (userVisitedRecruitNos == null) {
        //             userVisitedRecruitNos = new HashMap<>();
        //             session.setAttribute("userVisitedRecruitNos", userVisitedRecruitNos);
        //         }

        //         Set<Integer> visitedRecruitNos = userVisitedRecruitNos.get(userNo);
        //         if (visitedRecruitNos == null) {
        //             visitedRecruitNos = new HashSet<>();
        //             userVisitedRecruitNos.put(userNo, visitedRecruitNos);
        //         }

        //         visitedRecruitNos.add(recruitNo);
        //         int aeCount = recruitService.userNoToDistnctRecruitNo(userNo, recruitNo);
        //         log.info("ae?? : " + aeCount);
        //         model.addAttribute("aeCount", aeCount);
        //     }
        // } else {

        // }

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
        // log.info(companyDetail + "companyDetail tlqkf ");

        List<Files> fileList = fileService.listByParent(file);

        Files Thumbnail = fileService.listByParentThumbnail(file);
        // log.info("companyDetail", companyDetail);

        log.info(companyDetail + " 뭐가꼬옴 ????????????????????????" + fileList);

        response.put("companyDetail", companyDetail);
        response.put("Thumbnail", Thumbnail);
        response.put("recruitPost", recruitPost);
        response.put("fileList", fileList);

        // model.addAttribute("companyDetail", companyDetail);
        // model.addAttribute("Thumbnail", Thumbnail);
        // model.addAttribute("recruitPost", recruitPost);
        // model.addAttribute("fileList", fileList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 지원하기 비동기 삭제
    @DeleteMapping("/detail_jobs_user/{cvNo}")
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
    public ResponseEntity<Boolean> submitCv(@RequestParam("focusedCvNo") int focusedCvNo, @RequestParam("recruitNo") int recruitNo)
            throws Exception {

        log.info(focusedCvNo + "?? " + recruitNo);
        int result = recruitService.apply(recruitNo, focusedCvNo);
        
        if (result > 0) {
            log.info("성공하였습니다. ");
            
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    // 채용공고 상세 페이지 ---- 끝

    // 채용공고 등록 페이지 ----
    @GetMapping("/post_jobs_com")
    public ResponseEntity<?> getPost_jobs_com(@RequestParam("userNo") int userNo) {
        Company company = companyService.selectByUserNo(userNo);

        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @PostMapping("/post_jobs_com")
    public ResponseEntity<?> postPost_jobs_com(@ModelAttribute RecruitPost recruitPost, @RequestParam("userNo") Integer userNo) throws Exception {
        log.info(recruitPost + " 잘담기고있니 ? recruitPost");
        int result = recruitService.recruitPost(recruitPost);

        if (result > 0) {

            Order order = companyService.selectOrderByUserNo(userNo);
            order.setRemainQuantity(order.getRemainQuantity() - 1);

            companyService.updateOrder(order);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        // Users user = (Users) session.getAttribute("user");
        // Order order = user.getOrder();
        // int remainQuantity = order.getRemainQuantity();
        // int accessOrder = order.getAccessOrder();
        // if (remainQuantity > 1) {
        //     remainQuantity = remainQuantity - 1;
        //     order.setRemainQuantity(remainQuantity);
        //     recruitService.updateRemainQuantityByOrderNo(order);
        // }

        // if (remainQuantity == 1) {
        //     remainQuantity = remainQuantity - 1;
        //     accessOrder = accessOrder - 1;
        //     order.setRemainQuantity(remainQuantity);
        //     order.setAccessOrder(accessOrder);
        //     recruitService.updateRemainQuantityAndAccessOrderByOrderNo(order);
        // }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    // 채용공고 등록 페이지 ---- 끝

    // 채용공고 조회/수정/삭제 페이지 ----///////////////////////// REST 끝
    @GetMapping("/post_jobs_read_com")
    public ResponseEntity<Map<String, Object>> getPost_jobs_read_com(@RequestParam("recruitNo") int recruitNo,
            Files file)
            throws Exception {
        Map<String, Object> response = new HashMap<>();
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
        response.put("Thumbnail", Thumbnail);
        response.put("recruitPost", recruitPost);
        response.put("fileList", fileList);
        response.put("recruitPost", recruitPost);
        // model.addAttribute("Thumbnail", Thumbnail);
        // model.addAttribute("recruitPost", recruitPost);
        // model.addAttribute("fileList", fileList);
        // model.addAttribute("recruitPost", recruitPost);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/post_jobs_read_com/{recruitNo}") //////////////////////////// Rest 끝
    public ResponseEntity<?> postPost_jobs_read_com(@PathVariable("recruitNo") int recruitNo) throws Exception {
        log.info("여기까지 넘어오니 ??" + recruitNo);
        int result = recruitService.deleteRecruitList(recruitNo);

        if (result > 0) {
            Files file = new Files();
            file.setParentTable("recruit");
            file.setParentNo(recruitNo);
            fileService.deleteByParent(file);
            log.info(" delete 성공 ");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
    
    @PutMapping("/post_jobs_read_com/update") //////////////////////////
    public ResponseEntity<?> post_jobs_read_com_update(@ModelAttribute RecruitPost recruitPost) throws Exception {
        log.info("넘어 오나요 ?" + recruitPost);  
        int result = recruitService.recruitUpdate(recruitPost);
        
        if (result > 0) {
            log.info(" update 성공 ");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    // 채용공고 조회/수정/삭제 페이지 ---- 끝

    // 기업이 등록 한 채용공고 목록
    @GetMapping("/posted_jobs_com")
    public ResponseEntity<Map<String,Object>> getPosted_jobs_com(@RequestParam("comNo") Integer comNo , Page page) throws Exception {
        Map<String,Object> response = new HashMap<>();
        

        List<RecruitPost> recruitPosts = recruitService.pagedPostsRecruitList(comNo, page);

        response.put("recruitPosts", recruitPosts);
        response.put("page", page);

        log.info("::::::::::::::::::::: page :::::::::::::::::::::");
        log.info("PAGE: "  + page);
        // model.addAttribute("recruitPosts", recruitPosts);
        // model.addAttribute("page", page);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 채용공고 삭제 비동기
    
    @DeleteMapping("/posted_jobs_com")
    public ResponseEntity<Boolean> deleteRecruit(@RequestParam("recruitNo") int recruitNo) throws Exception {

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
    public ResponseEntity<?> getMethodName(@RequestParam("recruitNos") List<Integer> recruitNos, Page page) {

        Map<String, Object> response = new HashMap<>();
        
        log.info(page + "뭐나옴 ????????page");
        // 방문한 채용공고 번호를 사용하여 데이터베이스에서 채용공고 리스트를 가져온다
        List<RecruitPost> recruits = recruitService.selectRecruitsByNos(recruitNos, page);
        log.info(recruits + "뭐나옴 ??");

        response.put("recruits", recruits); // 방문한 채용공고
        response.put("page", page);

        log.info("::::::::::::::::" + recruits + "::::::::::::::::::");
        log.info("::::::::::::::::" + page + "::::::::::::::::::");


        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // 지원한 채용공고
    @GetMapping("/applied_jobs_user")
    public ResponseEntity<?> applied(@RequestParam("userNo") Integer userNo, Page page) throws Exception {
        
        Map<String, Object> response = new HashMap<>();
        log.info("-------------------userNo---------------" + userNo);
        List<RecruitPost> recruitPosts = recruitService.applyCvList(userNo, page);

        response.put("recruitPosts", recruitPosts);
        response.put("page", page);
        log.info("::::::::::::::::" + recruitPosts + "::::::::::::::::::");
        log.info("::::::::::::::::" + page + "::::::::::::::::::");
        return new ResponseEntity<>(response, HttpStatus.OK);
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

    // 제출된 이력서 화면
    @GetMapping("/recruit_list_com")

    public ResponseEntity<?> recruit_list_com(@RequestParam("comNo") Integer comNo, Page page) throws Exception {
        Map<String, Object> response = new HashMap<>();

        List<Resume> applyCvList = recruitService.applyCom(comNo, page);

        // for (Resume resume : applyCvList) {

        // }
        response.put("applyCvList", applyCvList);
        response.put("page", page);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
