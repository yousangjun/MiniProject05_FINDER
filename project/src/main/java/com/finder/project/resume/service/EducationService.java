package com.finder.project.resume.service;
import java.util.List;

import com.finder.project.resume.dto.Education;


public interface EducationService {
    //이력서 
    public List<Education> educationList(int cvNo) throws Exception;
    //이력서 조회
    public Education select(int educationNo) throws Exception;
    //이력서 등록
    public int create(Education education) throws Exception;
    //이력서 수정
    public int update(Education education) throws Exception;
    //이력서 삭제
    public int delete(int educationNo) throws Exception;
    //이력서 삭제 
    public int deleteByCvNo(int cvNo) throws Exception;
    //이력서 번호
    public int maxPk() throws Exception;
}
