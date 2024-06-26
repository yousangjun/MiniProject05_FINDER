package com.finder.project.resume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.finder.project.company.dto.Order;
import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Page;
import com.finder.project.main.mapper.FileMapper;
import com.finder.project.main.service.FileService;
import com.finder.project.resume.dto.Resume;
import com.finder.project.resume.mapper.ResumeMapper;




@Service
public class ResumeServiceImpl implements ResumeService {
    @Autowired
    private ResumeMapper resumeMapper;

    @Autowired
    private FileMapper fileMapper;

    @Autowired
    private FileService fileService;


    /*
     * 이력서 목록 조회⭕
     */
    @Override
    public List<Resume> resumelist(int userNo) throws Exception {
        List<Resume> resumeList = resumeMapper.resumelist(userNo);
        return resumeList;
    }
    
    /*
     * 이력서 첫 페이지 만들기⭕
     * 파일 임플 적어야 함.
     */
    @Override
    public int create(int userNo) throws Exception {
    // Resume 객체를 초기화
    Resume resume = new Resume();
    int cvNo = resumeMapper.maxPk();
    
    // 사용자 번호를 설정
    resume.setUserNo(userNo);
    // 이력서 생성 메서드를 호출하여 데이터베이스에 저장
    int result = resumeMapper.create(userNo);

    return result;
    }
    
    /*
     * 이력서 상세 조회
     */
    @Override
    public Resume select(int cvNo) throws Exception {
        Resume Resume = resumeMapper.select(cvNo);
        return Resume;
    }

    /*
     * 이력서 내용 업로드하기⭕
     * + 파일 등록하기
     */
    @Override
    public int update(Resume resume) throws Exception {
        int result = resumeMapper.update(resume);
        int cvNo = resume.getCvNo();

        // String parentTable = "resume";
        // int parentNo = cvNo;

        System.out.println("파일 : " + resume.getFile());
        System.out.println("파일 번호: " + resume.getFileNo());

        // 이미지 파일 = 1
        // MultipartFile thumbnailFile = resume.getThumbnail();
        // if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
        //     com.finder.project.main.dto.Files thumbnail = new com.finder.project.main.dto.Files();
        //     thumbnail.setFile(thumbnailFile);
        //     thumbnail.setParentTable(parentTable);
        //     thumbnail.setParentNo(parentNo);
        //     thumbnail.setFileCode(1); // 이미지 파일 코드 설정

        //     fileService.upload(thumbnail); // 파일 업로드
        // }
        // //문서파일 = 0
        // if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
        //     Files files = new Files();
        //     files.setFile(thumbnailFile);;
        //     files.setParentTable(parentTable);
        //     files.setParentNo(parentNo);
        //     files.setFileCode(0); //문서 코드

        //     fileService.upload(files); //업로드
        // }

        // // 첨부파일 업로드
        // List<MultipartFile> fileList = resume.getFile();
        // if (fileList != null && !fileList.isEmpty()) {
        //     for (MultipartFile file : fileList) {
        //         if (file.isEmpty()) continue;

        //         // 파일 정보 등록
        //         com.finder.project.main.dto.Files uploadFile = new com.finder.project.main.dto.Files();
        //         uploadFile.setParentNo(parentNo);
        //         uploadFile.setParentTable(parentTable);
        //         uploadFile.setFile(file); // 각 파일을 설정

        //         fileService.upload(uploadFile); // 파일 업로드
        //     }
        // }
            return result;
    }

    /*
     이력서 삭제⭕
     */
    @Override
    public int delete(int cvNo) throws Exception {
        int result = resumeMapper.delete(cvNo);
        return result;
    }

    // 회원번호로 이력서 조회 ⭕
    @Override
    public Resume selectCV(int user_no) throws Exception {
        Resume resume = resumeMapper.selectCV(user_no);
        return resume;
    }

    // ⭕
    @Override
    public int maxPk() throws Exception {
        
        int maxPk = resumeMapper.maxPk();
        return maxPk;
    }

    @Override
    public int resumeProfileUpload(Files file) throws Exception {

        if (file != null) {
            fileService.deleteByParent(file);
        }

        boolean result = fileService.upload(file);
        int fileNo = 0;
        if( result ) {
            fileNo = fileService.maxPk();
        }
        return fileNo;
    }









    // 합불
    @Override
    public int applyCheck(int cvNo, int check) throws Exception {
        
        return resumeMapper.applyCheck(cvNo, check);
    }


    // 내 이력서 페이징용 리스트 [승헌]
    @Override
    public List<Resume> resumelistPaging(int userNo, Page page) throws Exception {
   
        int total = resumeMapper.countMyResume(userNo);
        page.setTotal(total);

        List<Resume> resumelistPaging = resumeMapper.resumelistPaging(userNo, page);
        return resumelistPaging;
   
    }


}
