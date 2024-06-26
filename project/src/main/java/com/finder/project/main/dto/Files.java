package com.finder.project.main.dto;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

//파일 정보
@Data
public class Files {


    private int fileNo;
    private String parentTable;
    private int parentNo;
    private String fileName;
    private String originName;
    private String filePath;
    private long fileSize;
    private Timestamp regDate;
    private Timestamp updDate;
    private int fileCode;
    private int cvNo;
    private int recruitNo;

    private MultipartFile file;

}
