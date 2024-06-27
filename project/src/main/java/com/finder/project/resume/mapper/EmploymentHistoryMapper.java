package com.finder.project.resume.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.finder.project.resume.dto.EmploymentHistory;

import java.util.List;

@Mapper
public interface EmploymentHistoryMapper {
    //경력사항 목차
    public List<EmploymentHistory> listByCvNo(int cvNo) throws Exception;

    //경력사항 조회
    public EmploymentHistory select(int employmentHistoryNo) throws Exception;

    //경력사항 등록
    public int create (EmploymentHistory employmentHistory) throws Exception;

    //경력사항 수정
    public int update (EmploymentHistory employmentHistory) throws Exception;

    //경력사항 삭제 (employmentHistoryNo 로)
    public int delete (int employmentHistoryNo) throws Exception;

    //경력사항 삭제 (cvNo 로)
    public int deleteByCvNo(int cvNo) throws Exception;

    //경력사항 최댓값 번호
    public int maxPk() throws Exception;
}
