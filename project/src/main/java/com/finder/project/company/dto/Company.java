package com.finder.project.company.dto;

import java.util.List;

import com.finder.project.recruit.dto.RecruitPost;

import lombok.Data;

@Data
public class Company {
    
    private int comNo;
    private String comName;
    private String comCategory;
    private String comAddress;
    private String comBusiness;
    private int userNo;

    private List<RecruitPost> recruitList;
    
}
