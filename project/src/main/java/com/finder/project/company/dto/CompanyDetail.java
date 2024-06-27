package com.finder.project.company.dto;

import lombok.Data;

@Data
public class CompanyDetail {
    
    private int comInfoNo;
    private int comNo;
    private String comRepresent;
    private String comUrl;
    private int comBirth;
    // private ComSize comSize;
    private String comSize;
    private int comEmpCount;
    private int comSales;
    private String comContent;
    private String comVision;
    private String comWelfare;
    private int comAvgSalary;

    private Company company;
}


enum ComSize {
    대기업,
    중견기업,
    중소기업
}