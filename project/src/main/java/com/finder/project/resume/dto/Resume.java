package com.finder.project.resume.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.finder.project.main.dto.Option;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.user.dto.Users;


import lombok.Data;

// 이력서 정보
@Data
public class Resume {
    private int cvNo;                   // 이력서 정보
    private int userNo;                 // 유저 번호    
    private String coverLetter;         // 자기소개서
    private String cvTitle;             // 제목
    private Date cvRegDate;             // 등록일자
    private Date cvUpdDate;             // 수정일자
    private List<Education> educationList = new ArrayList<>();
    private List<EmploymentHistory> employmentHistoryList = new ArrayList<>();
    private Users user;

    //파일
    MultipartFile thumbnail;
    List<MultipartFile> file;
    private int fileNo;
    private Option option;


    private int applyNo;
    private List<RecruitPost> recruitPost;

    
}
