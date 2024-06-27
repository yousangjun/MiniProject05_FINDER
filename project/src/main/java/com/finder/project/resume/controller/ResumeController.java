package com.finder.project.resume.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Page;
import com.finder.project.main.service.FileService;
import com.finder.project.resume.dto.Education;
import com.finder.project.resume.dto.EmploymentHistory;
import com.finder.project.resume.dto.Resume;
import com.finder.project.resume.service.EducationService;
import com.finder.project.resume.service.EmploymentHistoryService;
import com.finder.project.resume.service.ResumeService;
import com.finder.project.user.dto.Users;

import lombok.extern.slf4j.Slf4j;

/**
 * /resume 경로로 요청 왔을 때 처리
 * [GET] - /resume/cv_list : 게시글 목록 화면
 * [GET] - /resume/cv_create : 게시글 등록 화면
 * [POST] - /resume/cv_create : 게시글 등록 처리
 * [GET] - /resume/cv_read_user : 구직자 게시글 상세 조회/수정 화면
 * [GET] - /resume/cv_read_com : 사업가 게시글 상세 조회/수정 화면
 * [POST] - /resume/cv_read_user : 사업가 게시글 조회/수정 화면
 * [POST] - /resume/cv_read_com : 사업가 게시글 조회/수정 화면
 * [POST] - /resume/delete : 게시글 삭제 처리
 */

@Slf4j
@Controller
@RequestMapping("/resume")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @Autowired
    private FileService fileService;

    @Autowired
    private EducationService educationService;

    @Autowired
    EmploymentHistoryService employmentHistoryService;

    /**
     * 이력서 목록 화면
     * 
     * @param page
     * @return
     */
    // @GetMapping("/cv_list_user")
    // public String CvList(Model model, Option option) throws Exception {
    // log.info("이력서 목록 조회화면입니다.");
    // //1)데이터 요청
    // List<Resume> resumeList = resumeService.list(option);

    // //2)모델 등록하기
    // model.addAttribute("resumeList", resumeList);
    // model.addAttribute("option", option); //검색

    // //*검색*/)동적으로 옵션값을 가져오는 경우
    // /* List<Option> optionList = new ArrayList<>();
    // optionList.add(new Option("전체", 0));
    // optionList.add(new Option("제목", 1));
    // optionList.add(new Option("내용", 2));
    // optionList.add(new Option("제목+내용", 3));
    // optionList.add(new Option("작성자", 4));
    // model.addAttribute("optionList", optionList); */

    // //3)뷰 페이지 지정
    // return "/resume/cv_list_user";
    // }

    // @GetMapping("/cv_list_user")
    // public String CvList(HttpSession session, Model model) throws Exception {
    // Users user = (Users) session.getAttribute("user");

    // if (user == null) {
    // // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    // return "redirect:/login";
    // }

    // int userNo = user.getUserNo();
    // log.info(" 유저번호는 : " + userNo);
    // List<Resume> resumeList = resumeService.resumelist(userNo);

    // if (resumeList != null) {
    // log.info("이력서 목록이 있구나 : " + resumeList.size() + "건");
    // // 모델 등록
    // model.addAttribute("resumeList", resumeList);
    // model.addAttribute("user", user);
    // // 뷰페이지 지정
    // return "resume/cv_list_user";
    // }
    // log.info("실패 - userController Get_list ");
    // return "redirect:/login";
    // }

    @GetMapping("/cv_list_user")
    public String CvList(HttpSession session, Model model, Page page) throws Exception {
        Users user = (Users) session.getAttribute("user");

        if (user == null) {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            return "redirect:/login";
        }

        int userNo = user.getUserNo();
        log.info(" 유저번호는 : " + userNo);
        List<Resume> resumeList = resumeService.resumelistPaging(userNo, page);

        if (resumeList != null) {
            log.info("이력서 목록이 있구나 : " + resumeList.size() + "건");
            // 모델 등록
            model.addAttribute("resumeList", resumeList);
            model.addAttribute("user", user);
            model.addAttribute("page", page);

            // 뷰페이지 지정
            return "resume/cv_list_user";
        }
        log.info("실패 - userController Get_list ");
        return "redirect:/login";
    }

    /**
     * 게시글 등록 처리화면
     * 
     * @return
     */

    // @GetMapping("cv_create_user")
    // public String CvCreate() {
    // return "/resume/cv_create_user";
    // }

    @GetMapping("/cv_create_user")
    public String CvCreate(Model model, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");

        // insert 한 서비스로 insert수행
        int useruno = user.getUserNo();
        int result = resumeService.create(useruno);
        // 새 이력서 등록하고 이력서 번호 가져와야함
        int cvNo = resumeService.maxPk();
        log.info("cvNo : " + cvNo);
        model.addAttribute("cvNo", cvNo);
        if (result > 0) {
            log.info("이력서 만드는 걸 성공했어요");
            return "/resume/cv_create_user";
        } else {
            log.info("이력서 만들기 실패");
            return "redirect:/resume/cv_list_user?error";
        }
    }

    /*
     * @PostMapping("/cv_create_user")
     * public String CvCreatePro(HttpSession session, Resume resume, Model model)
     * throws Exception {
     * Users user = (Users) session.getAttribute("user"); // 세션 사용자 정보 가져오기
     * 
     * if (user == null) {
     * log.info("돌아가라");
     * return "redirect:/login"; // 사용자 확인
     * }
     * 
     * // Resume 객체에 사용자 정보 추가
     * resume.setUserNo(user.getUserNo());
     * 
     * int result = resumeService.create(0);
     * 
     * if (result>0) {
     * 
     * return "redirect:/resume/cv_list_user";
     * }
     * return "redirect:/resume/cv_create_user?error";
     * }
     */

    /**
     * 구직자 게시글 조회/수정 화면
     * 
     * @param param
     * @return
     *         파일 요청도 해야함.
     */
    @GetMapping("/cv_read_user")
    public String cvReadUser(HttpSession session, Model model,
            @RequestParam("cvNo") int cvNo, Files file) throws Exception {
        // 세션으로 가져온 User 객체의 user_no을 참조해서 service에 넣기
        Users user = (Users) session.getAttribute("user");
        file.setParentTable("resume");
        file.setParentNo(cvNo);

        List<Files> fileList = fileService.listByParent(file);
        if (user == null) {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            return "redirect:/login";
        }

        // 사용자의 이력서 정보를 가져옴
        Resume resume = resumeService.select(cvNo);
        log.info(resume + " asdfsdfasdffasafssfdS");
        // Education education = educationService.select(cvNo);
        // EmploymentHistory employmentHistory = employmentHistoryService.select(cvNo);

        // List<Education> educationList = educationService.educationList(cvNo);
        // List<EmploymentHistory> employmentHistoryList =
        // employmentHistoryService.employmentHistoryList(cvNo);

        file.setParentNo(cvNo);
        file.setParentTable("resume");

        Files Thumbnail = fileService.listByCVParentThumbnail(file);

        if (resume != null) {

            // 가져온 이력서 정보를 모델에 추가하여 화면에 전달

            model.addAttribute("fileList", fileList);
            model.addAttribute("cvNo", cvNo);
            model.addAttribute("resume", resume);
            model.addAttribute("user", user);
            // model.addAttribute("educationList", educationList);
            // model.addAttribute("education", education);
            // model.addAttribute("employmentHistory", employmentHistory);
            // model.addAttribute("employmentHistoryList", employmentHistoryList);
            model.addAttribute("Thumbnail", Thumbnail);
            log.info("이력서 번호는 : " + cvNo + "번으로 이동했어요");
            // 이력서 정보가 담긴 화면으로 이동
            return "/resume/cv_read_user";

        }
        log.info("리스트 -> 이력서로 안 넘어갔다.");
        return "redirect:/resume/cv_list_user?error";
    }

    /**
     * 구직자 게시글 처음 입력처리
     * 
     * @param Resume
     * @return
     * @throws Exception
     */
    @PostMapping("/cv_update_user")
    public String updateUserPro(HttpSession session, Resume resume) throws Exception {

        resume.setCvNo(resumeService.maxPk());

        log.info("resume의 정보" + resume);
        
        int cvNo = resume.getCvNo();

        // 사용자의 이력서 정보를 업데이트
        int result = resumeService.update(resume);

        // 데이터 처리 성공 시
        if (result > 0) {
            log.info(cvNo + "번의 정보가 처음 입력되었어요.");
            return "redirect:/resume/cv_list_user"; // 성공 시 이력서를 다시 읽는 페이지로 리다이렉트
        }

        // 데이터 처리 실패 시
        return "redirect:/resume/cv_create_user?cvNo=" + cvNo + "&error"; // 실패 시 오류 메시지와 함께 이력서 읽는 페이지로 리다이렉트
    }

    /**
     * 경력 등록하기
     * -employmenthistory 테이블에 insert
     * 
     * @param employmentHistory
     * @return
     * @throws Exception
     */
    @ResponseBody
    @PostMapping("/cv_Emupdate_user")
    public ResponseEntity<?> saveEmData(@RequestBody EmploymentHistory employmentHistory) throws Exception {
        log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~" + "employmentHistory");
        ;

        // 사용자의 경력 이력서 정보 업데이트
        try {
            // 받은 데이터 db에 저장
            int result = employmentHistoryService.create(employmentHistory);
            log.info("result : " + result);
            int employmentHistoryNo = employmentHistoryService.maxPk();
            log.info("employmentHistoryNo: " + employmentHistoryNo);
            employmentHistory = employmentHistoryService.select(employmentHistoryNo);
            log.info("employmentHistory" + employmentHistory);
            return new ResponseEntity<EmploymentHistory>(employmentHistory, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("경력 등록시, 에러 발생");
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    // html list 만든 후 list - get 도 만들기
    // 경력 리스트
    @GetMapping("/cv_Emlist_user")
    public String employmentHistoryListByUser(@RequestParam("cvNo") int cvNo, Model model) throws Exception {
        List<EmploymentHistory> employmentHistoryList = employmentHistoryService.employmentHistoryList(cvNo);
        model.addAttribute("employmentHistoryList", employmentHistoryList);
        log.info("::::::::::: 경력 리스트 :::::::::: ");
        log.info(employmentHistoryList.toString());
        return "/resume/employmentHistory/list";
    }

    /**
     * 학력 등록
     * - cvNo, university, major, universityStatus 받아옴
     * - education 테이블에 insert
     * - 등록된 educationNo 로 education 조회
     * - 응답
     * - 성공 ⭕ ➡ education 객체
     * - 실패 ❌ ➡ "FAIL"
     * 
     * @param education
     * @return
     * @throws Exception
     */
    @ResponseBody
    @PostMapping("/cv_Edupdate_user")
    public ResponseEntity<?> postMethodName(@RequestBody Education education) throws Exception {
        log.info("###############################" + education);
        // 사용자 학력 정보 등록하기
        try {
            // 데이터 db에 저장
            int result = educationService.create(education);
            int educationNo = educationService.maxPk();
            education = educationService.select(educationNo);

            log.info("result : " + result);
            log.info("educationNo : " + educationNo);
            log.info("education : " + education);
            return new ResponseEntity<Education>(education, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("학력 등록시, 에러 발생");
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK); // 실패 시 오류 메시지와 함께 이력서 읽는 페이지로 리다이렉트
    }

    // 학력 리스트
    @GetMapping("/cv_Edlist_user")
    public String educationListByUser(@RequestParam("cvNo") int cvNo, Model model) throws Exception {
        List<Education> educationList = educationService.educationList(cvNo);
        model.addAttribute("educationList", educationList);
        log.info("::::::::::: 학력 리스트 :::::::::: ");
        log.info(educationList.toString());
        return "/resume/education/list";
    }

    public ResumeController(ResumeService resumeService, FileService fileService) {
        this.resumeService = resumeService;
        this.fileService = fileService;
    }

    // 이미지 파일 업데이트
    @ResponseBody
    @PostMapping("/cv_FileUpdate_user")
    public ResponseEntity<Integer> uploadFiles(@RequestParam("cvNo") int cvNo, @ModelAttribute Resume resume)
            throws Exception {
        log.info("::::::::::::::::::::: resume :::::::::::::::::::::");
        log.info(resume.toString());

        Files file = new Files();

        file.setParentNo(cvNo);
        file.setParentTable("resume");
        file.setFile(resume.getThumbnail());
        file.setFileCode(1);
        

        // 파일의 부모번호가 이 resume에 cvno와 같으면 삭제부터 업데이트
        // if (file != null) {
        // fileService.deleteByParent(file);
        // }


        int fileNo = resumeService.resumeProfileUpload(file);

        return new ResponseEntity<Integer>(fileNo, HttpStatus.OK);
    }

    // 이미지 파일 등록
    @ResponseBody
    @PostMapping("/cv_FileCreate_user")
    // public String uploadFiles(@RequestParam("imgUploadFile") MultipartFile[]
    // files) throws Exception {
    public ResponseEntity<Integer> createFiles(@RequestParam("cvNo") int cvNo, Resume resume) throws Exception {
        log.info("::::::::::::::::::::: resume :::::::::::::::::::::");
        
        Files file = new Files();
        
        file.setParentNo(cvNo);
        file.setParentTable("resume");
        // log.info(resume.getThumbnail() + "fasfdsaassfasasaas????");
        
        file.setFile(resume.getThumbnail());
        file.setFileCode(1);

        // file = fileService.listByCVParentThumbnail(file);
        // if (file != null) {
        // fileService.delete(file.getFileNo());
        // }

        // 사진이 있다면 삭제 후 새 사진을 넣을 수 있게 만들어야 함.

        int fileNo = resumeService.resumeProfileUpload(file);
        // fileService.upload(file);

        return new ResponseEntity<Integer>(fileNo, HttpStatus.OK);
    }

    @ResponseBody
    @DeleteMapping("/cv_delete_user")
    // public String uploadFiles(@RequestParam("imgUploadFile") MultipartFile[]
    // files) throws Exception {
    public ResponseEntity<Integer> deleteFiles(@RequestBody Map<String, Integer> request) throws Exception {
        Files file = new Files();
        int cvNo = request.get("cvNo");
        file.setParentNo(cvNo);
        log.info(cvNo + "asdfasdfasdfla;dksjlafsljks;");
        file.setParentTable("resume");
        int result = fileService.deleteByParent(file);

        log.info("asdfas" + result);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }

    // 문서 파일 업데이트
    @ResponseBody
    @PostMapping("/cv_FileUpdate2_user")
    // public String uploadFiles(@RequestParam("imgUploadFile") MultipartFile[]
    // files) throws Exception {
    public ResponseEntity<List<String>> uploadFile(Resume resume) throws Exception {
        log.info(resume.toString());
        List<MultipartFile> files = resume.getFile();
        log.info("::::::::::::::::::::: resume22222222222222 :::::::::::::::::::::" + files);

        List<String> fileNameList = new ArrayList<>();
        if (files != null) {

            for (MultipartFile multipartFile : files) {
                // log.info("asdfasfsadfasfadsF??" + multipartFile);
                Files file = new Files();
                file.setParentNo(resume.getCvNo());
                file.setParentTable("resume");
                file.setFile(multipartFile);
                file.setFileCode(0);
                // file.setOriginName(multipartFile.getOriginalFilename());
                // file.setFilePath(multipartFile.getP);

                fileNameList.add(multipartFile.getOriginalFilename());
                fileService.upload(file);
            }

        }

        // fileService.upload(file);
        return new ResponseEntity<>(fileNameList, HttpStatus.OK);
    }

    // 이력서 수정
    @PostMapping("/cv_read_user")
    public String updateUserPro2(HttpSession session, Resume resume) throws Exception {

        log.info("이력서 정보" + session  + "ddsds" + resume);

        int result = resumeService.update(resume);

        if (result > 0) {
            log.info("이력서 수정 성공했어요");
            return "redirect:/resume/cv_list_user";
        }

        // 데이터 처리 실패
        log.info("이력서 수정 실패했어요");
        return "redirect:/resume/cv_read_user?cvNo&error";
    }

    /**
     * 사업가 게시글 상세 조회/수정화면
     * 
     * @param param
     * @return
     */
    @GetMapping("/cv_read_com")
    public String ReadCom(@RequestParam("cvNo") int cvNo, HttpSession session, Model model) throws Exception {

        // 세션에서 사용자 정보를 가져옴
        Users user = (Users) session.getAttribute("user");

        if (user == null) {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            return "redirect:/login";
        }

        // int userNo = user.getUserNo();

        // 사용자의 이력서 정보를 가져옴
        Resume resume = resumeService.select(cvNo);
        // log.info("sfasdfdsajhfdagshjlkdsfajlhkfdsajlhk" + resume);

        model.addAttribute("cvNo", cvNo);
        // 가져온 이력서 정보를 모델에 추가하여 화면에 전달
        model.addAttribute("resume", resume);
        model.addAttribute("user", user);

        // 화면 이동
        return "resume/cv_read_com";
    }

    /**
     * 학력 삭제
     * - educationNo 받아옴
     * - education 테이블에서 delete
     * - 응답
     * - 성공 ⭕ ➡ "SUCCESS" 객체
     * - 실패 ❌ ➡ "FAIL"
     * 
     * @param education
     * @return
     * @throws Exception
     */
    @ResponseBody
    @DeleteMapping("/cv_Eddelete_user")
    public ResponseEntity<String> deleteEducation(@RequestParam("educationNo") int educationNo) throws Exception {
        log.info("###############################" + educationNo);
        // 학력 삭제하기
        try {
            // 데이터 db에 저장
            int result = educationService.delete(educationNo);
            if (result > 0) {
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("학력 삭제시, 에러 발생");
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK); // 실패 시 오류 메시지와 함께 이력서 읽는 페이지로 리다이렉트
    }

    /**
     * 경력 삭제
     * - employmentHistoryNo 받아옴
     * - employmentHistory 테이블에서 delete
     * - 응답
     * - 성공 ⭕ ➡ "SUCCESS" 객체
     * - 실패 ❌ ➡ "FAIL"
     * 
     * @param education
     * @return
     * @throws Exception
     */
    @ResponseBody
    @DeleteMapping("/cv_Emdelete_user")
    public ResponseEntity<String> deleteEmpploymentHistory(@RequestParam("employmentHistoryNo") int employmentHistoryNo)
            throws Exception {
        log.info("###############################" + employmentHistoryNo);

        // 데이터 db에 저장
        try {
            // 데이터 db에 저장
            int result = employmentHistoryService.delete(employmentHistoryNo);
            if (result > 0) {
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                log.info("실패했다" + result);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("경력 삭제시, 에러 발생");
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK); // 실패 시 오류 메시지와 함께 이력서 읽는 페이지로 리다이렉트
    }

    // 이력서 삭제
    @PostMapping("/delete")
    public String deletePro(@RequestParam("cvNo") int cvNo) throws Exception {

        // 학력 / 경력사항도 삭제
        educationService.deleteByCvNo(cvNo);
        employmentHistoryService.deleteByCvNo(cvNo);

        int result = resumeService.delete(cvNo);
        if (result > 0) {

            // 파일까지 삭제
            Files file = new Files();
            file.setParentTable("Resume");
            file.setParentNo(cvNo);
            fileService.deleteByParent(file);

            log.info(cvNo + "번 이력서 삭제되었습니다.");
            return "redirect:/resume/cv_list_user";
        }
        log.info("삭제 안 돼");
        return "redirect:/resume/cv_read?no=" + cvNo + "&error";
    }

    // -------------------------------------------------------------------------------
    // 기업 이력서 합 불
    @PostMapping("/check/{check}")
    public String postMethodName(@PathVariable("check") int check, @RequestParam("cvNo") int cvNo,
            @RequestParam("userNo") int userNo) throws Exception {

        int result = resumeService.applyCheck(cvNo, check);

        if (result > 0) {
            log.info(" 합 , 불 성공");
        }

        return "redirect:/recruit/recruit_list_com?userNo=" + userNo;
    }

}
