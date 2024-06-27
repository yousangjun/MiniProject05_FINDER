package com.finder.project.company.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Credit {
    
    private int creditNo;
    private int orderNo;
    private String creditMethod;
    private String creditStatus;
    private String creditCode;
    private Timestamp creditDate;


}
