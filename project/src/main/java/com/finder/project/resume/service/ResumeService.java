package com.finder.project.resume.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.finder.project.company.dto.Order;
import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Page;
import com.finder.project.resume.dto.Resume;

import groovy.transform.Undefined.EXCEPTION;

public interface ResumeService {
  // 이력서 목록 + 검색
  public List<Resume> resumelist(int userNo) throws Exception;

  // 내 이력서 목록 조회 페이징 [승헌]
  public List<Resume> resumelistPaging(@Param("userNo") int userNo, @Param("page") Page page
                                        ) throws Exception;

  // 이력서 조회
  public Resume select(int cvNo) throws Exception;

  // 이력서 등록
  public int create(int cvNo) throws Exception;

  // 이력서 수정
  public int update(Resume resume) throws Exception;

  // 이력서 삭제
  public int delete(int employmentHistoryNo) throws Exception;

  // 회원번호로 이력서 조회 ⭕
  public Resume selectCV(int user_no) throws Exception;

  public int maxPk() throws Exception;

  //
  public int resumeProfileUpload(Files file) throws Exception;









  
  // 합불
  public int applyCheck(int cvNo, int check) throws Exception;
}
