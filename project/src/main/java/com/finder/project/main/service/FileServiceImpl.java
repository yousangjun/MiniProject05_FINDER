package com.finder.project.main.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.finder.project.main.dto.Files;
import com.finder.project.main.mapper.FileMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService{

    @Autowired
    private FileMapper fileMapper;

    @Value("${upload.path}")        // application.properties 에 설정한 업로드 경로 가져옴
    private String uploadPath;

    // 파일 목록
    @Override
    public List<Files> list() throws Exception {
        List<Files> fileList = fileMapper.list();

        return fileList;
    }

    //파일 조회
    @Override
    public Files select(int fileNo) throws Exception {
        Files file = fileMapper.select(fileNo);
        return file;
    }

    // cv_no 로 파일조회
    @Override
    public Files selectByParentNo(int ParentNo) throws Exception {
        Files file = fileMapper.selectByParentNo(ParentNo);
        return file;
    }


    //파일 등록
    @Override
    public int insert(Files file) throws Exception {
        int result = fileMapper.insert(file);
        return result;
    }

    //파일 수정
    @Override
    public int update(Files file) throws Exception {
        int result = fileMapper.update(file);
        return result;
    }

     //파일 삭제
     @Override
     public int delete(int fileNo) throws Exception {
         //파일 정보 조회
         com.finder.project.main.dto.Files file = fileMapper.select(fileNo); 
 
         //파일 정보 삭제 (데이터베이스 측)
         int result = fileMapper.delete(fileNo);
 
         // 파일 시스템의 파일 삭제
         if( result > 0 ) {
             String filePath = file.getFilePath();
             java.io.File deleteFile = new java.io.File(filePath); 
             // 파일 존재 확인
             if( !deleteFile.exists() ) {
                 return result; 
             }
             // 파일 삭제
             if( deleteFile.delete() ) {
                 log.info("파일이 정상적으로 삭제되었습니다.");
                 log.info("file : " + filePath);
             } else {
                 log.info("파일 삭제에 실패하였습니다.");
             }
         }
       return result;
     }

     //부모 테이블 기준으로 파일목록 조회하기
    @Override
    public List<Files> listByParent(Files file) throws Exception {
        List<Files> fileList = fileMapper.listByParent(file);
        return fileList;
    }

    //부모 테이블에 종속된 파일목록 삭제하기
    @Override
    public int deleteByParent(Files file) throws Exception {
        List<Files> fileList = fileMapper.listByParent(file);
        
        for(Files deleteFile : fileList){
            int fileNo = deleteFile.getFileNo();
            delete(fileNo);
        } 
        int result = fileMapper.deleteByParent(file);
        log.info(result + "개의 파일을 제거하였습니다.");

        return result;
    }

    //파일 업로드
    @Override
    public boolean upload(Files file) throws Exception {
        log.info("file: " + file);
        
        MultipartFile mf = file.getFile();
        
        //파일 정보: 원본파일명/파일용량/파일데이터
        String originName = mf.getOriginalFilename();
        long fileSize = mf.getSize();
        byte[] fileData = mf.getBytes();

        //파일 업로드
        //해당파일 복사 - 파일의 정보 DB등록
        //업로드 경로 - application.properties 
        String fileName = UUID.randomUUID().toString()+"_"+originName; //파일명
        java.io.File uploadFile = new java.io.File(uploadPath, fileName);

        //파일 업로드
        FileCopyUtils.copy(fileData,uploadFile);

        //파일 정보 등록
        file.setFilePath(fileName);
        file.setOriginName(originName);
        //C:upload/UID_원본파일명.xxx
        String filePath = uploadPath + "/" + fileName;
        file.setFilePath(filePath);
        file.setFileSize(fileSize);

        //넘겨받을 때 세팅함
        fileMapper.insert(file);

        return true;
    }

    //파일 다운로드
    @Override
    public Files downFile(int fileNo) throws Exception {
        Files file = fileMapper.select(fileNo);

        //다운로드 시 작업할 코드 추가

        return file;
    }

    @Override
    public Files listByParentThumbnail(Files file) throws Exception {
        Files Thumbnail = fileMapper.listByParentThumbnail(file);

        return Thumbnail;
    }

    // CV 썸네일
    @Override
    public Files listByCVParentThumbnail(Files file) throws Exception {
        Files Thumbnail = fileMapper.listByCVParentThumbnail(file);

        return Thumbnail;
    }


    @Override
    public int maxPk() throws Exception {
        return fileMapper.maxPk();
    }



    
}
