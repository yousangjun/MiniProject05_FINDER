package com.finder.project.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finder.project.main.dto.Files;

@Mapper
public interface FileMapper {
    //파일 목록
    public List<Files> list() throws Exception;

    //파일 조회
    public Files select(int fileNo) throws Exception;
    
    //parentNo 로 파일 조회
    public Files selectByParentNo(int ParentNo) throws Exception;

    //파일 등록
    public int insert(Files file) throws Exception;

    //파일 수정
    public int update(Files file) throws Exception;

    //파일 삭제
    public int delete(int fileNo) throws Exception;

    //파일 목록 - 부모기준
    public List<Files> listByParent(Files file) throws Exception;

    //파일 조회 - 썸네일 [RECRUIT]
    public Files listByParentThumbnail(Files file) throws Exception;

    //파일 조회 - 썸네일 [CV]
    public Files listByCVParentThumbnail(Files file) throws Exception;
    
    // 파일 삭제 - 부모 기준
    public int deleteByParent(Files file) throws Exception;

    // 파일 번호 최댓값
    public int maxPk() throws Exception;


}
